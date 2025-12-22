import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

let monorepoRoot: string | null = null;

/**
 * Find the monorepo root by looking for pnpm-workspace.yaml
 */
export function findMonorepoRoot(): string {
  if (monorepoRoot) return monorepoRoot;

  // Start from this file's directory and traverse up
  let dir = path.dirname(fileURLToPath(import.meta.url));

  while (dir !== "/") {
    if (fs.existsSync(path.join(dir, "pnpm-workspace.yaml"))) {
      monorepoRoot = dir;
      return dir;
    }
    dir = path.dirname(dir);
  }

  throw new Error("Could not find monorepo root (pnpm-workspace.yaml not found)");
}

/**
 * Get the path to a specific package
 */
export function getPackagePath(packageName: string): string {
  const root = findMonorepoRoot();
  return path.join(root, "packages/@real-token", packageName);
}

/**
 * Get the docs folder path for a package
 */
export function getDocsPath(packageName: string): string {
  return path.join(getPackagePath(packageName), "docs");
}

/**
 * Get the src folder path for a package
 */
export function getSrcPath(packageName: string): string {
  return path.join(getPackagePath(packageName), "src");
}

/**
 * List all @real-token packages
 */
export function listPackageNames(): string[] {
  const root = findMonorepoRoot();
  const packagesDir = path.join(root, "packages/@real-token");

  if (!fs.existsSync(packagesDir)) {
    return [];
  }

  return fs.readdirSync(packagesDir).filter((name) => {
    const pkgPath = path.join(packagesDir, name, "package.json");
    return fs.existsSync(pkgPath) && name !== "mcp";
  });
}

/**
 * Read package.json for a specific package
 */
export function readPackageJson(packageName: string): Record<string, unknown> | null {
  const pkgPath = path.join(getPackagePath(packageName), "package.json");

  if (!fs.existsSync(pkgPath)) {
    return null;
  }

  return JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
}
