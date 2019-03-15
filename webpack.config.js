const path = require('path')

module.exports = (env, argv) => ({
  entry: {
    'nisgl-ts': './src/index.ts'
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
    library: 'NISGL',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  devServer: {
    contentBase: path.resolve(__dirname),
    publicPath: '/dist/',
    openPage: 'tests/index.html',
    compress: true,
    port: 8080
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
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: path.resolve('./src/', 'index.html'),
    //   filename: 'index.html'
    // })
  ]
})