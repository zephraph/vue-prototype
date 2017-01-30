import webpack from 'webpack';

export default {
  template: "src/template.html",
  resolve: true,
  entry: {
    client: './src/test.js'
  },
  mergeConfig: {
    module: {
      rules: [
        {
          test: /\.styl$/,
          use: ['style-loader', 'css-loader', 'stylus-loader']
        }
      ]
    }
  }
}
