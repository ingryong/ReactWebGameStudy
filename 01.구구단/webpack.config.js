const path = require('path');

module.exports = {
  name: 'gugudan-setting',
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
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
    ],
  },
  output: {
    // 출력
    path: path.join(__dirname, 'dist'), // path를 현재 폴더를 기준으로 만들어줌
    filename: 'app.js',
  },
};
