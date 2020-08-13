import path from 'path';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import {
  ASSETS_PATH,
  OUTPUT_PATH,
  OUTPUT_PUBLIC_PATH,
} from '../common/paths';

export default (isDevelopment: boolean, isLibrary: boolean, version: string): webpack.Plugin[] => {
  // const noOpFunction = (): undefined => undefined;
  const miniCssExtractPlugin = new MiniCssExtractPlugin({
    filename: isDevelopment ? 'styles.css' : 'styles.[hash:5].css',
    chunkFilename: isDevelopment ? '[id].css' : '[id].[hash:5].css',
  });
  const copyWebpackPlugin = new CopyWebpackPlugin([{
    from: ASSETS_PATH,
    to: OUTPUT_PATH,
    ignore: ['index.ejs'],
    context: ASSETS_PATH
  }]);
  const htmlWebpackPlugin = new HtmlWebpackPlugin({
    cache: true,
    inject: 'body',
    template: path.resolve(ASSETS_PATH, 'index.ejs'),
    filename: path.resolve(OUTPUT_PATH, 'index.html'),
    // Arbitrary options that are sent to the template file
    isDevelopment,
    version,
  });
  const watchIgnorePlugin = new webpack.WatchIgnorePlugin([/scss\.d\.ts$/]);
  const hotModuleReplacementPlugin = new webpack.HotModuleReplacementPlugin();

  if (isLibrary) {
    return isDevelopment ? [watchIgnorePlugin, hotModuleReplacementPlugin] : [watchIgnorePlugin];
  }

  if (isDevelopment) {
    return [
      miniCssExtractPlugin,
      copyWebpackPlugin,
      htmlWebpackPlugin,
      watchIgnorePlugin,
      hotModuleReplacementPlugin,
    ];
  }
  return [miniCssExtractPlugin, copyWebpackPlugin, htmlWebpackPlugin, watchIgnorePlugin];
};
