'use strict';

app.controller('PetitionCtrl', function($scope, $location, $anchorScroll, Petition) {
    $scope.petition = {name: '', email: '', text: ''};
    $scope.petitions = Petition.all;
    $scope.amountOfPetitions = $scope.petitions.$getIndex();
    $scope.randomPetitions = [];

    $scope.petitions.$on("loaded", function() {
        var keys = Object.keys($scope.petitions);
        keys = shuffle(keys);
        var idx = 0;
        var hasData = true;
        while (hasData) {
            var data = $scope.petitions[keys[idx]];
            if (data) {
                if (data.toString().indexOf('function') && data.toString().indexOf('jongduurzaam')) {
                    $scope.randomPetitions.push(data);
                }
                idx++;
            }
            else {
                hasData = false;
            }
        }

//        for (var i = 0; i < 8; i++) {
//            if ($scope.petitions[keys[i]].toString().indexOf('function') === -1 && $scope.randomPetitions.indexOf($scope.petitions[keys[i]]) === -1) {
//                $scope.randomPetitions[i] = $scope.petitions[keys[i]];
//                console.log($scope.petitions[keys[i]])
//                
//            }
//        }

//        while (arr.length < 8) {
//            var randomnumber = Math.ceil(Math.random() * $scope.amountOfPetitions.length)
//            var found = false;
//            for (var i = 0; i < arr.length; i++) {
//                if (arr[i] === randomnumber) {
//                    found = true;
//                    break
//                }
//            }
//            if (!found) {
//                arr[arr.length] = randomnumber;
//                console.log(randomnumber);
//            }
//        }
//        for(var x =0; x < 8; x++){
//            var counter = arr[x];
//            console.log($scope.petitions.$getIndex()[counter]);
//            $scope.randomPetitions[x] = $scope.petitions.$getIndex()[counter];
//        }
    });

    $scope.petitions.$on("change", function() {
        $scope.amountOfPetitions = $scope.petitions.$getIndex();

    });

    function shuffle(o) {
        for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x)
            ;
        return o;
    }


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
                $scope.successsful = true;
                $scope.petition = {name: '', email: '', text: ''};
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

    };

    $scope.goToElement = function(navitem, category) {
        //$('.active').toggleClass('active');
        //document.getElementById(navitem).className = 'active';
        $location.hash(category);
        $anchorScroll();
    };

});
