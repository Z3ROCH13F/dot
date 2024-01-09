const button_left = document.querySelector("#btn-left");
var touch_left_true;
button_left.addEventListener("click", () => {
    updateDotPlayer();
    view_x--;
});
button_left.addEventListener("touchstart", () => {
    touch_left_true = setInterval(function () {
        updateDotPlayer();
        view_x--;console.log(view_x, dot[0].length - parseInt(view_width / 2) - view_x);
    }, 30);
});
button_left.addEventListener("touchend", () => {
    clearInterval(touch_left_true);
});
button_left.addEventListener("touchcancel", () => {
    clearInterval(touch_left_true);
});

const button_right = document.querySelector("#btn-right");
var touch_right_true;
button_right.addEventListener("click", () => {
    updateDotPlayer();
    view_x++;
});
button_right.addEventListener("touchstart", () => {
    touch_right_true = setInterval(function () {
        updateDotPlayer();
        view_x++;
        console.log(view_x, dot[0].length - parseInt(view_width / 2) - view_x);
        
    }, 30);
});

button_right.addEventListener("touchend", () => {
    clearInterval(touch_right_true);
});
button_right.addEventListener("touchcancel", () => {
    clearInterval(touch_right_true);
});
