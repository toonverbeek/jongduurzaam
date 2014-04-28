/**
 * Created by qynox on 3/10/14.
 */

'use strict';
app.factory('Petition', function($firebase, FIREBASE_URL, $rootScope) {
    var ref = new Firebase(FIREBASE_URL + '/jongduurzaam'); //create a reference to the correct database

    var petitions = $firebase(ref); //create the reference to the json object containing the petitions

    var Petition = {
        all: petitions,
        create: function(petition) {
            var keys = petitions.$getIndex();
            var exists = false;
            for (var i = 0; i < keys.length; i++) {
                console.log(petitions[keys[i]['email']]);
                if (petitions[keys[i]]['email'] === petition.email) {
                    console.log('found email key' + petition.email);
                    exists = true;
                    break;
                }
            }
            if (!exists) {
                $('#alert-placeholder-failure').hide();
                $('#alert-placeholder-success').show();

                return petitions.$add(petition);
            }
            else {
                $('#alert-placeholder-success').hide();
                $('#alert-placeholder-failure').html('Dit e-mail adres is al eens gebruikt om een boodschap te versturen.');
                $('#alert-placeholder-failure').show();
                return new Error("Dit e-mail adres staat al geregistreerd in ons systeem!");
            }
        },
        delete: function(petitionId) {
            return petitions.$remove(petitionId);
        },
        find: function(petitionId) {
            return petitions.$child(petitionId);
        },
        update: function(petitionId) {

        }
    };

    return Petition;
});



function escapeEmailAddress(email) {
    if (!email)
        return false;

    // Replace '.' (not allowed in a Firebase key) with ','
    email = email.toLowerCase();
    email = email.replace(/\./g, ',');
    return email;
}