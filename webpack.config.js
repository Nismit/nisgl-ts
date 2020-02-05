const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  let entries = {
    'nisgl-ts': './src/index.ts',
    'docs.bundle': './docs/src/index.js'
  }

  if (argv.mode === 'production') {
    entries = {
      'nisgl-ts': './src/index.ts',
      '../docs/assets/bundle': './docs/src/index.js'
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
          test: /\.scss/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                url: false,
                sourceMap: false,
                importLoaders: 2
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: false,
                plugins: [
                  // https://github.com/postcss/autoprefixer#options
                  require('autoprefixer')({
                    grid: true // CSS Grid Layout
                  })
                ]
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: false
              }
            }
          ]
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        },
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
    plugins: argv.mode === 'production' ? [new MiniCssExtractPlugin({
      filename: './[name].css'
    })] : [
      new HtmlWebpackPlugin({
        template: path.resolve('./docs/', 'index.html'),
        filename: 'index.html'
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css'
      })
    ]
  }
}