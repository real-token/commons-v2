import * as fs from "fs";
import * as path from "path";
import { glob } from "glob";
import { getDocsPath, getPackagePath } from "./pathResolver.js";

export interface DocFile {
  name: string;
  path: string;
  relativePath: string;
}

/**
 * List all markdown documentation files for a package
 */
export async function listDocFiles(packageName: string): Promise<DocFile[]> {
  const docsPath = getDocsPath(packageName);
  const packagePath = getPackagePath(packageName);

  const files: DocFile[] = [];

  // Check docs/ folder
  if (fs.existsSync(docsPath)) {
    const docFiles = await glob("**/*.md", { cwd: docsPath });
    for (const file of docFiles) {
      files.push({
        name: path.basename(file, ".md"),
        path: path.join(docsPath, file),
        relativePath: `docs/${file}`,
      });
    }
  }

  // Also check for README.md files in src/ subdirectories
  const srcPath = path.join(packagePath, "src");
  if (fs.existsSync(srcPath)) {
    const readmeFiles = await glob("**/README.md", { cwd: srcPath });
    for (const file of readmeFiles) {
      files.push({
        name: path.dirname(file).replace(/\//g, "-") || "root",
        path: path.join(srcPath, file),
        relativePath: `src/${file}`,
      });
    }
  }

  // Check root README.md
  const rootReadme = path.join(packagePath, "README.md");
  if (fs.existsSync(rootReadme)) {
    files.push({
      name: "README",
      path: rootReadme,
      relativePath: "README.md",
    });
  }

  return files;
}

/**
 * Read a specific documentation file
 */
export function readDocFile(packageName: string, relativePath: string): string | null {
  const packagePath = getPackagePath(packageName);
  const fullPath = path.join(packagePath, relativePath);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  return fs.readFileSync(fullPath, "utf-8");
}

/**
 * Extract code examples from markdown content
 */
export function extractCodeExamples(content: string): Array<{ language: string; code: string }> {
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  const examples: Array<{ language: string; code: string }> = [];

  let match;
  while ((match = codeBlockRegex.exec(content)) !== null) {
    examples.push({
      language: match[1] || "text",
      code: match[2].trim(),
    });
  }

  return examples;
}

/**
 * Search for content in documentation files
 */
export async function searchInDocs(
  packageName: string,
  query: string
): Promise<Array<{ file: string; matches: string[] }>> {
  const files = await listDocFiles(packageName);
  const results: Array<{ file: string; matches: string[] }> = [];
  const queryLower = query.toLowerCase();

  for (const file of files) {
    const content = fs.readFileSync(file.path, "utf-8");
    const lines = content.split("\n");
    const matches: string[] = [];

    for (const line of lines) {
      if (line.toLowerCase().includes(queryLower)) {
        matches.push(line.trim());
      }
    }

    if (matches.length > 0) {
      results.push({
        file: file.relativePath,
        matches: matches.slice(0, 5), // Limit to 5 matches per file
      });
    }
  }

  return results;
}
