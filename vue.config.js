import webpack from 'webpack';

export default {
  title: 'vue-prototype',
  template: "src/template.html",
  resolve: true,
  babel(opts) {
    return {
      presets: [["es2015", {"modules": false}], "stage-2"],
      ...opts
    }
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
