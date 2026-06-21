/* =====================================
   GAME.JS
   Vector Speed Challenge v1
===================================== */

/* =====================================
   GAME STATE
===================================== */

let currentQuestion = 0;

let totalQuestions = 20;

let difficulty = "medium";

let vectorA = null;

let vectorB = null;

let correctAnswer = null;

let currentOperation = "+";

let questionStartTime = 0;

let timer = null;

let timeLimit = 30;

let timeRemaining = 15;

/* =====================================
   INITIALIZATION
===================================== */

window.addEventListener(
    "load",
    () => {

        console.log("LOAD OK");

        setupCanvas();

        console.log("CANVAS OK");

        initializeAudio();

        console.log("AUDIO OK");

        attachUIEvents();

        console.log("EVENTS OK");
    }
);

/* =====================================
   UI EVENTS
===================================== */

function attachUIEvents(){

    document
        .getElementById("startBtn")
        .addEventListener(

            "click",

            startGame

        );

    document
        .getElementById("submitBtn")
        .addEventListener(

            "click",

            submitAnswer

        );

    document
        .getElementById("restartBtn")
        .addEventListener(

            "click",

            restartGame

        );

    document
        .getElementById("answerX")
        .addEventListener(

            "keydown",

            handleEnterKey

        );

    document
        .getElementById("answerY")
        .addEventListener(

            "keydown",

            handleEnterKey

        );
}

function handleEnterKey(event){

    if(event.key === "Enter"){

        submitAnswer();
    }
}

/* =====================================
   START GAME
===================================== */

function startGame(){

    playClick();

    totalQuestions =

        Number(

            document.getElementById(
                "questionCount"
            ).value

        );

    currentQuestion = 0;

    resetStatistics();

    document
        .getElementById("startScreen")
        .classList.add("hidden");

    document
        .getElementById("gameScreen")
        .classList.remove("hidden");

    nextQuestion();
}

/* =====================================
   RESTART
===================================== */

function restartGame(){

    playClick();

    document
        .getElementById("resultScreen")
        .classList.add("hidden");

    document
        .getElementById("startScreen")
        .classList.remove("hidden");
}

/* =====================================
   DIFFICULTY
===================================== */

function getDifficultyLimit(){

    switch(difficulty){

        case "easy":

            return 5;

        case "hard":

            return 20;

        default:

            return 10;
    }
}

/* =====================================
   NEW QUESTION
===================================== */

function nextQuestion(){

    if(

        currentQuestion >=
        totalQuestions

    ){

        finishGame();

        return;
    }

    currentQuestion++;

    updateQuestionCounter();

    generateQuestion();

    startTimer();

    questionStartTime =
        performance.now();

    clearInputs();

    showFeedback(
        "",
        ""
    );
}

/* =====================================
   QUESTION COUNTER
===================================== */

function updateQuestionCounter(){

    document.getElementById(
        "questionNumber"
    ).textContent =
        currentQuestion;

    document.getElementById(
        "questionTotal"
    ).textContent =
        totalQuestions;
}

/* =====================================
   GENERATE QUESTION
===================================== */

function generateQuestion(){

    vectorA =
    randomGridVector();

    vectorB =
    randomGridVector();

    currentOperation =

        Math.random() < 0.5

        ? "+"

        : "-";

    if(

        currentOperation === "+"

    ){

        correctAnswer =

            addVectors(

                vectorA,

                vectorB

            );

    }else{

        correctAnswer =

            subtractVectors(

                vectorA,

                vectorB

            );
    }

    updateQuestionText();

    animateVectorAppearance(

        vectorA,

        vectorB

    );
}

/* =====================================
   QUESTION TEXT
===================================== */

function updateQuestionText(){

    document.getElementById(
    "questionText"
).innerHTML =

`
อ่านเวกเตอร์จากกราฟ 
<br><br>
คำนวณ A ${currentOperation} B
`;

}

/* =====================================
   TIMER
===================================== */

function startTimer(){

    clearInterval(timer);

    timeRemaining =
        timeLimit;

    updateTimerBar();

    timer = setInterval(

        () => {

            timeRemaining--;

            updateTimerBar();

            if(

                timeRemaining <= 0

            ){

                timeoutQuestion();

            }

        },

        1000

    );
}

function updateTimerBar(){

    const percent =

        (timeRemaining /
         timeLimit) * 100;

    const bar =

        document.getElementById(
            "timerBarInner"
        );

    bar.style.width =
        percent + "%";

    if(percent < 30){

        bar.style.background =
            "#ff5252";

    }else if(

        percent < 60

    ){

        bar.style.background =
            "#ffd54f";

    }else{

        bar.style.background =
            "#00e676";
    }
}

/* =====================================
   TIMEOUT
===================================== */

function timeoutQuestion(){

    clearInterval(timer);

    registerTimeout();

    showFeedback(

        "⏰ หมดเวลา",

        "wrong"

    );

    setTimeout(

        nextQuestion,

        1200

    );
}

/* =====================================
   CLEAR INPUTS
===================================== */

function clearInputs(){

    document.getElementById(
        "answerX"
    ).value = "";

    document.getElementById(
        "answerY"
    ).value = "";

    document.getElementById(
        "answerX"
    ).focus();
}

/* =====================================
   SUBMIT ANSWER
===================================== */

function submitAnswer(){

    const x = Number(

        document.getElementById(
            "answerX"
        ).value

    );

    const y = Number(

        document.getElementById(
            "answerY"
        ).value

    );

    if(

        Number.isNaN(x) ||

        Number.isNaN(y)

    ){

        return;
    }

    clearInterval(timer);

    const responseTime =

        (

            performance.now()

            -

            questionStartTime

        ) / 1000;

    if(

        x === correctAnswer.x &&

        y === correctAnswer.y

    ){

        handleCorrectAnswer(
            responseTime
        );

    }else{

        handleWrongAnswer();
    }
}

/* =====================================
   CORRECT
===================================== */

function handleCorrectAnswer(

    responseTime

){

    recordResponseTime(
        responseTime
    );

    const earned =

        registerCorrectAnswer(

            timeRemaining,

            timeLimit

        );

    showFeedback(

        `✅ ถูกต้อง +${earned}`,

        "correct"

    );

    setTimeout(

        nextQuestion,

        1000

    );
}

/* =====================================
   WRONG
===================================== */

function handleWrongAnswer(){

    registerWrongAnswer();

    showFeedback(

        `❌ คำตอบที่ถูกคือ
        (${correctAnswer.x},
         ${correctAnswer.y})`,

        "wrong"

    );

    setTimeout(

        nextQuestion,

        1500

    );
}

/* =====================================
   DEBUG HELPERS
===================================== */

function revealAnswer(){

    console.log(

        correctAnswer

    );
}

/* =====================================
   OPTIONAL PRACTICE MODE
===================================== */

function skipQuestion(){

    clearInterval(timer);

    nextQuestion();
}
