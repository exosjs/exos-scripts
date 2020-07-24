#!/usr/bin/env node

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "prod";
}

import getArgumentValue from "../../common/getArgumentValue";
const isLibrary = getArgumentValue(process.argv, "type").toLowerCase() === "library";

if (isLibrary) {
  import("../../rollup/run");
} else {
  import("../../webpack/run");
}
