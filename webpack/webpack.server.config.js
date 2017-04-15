const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')


module.exports = {
  // Punto de entrada de webpack. Primer archivo que leera
  entry: './source/server.js',
  // Indica donde webpack dejara los archivos resultantes
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../built/server')
  },
  // modulos permiten hacer cosas
  module: {
    // formas que webpack puede tomar tipos de archivos y procesarlos de una forma particular
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        // Informacion de como configurar babel
        query: {
          // preset en babel son conjuntos de plugins. Consultar doc: https://babeljs.io/docs/plugins/
          presets: ['latest-minimal', 'react']
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?modules',
        })
      },
    ]
  },
  // target de compilacion es node para usar sus modulos nativos
  target: 'node',
  plugins: [
    new ExtractTextPlugin('../statics/styles.css')
  ],
}
