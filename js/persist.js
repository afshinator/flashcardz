/*
    Flashcardz - by Afshin Mokhtari

    persist.js      - Saving and Retrieving all the fcards to localStorage.

*/

var fcardz = (function ($, my) {

    'use strict';


    my.store = function() {
        var bSupportsLocalStorage;

        // Check to see if browser supports localStorage
        var supports_html5_storage = function() {
            try {
                return 'localStorage' in window && window['localStorage'] !== null;
            } catch (e) {
                console.log('localStorage not available.')
                return false;
            }
        };


        // First thing we do is check localstorage and get the data,
        // send that data to CardManager.
        var init = function() {
            var data;

            bSupportsLocalStorage = supports_html5_storage();

            if ( bSupportsLocalStorage ) { 
                data = storage.get( 'fcardz' );         // storage courtesy of https://github.com/js-coder/loStorage.js
            }

            my.cardManager.setAllCards( data );
        };



        init();         

        return {
            bSupportsLocalStorage : bSupportsLocalStorage
        };

    }();


    return my;
}(jQuery, fcardz || {}));