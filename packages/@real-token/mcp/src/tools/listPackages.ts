import { z } from "zod";
import { listPackageNames, readPackageJson } from "../utils/pathResolver.js";

export const listPackagesSchema = z.object({});

export const listPackagesTool = {
  name: "list_packages",
  description: "List all available @real-token packages with their descriptions and versions",
  inputSchema: {
    type: "object" as const,
    properties: {},
    required: [],
  },
};

export interface PackageInfo {
  name: string;
  fullName: string;
  description: string;
  version: string;
}

export async function listPackages(): Promise<{
  content: Array<{ type: "text"; text: string }>;
}> {
  const packageNames = listPackageNames();
  const packages: PackageInfo[] = [];

  for (const name of packageNames) {
    const pkg = readPackageJson(name);
    if (pkg) {
      packages.push({
        name,
        fullName: `@real-token/${name}`,
        description: (pkg.description as string) || "",
        version: (pkg.version as string) || "",
      });
    }
  }

  return {
    content: [
      {
        type: "text" as const,
        text: JSON.stringify(packages, null, 2),
      },
    ],
  };
}
