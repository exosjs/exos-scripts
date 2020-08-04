import type webpack from 'webpack';
import webpackConfigApp from './webpack.config.app';
import webpackConfigUiLibrary from './webpack.config.uiLibrary';

// TODO: move this to the main file and convert the webpack to a function
import getArgumentValue from '../common/getArgumentValue';

const isLibrary = getArgumentValue(process.argv, 'type').toLowerCase() === 'ui-library';

const config: webpack.Configuration = isLibrary ? webpackConfigUiLibrary : webpackConfigApp;
export default config;
