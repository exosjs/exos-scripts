import chalk from 'chalk';
import { ExosScripts } from './common/types';

export default function exosScripts(scriptName: string): void {
  if (!(scriptName in ExosScripts)) {
    console.log(chalk.red(`Script ${scriptName} doesn't exist.`));
    console.log(chalk.red(`Valid scripts are: ${Object.keys(ExosScripts).join(', ')}.`));
    console.log();
    return;
  }

  console.log(`Executing script ${scriptName}...`);
  console.log();

  // eslint-disable-next-line
  require(`./scripts/${scriptName}/${scriptName}`);
}
