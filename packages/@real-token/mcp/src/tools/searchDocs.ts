import { z } from "zod";
import { searchInDocs } from "../utils/markdownReader.js";
import { searchJSDoc } from "../utils/jsdocExtractor.js";
import { listPackageNames } from "../utils/pathResolver.js";

export const searchDocsSchema = z.object({
  query: z.string().describe("Search query"),
  packageName: z.string().optional().describe("Optional: limit search to a specific package"),
  includeJSDoc: z.boolean().optional().describe("Include JSDoc comments in search (default: true)"),
});

export const searchDocsTool = {
  name: "search_docs",
  description: "Search across all documentation (Markdown files and JSDoc comments) for a specific term or phrase",
  inputSchema: {
    type: "object" as const,
    properties: {
      query: {
        type: "string",
        description: "Search query to find in documentation",
      },
      packageName: {
        type: "string",
        description: "Optional: limit search to a specific package",
      },
      includeJSDoc: {
        type: "boolean",
        description: "Include JSDoc comments in search (default: true)",
      },
    },
    required: ["query"],
  },
};

interface SearchResult {
  package: string;
  source: "markdown" | "jsdoc";
  location: string;
  matches: string[];
}

export async function searchDocs(args: z.infer<typeof searchDocsSchema>): Promise<{
  content: Array<{ type: "text"; text: string }>;
}> {
  const packages = args.packageName ? [args.packageName] : listPackageNames();
  const includeJSDoc = args.includeJSDoc !== false;
  const results: SearchResult[] = [];

  for (const pkg of packages) {
    // Search in Markdown files
    const mdResults = await searchInDocs(pkg, args.query);
    for (const result of mdResults) {
      results.push({
        package: pkg,
        source: "markdown",
        location: result.file,
        matches: result.matches,
      });
    }

    // Search in JSDoc comments
    if (includeJSDoc) {
      const jsdocResults = await searchJSDoc(pkg, args.query);
      for (const entry of jsdocResults) {
        results.push({
          package: pkg,
          source: "jsdoc",
          location: `${entry.file}:${entry.line}`,
          matches: [
            `${entry.kind} ${entry.name}: ${entry.description.slice(0, 100)}${
              entry.description.length > 100 ? "..." : ""
            }`,
          ],
        });
      }
    }
  }

  if (results.length === 0) {
    return {
      content: [
        {
          type: "text" as const,
          text: `No results found for "${args.query}". Try a different search term.`,
        },
      ],
    };
  }

  return {
    content: [
      {
        type: "text" as const,
        text: JSON.stringify(results, null, 2),
      },
    ],
  };
}
