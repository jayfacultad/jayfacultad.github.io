var num_of_tiles = 25;
var startGame = false;
var timerOn = false;
var dictionary = new Trie();
var boggle_answers = new Trie();

var boggle_graph = new Graph(num_of_tiles);
var letter_array = new Array();
var answers_array = new Array();

create_dictionary();

document.getElementById("start-button").addEventListener("click", function() {
    
    if (startGame == false) {
        score_total = 0;
        document.getElementById("start-button").style.background = "#8f7a66";
        document.getElementById("start-button").innerHTML = "Stop Game";
        document.getElementById("word-entry").value = "";
        document.getElementById("word-entry").focus();
        document.getElementById("answer_cell").innerHTML = "";
        document.getElementById("submit-button").style.background = "steelblue";
        document.getElementById("score_cell").innerHTML = "Displayed when game is over";
        document.getElementById("score").innerHTML = score_total;
        
        startGame = true;
        timerOn = true;
        build_board();
        start_timer();
        create_boggle_graph();
        boggle_solver();
    }
    else if (startGame == true) {
        startGame = false;
        timerOn = false;
        document.getElementById("start-button").style.background = "steelblue";
        document.getElementById("start-button").innerHTML = "Start Game";
        document.getElementById("submit-button").style.background = "lightgray";
        user_inputs.length = 0;
    }
});

function build_board() {

    var randomNumberForDice;
    var randomNumberInEachDice;
    var tracker = new Array(num_of_tiles);
    for (var i = 0; i < num_of_tiles; i++) {
        tracker[i] = 0;
    }
    var j = 0;

    for (var row = 0; row < 5; row++) {
        board[row] = new Array(5);
        for (var col = 0; col < 5; col++) {
            var done = false;
            while (done == false) {
                randomNumberForDice = Math.floor(Math.random() * num_of_tiles);
                if (tracker[randomNumberForDice] == 0) {
                    tracker[randomNumberForDice] = 1;
                    randomNumberInEachDice = Math.floor(Math.random() * 6);
                    assignedLetter = dice[randomNumberForDice][randomNumberInEachDice];
                    if (assignedLetter == 'Q') {
                        assignedLetter = "Qu";
                    }
                    document.getElementById("R" + row + "C" + col).innerHTML = assignedLetter;
                    letter_array[j++] = assignedLetter;
                    done = true;
                }   
            }
        }
    }

    for (var i = 0; i < num_of_tiles; i++) {
        boggle_graph.add_vertex(letter_array[i]);
    }
}

function start_timer() {

    function time_remaining(endtime){
        var t = Date.parse(endtime) - Date.parse(new Date());
        var seconds = Math.floor( (t/1000) % 60 );
        var minutes = Math.floor( (t/1000/60) % 60 );

        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        return {'minutes':minutes, 'seconds':seconds};
    } 

    function run_clock(endtime) {
        var timer = document.getElementById("time-remaining");
        function update_clock() {
            var time = time_remaining(endtime);
            if (timerOn == true) {
                timer.innerHTML = "<span style='font-size:50px; color:black;'>" + time.minutes + ":" + time.seconds + "</span>";
            }
            
            if(time.minutes < 0 || timerOn == false) { 
                timer.innerHTML = "<span style='font-size:50px; color:black;'>0:00</span>";
                clearInterval(timeinterval); 
                startGame = false;
                document.getElementById("results-container").style.display = "block";
                document.getElementById("final_score").innerHTML = score_total;
                document.getElementById("usernameField").focus();
                document.getElementById("start-button").style.background = "steelblue";
                document.getElementById("start-button").innerHTML = "Start Game";
                document.getElementById("score_cell").innerHTML = "Start Game";
                document.getElementById("submit-button").style.background = "lightgray";
                answers_array.sort();
                var answer_set = new Set();
                array_length = answers_array.length;
                for (var i = 0; i < array_length; i++) {
                    answer_set.add(answers_array[i]);
                } 
                var new_answer_array = Array.from(answer_set);
                document.getElementById("score_cell").innerHTML = '<div style="text-align:left">' + new_answer_array.join("") + '</div>'; 
            }
        }
        update_clock(); // run function once at first to avoid delay
        var timeinterval = setInterval(update_clock,1000);
    }

    // 2 minutes from now
    var game_time = 2;
    var current_time = Date.parse(new Date());
    var deadline = new Date(current_time + game_time*60*1000);

    run_clock(deadline);
}

function create_dictionary() {
 
    function readTextFile(file) {
        var txtFile = new XMLHttpRequest();
        txtFile.open("GET", file, false);
        txtFile.onreadystatechange = function () {
            if(txtFile.readyState == 4) {
                if(txtFile.status == 200 || txtFile.status == 0) {
                    var array_of_words;

                    array_of_words = txtFile.responseText;
                    array_of_words = array_of_words.split("\n");
                    
                    var num_words = array_of_words.length;

                    for (var i = 0; i < num_words; i++) {
                        dictionary.insert_word(array_of_words[i]);
                    }
                }
            }
        }
        txtFile.send(null);
    }
    readTextFile('text/dictionary.txt');   
}

