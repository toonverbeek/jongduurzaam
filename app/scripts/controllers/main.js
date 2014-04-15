'use strict';

app.controller('PetitionCtrl', function($scope, $location, $anchorScroll, Petition) {
    $scope.petition = {name: '', email: '', text: ''};
    $scope.petitions = Petition.all;
    $scope.amountOfPetitions = $scope.petitions.$getIndex().length;
    $scope.submit = function() {
        if ($scope.petition.name !== '' && $scope.petition.email !== '' && $scope.petition.email.indexOf('@') !== -1 && $scope.petition.email.indexOf('.') !== -1
                && $scope.petition.email.length >= 5) {
            if ($scope.petition.text.length === 0) {
                $scope.petition.text = 'Ik steun deze petitie!';
            }

            if (document.getElementById('check-email').checked) {
                $scope.petition.followup = 1;
            } else {
                $scope.petition.followup = -1;
            }
            Petition.create($scope.petition).then(function(ref) {
                //todo: reroute to correct page.

                console.log($scope.petitions.count() + ' have already signed up.');
                $scope.successsful = true;
                $scope.petition = {name: '', email: '', text: ''};
                $scope.amountOfPetitions = $scope.petitions.$getIndex().length;
                console.log(Petition.all.$getIndex().length);
            });
        } else if ($scope.petition.email.indexOf('@') === -1 || $scope.petition.email.indexOf('.') === -1 || $scope.petition.email.length < 5) {
            $('#alert-placeholder-success').hide();
            $('#alert-placeholder-failure').html('Voer een geldig e-mail adres in.');
            $('#alert-placeholder-failure').show();
        } else {
            $('#alert-placeholder-success').hide();
            $('#alert-placeholder-failure').html('Zowel je naam als e-mail adres zijn vereist.');
            $('#alert-placeholder-failure').show();
        }

    };

    $scope.init = function() {
        $scope.amountOfPetitions = $scope.petitions.$getIndex().length;

    };

    $scope.goToElement = function(navitem, category) {
        //$('.active').toggleClass('active');
        //document.getElementById(navitem).className = 'active';
        $location.hash(category);
        $anchorScroll();
    };

});
