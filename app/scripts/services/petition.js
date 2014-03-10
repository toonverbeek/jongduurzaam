/**
 * Created by qynox on 3/10/14.
 */

'use strict';
app.factory('Petition', function ($firebase, FIREBASE_URL) {
        var ref = new Firebase(FIREBASE_URL + '/jongduurzaam'); //create a reference to the correct database

        var petitions = $firebase(ref); //create the reference to the json object containing the petitions

        var Petition = {
            all: petitions,
            create: function (petition) {
                return petitions.$add(petition);
            },
            delete: function(petitionId){
                return petitions.$remove(petitionId);
            },
            find: function(petitionId){
                return petitions.$child(petitionId);
            },
            update: function(petitionId){

            }
        };

        return Petition;
    });