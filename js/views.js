/*
    Flashcardz - by Afshin Mokhtari

    view.js      - All UI and interaction code should be in here.
                    There is a cardView that deals with showing fcards and handling the checkbox, 
                    there is a userListView that manages the top nav menu Users dropdown,
                    a tree View that manages parsing fcard list data to show the sidebar tree
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
        var $newCardOptions = $cardPane.find( '#newCardOptions');


        // Set up handling clicks on the 'Show front side only' checkbox
        $('#checkbox-front-only').change(function() {
            bShowFrontOnly = $( this ).is( ':checked' );
            console.log( 'bShowFrontOnly : ' + bShowFrontOnly );
            if ( bShowFrontOnly ) {
                $back.css('display', 'none');
            } else {
                $back.css('display', 'block');
            }
        });



        var showCard = function ( cardIndex ) {
            $front.html( my.cardManager.getFrontText( cardIndex ) );
            $back.html ( my.cardManager.getBackText( cardIndex ) );
            $newCardOptions.css('display', 'none');
        };

        var clear = function() {
            $front.html('');
            $back.html('');
            $newCardOptions.css('display', 'block');
        };

        return {
            showCard : showCard,
            clear : clear
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
        treeView() - Manages showing the sets and fcard in the tree on the sidebar,
            also delegates clicks on one of the fcards.

            The 'bootstrap-treeview' comes courtesy of https://github.com/jonmiles/bootstrap-treeview
    */

    my.treeView = function() {
        var $username = $( '#username' );
        var $treeContainer = $( '#treeContainer' );      

        // set up event handler for clicks in treebox
        $treeContainer.on('nodeSelected', function(event, node) {
            console.log ( 'Tree node pressed :' + node.text );

            if ( node.icon.indexOf('flash') !== -1 ) {                  // Only show card contents when click is on fcard
                my.cardsView.showCard( my.cardManager.getIndex( node.text ) );
            }
        });



        // Display this users fcard info into the tree.   
        // Has to parse the cardList to make a data structure the treeview understands.
        // TODO:  Needs refactoring.  The code here is written to keep my head clear about the details of
        //  the algorithm;  not for efficiency or terseness.
        var viewUsersCards = function( username, cardList ){
            var thisUsersCards = [];

            $username.text( username + "'s cards:" );                   // Show user associated with sets, and their fcards


            // First just get a list of all user passed in's cards in thisUsersCards
            for ( var i = 0; i < cardList.length; i++ ) {
                if ( cardList[ i ].user === username ) {
                    thisUsersCards.push( cardList[ i ] );
                }
            }

            var sortedBySet = {};

            // Now just create an empty list for each set in sortedBySet
            for ( i = 0; i < thisUsersCards.length; i++ ) {
                sortedBySet[ thisUsersCards[ i ].set ] = [];     
            }

            // Go through list again and add fcards to appropriate set
            for ( i = 0; i < thisUsersCards.length; i++ ) {
                sortedBySet[ thisUsersCards[ i ].set ].push( thisUsersCards[ i ].title );     
            }

            // SortedBySet is now an object that, for this user, keys are the sets names, 
            // values are an array of flashcard titles.

            // Now to turn sortedBySet into an object the tree widget can chew on
            var displayable = [];
            var tempObj = {};

            for ( var key in sortedBySet ) {            // for each set
                tempObj.text = key;                     // the name of the sets (folders)
                tempObj.icon = "glyphicon glyphicon-folder-close";  // bootsstrap folder icon
                tempObj.nodes = [];             // for attached fcards to this set

                for ( i = 0; i < sortedBySet[ key ].length; i++ ) {
                    tempObj.nodes.push( { 
                            icon: "glyphicon glyphicon-flash",
                            text: sortedBySet[ key ][ i ]
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