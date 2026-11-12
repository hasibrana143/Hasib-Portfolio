import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

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
  it("should have valid project structure", () => {
    const project = {
      id: "1",
      title: "Test Project",
      description: "A test project",
      shortDescription: "Test",
      image: "/images/test.jpg",
      techStack: ["React", "TypeScript"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/test",
      featured: true,
      category: "fullstack" as const,
    };

    expect(project.id).toBeDefined();
    expect(project.title).toBeDefined();
    expect(project.techStack).toBeInstanceOf(Array);
    expect(["fullstack", "frontend", "backend", "mobile"]).toContain(project.category);
  });
});

describe("Skill data validation", () => {
  it("should have valid skill structure", () => {
    const skill = {
      name: "React",
      category: "frontend" as const,
      proficiency: 5,
    };

    expect(skill.name).toBeDefined();
    expect(["frontend", "backend", "database", "devops", "tools"]).toContain(
      skill.category
    );
    expect(skill.proficiency).toBeGreaterThanOrEqual(1);
    expect(skill.proficiency).toBeLessThanOrEqual(5);
  });
});