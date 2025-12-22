import * as fs from "fs";
import * as path from "path";
import { parse } from "comment-parser";
import { glob } from "glob";
import { getSrcPath } from "./pathResolver.js";

export interface JSDocEntry {
  name: string;
  description: string;
  file: string;
  line: number;
  tags: Array<{
    tag: string;
    name: string;
    type: string;
    description: string;
  }>;
  kind: "function" | "type" | "interface" | "variable" | "class" | "unknown";
}

/**
 * Extract JSDoc comments from a TypeScript file
 */
export function extractJSDocFromFile(filePath: string): JSDocEntry[] {
  if (!fs.existsSync(filePath)) {
    return [];
  }

  const content = fs.readFileSync(filePath, "utf-8");
  const entries: JSDocEntry[] = [];

  // Parse JSDoc comments using comment-parser
  const parsed = parse(content, { spacing: "preserve" });

  for (const block of parsed) {
    // Try to find the name of what this JSDoc documents
    const lines = content.split("\n");
    const nextLineIndex = block.source[block.source.length - 1].number;
    const nextLine = lines[nextLineIndex] || "";

    const name = extractNameFromLine(nextLine);
    const kind = detectKind(nextLine);

    if (name) {
      entries.push({
        name,
        description: block.description,
        file: filePath,
        line: block.source[0].number + 1,
        tags: block.tags.map((tag) => ({
          tag: tag.tag,
          name: tag.name,
          type: tag.type,
          description: tag.description,
        })),
        kind,
      });
    }
  }

  return entries;
}

/**
 * Extract all JSDoc entries from a package
 */
export async function extractJSDocFromPackage(packageName: string): Promise<JSDocEntry[]> {
  const srcPath = getSrcPath(packageName);

  if (!fs.existsSync(srcPath)) {
    return [];
  }

  const tsFiles = await glob("**/*.{ts,tsx}", {
    cwd: srcPath,
    ignore: ["**/*.d.ts", "**/node_modules/**"],
  });

  const allEntries: JSDocEntry[] = [];

  for (const file of tsFiles) {
    const fullPath = path.join(srcPath, file);
    const entries = extractJSDocFromFile(fullPath);

    // Update file paths to be relative
    for (const entry of entries) {
      entry.file = `src/${file}`;
    }

    allEntries.push(...entries);
  }

  return allEntries;
}

/**
 * Search JSDoc entries by name or description
 */
export async function searchJSDoc(
  packageName: string,
  query: string
): Promise<JSDocEntry[]> {
  const entries = await extractJSDocFromPackage(packageName);
  const queryLower = query.toLowerCase();

  return entries.filter(
    (entry) =>
      entry.name.toLowerCase().includes(queryLower) ||
      entry.description.toLowerCase().includes(queryLower)
  );
}

/**
 * Extract the name from the line after a JSDoc comment
 */
function extractNameFromLine(line: string): string | null {
  // Match various patterns: export function name, export const name, interface Name, type Name, etc.
  const patterns = [
    /export\s+(?:async\s+)?function\s+(\w+)/,
    /export\s+const\s+(\w+)/,
    /export\s+let\s+(\w+)/,
    /export\s+(?:default\s+)?class\s+(\w+)/,
    /export\s+interface\s+(\w+)/,
    /export\s+type\s+(\w+)/,
    /(?:const|let|var)\s+(\w+)/,
    /function\s+(\w+)/,
    /interface\s+(\w+)/,
    /type\s+(\w+)/,
    /class\s+(\w+)/,
  ];

  for (const pattern of patterns) {
    const match = line.match(pattern);
    if (match) {
      return match[1];
    }
  }

  return null;
}

/**
 * Detect the kind of declaration from the line
 */
function detectKind(line: string): JSDocEntry["kind"] {
  if (/function\s+/.test(line) || /=>\s*{/.test(line) || /\([^)]*\)\s*=>/.test(line)) {
    return "function";
  }
  if (/interface\s+/.test(line)) {
    return "interface";
  }
  if (/type\s+\w+\s*=/.test(line)) {
    return "type";
  }
  if (/class\s+/.test(line)) {
    return "class";
  }
  if (/(?:const|let|var)\s+/.test(line)) {
    return "variable";
  }
  return "unknown";
}
