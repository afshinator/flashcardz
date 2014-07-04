/*
 
    storage.js    - Saving and retrieving all the flashcards (to localStorage),
                    If there is no pre-saved data, seed app with some starter data.


    Please first read my conventions / terminology / description in app.js.

*/



var fcardz = (function ($, my) {

    'use strict';

    my.test = storage.get('fcardz');



    /*
        Check to see if localStorage is available,
        if so, load in saved flashcards
        if not, or if nothing saved, seed app with some hardcoded data
    */

    my.store = function() {
        var bSupportsLocalStorage;

        // Check to see if we have access to localStorage
        var supports_html5_storage = function() {
            try {
                return 'localStorage' in window && window['localStorage'] !== null;
            } catch (e) {
                console.log('localStorage not available.')
                return false;
            }
        };


        // First thing we do is check localstorage and get the data if there is any
        var init = function() {
            var data;

            bSupportsLocalStorage = supports_html5_storage();

            if ( bSupportsLocalStorage ) { data = storage.get( 'fcardz' ); }

            my.cardManager.setAllCards( data );
        };



        init();         

        return {
            bSupportsLocalStorage : bSupportsLocalStorage
        };

    }();


    return my;
}(jQuery, fcardz || {}));