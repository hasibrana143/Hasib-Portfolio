import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function waitForTheme(page: Page) {
  // Wait for theme to be applied (next-themes adds 'dark' class or sets data-theme)
  await page.waitForFunction(() => {
    const html = document.documentElement;
    return html.classList.contains("dark") || html.classList.contains("light") || html.getAttribute("data-theme");
  }, { timeout: 10000 }).catch(() => {
    // Theme might not add classes, check for CSS variables
    return page.evaluate(() => {
      const styles = getComputedStyle(document.documentElement);
      return styles.getPropertyValue("--primary").trim() !== "";
    });
  });
  
  // Additional wait for CSS to be fully computed
  await page.waitForTimeout(500);
}

test.describe("Accessibility Audit", () => {
  test("Home page should have no critical/high accessibility violations", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await waitForTheme(page);

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"])
      .analyze();

    const criticalViolations = accessibilityScanResults.violations.filter(
      (v) => v.impact === "critical"
    );
    const highViolations = accessibilityScanResults.violations.filter(
      (v) => v.impact === "serious"
    );

    expect(criticalViolations).toHaveLength(0);
    expect(highViolations).toHaveLength(0);

    if (accessibilityScanResults.violations.length > 0) {
      console.log("Accessibility violations found:");
      accessibilityScanResults.violations.forEach((v) => {
        console.log(`  [${v.impact}] ${v.id}: ${v.description}`);
        v.nodes.forEach((n) => console.log(`    - ${n.target.join(", ")}`));
      });
    }
  });

  test("Home page should be keyboard navigable", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await waitForTheme(page);

    // Tab through focusable elements
    const focusableElements = await page.$$eval(
      'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])',
      (els) => els.map((el) => el.tagName.toLowerCase())
    );

    expect(focusableElements.length).toBeGreaterThan(0);

    // Test tab navigation
    await page.keyboard.press("Tab");
    const firstFocused = await page.evaluate(() => document.activeElement?.tagName);
    expect(firstFocused).toBeTruthy();

    // Test skip link if exists
    const skipLink = await page.$('a[href="#main-content"]');
    if (skipLink) {
      await skipLink.focus();
      await page.keyboard.press("Enter");
      const mainContent = await page.$("#main-content");
      expect(mainContent).toBeTruthy();
    }
  });

  test("All images should have alt text", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await waitForTheme(page);

    const imagesWithoutAlt = await page.$$eval("img:not([alt])", (imgs) =>
      imgs.map((img) => (img as HTMLImageElement).src)
    );

    expect(imagesWithoutAlt).toHaveLength(0);
  });

  test("Color contrast should meet WCAG AA", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await waitForTheme(page);

    const contrastResults = await new AxeBuilder({ page })
      .withTags(["cat.color"])
      .analyze();

    const contrastViolations = contrastResults.violations.filter(
      (v) => v.id === "color-contrast"
    );

    expect(contrastViolations).toHaveLength(0);
  });

  test("Form labels should be properly associated", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await waitForTheme(page);

    const formResults = await new AxeBuilder({ page })
      .withTags(["cat.forms"])
      .analyze();

    const formViolations = formResults.violations.filter(
      (v) => v.id === "label" || v.id === "form-field-multiple-labels"
    );

    expect(formViolations).toHaveLength(0);
  });

  test("Heading hierarchy should be logical", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await waitForTheme(page);

    const headingResults = await new AxeBuilder({ page })
      .withTags(["cat.headings"])
      .analyze();

    const headingViolations = headingResults.violations.filter(
      (v) => v.id === "heading-order"
    );

    expect(headingViolations).toHaveLength(0);
  });

  test("ARIA attributes should be valid", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await waitForTheme(page);

    const ariaResults = await new AxeBuilder({ page })
      .withTags(["cat.aria"])
      .analyze();

    const ariaViolations = ariaResults.violations.filter(
      (v) =>
        v.id.startsWith("aria-") ||
        v.id === "aria-allowed-attr" ||
        v.id === "aria-required-attr" ||
        v.id === "aria-required-children" ||
        v.id === "aria-required-parent"
    );

    expect(ariaViolations).toHaveLength(0);
  });
});