angular.module( 'app.about', [
  'placeholders',
  'ui.bootstrap',
  'ui.router',
  'app.wait',
  'app.test'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'main.about', {
    url: '/about',
    views: {
      "main": {
        controller: 'AboutCtrl',
        templateUrl: 'about/about.tpl.html'
      }
    },
    data:{ pageTitle: 'What is It?' }
  });
})

.controller( 'AboutCtrl', function AboutCtrl( $scope ) {
  // This is simple a demo for UI Boostrap.
  $scope.dropdownDemoItems = [
    "The first choice!",
    "And another choice for you.",
    "but wait! A third!"
  ];
})

;
