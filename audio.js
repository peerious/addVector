/* =====================================
   AUDIO.JS
   Vector Speed Challenge v1
===================================== */

/*
ใช้ Web Audio API

ไม่ต้องมีไฟล์เสียงภายนอก

สร้างเสียงจาก oscillator
เพื่อให้เกมทำงานได้ทันที
*/

/* =====================================
   AUDIO CONTEXT
===================================== */

let audioContext = null;

function getAudioContext(){

    if(!audioContext){

        audioContext =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();
    }

    return audioContext;
}

/* =====================================
   GENERIC TONE
===================================== */

function playTone(

    frequency,
    duration,
    type = "sine",
    volume = 0.08

){

    const ctx = getAudioContext();

    const osc =
        ctx.createOscillator();

    const gain =
        ctx.createGain();

    osc.type = type;

    osc.frequency.value =
        frequency;

    gain.gain.value =
        volume;

    osc.connect(gain);

    gain.connect(
        ctx.destination
    );

    osc.start();

    gain.gain.exponentialRampToValueAtTime(

        0.0001,

        ctx.currentTime +
        duration

    );

    osc.stop(
        ctx.currentTime +
        duration
    );
}

/* =====================================
   CORRECT
===================================== */

function playCorrect(){

    playTone(
        880,
        0.10,
        "sine"
    );

    setTimeout(() => {

        playTone(
            1320,
            0.15,
            "sine"
        );

    }, 120);
}

/* =====================================
   WRONG
===================================== */

function playWrong(){

    playTone(
        220,
        0.25,
        "sawtooth"
    );

    setTimeout(() => {

        playTone(
            180,
            0.20,
            "sawtooth"
        );

    }, 100);
}

/* =====================================
   TIMEOUT
===================================== */

function playTimeout(){

    playTone(
        300,
        0.15,
        "square"
    );

    setTimeout(() => {

        playTone(
            250,
            0.15,
            "square"
        );

    }, 150);

    setTimeout(() => {

        playTone(
            200,
            0.20,
            "square"
        );

    }, 300);
}

/* =====================================
   COMBO
===================================== */

function playCombo(combo){

    if(combo < 3){

        return;
    }

    const base =
        700 +
        combo * 50;

    playTone(
        base,
        0.08,
        "triangle"
    );

    setTimeout(() => {

        playTone(
            base + 200,
            0.10,
            "triangle"
        );

    }, 80);
}

/* =====================================
   LEVEL UP
===================================== */

function playLevelUp(){

    const notes = [

        523,
        659,
        784,
        1046

    ];

    notes.forEach(

        (f, i) => {

            setTimeout(() => {

                playTone(
                    f,
                    0.15,
                    "triangle"
                );

            },

            i * 120);

        }

    );
}

/* =====================================
   WIN GAME
===================================== */

function playWin(){

    const melody = [

        523,
        659,
        784,
        1046,
        1318

    ];

    melody.forEach(

        (f, i) => {

            setTimeout(() => {

                playTone(
                    f,
                    0.20,
                    "triangle"
                );

            },

            i * 180);

        }

    );
}

/* =====================================
   GAME OVER
===================================== */

function playGameOver(){

    const notes = [

        440,
        392,
        349,
        262

    ];

    notes.forEach(

        (f, i) => {

            setTimeout(() => {

                playTone(
                    f,
                    0.25,
                    "sawtooth"
                );

            },

            i * 220);

        }

    );
}

/* =====================================
   BUTTON CLICK
===================================== */

function playClick(){

    playTone(
        600,
        0.05,
        "square",
        0.04
    );
}

/* =====================================
   BONUS SCORE
===================================== */

function playBonus(){

    playTone(
        1000,
        0.08,
        "triangle"
    );

    setTimeout(() => {

        playTone(
            1400,
            0.10,
            "triangle"
        );

    }, 80);

    setTimeout(() => {

        playTone(
            1800,
            0.12,
            "triangle"
        );

    }, 160);
}

/* =====================================
   PERFECT ANSWER
===================================== */

function playPerfect(){

    const notes = [

        880,
        1175,
        1568

    ];

    notes.forEach(

        (f, i) => {

            setTimeout(() => {

                playTone(
                    f,
                    0.12,
                    "sine"
                );

            },

            i * 90);

        }

    );
}

/* =====================================
   INITIALIZE
===================================== */

function initializeAudio(){

    document.addEventListener(

        "click",

        () => {

            getAudioContext();

        },

        { once: true }

    );
}
