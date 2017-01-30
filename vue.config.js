import webpack from 'webpack';

export default {
  // template: "src/template.html",
  resolve: true,
  hot: ['client', 'test'],
  entry: {
    client: './src/index.js',
    test: './src/test/index.js',
  },
  templates: [
    {
      title: 'vue-prototype',
      excludeChunks: ['test'],
      template: './src/template.html'
    },
    {
      title: 'test',
      excludeChunks: ['client'],
      filename: 'test.html',
      template: './src/test/template.html'
    }
  ],
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
