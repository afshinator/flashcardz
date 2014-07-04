/*
 
    Please first read my conventions / terminology / description :

        Flashcardz can have multiple users,
        each user can have multiple sets of flashcards.
        Flashcards have two sides, a front and a back,
        You enter the contents of what you're trying to learn on the front,
        either some text, HTML, or url reference, (more to come?) 
        And you put the contents of what amounts to as the answer,in the back.


        fcards     - flashcards, I use it in comments.
        _varName    - underscroed var names are essentially the private variables of the object they are created in.

*/



var fcardz = (function ($, my) {

    'use strict';


    // GLOBAL CONSTANTS
    var DEFAULT_QUIZ_VALUE = 1;         // Used for quiz scoring 


    /*
        Polyfill for older browsers so I can use Object.create();
        Object.create() available in IE9+, Ffox 4+, Safari 5+, and Chrome 5+
    */
    if (!Object.hasOwnProperty('create')) {
        Object.create = function (parentObj) {
            function tmpObj() {}
            tmpObj.prototype = parentObj;
            return new tmpObj();
        };
    }
    if (!Object.hasOwnProperty('defineProperties')) {
        Object.defineProperties = function (obj, props) {
            for (var prop in props) {
                Object.defineProperty(obj, prop, props[prop]);
            }
        };
    }


    /*
        userManager - Keeps track of who the current user is, and if the current user 
            changes, it updates the display of flashcards.
    */
    my.userManager = function() {
        var currentUser = '';
        var allUsers = [];                                  // Will hold a list of strings

        var setCurrentUser = function( who ) {
            currentUser = who;

            my.treeView.viewUsersCards( currentUser, my.cardManager.getAllCards() );   // Show all fcards for newly selected user
        };


        var getCurrentUser = function( who ) {
            return currentUser;
        };


        var setAllUsers = function( all ) {
            allUsers = all;
            my.usersListView.setAllUsers( allUsers );
        };


        return {
            setAllUsers: setAllUsers,
            setCurrentUser : setCurrentUser,
            getCurrentUser : getCurrentUser
        };

    }();



    return my;
}(jQuery, fcardz || {}));