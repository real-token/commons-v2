import { listPackagesTool, listPackages } from "./listPackages.js";
import { listDocsTool, listDocs, listDocsSchema } from "./listDocs.js";
import { getDocumentationTool, getDocumentation, getDocumentationSchema } from "./getDocumentation.js";
import { getJSDocTool, getJSDoc, getJSDocSchema } from "./getJSDoc.js";
import { searchDocsTool, searchDocs, searchDocsSchema } from "./searchDocs.js";

export const tools = [
  listPackagesTool,
  listDocsTool,
  getDocumentationTool,
  getJSDocTool,
  searchDocsTool,
];

export async function handleToolCall(
  name: string,
  args: Record<string, unknown>
): Promise<{ content: Array<{ type: "text"; text: string }> }> {
  switch (name) {
    case "list_packages":
      return listPackages();

    case "list_docs":
      return listDocs(listDocsSchema.parse(args));

    case "get_documentation":
      return getDocumentation(getDocumentationSchema.parse(args));

    case "get_jsdoc":
      return getJSDoc(getJSDocSchema.parse(args));

    case "search_docs":
      return searchDocs(searchDocsSchema.parse(args));

    default:
      return {
        content: [
          {
            type: "text",
            text: `Unknown tool: ${name}`,
          },
        ],
      };
  }
}
