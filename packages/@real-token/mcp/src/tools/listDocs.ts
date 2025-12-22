import { z } from "zod";
import { listDocFiles } from "../utils/markdownReader.js";

export const listDocsSchema = z.object({
  packageName: z.string().describe("Package name without @real-token/ prefix (e.g., 'web3', 'core')"),
});

export const listDocsTool = {
  name: "list_docs",
  description: "List all available documentation files (Markdown) for a specific @real-token package",
  inputSchema: {
    type: "object" as const,
    properties: {
      packageName: {
        type: "string",
        description: "Package name without @real-token/ prefix (e.g., 'web3', 'core', 'types')",
      },
    },
    required: ["packageName"],
  },
};

export async function listDocs(args: z.infer<typeof listDocsSchema>): Promise<{
  content: Array<{ type: "text"; text: string }>;
}> {
  const files = await listDocFiles(args.packageName);

  if (files.length === 0) {
    return {
      content: [
        {
          type: "text" as const,
          text: `No documentation files found for package "${args.packageName}". You may need to create a docs/ folder with .md files.`,
        },
      ],
    };
  }

  return {
    content: [
      {
        type: "text" as const,
        text: JSON.stringify(
          files.map((f) => ({
            name: f.name,
            path: f.relativePath,
          })),
          null,
          2
        ),
      },
    ],
  };
}
