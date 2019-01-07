var user_inputs = [];

document.getElementById("word-entry").addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode == 13) {
    // Trigger the button element with a click
    document.getElementById("submit-button").click();
  }
});


document.getElementById("submit-button").addEventListener("click", function() {
    if (startGame == true) {

        var input_value = document.getElementById("word-entry").value;
        // Add to beginning of array
        user_inputs.unshift(input_value.toUpperCase());  
        // Clear input field
        document.getElementById("word-entry").value = "";
        // Display user's inputted words in word table
        document.getElementById("answer_cell").innerHTML = user_inputs.join("<br>");            
    }
});


