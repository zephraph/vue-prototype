import webpack from 'webpack';

export default {
  template: "src/template.html",
  resolve: true,
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
