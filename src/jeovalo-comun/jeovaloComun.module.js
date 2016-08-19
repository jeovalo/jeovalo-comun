(function (angular) {

  // Create all modules and define dependencies to make sure they exist
  // and are loaded in the correct order to satisfy dependency injection
  // before all nested files are concatenated by Gulp

  // Config
  angular.module('jeovaloComun.config', [])
      .value('jeovaloComun.config', {
          debug: true
      });

  // Modules
  angular.module('jeovaloComun.directives', []);
  angular.module('jeovaloComun.filters', []);
  angular.module('jeovaloComun.services', []);
  angular.module('jeovaloComun',
      [
          'jeovaloComun.config',
          'jeovaloComun.directives',
          'jeovaloComun.filters',
          'jeovaloComun.services',
          'ngSanitize'
      ]);

})(angular);
