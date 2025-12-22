import { z } from "zod";
import { extractJSDocFromPackage } from "../utils/jsdocExtractor.js";

export const getJSDocSchema = z.object({
  packageName: z.string().describe("Package name without @real-token/ prefix"),
  filter: z.string().optional().describe("Optional filter to match function/type names"),
  kind: z
    .enum(["function", "type", "interface", "variable", "class", "all"])
    .optional()
    .describe("Filter by kind of declaration"),
});

export const getJSDocTool = {
  name: "get_jsdoc",
  description: "Extract JSDoc comments from source files of a @real-token package. Returns documented functions, types, interfaces with their descriptions and tags.",
  inputSchema: {
    type: "object" as const,
    properties: {
      packageName: {
        type: "string",
        description: "Package name without @real-token/ prefix",
      },
      filter: {
        type: "string",
        description: "Optional filter to match function/type names (case-insensitive)",
      },
      kind: {
        type: "string",
        enum: ["function", "type", "interface", "variable", "class", "all"],
        description: "Filter by kind of declaration",
      },
    },
    required: ["packageName"],
  },
};

export async function getJSDoc(args: z.infer<typeof getJSDocSchema>): Promise<{
  content: Array<{ type: "text"; text: string }>;
}> {
  let entries = await extractJSDocFromPackage(args.packageName);

  if (entries.length === 0) {
    return {
      content: [
        {
          type: "text" as const,
          text: `No JSDoc comments found in package "${args.packageName}". Consider adding /** ... */ comments to exported functions and types.`,
        },
      ],
    };
  }

  // Apply filters
  if (args.filter) {
    const filterLower = args.filter.toLowerCase();
    entries = entries.filter((e) => e.name.toLowerCase().includes(filterLower));
  }

  if (args.kind && args.kind !== "all") {
    entries = entries.filter((e) => e.kind === args.kind);
  }

  if (entries.length === 0) {
    return {
      content: [
        {
          type: "text" as const,
          text: `No JSDoc entries match the filter. Try a different filter or kind.`,
        },
      ],
    };
  }

  // Format output
  const formatted = entries.map((entry) => ({
    name: entry.name,
    kind: entry.kind,
    description: entry.description,
    file: entry.file,
    line: entry.line,
    params: entry.tags
      .filter((t) => t.tag === "param")
      .map((t) => ({
        name: t.name,
        type: t.type,
        description: t.description,
      })),
    returns: entry.tags.find((t) => t.tag === "returns" || t.tag === "return"),
    deprecated: entry.tags.find((t) => t.tag === "deprecated")?.description,
    example: entry.tags.find((t) => t.tag === "example")?.description,
  }));

  return {
    content: [
      {
        type: "text" as const,
        text: JSON.stringify(formatted, null, 2),
      },
    ],
  };
}
