var webpack = require('webpack');

module.exports = {
  rules: [
    {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {
          'js': 'babel-loader!',
          'scss': 'vue-style-loader!css-loader',
          'sass': 'vue-style-loader!css-loader',
          'css': 'vue-style-loader!css-loader!postcss-loader',
          'style': 'vue-style-loader',
          'less': 'vue-style-loader!css-loader'
        }
      }
    },
    {
      test: /\.(css|less|scss|sass)$/,
      use: ['style-loader', 'css-loader?modules&localIdentName=[name]_[local]_[hash:base64:5]', 'postcss-loader']
    },
    // {
    //   test: /\.(png|jpg|jpeg|gif|svg)$/,
    //   use: 'file-loader?limit=8192&name=[hash].[ext]'
    // },
    {
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2?|eot|ttf|otf)(\?.*)?$/,
      use: 'url-loader?limit=8192&name=[hash].[ext]'
    }
  ],
  extensions: ['.js', '.vue', '.less', '.scss', '.css', 'sass'],
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: () => {
          return [
            require('precss'),
            require('postcss-mixins'),
            require('postcss-extend')
          ]
        }
      }
    }),
  ]
};
