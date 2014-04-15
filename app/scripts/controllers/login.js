'use strict';

app.controller('LoginCtrl', function($scope, $location, $firebaseSimpleLogin, FIREBASE_URL) {
    var ref = new Firebase(FIREBASE_URL + '/jongduurzaam'); //create a reference to the correct database
    $scope.auth = $firebaseSimpleLogin(ref);
});