import { exec } from "child_process";
import { promisify } from "util";
import { readFileSync } from "fs";
import { join } from "path";

import { App } from "aws-cdk-lib";

import { CdkStarterStack } from "../lib/stack-lib.js";

const execAsync = promisify(exec);

const app = new App();
const packageJson = JSON.parse(
  readFileSync(join(__dirname, "../../package.json"), "utf8")
);

let localEmail: string | undefined;
try {
  localEmail = await execAsync("git config --global user.email").then(
    ({ stdout }) => {
      return stdout.trim();
    }
  );
} catch (error) {
  console.error("Error while getting email from git config", error);
}
const metadata = {
  owner: packageJson["author"],
  version: packageJson["version"],
  productName: packageJson["name"],
  updateBy: localEmail || packageJson["author"],
};

[
  { type: "dev" },
  { type: `sandbox-${process.env["USER"]}` },
  { type: "prod" },
].forEach(
  (env) =>
    new CdkStarterStack(app, env.type, {
      stackName: `${metadata.productName}-${env.type}`,
      tags: {
        AccountingCategory: "Infrastructure",
        Product: "EvilUrge",
        Customer: "EvilUrge",
        CreatedBy: metadata.owner,
        OwnedBy: metadata.owner,
        UpdatedBy: metadata.updateBy,
        ProductVersion: metadata.version,
        Environment: env.type,
      },
      cronEventRule: ["prod", "dev"].includes(env.type), // Add cron event rule only for prod and dev
    })
);
