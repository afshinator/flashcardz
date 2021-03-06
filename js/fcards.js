/*
    Flashcardz - by Afshin Mokhtari

    fcards.js      - Manages flashcards data structs, creation and use, 
                    also seed data for app.
*/


var fcardz = (function ($, my) {

    'use strict';


    /* 
        'content' object will hold all the stuff that we'll be able to put on
        one side of a flashcard.    A flashcard has two of these objects.
    */
    var content = {
        text : '',              // This can be filled with plain text, or HTML 
        url : ''                // TODO: more stuff?
    };



    /*
        cardManager - Deals with creating flashcards and storing, retrieving all its data
                which includes information about the user and set associated with each fcard.

    */
    my.cardManager = function() {
        var _allCards = [];                                     // Will hold all fcards
        var DEFAULT_QUIZ_VALUE = 1; 

        var modifyFcard = function ( fcard, props ) {
            for (var prop in props) {
                fcard.prop = props.prop;
            }
        };


        /* makeNewFcard - Make new fcard, add it to the list. 
            props passed in via parameter can hold values to use or defaults are used for value and title.
            Returns index in _allCards[] to newly created fcard.
         */
        var makeNewFcard = function( props ) {
            var flashcard = {};
            var newLength = 0;                              // once new fcard is saved _allCards, will hold length of _allCards list

            // Each fcard has a front and a back side
            flashcard.front = Object.create( content );
            flashcard.back = Object.create( content );      

            if ( ! props.value ) { props.value = DEFAULT_QUIZ_VALUE; }           // Each fcard has a rating used for grading quizzes
            if ( ! props.title ) { props.title = "default"; }                   // Each fcard has a title

            modifyFcard( flashcard, props );                // Add all the properties passed in
 
            newLength = _allCards.push( flashcard );        // Put it on list of all cards

            return newLength - 1;                           // Return index to new flashcard
        };


        var getFrontText = function( index ){
            return _allCards[ index ].front.text;           // Dig into fcards front contents, return it
        };

        var getBackText = function( index ) {
            return _allCards[ index ].back.text;
        };


        // Go through all fcards and return a list of all users
        var getAllUsers = function() {                      
            var result = [];
            for ( var i = 0; i < _allCards.length; i++ ) {
                if ( result.indexOf( _allCards[i].user ) === -1 ) {
                    result.push( _allCards[i].user );
                }
            }

            return result;
        }


        /* Used to fill up the user list;  either with real data if localstorage has some,
            or seed data if not.  
            Messages User manager to give it all usernames and set current user to first one in the list.
            Sends Tree view message to display this users sets and cards.
        */
        var setAllCards = function( data ) {
            var everyUser = [];

            if ( ! data ) {
                console.log("No fcardz data in localstorage.");
                _allCards = getSeedData1();         // Some hardcoded sample data if there is no data in localstorage
            }
            else {
                _allCards = data;
            }

            everyUser = getAllUsers();
            my.userManager.setAllUsers( everyUser );
            my.userManager.setCurrentUser ( everyUser[0] );
            my.treeView.viewUsersCards( everyUser[0], _allCards );     // TODO: have to also set focus on 1st fcard in tree, then display fcard
        };



        var getAllCards = function( ) {
            return _allCards;
        };


        /*  Return the index of where in _allCards the current users card with the passed in title is.
        */
        var getIndexOfCurrentUsersCard = function( title ) {
            var currentUser = my.userManager.getCurrentUser();

            for ( var i = 0;  i < _allCards.length; i++ ) {
                if ( _allCards[ i ].user === currentUser && _allCards[ i ].title === title ) {
                    return i;
                }
            }
        };


        return {
            makeNewFcard: makeNewFcard,
            setAllCards: setAllCards,
            getAllCards : getAllCards,
            getAllUsers: getAllUsers,
            getFrontText: getFrontText,
            getBackText: getBackText,
            getIndex: getIndexOfCurrentUsersCard
        };

    }();



    /* getSeedData1 - 
        The card manager will use this to seed the app if there is nothing in localStorage.
     */
    function getSeedData1() {
        var data = 
            [
                {   
                    set: 'Deep Thoughts',
                    user: 'Afshin',
                    title: 'Zen',
                    value: 2,
                    front: { text: '<h1 class="text-warning">True of False: Superman was born on Trypkon?</h1>' },
                    back: { text: '<strong>A: To be or not to be.</strong><p>According to Christopher Heumann, an 18th-century scholar, pseudo-philosophy has six characteristics:</p><ol>'
                        + '<li>A preference for useless speculation</li>'
                        + '<li>It appeals merely to human authority</li>'
                        + '<li>It appeals to tradition instead to reason</li>'
                        + '<li>It syncretises philosophy with superstition</li>'
                        + ' <li>It has a preference for obscure and enigmatic language and symbolism</li>'
                        + '<li>It is immoral</li>'
                        + '</ol>' }
                },
                {
                    set: 'Deep Thoughts',
                    user: 'Afshin',
                    title: 'Pecking wood',
                    value: 5,
                    front: { text: '<h2>How much wood would a woodpecker peck if a woodpecker could peck wood?</h2>' },
                    back: { text: '<img src="http://0.tqn.com/d/birding/1/G/-/E/-/-/pileated.jpg" style="float:right; margin: 5px" alt="pileated woody">'
                        + '<strong>A: pecks per minute * minutes spent pecking</strong>' 
                        + '<p>Many of the foraging, breeding and signaling behaviors of woodpeckers involve drumming and hammering using the bill. To prevent brain damage from the rapid and repeated impacts, woodpeckers have evolved a number of adaptations to protect the brain. These include small brain size, the orientation of the brain within the skull (which maximises the area of contact between the brain and the skull) and the short duration of contact. The millisecond before contact with wood a thickened nictitating membrane closes, protecting the eye from flying debris. The nostrils are also protected; they are often slit-like and have special feathers to cover them. Woodpeckers are capable of repeated pecking on a tree at high decelerations on the order of 10,000 m/s<sup>2</sup> (1000 g).</p>'
                        }
                },
                {
                    set: 'The departed',
                    user: 'Afshin',
                    title: 'E. S. Grant',
                    front: { text: '<h1>Who is buried in Grants tomb?</h1>' },
                    back: { text: 'I told you, <strong>Mr. Hu.</strong>' }
                },
                {
                    set: 'javascript',
                    user: 'Afshin',
                    title: 'Globar vars',
                    front: { text: "<h1>What are global variables? How are they declared? What are the problems with using globals?</h1>" },
                    back: { text: "<p>Most JavaScript developers avoid globals.One reason why is they're "
                        + "averse to naming conflicts between local and globals,</p><p class='text-danger'>Have a looksy:</p>"
                        + '<pre>function doSomething() {<br>  this.style.color = "#cc0000";<br>}</pre>'
                         }
                },                  
                {
                    set: 'misc',
                    user: 'Tom',
                    title: 'JS this keyword?',
                    front: { text: "<h1>What is JavaScript's this keyword?</h1>" },
                    back: { text: "<p>JavaScript's this keyword normally refers to the object that owns the method, but it depends on how a function is called. Basically, it points to the currently in scope object that owns where you are in the code. When working within a Web page, this usually refers to the Window object. If you are in an object created with the new keyword, the this keyword refers to the object being created. When working with event handlers, JavaScript's this keyword will point to the object that generated the event.</p><pre>var index; <br>index = ( expression );</pre>" }
                },                
              
                {
                    set: 'the dead',
                    user: 'Dick',
                    title: 'E. S. Grant',
                    front: { text: 'Who is buried in Grants tomb?' },
                    back: { text: '<h1>Mr. Hu is buried in Grants tomb!</h1><p>He was a railroad worker.</p>' }
                },
                {
                    set: 'Things to Know',
                    user: 'Sally',
                    title: 'Excitement',
                    front: { text: '<p class="text-success"><h1>What is there to get excited about here?</h1>' },
                    back: { text: '<h3>The beauty of this...</h3><p class="text-info">Is that I can insert arbitary HTML.</p>' }
                },
            ];

        return data;
    }



    return my;

}(jQuery, fcardz || {}));