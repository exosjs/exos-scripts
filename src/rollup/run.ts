import * as rollup from "rollup";
import config from "./rollup.config";

const { output: outputOptions, ...inputOptions } = config;

async function build(): Promise<void> {
  // create a bundle
  const bundle = await rollup.rollup(inputOptions);
  await bundle.write(outputOptions);
}

build();
