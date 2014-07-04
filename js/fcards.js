/*
 
    Please first read my conventions / terminology / description in app.js.

*/


var fcardz = (function ($, my) {

    'use strict';


    /* 
        'content' object will hold all the stuff that we'll be able to put on
        one side of a flashcard.    A flashcard has two of these objects.

        Minimal stuff in here right now, but ready to be filled with goodness!
    */
    var content = {
        text : '',
        url : ''
    };



    my.cardManager = function() {
        var _allCards = [];                                     // Will hold all fcards


        var modifyFcard = function ( fcard, props ) {
            for (var prop in props) {
                if (fcard.hasOwnProperty(prop)) {
                    fcard.prop = props.prop;
                }
            }
        };


        var makeNewFcard = function( props ) {
            var flashcard = {};
            var newLength = 0;

            // Each fcard has a front and a back side
            flashcard.front = Object.create( content );
            flashcard.back = Object.create( content );

            // Each fcard has a rating used for grading quizzes
            if ( ! props.value ) { props.value = DEFAULT_QUIZ_VALUE; }

            // Each fcard has a title
            if ( ! props.title ) { props.title = "default"; }

            // TODO: initialize defaults for sets and user ??

            modifyFcard( flashcard, props );                // Add all the properties passed in
 
            newLength = _allCards.push( flashcard );        // Put it on list of all cards

            return newLength - 1;                           // Return index to new flashcard
        };



        var getFrontText = function( index ){
            return _allCards[ i ].front.text;
        };

        var getBackText = function( index ) {
            return _allCards[ i ].back.text;
        };


        var setAllCards = function( data ) {
            if ( ! data ) {
                console.log("No fcardz data in localstorage.");
                _allCards = getSeedData1();                 // Some hardcoded sample data if there is no data in localstorage
            }
            else {
                _allCards = data;
            }

            my.treeView.viewUsersCards( 'tom', _allCards );     // TODO: have to also set focus on 1st fcard in tree, then display fcard
        };



        var getAllCards = function( ) {
            return _allCards;
        };


        return {
            makeNewFcard: makeNewFcard,
            setAllCards: setAllCards,
            getAllCards : getAllCards,
            getFrontText: getFrontText,
            getBackText: getBackText
        };

    }();



    function getSeedData1() {
        var data = 
            [
                {   
                    set: 'set1',
                    user: 'tom',
                    title: 'first title',
                    front: { text: 'Here is the question' },
                    back: { text: 'And backside has the answer.' }
                },
                {
                    set: 'set1',
                    user: 'tom',
                    title: 'another title',
                    front: { text: 'The most auspicious number?' },
                    back: { text: 'The answer is probably eight.' }
                },
                {
                    set: 'the dead',
                    user: 'tom',
                    title: 'E. S. Grant',
                    front: { text: 'Who is buried in Grants tomb?' },
                    back: { text: 'who knows.' }
                },
                {
                    set: 'the dead',
                    user: 'Dick',
                    title: 'E. S. Grant',
                    front: { text: 'Who is buried in Grants tomb?' },
                    back: { text: 'who knows.' }
                },
                {
                    set: 'the dead',
                    user: 'Harry',
                    title: 'E. S. Grant',
                    front: { text: 'Who is buried in Grants tomb?' },
                    back: { text: 'who knows.' }
                },
            ];

        return data;
    }



    return my;

}(jQuery, fcardz || {}));