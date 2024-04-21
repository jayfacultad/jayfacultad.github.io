var user_inputs = [];
var word_score = 0;
var score_total = 0;
var username_send;

// Variables to track touch start position
let touchStartX = 0;
let touchStartY = 0;
let previouslySwipedTile = '';
let wordFromSwipe = '';

function startup() {
  const board = document.getElementById("board");
  board.addEventListener("touchend", handleTouchEnd);
  board.addEventListener("touchcancel", handleTouchEnd);
}

document.addEventListener("DOMContentLoaded", startup);

function handleTouchEnd(evt) {
    if(startGame){
        submitWord();
    }
    
}

// Add touch event listeners to all divs with class "swipe-div"
const swipeDivs = document.querySelectorAll('.swipe-div');
swipeDivs.forEach(div => {
    div.addEventListener('touchstart', handleTouchStart);
    div.addEventListener('touchmove', handleTouchMove);
    div.setAttribute('visited', 'false');
});

// Function to handle touch start event
function handleTouchStart(event) {
    if(startGame){
        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
    }
}

// Function to handle touch move event
function handleTouchMove(event) {
    if(!startGame){
        return;
    }
    const touchMoveX = event.touches[0].clientX;
    const touchMoveY = event.touches[0].clientY;

    // Check if the touch move event occurs within the div
    swipeDivs.forEach(div => {
        const rect = div.getBoundingClientRect();
        if (
            touchMoveX >= rect.left &&
            touchMoveX <= rect.right &&
            touchMoveY >= rect.top &&
            touchMoveY <= rect.bottom
        ) {
            var selectedTile = document.getElementById(div.id);

            let currentSwipedTile = div.id.replace('tile-','');
            let currentSwipedTileRow = Number(currentSwipedTile[1]);
            let currentSwipedTileCol = Number(currentSwipedTile[3]);


            if(previouslySwipedTile != '' && selectedTile.getAttribute('visited') == 'false'){
                let previouslySwipedTileRow = Number(previouslySwipedTile[1]);
                let previouslySwipedTileCol = Number(previouslySwipedTile[3]);
                
                if((currentSwipedTileRow == previouslySwipedTileRow || currentSwipedTileRow + 1 == previouslySwipedTileRow || currentSwipedTileRow - 1 == previouslySwipedTileRow) 
                   && (currentSwipedTileCol == previouslySwipedTileCol || currentSwipedTileCol + 1 == previouslySwipedTileCol || currentSwipedTileCol - 1 == previouslySwipedTileCol)) {
                    selectedTile.style.background = "orange";
                    selectedTile.style.color = "white";
                    selectedTile.setAttribute('visited', 'true');
                    previouslySwipedTile = currentSwipedTile;
                    wordFromSwipe += document.getElementById(div.id.replace('tile-','')).innerHTML;
                    document.getElementById("word-entry").innerHTML = wordFromSwipe.toUpperCase();
                }
            } else if(wordFromSwipe == '')  {
                selectedTile.style.background = "orange";
                selectedTile.style.color = "white";
                selectedTile.setAttribute('visited', 'true');
                previouslySwipedTile = currentSwipedTile;
                wordFromSwipe += document.getElementById(div.id.replace('tile-','')).innerHTML;
                document.getElementById("word-entry").innerHTML = wordFromSwipe.toUpperCase();
            } 
        }
    });
}


document.getElementById("word-entry").addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode == 13) {
    // Trigger the button element with a click
    submitWord();
  }
});

/*
for (var row = 0; row < 5; row++) {
    for (var col = 0; col < 5; col++) {
        document.getElementById("R" + row + "C" + col).addEventListener("click", addClickedLetter, false);
    }
}
*/

function addClickedLetter(tile) {
    var clickedItem = tile.target.id;
    var initial_subword = document.getElementById("word-entry").innerHTML;
    var new_subword = initial_subword + document.getElementById(clickedItem).innerHTML;
    document.getElementById("word-entry").innerHTML = new_subword;
    //document.getElementById("word-entry").focus();
}


