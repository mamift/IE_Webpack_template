
/** https://github.com/webpack-contrib/extract-text-webpack-plugin */
var ExtractTextPlugin = require('extract-text-webpack-plugin')
/** https://github.com/webpack-contrib/uglifyjs-webpack-plugin */
var UglifyJSPlugin = require('uglifyjs-webpack-plugin')

var os = require('os')

var extractSass = new ExtractTextPlugin({
  filename: './dist/styles.css'
  // filename: '[name].[contenthash].css'
  // disable: process.env.NODE_ENV === 'development'
})

var windowsNpmGlobalModules = os.homedir() + '\\AppData\\Roaming\\npm\\node_modules'
var windowsYarnGlobalModules = os.homedir() + '\\AppData\\Local\\Yarn\\Data\\global\\node_modules'
console.info('Resolving NPM global modules from: ' + windowsNpmGlobalModules)
console.info('Resolving Yarn global modules from: ' + windowsYarnGlobalModules)

module.exports = {
  entry: [
    './src/main.ts'
  ],
  output: {
    filename: './dist/app.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: [windowsNpmGlobalModules, windowsYarnGlobalModules, '.\\node_modules']
  },
  resolveLoader: {
    modules: [windowsNpmGlobalModules, windowsYarnGlobalModules, '.\\node_modules']
  },
  // Source maps support ('inline-source-map' also works)
  devtool: 'source-map',
  module: {
    // Add the loader for .ts files.
    loaders: [
      {
        test: /\.tsx?$/,
        loaders: ['babel-loader', 'ts-loader'],
        exclude: [/node_modules/, windowsNpmGlobalModules, windowsYarnGlobalModules]
      },
      {
       test: /\.scss$/,
       use: extractSass.extract(
        {
          use: [
            // { loader: 'style-loader'}, /* Inject compiled SCSS into a <style> tag in index.html */
            { loader: 'css-loader', options: { sourceMap: true } }, /* Will generate a separate css file. */
            {
              loader: 'sass-loader',
              options: {
                includePaths: ['src/scss'],
                outputStyle: 'compressed',
                sourceComments: false,
                sourceMap: true
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    extractSass,
    new UglifyJSPlugin({
      sourceMap: true,
      compress: {
        dead_code: false,
        drop_debugger: false
      }
    })
  ]
}