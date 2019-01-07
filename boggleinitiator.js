var startGame = false;
var timerOn = false;
var dictionary = new Trie();

document.getElementById("start-button").addEventListener("click", function(){
    document.getElementById("start-button").style.background = "#8f7a66";
    document.getElementById("start-button").innerHTML = "Stop Game";
    if (startGame == false) {
        startGame = true;
        timerOn = true;
        build_board();
        // dictionary.insert_word("helium");
        // console.log(dictionary.is_word("helium"));  // true
        // console.log(dictionary.is_word("kickass")); // false
        create_dictionary();
        // console.log(dictionary.is_word("word")); // true
        boggle_solver();
        start_timer();

    }
    else if (startGame == true) {
        startGame = false;
        timerOn = false;
        start_timer();
        document.getElementById("start-button").style.background = "steelblue";
        document.getElementById("start-button").innerHTML = "Start Game";
    }
});

function build_board() {

    var randomNumberForDice;
    var randomNumberInEachDice;
    var board = new Array(5);
    var tracker = new Array(25);
    for (var i = 0; i < 25; i++) {
        tracker[i] = 0;
    }

    for (var row = 0; row < 5; row++) {
        board[row] = new Array(5);
        for (var col = 0; col < 5; col++) {
            var done = false;
            while (done == false) {
                randomNumberForDice = Math.floor(Math.random() * 25);
                if (tracker[randomNumberForDice] == 0) {
                    tracker[randomNumberForDice] = 1;
                    randomNumberInEachDice = Math.floor(Math.random() * 6);
                    assignedLetter = dice[randomNumberForDice][randomNumberInEachDice];
                    board[row][col] = assignedLetter;
                    document.getElementById("R" + row + "C" + col).innerHTML = assignedLetter;
                    done = true;
                }   
            }
        }
    }
}

function start_timer(status) {

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
                timer.innerHTML = "<span style='font-size:50px; color:white;'>" + time.minutes + ":" + time.seconds + "</span>";
            }
            
            if(time.minutes < 0 || timerOn == false) { 
                timer.innerHTML = "<span style='font-size:50px; color:white;'>0:00</span>";
                clearInterval(timeinterval); 
                startGame = false;
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
        txtFile.open("GET", file, true);
        txtFile.onreadystatechange = function () {
            if(txtFile.readyState == 4)
            {
                if(txtFile.status == 200 || txtFile.status == 0)
                {
                    var array_of_words;

                    array_of_words = txtFile.responseText;
                    array_of_words.split("\n");
                    
                    var num_words = array_of_words.length;

                    for (var i = 0; i < num_words; i++) {
                        console.log(array_of_words[i]);
                        dictionary.insert_word(array_of_words[i]);
                    }
                }
            }
        }
        txtFile.send(null);
    }
    readTextFile('dictionary.txt');
}

function boggle_solver() {

}

// Dice values taken from actual Boggle game pieces
var dice = new Array(25)
dice[0] = ['Q', 'B', 'Z', 'J', 'X', 'K'];
dice[1] = ['H', 'H', 'L', 'R', 'D', 'O'];
dice[2] = ['T', 'E', 'L', 'P', 'C', 'I'];
dice[3] = ['T', 'T', 'O', 'T', 'E', 'M'];
dice[4] = ['A', 'E', 'A', 'E', 'E', 'E'];
dice[5] = ['T', 'O', 'U', 'O', 'T', 'O'];
dice[6] = ['N', 'H', 'D', 'T', 'H', 'O'];
dice[7] = ['S', 'S', 'N', 'S', 'E', 'U'];
dice[8] = ['S', 'C', 'T', 'I', 'E', 'P'];
dice[9] = ['Y', 'I', 'F', 'P', 'S', 'R'];
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