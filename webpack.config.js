const path = require('path')

module.exports = (env, argv) => ({
  entry: {
    'nisgl-ts': './src/index.ts',
    '../example/bundle': './example/example.js'
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
    publicPath: '/example/',
    openPage: 'example/index.html',
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
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: path.resolve('./src/', 'index.html'),
    //   filename: 'index.html'
    // })
  ]
})