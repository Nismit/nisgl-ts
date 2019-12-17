const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  let entries = {
    'nisgl-ts': './src/index.ts',
    'docs.bundle': './docs/src/index.js'
  }

  if (argv.mode === 'production') {
    entries = {
      'nisgl-ts': './src/index.ts',
      '../docs/assets/js/bundle': './docs/src/index.js'
    }
  }

  return {
    entry: entries,
    output: {
      filename: '[name].js',
      path: path.join(__dirname, 'dist'),
      library: 'NISGL',
      libraryTarget: 'umd',
      globalObject: 'this'
    },
    devServer: {
      contentBase: path.resolve(__dirname),
      port: 8080,
      open: true
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader'
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.ts', '.js']
    },
    plugins: argv.mode === 'production' ? [] : [new HtmlWebpackPlugin({
      template: path.resolve('./docs/', 'index.html'),
      filename: 'index.html'
    })]
  }
}