#!/usr/bin/env node

import chalk from "chalk";
import path from "path";
import { SOURCE_PATH, ROOT_PATH } from "../../common/paths";
import getConfigToUse from "../../common/getConfigToUse";
import getFilesToUse from "../../common/getFilesToUse";
import stylelint from "stylelint";
import stylelintrc = require("./.stylelintrc.js");

async function main() {
  // Resolve configuration to use
  const configToUse = getConfigToUse("stylelint.js", stylelintrc);
  console.log(configToUse.isCustom ? `Found custom lint at ${configToUse.customPath}` : "Using default lint config");

  // Resolve files to use
  const filesToUse = getFilesToUse("--files=", [path.join(SOURCE_PATH, "/**/*.{scss,css}")]);
  console.log(filesToUse.isCustom ? `Found custom rule to identify files to use` : "Using default rule to identify files");

  try {
    // Lint files and get the lint result
    const options = { config: configToUse.result, files: filesToUse.result };
    const { errored, results, output } = await stylelint.lint(options);

    // Output the results and exit the process based on them
    if (errored) {
      console.log(chalk.red("❌ There were errors while running stylelint."));

      // Results are grouped per file, inside of a warnings array
      results.forEach(({ source, warnings }) => {
        const filePath = source.replace(ROOT_PATH, "");
        warnings.forEach(({ line, column, severity, text }) => {
          const message = `${filePath}:${line}:${column}: ${text} [${severity}]`;
          console.log(severity === "error" ? chalk.red(message) : chalk.yellow(message));
        });
      });

      console.log();
      process.exit(1);
    } else {
      console.log(output);
      process.exit(0);
    }
  } catch (error) {
    console.error(chalk.red("❌ There was a compilation error while running stylelint. Please fix it and try again"));
    console.error(chalk.red(error));
    process.exit(1);
  }
}

main();
