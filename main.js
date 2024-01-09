const canvas = document.querySelector("#canvas-1");
canvas.width = 400;
canvas.height = 400;
const ctx = canvas.getContext("2d");

var dot = [
    [1, 0, 1, 0, 1],
    [0, 1, 0, 1, 0],
    [1, 0, 1, 0, 1],
    [0, 1, 0, 1, 0],
    [1, 0, 1, 0, 1]
];

// test start
let Gwidth = 50;
let Gheight = 50;
function test(x = null) {
    dot = [];
    for (let i = 0; i < Gheight; i++) {
        dot.push([]);
        for (let j = 0; j < Gwidth; j++) {
            dot[i][j] = x ?? parseInt(Math.random() * 3);
        }
    }
}
test();
// test end

let space_dot = [];
var touchs_history = [];

// test view-port transition
let view_port = dot;

let view_width = 5;
let view_height = 5;
let view_x = 10;
let view_y = 10;

console.log(view_port);

view_port = view_port.slice(view_y, view_y + view_height);

for (let i = 0; i < view_port.length; i++) {
    view_port[i] = view_port[i].slice(view_x, view_x + view_width);
}

function isUndefinedReturn(check) {
    return check === undefined ? undefined : true;
}
var pre_slice = "";
function draw() {
    view_port = dot;
    view_port = view_port.slice(view_y, view_y + view_height);

    for (let i = 0; i < view_port.length; i++) {
        pre_slice = view_port[i].slice(view_x, view_x + view_width);

        if (pre_slice.length !== 0) view_port[i] = pre_slice;
    }
    updateDotPlayer(3);
    ctx.clearRect(0, 0, canvas.innerWidth, canvas.innerHeight);
    let x, y, w, h;
    for (let i = 0; i < dot.length; i++) {
        w = canvas.width / dot[i].length;
        h = canvas.height / dot[i].length;
        y = h * i;
        space_dot[i] = [];
        for (let j = 0; j < dot[i].length; j++) {
            x = w * j;
            space_dot[i][j] = { x, y, w, h };

            if (dot[i][j] === 1) {
                ctx.beginPath();
                ctx.fillStyle = "red";
                ctx.fillRect(x, y, w, h);
                ctx.closePath();
            }
            if (dot[i][j] === 0) {
                ctx.beginPath();
                ctx.fillStyle = "blue";
                ctx.fillRect(x, y, w, h);
                ctx.closePath();
            }
            if (dot[i][j] === 2) {
                ctx.beginPath();
                ctx.fillStyle = "green";
                ctx.fillRect(x, y, w, h);
                ctx.closePath();
            }
            if (dot[i][j] === 3) {
                ctx.beginPath();
                ctx.fillStyle = "black";
                ctx.fillRect(x, y, w, h);
                ctx.closePath();
            }
        }
    }
    requestAnimationFrame(draw, 800);
}

draw();

canvas.addEventListener("touchmove", e => {
    e.preventDefault();
    let finger_dot_size = 4;
    let cx = e.touches[0].clientX;
    let cy = e.touches[0].clientY;

    var x1;
    for (let i = 0; i < space_dot.length; i++) {
        for (let j = 0; j < space_dot[i].length; j++) {
            let spaceX, spaceY, spaceW, spaceH;
            spaceX = space_dot[i][j].x;
            spaceY = space_dot[i][j].y;
            spaceW = space_dot[i][j].w;
            spaceH = space_dot[i][j].h;
            if (
                cx > spaceX &&
                cy > spaceY &&
                cx < spaceX + spaceW &&
                cy < spaceY + spaceH
            ) {
                touchs_history.push({
                    x: spaceX,
                    y: spaceY,
                    w: spaceW,
                    h: spaceH
                });
                for (let k = 0; k < finger_dot_size; k++) {
                    dot[parseInt(i + k)][parseInt(j + k)] !== undefined
                        ? (dot[parseInt(i + k)][parseInt(j + k)] = 2)
                        : null;
                }
                // idk how to make it work (-_-)?
                for (let k = 0; k < touchs_history.length; k++) {
                    x1 === undefined ? (x1 = touchs_history[k]) : null;
                    let x2 = touchs_history[k] ?? 0;

                    let loopX = x2.x - x1.x;
                    let loopY = x2.y - x1.y;
                    console.log(loopX, loopY);

                    for (let lx = 0; lx < parseInt(loopX); lx++) {
                        dot[parseInt(i)][parseInt(j + loopY / lx)] !== undefined
                            ? (dot[parseInt(i)][parseInt(j + loopY / lx)] = 2)
                            : null;
                    }
                    for (let lx = 0; lx < parseInt(loopY); lx++) {
                        dot[parseInt(i + loopX / lx)][parseInt(j)] !== undefined
                            ? (dot[parseInt(i + loopX / lx)][parseInt(j)] = 2)
                            : null;
                        console.log(dot[parseInt(i + loopX / lx)][parseInt(j)]);
                    }

                    x1 = x2;
                }
            }
        }
    }
});

canvas.addEventListener("touchstart", e => {
    let finger_dot_size = 4;
    let cx = e.touches[0].clientX;
    let cy = e.touches[0].clientY;
    for (let i = 0; i < space_dot.length; i++) {
        for (let j = 0; j < space_dot[i].length; j++) {
            let spaceX, spaceY, spaceW, spaceH;
            spaceX = space_dot[i][j].x;
            spaceY = space_dot[i][j].y;
            spaceW = space_dot[i][j].w;
            spaceH = space_dot[i][j].h;
            if (
                cx > spaceX &&
                cy > spaceY &&
                cx < spaceX + spaceW &&
                cy < spaceY + spaceH
            ) {
                for (let k = 0; k < finger_dot_size; k++) {
                    console.log(dot[parseInt(i - k)][parseInt(j + k)]);
                }
            }
        }
    }
});

canvas.addEventListener("touchend", () => {
    console.log(touchs_history);
    touchs_history = [];
});

console.log(view_port);

const canvas2 = document.querySelector("#canvas-2");
canvas2.width = 400;
canvas2.height = 400;
const ctx2 = canvas2.getContext("2d");

canvas2.addEventListener("touchmove", e => e.preventDefault());

function draw2() {
    ctx2.clearRect(0, 0, canvas2.innerWidth, canvas2.innerHeight);
    let x, y, w, h;
    for (let i = 0; i < view_port.length; i++) {
        w = canvas2.width / view_port[i].length;
        h = canvas2.height / view_port[i].length;
        y = h * i;
        for (let j = 0; j < view_port[i].length; j++) {
            x = w * j;
            if (view_port[i][j] === 1) {
                ctx2.beginPath();
                ctx2.fillStyle = "red";
                ctx2.fillRect(x, y, w, h);
                ctx2.closePath();
            }
            if (view_port[i][j] === 0) {
                ctx2.beginPath();
                ctx2.fillStyle = "blue";
                ctx2.fillRect(x, y, w, h);
                ctx2.closePath();
            }
            if (view_port[i][j] === 2) {
                ctx2.beginPath();
                ctx2.fillStyle = "green";
                ctx2.fillRect(x, y, w, h);
                ctx2.closePath();
            }
        }
    }
    requestAnimationFrame(draw2);
}

draw2();

function updateDotPlayer(back = null) {
    if (dot[view_y][view_x] !== undefined) {
        if (view_x > 0 && view_y > 0) {
            dot[view_y][view_x] = back ?? 1;
            if (dot[0].length - parseInt(view_width / 2) - view_x === 0) {
                view_x = 1;
            }
            if (view_x - parseInt(view_width / 2) <= -1) {
                view_x = 1;
            }
        }
    }
}
