module.exports = {
  components: {
    src: [
      '<%= componentsPath %>/angular/angular.min.js',
      '<%= componentsPath %>/angular-ui-router/release/angular-ui-router.min.js',
      '<%= componentsPath %>/angular-bootstrap/ui-bootstrap.min.js',
      '<%= componentsPath %>/lodash/dist/lodash.min.js'
    ],
    dest: '<%= jsPath %>/components.js'
  },
  dev: {
    options: {
      process: function(src, filepath) {
        return '\n// ' + filepath + '\n' + src;
      }
    },
    src: [
      '<%= jsPath %>/app/states/states_module.js',
      '<%= jsPath %>/app/states/*.js',
      '<%= jsPath %>/app/nav/nav_module.js',
      '<%= jsPath %>/app/nav/*.js',
      '<%= jsPath %>/app/assessment/assessment_module.js',
      '<%= jsPath %>/app/assessment/*.js',
      '<%= jsPath %>/app/templates_module.js',
      '<%= jsPath %>/app/main_module.js',
      '<%= jsPath %>/app/**/*.js'
    ],
    dest: '<%= jsPath %>/app.js'
  }
};