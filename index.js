const display = document.querySelector('#display');
const button = document.querySelector('#button');
const counter = document.querySelector('#counter');

button.onclick = onClickButton;

const app = {};
init();

function init() {
    app.state = 'inited';
    app.clicks = 0;
    app.TIMEOUT = 6000;
    app.leftTime = app.TIMEOUT;

    button.textContent = 'Start';
    display.textContent = formatTime(app.leftTime);
    counter.textContent = app.clicks;
}

function onClickButton() {
    const state = app.state;

    switch (state) {
        case 'inited':
            onRun();
            onClick();
            break;
        case 'run':
            onClick();
            break;
        case 'stop':
            restart();
            onClick();
            break;
    }
}

function onRun() {
    app.state = 'run';
    app.clicks = 0;
    app.leftTime = app.TIMEOUT;

    button.textContent = 'Click';
    display.textContent = formatTime(app.leftTime);
    counter.textContent = app.clicks;

    app.intervalId = setInterval(() => onTick(100), 100);
}

function onTick(deltaTime) {
    if (app.leftTime <= 0) {
        clearInterval(app.intervalId);
        return onStop();
    }

    app.leftTime -= deltaTime;
    display.textContent = formatTime(app.leftTime);
}

function onClick() {
    app.clicks++;
    counter.textContent = app.clicks;
}

function onStop() {
    app.state = 'stop';

    display.textContent = 'Game Over';
    button.textContent = 'Restart';
}

function restart() {
    onRun();
}

function formatTime(ms) {
    return (ms / 1000).toFixed(2);
}
