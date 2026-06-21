/* =====================================
   SCORE.JS
   Vector Speed Challenge v1
===================================== */

/* =====================================
   GAME STATISTICS
===================================== */

let score = 0;

let combo = 0;

let maxCombo = 0;

let correctAnswers = 0;

let wrongAnswers = 0;

let totalQuestionsAnswered = 0;

let totalResponseTime = 0;

/* =====================================
   RESET
===================================== */

function resetStatistics(){

    score = 0;

    combo = 0;

    maxCombo = 0;

    correctAnswers = 0;

    wrongAnswers = 0;

    totalQuestionsAnswered = 0;

    totalResponseTime = 0;

    updateScoreDisplay();
}

/* =====================================
   SCORE DISPLAY
===================================== */

function updateScoreDisplay(){

    const scoreEl =
        document.getElementById(
            "scoreValue"
        );

    const comboEl =
        document.getElementById(
            "comboValue"
        );

    if(scoreEl){

        scoreEl.textContent =
            score;
    }

    if(comboEl){

        comboEl.textContent =
            combo;
    }
}

/* =====================================
   ADD SCORE
===================================== */

function addScore(points){

    score += points;

    updateScoreDisplay();
}

/* =====================================
   CORRECT ANSWER
===================================== */

function registerCorrectAnswer(

    timeRemaining,
    maxTime

){

    correctAnswers++;

    totalQuestionsAnswered++;

    combo++;

    if(combo > maxCombo){

        maxCombo = combo;
    }

    let baseScore =

        Math.round(
            timeRemaining * 10
        );

    let comboBonus =

        combo * 5;

    let earned =

        baseScore +
        comboBonus;

    score += earned;

    updateScoreDisplay();

    if(

        typeof playCorrect ===
        "function"

    ){

        playCorrect();
    }

    if(

        combo >= 3 &&
        typeof playCombo ===
        "function"

    ){

        playCombo(combo);
    }

    showFloatingScore(

        "+" + earned,

        "#ffd54f"

    );

    return earned;
}

/* =====================================
   WRONG ANSWER
===================================== */

function registerWrongAnswer(){

    wrongAnswers++;

    totalQuestionsAnswered++;

    combo = 0;

    updateScoreDisplay();

    if(

        typeof playWrong ===
        "function"

    ){

        playWrong();
    }

    return 0;
}

/* =====================================
   TIMEOUT
===================================== */

function registerTimeout(){

    wrongAnswers++;

    totalQuestionsAnswered++;

    combo = 0;

    updateScoreDisplay();

    if(

        typeof playTimeout ===
        "function"

    ){

        playTimeout();
    }
}

/* =====================================
   RESPONSE TIME
===================================== */

function recordResponseTime(

    seconds

){

    totalResponseTime +=
        seconds;
}

/* =====================================
   ACCURACY
===================================== */

function getAccuracy(){

    if(

        totalQuestionsAnswered ===
        0

    ){

        return 0;
    }

    return (

        correctAnswers /

        totalQuestionsAnswered

    ) * 100;
}

/* =====================================
   AVERAGE RESPONSE TIME
===================================== */

function getAverageResponseTime(){

    if(

        correctAnswers === 0

    ){

        return 0;
    }

    return (

        totalResponseTime /

        correctAnswers

    );
}

/* =====================================
   FLOATING SCORE EFFECT
===================================== */

function showFloatingScore(

    text,
    color = "#ffd54f"

){

    const container =

        document.getElementById(
            "floatingScoreContainer"
        );

    if(!container){

        return;
    }

    const div =

        document.createElement(
            "div"
        );

    div.className =
        "floatingScore";

    div.textContent =
        text;

    div.style.color =
        color;

    div.style.left =

        (
            window.innerWidth / 2 +
            (Math.random()*200-100)
        ) + "px";

    div.style.top =

        (
            window.innerHeight / 2
        ) + "px";

    container.appendChild(div);

    setTimeout(() => {

        div.remove();

    }, 1000);
}

/* =====================================
   FEEDBACK
===================================== */

function showFeedback(

    text,
    cssClass

){

    const el =

        document.getElementById(
            "feedbackText"
        );

    if(!el){

        return;
    }

    el.className = cssClass;

    el.textContent = text;
}

/* =====================================
   RESULT SCREEN
===================================== */

function updateResultScreen(){

    const accuracy =

        getAccuracy();

    const avgTime =

        getAverageResponseTime();

    document.getElementById(
        "finalScore"
    ).textContent = score;

    document.getElementById(
        "correctCount"
    ).textContent =
        correctAnswers;

    document.getElementById(
        "wrongCount"
    ).textContent =
        wrongAnswers;

    document.getElementById(
        "accuracy"
    ).textContent =

        accuracy.toFixed(1)
        + "%";

    document.getElementById(
        "maxCombo"
    ).textContent =
        maxCombo;

    console.log(

        "Average Time:",

        avgTime.toFixed(2),

        "s"

    );
}

/* =====================================
   HIGH SCORE
===================================== */

function saveHighScore(){

    const oldScore =

        Number(

            localStorage.getItem(
                "vectorHighScore"
            ) || 0

        );

    if(score > oldScore){

        localStorage.setItem(

            "vectorHighScore",

            score

        );

        return true;
    }

    return false;
}

/* =====================================
   LOAD HIGH SCORE
===================================== */

function loadHighScore(){

    return Number(

        localStorage.getItem(
            "vectorHighScore"
        ) || 0

    );
}

/* =====================================
   END GAME
===================================== */

function finishGame(){

    updateResultScreen();

    const newRecord =

        saveHighScore();

    if(

        typeof playWin ===
        "function"

    ){

        playWin();
    }

    if(newRecord){

        showFeedback(

            "🏆 สถิติใหม่!",

            "correct"

        );

    }

    document.getElementById(
        "gameScreen"
    ).classList.add(
        "hidden"
    );

    document.getElementById(
        "resultScreen"
    ).classList.remove(
        "hidden"
    );
}
