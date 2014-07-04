/*
 
    views.js    - All the UI specific code is in here


    Please first read my conventions / terminology / description in app.js.

*/



var fcardz = (function ($, my) {

    'use strict';


    /* 
        cardView - Manages showing a fcard, dealing with showing front & back sides of fcards,

    */
    my.cardsView = function( ) {
        var bShowFrontOnly;                             // Whether to show both sides of flashcard or not

        // Cache access to UI elements
        var $cardContainer = $( '#cardContainer' );       
        var $cardPane = $( '#cardPane' );
        var $front = $cardPane.find( '#front' );
        var $back = $cardPane.find( '#back' );


        // Set up handling clicks on the 'Show front side only' checkbox
        $('#checkbox-front-only').change(function() {
            bShowFrontOnly = $( this ).is( ':checked' );
            console.log( 'bShowFrontOnly : ' + bShowFrontOnly ); 
        });



        var showCard = function ( cardIndex ) {
            $front.html( my.cardManager.getFrontText( cardIndex ) );

            if ( ! bShowFrontOnly ) {
                $back.html ( my.cardManager.getBackText( cardIndex ) );
            }
        };


        return {
            showCard : showCard
        }
    }();



    /* 
        usersListView - Manages showing the list of users.  Also sets up handler for selecting a different user.
    */
    my.usersListView = function() {
        var $userList = $( '#user-list' );

        var reset = function() {
            $( '.dropdown-menu li' ).on( 'click', function( event ) {
                console.log( 'users menu : ' + $(this).text() );
                event.preventDefault();

                my.userManager.setCurrentUser( $(this).text() );
                my.treeView.viewUsersCards( $(this).text(), my.cardManager.getAllCards() );
            });
        };

        var setAllUsers = function( userList ) {
            if ( userList.length > 0 ) {
                $userList.empty();
            }

            for ( var i = 0; i < userList.length; i++ ){
                $userList.append( '<li><a href="#">' + userList[i] + '</a></li>' );
            }

            reset();
        };


        return {
            setAllUsers : setAllUsers
        };

    }();



    /*
        treeView() - Manages showing the sets and flashcards in the tree on the sidebar,
            also delegates clicks on one of the fcards.

    */

    my.treeView = function() {
        var $username = $( '#username' );
        var $treeContainer = $( '#treeContainer' );      

        // set up event handler for clicks in treebox
        $treeContainer.on('nodeSelected', function(event, node) {
            console.log ( 'node pressed ' + node.text );

            my.cardsView.showCard( my.cardManager.getIndex( node.text ) );
        });




        var viewUsersCards = function( username, cardList ){
            var thisUsersCards = [];

            $username.text( username + "'s cards:" );                   // Show user associated with sets, and their fcards


            // First just get a list of all this users cards
            for ( var i = 0; i < cardList.length; i++ ) {
                if ( cardList[ i ].user === username ) {
                    thisUsersCards.push( cardList[ i ] );
                }
            }

            var sortedBySet = {};

            // Now just create an empty list for each Set
            for ( i = 0; i < thisUsersCards.length; i++ ) {
                sortedBySet[ thisUsersCards[ i ].set ] = [];     
            }

            // Go through list again and add fcards to appropriate set
            for ( i = 0; i < thisUsersCards.length; i++ ) {
                sortedBySet[ thisUsersCards[ i ].set ].push( thisUsersCards[ i ].title );     
            }

            // SortedBySet is now an object for this user, keys are the sets, values are an array of flashcard titles.

            // Now to turn sortedBySet into an object the tree widget can chew on.
            var displayable = [];
            var tempObj = {};

            for ( var key in sortedBySet ) {
                tempObj.text = key;
                tempObj.icon = "glyphicon glyphicon-folder-close";
                tempObj.nodes = [];

                for ( i = 0; i < sortedBySet[ key ].length; i++ ) {
                    tempObj.nodes.push( { 
                            text: sortedBySet[ key ][ i ],
                            icon: "glyphicon glyphicon-flash"
                        } );
                }

                displayable.push( tempObj );

                tempObj = {};
            }

            $treeContainer.treeview( { data: displayable } );           // Fill tree in sidebar with sets and their fcards

        };

        return {
            viewUsersCards : viewUsersCards
        };

    }();



    return my;
}(jQuery, fcardz || {}));