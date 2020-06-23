import * as jest from "jest";
import getConfigToUse from "../../common/getConfigToUse";
import jestConfig = require("./jest.config");
import type { Config } from "@jest/types";

async function main(argv: string[]) {
  if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = "test";
  }

  // Get config path (default or custom)
  const configToUse = getConfigToUse<Config.Argv>("test.js", jestConfig as any);
  console.info(configToUse.isCustom ? `Found custom test config at ${configToUse.customConfigPath}` : "Using default test config");

  // Remove current args because we don't want to run Jest
  // using the current path as base (it should use what's configured in the config file)
  const jestArgv = argv.slice(2);

  // Set the config to use
  jestArgv.push("--config", JSON.stringify(configToUse.config));

  // Run Jest with the arguments
  jest.run(jestArgv);
}

export default main;
