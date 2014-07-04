/*
    Flashcardz - by Afshin Mokhtari

    app.js      - Object.create() polyfill and the user manager 


    The applications 'starts' when my.store.init() in persist.js checks localStorage for app data,
    that data consisting of all fcards which contain info about their associated users and sets,
    is sent to the cardManager in fcards.js; which sets up the users and messages to view everything.
    
*/

var fcardz = (function ($, my) {

    'use strict';


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
        userManager - Keeps track of all the users, who the current user is;
                     When the current user changes, it messages to get fcards
                     to send to views to show cards; and also messages view to
                     update the Users menu.
    */
    my.userManager = function() {
        var currentUser = '';
        var allUsers = [];                                  // Will hold a list of strings

        var setCurrentUser = function( who ) {
            currentUser = who;

            my.treeView.viewUsersCards( currentUser, my.cardManager.getAllCards() );   // Show all fcards for newly selected user
            my.cardsView.clear();
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