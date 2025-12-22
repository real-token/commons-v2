import { z } from "zod";
import { readDocFile, listDocFiles } from "../utils/markdownReader.js";

export const getDocumentationSchema = z.object({
  packageName: z.string().describe("Package name without @real-token/ prefix"),
  path: z.string().optional().describe("Relative path to the doc file (e.g., 'docs/hooks.md', 'README.md')"),
});

export const getDocumentationTool = {
  name: "get_documentation",
  description: "Get the content of a documentation file from a @real-token package. If no path is specified, returns the main README or index.",
  inputSchema: {
    type: "object" as const,
    properties: {
      packageName: {
        type: "string",
        description: "Package name without @real-token/ prefix",
      },
      path: {
        type: "string",
        description: "Relative path to the doc file (e.g., 'docs/hooks.md', 'README.md'). If not specified, returns the main documentation.",
      },
    },
    required: ["packageName"],
  },
};

export async function getDocumentation(args: z.infer<typeof getDocumentationSchema>): Promise<{
  content: Array<{ type: "text"; text: string }>;
}> {
  let filePath = args.path;

  // If no path specified, try to find the main documentation
  if (!filePath) {
    const files = await listDocFiles(args.packageName);

    // Priority: docs/index.md > README.md > first doc file
    const indexDoc = files.find((f) => f.relativePath === "docs/index.md");
    const readme = files.find((f) => f.relativePath === "README.md");
    const firstDoc = files[0];

    const mainDoc = indexDoc || readme || firstDoc;

    if (!mainDoc) {
      return {
        content: [
          {
            type: "text" as const,
            text: `No documentation found for package "${args.packageName}". Use list_docs to see available files or create a docs/ folder.`,
          },
        ],
      };
    }

    filePath = mainDoc.relativePath;
  }

  const content = readDocFile(args.packageName, filePath);

  if (content === null) {
    return {
      content: [
        {
          type: "text" as const,
          text: `File not found: ${filePath} in package "${args.packageName}". Use list_docs to see available files.`,
        },
      ],
    };
  }

  return {
    content: [
      {
        type: "text" as const,
        text: content,
      },
    ],
  };
}
