'use strict';

app.controller('PetitionCtrl', function ($scope, Petition) {
        $scope.petition = {name: '', email: '', text: ''};
        $scope.petitions = Petition.all;

        $scope.submit = function () {
            Petition.create($scope.petition).then(function (ref){
                //todo: reroute to correct page.
                $scope.petition = {name: '', email: '', text:''};
            });
        };

    });
