import spawn from 'cross-spawn';
import path from 'path';
import type { SpawnSyncReturns } from 'child_process';

const EXOS_SCRIPT_PATH = path.resolve(process.cwd(), './src/index.ts');

function runScript(scriptPath: string, args: string[]): SpawnSyncReturns<string> {
  return spawn.sync('ts-node', [scriptPath, ...args], { encoding: 'utf8' });
}

function runExosScript(args: string[]): SpawnSyncReturns<string> {
  return runScript(EXOS_SCRIPT_PATH, args);
}

export { runExosScript };
