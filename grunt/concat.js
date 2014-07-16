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
      '<%= jsPath %>/app/nav/nav_module.js',
      '<%= jsPath %>/app/nav/*.js',
      '<%= jsPath %>/app/settings/settings_module.js',
      '<%= jsPath %>/app/settings/*.js',
      '<%= jsPath %>/app/activity/activity_module.js',
      '<%= jsPath %>/app/activity/*.js',
      '<%= jsPath %>/app/states/states_config.js',
      '<%= jsPath %>/app/states/*.js',
      '<%= jsPath %>/app/templates_module.js',
      '<%= jsPath %>/app/main_module.js',
      '<%= jsPath %>/app/**/*.js',
    ],
    dest: '<%= jsPath %>/app.js'
  }
};