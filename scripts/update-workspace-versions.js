#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const yaml = require("yaml");

// Read workspace configuration
function getWorkspacePackages() {
  const workspaceConfig = fs.readFileSync("pnpm-workspace.yaml", "utf8");
  const { packages } = yaml.parse(workspaceConfig);

  const workspacePackages = new Set();
  const packagePaths = new Map(); // Store package paths for later use

  for (const pkgPattern of packages) {
    // Get the actual path without globs
    const pkgPath = pkgPattern.replace(/"/g, "");
    if (fs.existsSync(pkgPath)) {
      try {
        const packageJson = JSON.parse(
          fs.readFileSync(path.join(pkgPath, "package.json"), "utf8")
        );
        workspacePackages.add(packageJson.name);
        packagePaths.set(packageJson.name, pkgPath);
      } catch (error) {
        console.warn(`Warning: Could not read package.json in ${pkgPath}`);
      }
    }
  }

  return { workspacePackages, packagePaths };
}

// Update dependencies in package.json
function updateDependencies(deps, workspacePackages) {
  if (!deps) return false;

  let modified = false;
  for (const [name, version] of Object.entries(deps)) {
    // Skip yalc packages (they start with file:.yalc)
    if (version.startsWith("file:.yalc")) {
      continue;
    }

    if (workspacePackages.has(name) && version !== "workspace:*") {
      deps[name] = "workspace:*";
      modified = true;
      console.log(`  Updated ${name} to workspace:*`);
    }
  }
  return modified;
}

// Update a single package.json file
function updatePackageJson(filePath, workspacePackages) {
  console.log(`\nChecking ${filePath}`);
  const packageJson = JSON.parse(fs.readFileSync(filePath, "utf8"));

  let modified = false;
  modified =
    updateDependencies(packageJson.dependencies, workspacePackages) || modified;
  modified =
    updateDependencies(packageJson.devDependencies, workspacePackages) ||
    modified;
  modified =
    updateDependencies(packageJson.peerDependencies, workspacePackages) ||
    modified;

  if (modified) {
    fs.writeFileSync(filePath, JSON.stringify(packageJson, null, 2) + "\n");
    console.log(`Updated ${filePath}`);
  } else {
    console.log(`No changes needed in ${filePath}`);
  }
}

// Main function
function main() {
  try {
    // Get all workspace package names and their paths
    const { workspacePackages, packagePaths } = getWorkspacePackages();
    console.log("Workspace packages:", Array.from(workspacePackages));

    // Update root package.json
    updatePackageJson("package.json", workspacePackages);

    // Update each workspace package's package.json
    for (const [pkgName, pkgPath] of packagePaths) {
      const packageJsonPath = path.join(pkgPath, "package.json");
      updatePackageJson(packageJsonPath, workspacePackages);
    }
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

main();
