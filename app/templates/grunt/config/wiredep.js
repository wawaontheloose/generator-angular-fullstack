module.exports = {
  target: {
    src: '<%%= yeoman.client %>/index.html',
    ignorePath: '<%%= yeoman.client %>/',
    exclude: [
      /bootstrap-sass-official/,
      /bootstrap.js/,
      '/json3/',
      '/es5-shim/'<% if(!filters.css) { %>,
      /bootstrap.css/,
      /font-awesome.css/<% } %>
    ]
  }
};