function submitWord() {
    if (startGame == true) {
    
        var input_value = document.getElementById("word-entry").innerHTML;
        if(input_value == "&NBSP;"){
            input_value = "";
        }
        input_value = input_value.toUpperCase();

        try{
            console.log("Submitted Word: " + input_value + ". Is word? " + boggle_answers.is_word(input_value));
        }catch(e){
            console.log(e);
        }

        var display_text;
        word_score = 0;

        if ((input_value.length > 2) && boggle_answers.is_word(input_value) && !user_inputs.includes(input_value)) {   
            word_score = calculate_score(input_value.length);
            if (word_score < 10 ) {
                display_text = "<div>" + word_score + "&nbsp;&nbsp;&emsp;" + input_value + "</div>";
            }
            else {
                display_text = "<div>" + word_score + "&emsp;" + input_value  + "</div>";
            } 

            document.getElementById("board").style.backgroundColor = "green";
            document.getElementById("board").style.border = "5px solid green";
            setTimeout(() => { 
                document.getElementById("board").style.backgroundColor = "#398BD4"; 
                document.getElementById("board").style.border = "5px solid #FFCA08";
            }, 150);

        }
        else if(!input_value.includes("&NBSP;")) {
            word_score = 0;
            display_text = "<div style='color:red'>" + word_score + "&nbsp;&nbsp;&emsp;" + input_value + "</div>";

            document.getElementById("board").style.backgroundColor = "crimson";
            document.getElementById("board").style.border = "5px solid crimson";
            setTimeout(() => { 
                document.getElementById("board").style.backgroundColor = "#398BD4"; 
                document.getElementById("board").style.border = "5px solid #FFCA08";
            }, 150);
        }

        score_total += word_score;
        document.getElementById("score").innerHTML = "CURRENT SCORE: " + (isNaN(score_total) ? "0" : score_total);

        // Add to beginning of array
        user_inputs.unshift(display_text); 
 
        // Clear input field
        document.getElementById("word-entry").innerHTML = "&nbsp;";
        // Display user's inputted words in word table
        document.getElementById("word_bank").innerHTML = user_inputs.join("");

        // Reset Tile Colors
        const swipeDivs = document.querySelectorAll('.swipe-div');
        swipeDivs.forEach(div => {
            div.style.background = "gainsboro";
            div.style.color = "black";
        });

        // Reset word obtained from swipe
        wordFromSwipe = '';
        previouslySwipedTile = '';
        let divsForSwipe = document.querySelectorAll('.swipe-div');
        divsForSwipe.forEach(div => {
            div.setAttribute('visited', 'false');
        });
    }
};

document.getElementById("usernameField").addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode == 13) {
    // Trigger the button element with a click
    document.getElementById("username").click();
  }
});


document.getElementById("username").addEventListener("click", function() {
    document.getElementById("results-container").style.display = "none";
    username_send = document.getElementById("usernameField").value;
    sendData();
});


function sendData() {

        jQuery.ajax({
        method: "POST",
        url: "https://frozen-hamlet-64285.herokuapp.com/submit",
        data: {
                username:       username_send,
                score:          score_total
        },
        // Popup for top 3 scores
        success: function(data) {
                var extractData = JSON.stringify(data);
                extractData = JSON.parse(extractData);
                var popupContent = "TOP TEN SCORES\n\n";
                for (var i = 0; i < 10; i++) {
                        popupContent += (i+1) + ". " + extractData[i].username + " (Score: " + extractData[i].score + ") " + extractData[i].created_at + "\n";
                };
                alert(popupContent);
        }
        });
}

function calculate_score(word) {
    
    switch(word) {
        case 3:
            word_score = 1;
            break;
        case 4:
            word_score = 2;
            break;
        case 5: 
            word_score = 5;
            break;
        case 6: 
            word_score = 10;
            break;
        default:
            word_score = 20;
            break;
    }

    return word_score;
}


