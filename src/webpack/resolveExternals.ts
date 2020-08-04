import type webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';

export default (isLibrary: boolean): webpack.ExternalsElement => {
  if (isLibrary) {
    return nodeExternals();
  }

  return {
    react: 'React',
    'react-dom': 'ReactDOM',
  };
};
