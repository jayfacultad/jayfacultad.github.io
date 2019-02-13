var user_inputs = [];
var word_score;
var score_total = 0;
var username_send;

document.getElementById("word-entry").addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode == 13) {
    // Trigger the button element with a click
    document.getElementById("submit-button").click();
  }
});


for (var row = 0; row < 5; row++) {
    for (var col = 0; col < 5; col++) {
        document.getElementById("R" + row + "C" + col).addEventListener("click", addClickedLetter, false);
    }
}

function addClickedLetter(tile) {
    var clickedItem = tile.target.id;
    var initial_subword = document.getElementById("word-entry").value;
    var new_subword = initial_subword + document.getElementById(clickedItem).innerHTML;
    document.getElementById("word-entry").value = new_subword;
    document.getElementById("word-entry").focus();
    document.getElementById(clickedItem).style.backgroundColor = "red";
}


document.getElementById("submit-button").addEventListener("click", function() {
    if (startGame == true) {

        var input_value = document.getElementById("word-entry").value;
        input_value = input_value.toUpperCase();


        var display_text;

        if ((input_value.length > 2) && boggle_answers.is_word(input_value) && !user_inputs.includes(input_value)) {   
            word_score = calculate_score(input_value.length);
            if (word_score < 10 ) {
                display_text = "<div>" + input_value + "&nbsp;&nbsp;&emsp;" + word_score + "</div>";
            }
            else {
                display_text = "<div>" + input_value + "&emsp;" + word_score + "</div>";
            } 
        }
        else {
            word_score = 0;
            display_text = "<div style='color:red'>" + input_value + "&nbsp;&nbsp;&emsp;" + word_score + "</div>";
        }

        score_total += word_score;
        document.getElementById("score").innerHTML = score_total;

        // Add to beginning of array
        user_inputs.unshift(display_text); 
 
        // Clear input field
        document.getElementById("word-entry").value = "";
        // Display user's inputted words in word table
        document.getElementById("answer_cell").innerHTML = user_inputs.join("");            
    }
});

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
        case 4:
            word_score = 1;
            break;
        case 5: 
            word_score = 2;
            break;
        case 6: 
            word_score = 3;
            break;
        case 7: 
            word_score = 5;
            break;
        default:
            word_score = 11;
            break;
    }

    return word_score;
}


