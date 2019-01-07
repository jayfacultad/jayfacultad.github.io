var user_inputs = [];

window.onload=function(){

    var input = document.getElementById("word-entry");
    input.addEventListener("keyup", function(event) {
      // Number 13 is the "Enter" key on the keyboard
      if (event.keyCode == 13) {
        // Trigger the button element with a click
        document.getElementById("submit-button").click();
      }
    });

    if (document.getElementById("submit-button")) {

        document.getElementById("submit-button").addEventListener("click", function() {
            if (startGame == true) {

                input = document.getElementById("word-entry").value;
                user_inputs.push(input);  

                // Clear input field
                document.getElementById("word-entry").value = "";

                // Display user's inputted words in word table
                document.getElementById("user_words").innerHTML = user_inputs.join("<br>");            
            }
        });
    }
}

