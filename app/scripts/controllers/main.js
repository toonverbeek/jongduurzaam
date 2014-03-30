'use strict';

app.controller('PetitionCtrl', function($scope, Petition) {
    $scope.petition = {name: '', email: '', text: ''};
    $scope.petitions = Petition.all;
    $scope.amountOfPetitions = $scope.petitions.$getIndex().length;
    $scope.submit = function() {
        Petition.create($scope.petition).then(function(ref) {
            //todo: reroute to correct page.

            console.log($scope.petitions.count() + ' have already signed up.');
            $scope.successsful = true;
            $scope.petition = {name: '', email: '', text: ''};
            $scope.amountOfPetitions = $scope.petitions.$getIndex().length;
            console.log(Petition.all.$getIndex().length);
        });

    };

    $scope.init = function() {
        $scope.amountOfPetitions = $scope.petitions.$getIndex().length;

    };

});