function create_boggle_graph() {

    // Number of rows and columns
    var row = Math.sqrt(num_of_tiles);
    var col = Math.sqrt(num_of_tiles);

    // Positions relative to the current tile.  These variables will be used
    // to determine neighbors.  Once neighbors are determined, the proper 
    // edges will be added.
    var     up = 0, down = 0, left = 0, right = 0, 
            diagonal_up_left = 0, diagonal_down_right = 0, diagonal_up_right = 0, diagonal_down_left = 0;

    // Add edges by checking if their adjacent neighboring tiles exist.
    for (var i = 0; i < num_of_tiles; i++)
    {
        if (i - row >= 0) {
            up = i - col;
            boggle_graph.add_edge(i, up);
        }

        if (i + row < num_of_tiles) {
            down = i + col;
            boggle_graph.add_edge(i, down);
        }

        if (i % col != 0) {
            left = i - 1;
            boggle_graph.add_edge(i, left); 

            if (i + (row - 1) < num_of_tiles) {
                diagonal_down_left = i + (col - 1);
                boggle_graph.add_edge(i, diagonal_down_left);
            }

            if (i - (row + 1) >= 0) {
                diagonal_up_left = i - (col + 1);
                boggle_graph.add_edge(i, diagonal_up_left);
            }
        }

        if ( (i + 1) % col != 0) {
            right = i + 1;
            boggle_graph.add_edge(i, right);

            if (i + (row + 1) < num_of_tiles) {
                diagonal_down_right = i + (col + 1);
                boggle_graph.add_edge(i, diagonal_down_right);
            }

            if (i - (row - 1) >= 0) {
                diagonal_up_right = i - (col - 1);
                boggle_graph.add_edge(i, diagonal_up_right);
            }
        }
    }
}

function boggle_solver() {

    for (var i = 0; i < num_of_tiles; i++) {
        var word = "";
        boggle_graph.clear_marks();
        DFS(i, word);
    }
}

function DFS(index, word) {

    word += letter_array[index];

    if (dictionary.is_word(word) && word.length > 2) {
        boggle_answers.insert_word(word);
        answers_array.push("<div>" + word + "</div>");
    }

    var neighbors = new Array();

    if (dictionary.is_prefix(word)) {
        // Mark as visited
        boggle_graph.mark_vertex(index);
        // Find all neighbors
        boggle_graph.get_to_vertices(index, neighbors);

        while (neighbors.length > 0) {
            // For each neighbor, perform depth first search.
            var neighbor_index = neighbors.shift();

            if (!boggle_graph.is_marked(neighbor_index)) {
                DFS(neighbor_index, word);
            }
        }
        boggle_graph.remove_mark(index); 
    }    
}

// Dice values taken from actual Boggle game pieces
var dice = new Array(num_of_tiles);
dice[0]  = ["Q", 'B', 'Z', 'J', 'X', 'K'];
dice[1]  = ['H', 'H', 'L', 'R', 'D', 'O'];
dice[2]  = ['T', 'E', 'L', 'P', 'C', 'I'];
dice[3]  = ['T', 'T', 'O', 'T', 'E', 'M'];
dice[4]  = ['A', 'E', 'A', 'E', 'E', 'E'];
dice[5]  = ['T', 'O', 'U', 'O', 'T', 'O'];
dice[6]  = ['N', 'H', 'D', 'T', 'H', 'O'];
dice[7]  = ['S', 'S', 'N', 'S', 'E', 'U'];
dice[8]  = ['S', 'C', 'T', 'I', 'E', 'P'];
dice[9]  = ['Y', 'I', 'F', 'P', 'S', 'R'];
dice[10] = ['O', 'V', 'W', 'R', 'G', 'R'];
dice[11] = ['L', 'H', 'N', 'R', 'O', 'D'];
dice[12] = ['R', 'I', 'Y', 'P', 'R', 'H'];
dice[13] = ['E', 'A', 'N', 'D', 'N', 'N'];
dice[14] = ['E', 'E', 'E', 'E', 'M', 'A'];
dice[15] = ['A', 'A', 'A', 'F', 'S', 'R'];
dice[16] = ['A', 'F', 'A', 'I', 'S', 'R'];
dice[17] = ['D', 'O', 'R', 'D', 'L', 'N'];
dice[18] = ['M', 'N', 'N', 'E', 'A', 'G'];
dice[19] = ['I', 'T', 'I', 'T', 'I', 'E'];
dice[20] = ['A', 'U', 'M', 'E', 'E', 'G'];
dice[21] = ['Y', 'I', 'F', 'A', 'S', 'R'];
dice[22] = ['C', 'C', 'W', 'N', 'S', 'T'];
dice[23] = ['U', 'O', 'T', 'O', 'W', 'N'];
dice[24] = ['E', 'T', 'I', 'L', 'I', 'C'];