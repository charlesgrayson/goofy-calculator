function $(element) {
    if(document.querySelectorAll(element).length !== 1) {
        return document.querySelectorAll(element);
    } else {
        return document.querySelector(element)
    }
}

score = 0
$("#score_display").innerHTML = "Score: " + score;

function updateScore() {
    $("#score_display").innerHTML = "Score: " + score;
}

$("#score_display").innerHTML = "Score: " + score;
$("#reset_button").addEventListener("click", resetGame);

/*
=======
only allow certain characters to be entered in an input box
ihateregexsyntaxihateregexsyntaxihateregexsyntaxihateregexsyntax
=======
*/
$(".calc_display").addEventListener("input", () => {
    $(".calc_display").value = $(".calc_display").value.replaceAll(/[^0-9+.+\++\-+*+\/+\=]/gi, "")

    if($(".calc_display").value.endsWith("=")) {
        hangman();
    }
})

/*
=======
make buttons append text (except the equals one)
=======
*/
$(".keypad button").forEach(btn => {
    btn.addEventListener("click", () => {
        $(".calc_display").value += btn.innerHTML

        if(btn.innerHTML == "=") {
            hangman();
        }
    })
})

/*
=======
bring up hangman
=======
*/
function hangman() {
    $(".calc_display").value = $(".calc_display").value.replaceAll(/[^0-9+.+\++\-+*+\/+]/gi, "")
    $(".hangman").classList.remove("hide")
    let result = parseFloat(eval($(".calc_display").value))
    isFinite(result) ? "" : result = 0
    $(".fill").innerHTML = "_".repeat(result.toString().length)
}

// Add this line at the beginning of your code to initialize the score display and reset button
$("#score_display").innerHTML = "Score: " + score;
$("#reset_button").addEventListener("click", resetGame);

// Add this function to reset the game state
function resetGame() {
    $(".h_keypad").classList.remove("hide");
    $(".hangman h2").innerHTML = "";
    $(".fill").innerHTML = "";
    $("img").src = "hangman_steps/0.png";
    $(".calc_display").value = "";
    $(".hangman").classList.add("hide");

    // Enable all hangman buttons
    $(".h_keypad button").forEach(btn => {
        btn.removeAttribute("disabled");
    });

    // Reset hangman step counter
    s = 0;

    updateScore(); // Call the function to update and display the score

    // Hide the reset button
    $("#reset_button").classList.add("hide");
}
/*
=======
hangman buttons
=======
*/
let s = 0;
$(".h_keypad button").forEach(btn => {
    btn.addEventListener("click", () => {
        // add disabled so we cant click it again
        btn.setAttribute("disabled", "")


        let result = parseFloat(eval($(".calc_display").value))
        isFinite(result) ? "" : result = 0
        if(result.toString().includes(btn.innerHTML)) {
            // includes the number
            // find where the number pops up and fill .fill based on that
            let indexes = []
            let i = 0;
            result.toString().split("").forEach(digit => {
                if(digit == btn.innerHTML) {
                    indexes.push(i)
                }
                i++;
            })


            let fullStr = $(".fill").innerHTML.split("")
            indexes.forEach(index => {
                fullStr[index] = btn.innerHTML
            })

            $(".fill").innerHTML = fullStr.join("")

            // win
            if($(".fill").innerHTML == result.toString()) {
                good_ending();
            }
        } else {
            // next hangman step if invalid
            s++;
            if(s >= 6) return;
            $("img").src = `hangman_steps/${s}.png`

            // lose if s == 5
            if(s == 5) {
                lose();
            }
        }
    })
})

/*
=======
lose dialog
=======
*/
function lose() {
    setTimeout(function () {
        $(".h_keypad").classList.add("hide");
        $(".hangman h2").innerHTML = "Welp, you didn't get it. How about you calculate manually?";
        updateScore(); // Call the function to update and display the score

        // Show the reset button
        $("#reset_button").classList.remove("hide");
    }, 1250);
}

/*
=======
good ending - game completed
=======
*/
function good_ending() {
    setTimeout(function () {
        $(".hangman").classList.add("hide");

        // Enable all hangman buttons
        $(".h_keypad button").forEach(btn => {
            btn.removeAttribute("disabled");
        });

        score = score + 1;
        $(".calc_display").value = $(".fill").innerHTML;
        updateScore(); // Call the function to update and display the score

        // Hide the reset button
        $("#reset_button").classList.add("hide");
    }, 1250);
}