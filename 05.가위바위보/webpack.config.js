const path = require('path');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  name: 'rsp-setting',
  mode: 'development', // 실서비스: productoin
  devtool: 'eval',
  resolve: {
    extensions: ['.js', '.jsx'], // entry-app에 파일확장자를 넣지 않아도 여기서 정의하면 자동으로 찾아냄
  },

  entry: {
    // 입력
    app: ['./client'],
  },
  module: {
    // 적용
    rules: [
      {
        test: /\.jsx?/, // js와 jsx파일에 이 룰을 적용함
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  browsers: ['> 5% in KR'], // 한국에서 브라우저 점유율 5% 이상 지원
                },
                debug: true,
              },
            ],
            '@babel/preset-react',
          ],
          plugins: ['@babel/plugin-proposal-class-properties', 'react-refresh/babel'],
        },
      },
    ],
  },
  plugins: [new webpack.LoaderOptionsPlugin({ debug: true }), new RefreshWebpackPlugin()],
  output: {
    // 출력
    path: path.join(__dirname, 'dist'), // path를 현재 폴더를 기준으로 만들어줌
    filename: 'app.js',
    publicPath: '/dist/',
  },
  devServer: {
    hot: true,
    // 아래는 webpack-cli 4v로 업데이트 되면서 이렇게 바꿔야함
    devMiddleware: { publicPath: '/dist/' },
    static: { directory: path.resolve(__dirname) },
  },
};
