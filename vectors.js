/* =====================================
   VECTOR UTILITIES
===================================== */

// สร้างเวกเตอร์สุ่ม

function randomVector(limit){

    return {

        x: randomInt(-limit, limit),

        y: randomInt(-limit, limit)

    };
}

function randomGridVector(){

    return {

        x: randomInt(-15, 15),

        y: randomInt(-9, 9)

    };
}


// จำนวนเต็มสุ่ม

function randomInt(min, max){

    return Math.floor(
        Math.random() * (max - min + 1)
    ) + min;
}

/* =====================================
   VECTOR OPERATIONS
===================================== */

// A + B

function addVectors(A, B){

    return {

        x: A.x + B.x,

        y: A.y + B.y

    };
}

// A - B

function subtractVectors(A, B){

    return {

        x: A.x - B.x,

        y: A.y - B.y

    };
}

// ขนาดเวกเตอร์

function magnitude(v){

    return Math.sqrt(

        v.x * v.x +

        v.y * v.y

    );
}

// dot product

function dotProduct(A, B){

    return (

        A.x * B.x +

        A.y * B.y

    );
}

/* =====================================
   CANVAS SETUP
===================================== */

let canvas = null;

let ctx = null;

let scale = 20;

let originX = 0;

let originY = 0;

function setupCanvas(){

    canvas = document.getElementById(
        "vectorCanvas"
    );

    ctx = canvas.getContext("2d");

    originX =
    Math.floor(
        canvas.width /
        (2 * scale)
    ) * scale;

    originY =
    Math.floor(
        canvas.height /
        (2 * scale)
    ) * scale;
}

/* =====================================
   DRAWING
===================================== */

function clearCanvas(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );
}

/* =====================================
   GRID
===================================== */

function drawGrid(){

    ctx.strokeStyle = "#dddddd";

    ctx.lineWidth = 1;

    // แนวตั้ง

    for(

        let x = 0;

        x <= canvas.width;

        x += scale

    ){

        ctx.beginPath();

        ctx.moveTo(x, 0);

        ctx.lineTo(x, canvas.height);

        ctx.stroke();
    }

    // แนวนอน

    for(

        let y = 0;

        y <= canvas.height;

        y += scale

    ){

        ctx.beginPath();

        ctx.moveTo(0, y);

        ctx.lineTo(canvas.width, y);

        ctx.stroke();
    }
}

/* =====================================
   AXES
===================================== */

function drawAxes(){

    ctx.strokeStyle = "#000000";

    ctx.lineWidth = 2;

    // x axis

    ctx.beginPath();

    ctx.moveTo(0, originY);

    ctx.lineTo(canvas.width, originY);

    ctx.stroke();

    // y axis

    ctx.beginPath();

    ctx.moveTo(originX, 0);

    ctx.lineTo(originX, canvas.height);

    ctx.stroke();
}

/* =====================================
   TICKS
===================================== */

function drawTicks(){

    ctx.fillStyle = "#000000";

    ctx.font = "12px Arial";

    ctx.textAlign = "center";

    ctx.textBaseline = "middle";

    const maxX = 16;
    const maxY = 9;

    // X axis

    for(let i=-maxX;i<=maxX;i++){

        if(i===0) continue;

        const x =
        originX + i*scale;

        ctx.fillText(
            i,
            x,
            originY + 12
        );
    }

    // Y axis

    for(let i=-maxY;i<=maxY;i++){

        if(i===0) continue;

        const y =
        originY - i*scale;

        ctx.fillText(
            i,
            originX - 12,
            y
        );
    }
}
/* =====================================
   ARROW
===================================== */

function drawArrow(

    x1,
    y1,
    x2,
    y2,
    color

){

    ctx.strokeStyle = color;

    ctx.fillStyle = color;

    ctx.lineWidth = 4;

    ctx.beginPath();

    ctx.moveTo(x1, y1);

    ctx.lineTo(x2, y2);

    ctx.stroke();

    let angle = Math.atan2(

        y2 - y1,

        x2 - x1

    );

    let headLength = 12;

    ctx.beginPath();

    ctx.moveTo(x2, y2);

    ctx.lineTo(

        x2 -

        headLength *

        Math.cos(angle - Math.PI/6),

        y2 -

        headLength *

        Math.sin(angle - Math.PI/6)

    );

    ctx.lineTo(

        x2 -

        headLength *

        Math.cos(angle + Math.PI/6),

        y2 -

        headLength *

        Math.sin(angle + Math.PI/6)

    );

    ctx.closePath();

    ctx.fill();
}

/* =====================================
   DRAW VECTOR
===================================== */

function drawVector(

    vector,

    color,

    label

){

    const endX =

        originX +

        vector.x * scale;

    const endY =

        originY -

        vector.y * scale;

    drawArrow(

        originX,

        originY,

        endX,

        endY,

        color

    );

    ctx.fillStyle = color;

    ctx.font =

        "bold 18px Arial";

    ctx.fillText(

        label,

        endX + 8,

        endY - 8

    );

    ctx.beginPath();

    ctx.arc(

        endX,

        endY,

        4,

        0,

        Math.PI * 2

    );

    ctx.fill();
}

/* =====================================
   DRAW SCENE
===================================== */

function drawScene(

    vectorA,

    vectorB

){

    clearCanvas();

    drawGrid();

    drawAxes();

    drawTicks();

    drawVector(

        vectorA,

        "#2979ff",

        "A"

    );

    drawVector(

        vectorB,

        "#ff1744",

        "B"

    );
}

/* =====================================
   ANIMATION
===================================== */

function animateVectorAppearance(

    vectorA,

    vectorB

){

    let frame = 0;

    const totalFrames = 25;

    function animate(){

        clearCanvas();

        drawGrid();

        drawAxes();

        drawTicks();

        const f =

            frame /

            totalFrames;

        const a = {

            x: vectorA.x * f,

            y: vectorA.y * f

        };

        const b = {

            x: vectorB.x * f,

            y: vectorB.y * f

        };

        drawVector(

            a,

            "#2979ff",

            "A"

        );

        drawVector(

            b,

            "#ff1744",

            "B"

        );

        frame++;

        if(

            frame <= totalFrames

        ){

            requestAnimationFrame(
                animate
            );
        }
    }

    animate();
}
