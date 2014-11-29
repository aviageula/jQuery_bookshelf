var Book = function (bookName, authorName, score, id) {
    this.bookName = bookName;
    this.authorName = authorName;
    this.score = score;
    this.id = id;
};
/*make a global construct object for the books*/

var booksArray = [];
/*make a global array for the boks*/

var theNewBook;
//make the object to global

$(document).ready(function () {

    function showInputs() {
        $("div.inputBookContainer").slideToggle(700);
        if ($("#showTheInputs").text() == "+") {
            $("#showTheInputs").text("-").removeClass("theButtonToShowInputs").addClass("theButtonToHideInputs");
        } else {
            $("#showTheInputs").text("+").removeClass("theButtonToHideInputs").addClass("theButtonToShowInputs");
        }
    }
    /*slideToggle the inputs and change the button*/

    function makeObgect() {
        var bookName = $(".inputBookContainer input:nth(0)").val();
        var authorName = $(".inputBookContainer input:nth(1)").val();
        var score = $(".inputBookContainer input:nth(2)").val();
        var booksId = "book_" + new Date().getTime();
        theNewBook = new Book(bookName, authorName, score, booksId);
        booksArray.push(theNewBook);//add the object to the array
    }
    /*function that puts the values inside the object
    and push the object to the array*/

    function makeDivAndPutIndsideText(theText) {
        var theDiv = $("<div>");
        theDiv.text(theText);
        return theDiv;
    }
    /*function that make a jQuery div element and giv him a text*/

    function deleteLiFromArray(theButton) {
        for (var i = 0; i < booksArray.length; i++) {
            var theLiElement = $("#" + theButton.parent().attr("id"));
            var theId = theLiElement.attr("id");
            if (booksArray[i].id.indexOf(theId) > -1) {
                booksArray.splice(i, 1);
                break;
            }
        }
    }
    /*loops all over the array.if it found item with this id - make splice on this index*/

    function resetAllAildes() {
        $(".inputBookContainer input:nth(0)").val("");
        $(".inputBookContainer input:nth(1)").val("");
        $(".inputBookContainer input:nth(2)").val("");
    }
    /*make reset to all inputs fildes*/

    function validationBeforeMakeList() {
        if (($(".inputBookContainer input:nth(0)").val().trim().length < 1)) {
            alert("please enter book name");
            $(".inputBookContainer input:nth(0)").focus();
        } else if ($(".inputBookContainer input:nth(1)").val().trim().length < 1) {
            alert("please enter author name");
            $(".inputBookContainer input:nth(1)").focus();
        } else if (!($(".inputBookContainer input:nth(2)").val() >= 1 && $(".inputBookContainer input:nth(2)").val() <= 10)) {
            alert("please enter a number between 1 - 10");
            $(".inputBookContainer input:nth(2)").select();
        } else {
            makeListFromObject(theNewBook);
        }
    }
    /*make sure that all the inputs are validition*/

    function makeListFromObject(object) {
        var divName = makeDivAndPutIndsideText(object.bookName);
        var divAuthor = makeDivAndPutIndsideText(object.authorName);
        var divScore = makeDivAndPutIndsideText(object.score);
        var deleteButton = $("<button>").text("x").on("click", function () {
            deleteLiFromArray(deleteButton);
            $("#" + deleteButton.parent().attr("id")).remove();
        });
        var newLi = $("<li>").append(divName, divAuthor, divScore, deleteButton).attr("id", theNewBook.id);
        $("ul").append(newLi);
        resetAllAildes();
    }
    /*take object, make from it li, giv id to the li and append the li to the ul*/

    $("#showTheInputs").on("click", showInputs)//in click call to showInputs

    $("#addBook").on("click", function () {
        makeObgect();//in click call to makeObject
        validationBeforeMakeList();//make the validation and then make list from theNewBook
    });

});

