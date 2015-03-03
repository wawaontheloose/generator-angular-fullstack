module.exports.tasks = {
  sass: {
    server: {
      options: {
        loadPath: ['<%%= yeoman.client %>/bower_components',
          '<%%= yeoman.client %>/app',
          '<%%= yeoman.client %>/components'
        ],
        compass: false
      },
      files: {
        '.tmp/app/app.css': '<%%= yeoman.client %>/app/app.scss'
      }
    }
  }
};
