import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { cn } from "@/lib/utils";
import { projects } from "@/data/projects";
import { skills, skillCategories } from "@/data/skills";

describe("cn utility", () => {
  it("should merge class names correctly", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
    expect(cn("foo", false && "bar")).toBe("foo");
    expect(cn("foo", null, "bar")).toBe("foo bar");
  });

  it("should handle tailwind conflicts with twMerge", () => {
    expect(cn("p-4", "p-6")).toBe("p-6");
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });

  it("should handle conditional classes", () => {
    expect(cn("base", true && "conditional")).toBe("base conditional");
    expect(cn("base", false && "conditional")).toBe("base");
  });
});

describe("Project data validation", () => {
  it("should export valid project structures", () => {
    expect(projects.length).toBeGreaterThan(0);

    for (const project of projects) {
      expect(project.id).toBeTruthy();
      expect(project.title).toBeTruthy();
      expect(project.description).toBeTruthy();
      expect(project.shortDescription).toBeTruthy();
      expect(project.image).toBeTruthy();
      expect(
        existsSync(join(process.cwd(), "public", project.image.replace(/^\/+/, "")))
      ).toBe(true);
      expect(project.techStack.length).toBeGreaterThan(0);
      expect(project.techStack.every((technology) => technology.trim())).toBe(true);
      expect(typeof project.featured).toBe("boolean");
      expect(["fullstack", "frontend", "backend", "mobile"]).toContain(
        project.category
      );
    }
  });
});

describe("Skill data validation", () => {
  it("should export valid skill structures", () => {
    const configuredCategories = skillCategories.map(({ key }) => key);

    expect(skills.length).toBeGreaterThan(0);

    for (const skill of skills) {
      expect(skill.name).toBeTruthy();
      expect(configuredCategories).toContain(skill.category);
    }
  });

  it("should keep project ids and skill names unique", () => {
    expect(new Set(projects.map(({ id }) => id)).size).toBe(projects.length);
    expect(new Set(skills.map(({ name }) => name)).size).toBe(skills.length);
  });
});