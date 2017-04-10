const path = require('path')

module.exports = {
  // Punto de entrada de webpack. Primer archivo que leera
  entry: './source/client.js',
  // Indica donde webpack dejara los archivos resultantes
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, '../built/statics')
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
          presets: ['es2016', 'es2017', 'react'],
          plugins: ['transform-es2015-modules-commonjs']
        }
      }
    ]
  },
  // target de compilacion es node para usar sus modulos nativos
  target: 'node',
}
