#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const yaml = require("yaml");

// Read workspace configuration
function getWorkspacePackages() {
  const workspaceConfig = fs.readFileSync("pnpm-workspace.yaml", "utf8");
  const { packages } = yaml.parse(workspaceConfig);

  const workspacePackages = new Set();

  for (const pkgPattern of packages) {
    // Get the actual path without globs
    const pkgPath = pkgPattern.replace(/"/g, "");
    if (fs.existsSync(pkgPath)) {
      try {
        const packageJson = JSON.parse(
          fs.readFileSync(path.join(pkgPath, "package.json"), "utf8")
        );
        workspacePackages.add(packageJson.name);
      } catch (error) {
        console.warn(`Warning: Could not read package.json in ${pkgPath}`);
      }
    }
  }

  return workspacePackages;
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

// Main function
function main() {
  try {
    // Get all workspace package names
    const workspacePackages = getWorkspacePackages();

    // Read root package.json
    const rootPackageJsonPath = "package.json";
    const packageJson = JSON.parse(
      fs.readFileSync(rootPackageJsonPath, "utf8")
    );

    // Update all dependency types
    let modified = false;
    modified =
      updateDependencies(packageJson.dependencies, workspacePackages) ||
      modified;
    modified =
      updateDependencies(packageJson.devDependencies, workspacePackages) ||
      modified;
    modified =
      updateDependencies(packageJson.peerDependencies, workspacePackages) ||
      modified;

    // Save changes if modified
    if (modified) {
      fs.writeFileSync(
        rootPackageJsonPath,
        JSON.stringify(packageJson, null, 2) + "\n"
      );
      console.log("Updated root package.json");
    } else {
      console.log("No changes needed in root package.json");
    }
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

main();
