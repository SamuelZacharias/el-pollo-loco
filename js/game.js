let canvas;
let world;
let keyboard = new Keyboard();
let audioManager = new AudioManager();
let isMuted = false;

/**
 * Initializes the game by setting up the canvas, loading the mute state, 
 * and calling the necessary functions to start the game.
 */
function init() {
    setupCanvas();
    world = new World(canvas, keyboard);
    world.run();
    setupButtonEvents();
    loadMuteState();
    audioManager.playBackgroundMusic();
}

/**
 * Sets up the canvas and initializes the 2D rendering context.
 */
function setupCanvas() {
    canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById('mute-btn').style.display = 'block';
}

/**
 * Loads the saved mute state from localStorage and applies it.
 */
function loadMuteState() {
    const savedMuteState = localStorage.getItem('isMuted');
    if (savedMuteState !== null) {
        isMuted = (savedMuteState === 'true');
        audioManager.muteAll(isMuted);
        document.getElementById('mute-btn').src = isMuted ? 'img/landing_page/unmute.png' : 'img/landing_page/mute.png';
    }
}

/**
 * Returns the configuration for the buttons that map to keyboard actions.
 * 
 * @returns {Array} Button configuration with IDs and corresponding keyboard keys.
 */
function getButtonConfig() {
    return [
        { id: 'back-btn', key: 'LEFT' },
        { id: 'forward-btn', key: 'RIGHT' },
        { id: 'up-btn', key: 'UP' },
        { id: 'sword-btn', key: 'SPACE', specialAction: true }
    ];
}

/**
 * Sets up event listeners for button interactions in the game.
 * This function configures buttons for movement and actions like throwing objects.
 * It handles both mouse and touch events to ensure responsiveness on various devices.
 */
let actionTimeouts = {};

function setupButtonEvents() {
    const buttonConfig = getButtonConfig();
    buttonConfig.forEach(({ id, key, specialAction }) => {
        const button = document.getElementById(id);
        button.addEventListener('pointerdown', () => {
            handleButtonPress(key, true, specialAction, button);
            actionTimeouts[key] = setInterval(() => handleButtonPress(key, true, specialAction, button), 100);
        });
        button.addEventListener('pointerup', () => {
            handleButtonPress(key, false, specialAction, button);
            clearInterval(actionTimeouts[key]);
        });
        button.addEventListener('pointerleave', () => {
            handleButtonPress(key, false, specialAction, button);
            clearInterval(actionTimeouts[key]);
        });
        button.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
    });
    document.getElementById('fullscreen-btn').addEventListener('click', toggleFullscreen);
    document.getElementById('mute-btn').addEventListener('click', toggleMute);
}





/**
 * Handles the pressing and releasing of buttons. This function updates the keyboard state,
 * triggers special actions like throwing objects, and toggles the button's active class.
 * 
 * @param {string} key - The key corresponding to the keyboard action.
 * @param {boolean} isActive - Whether the button is currently active or not.
 * @param {boolean} specialAction - Determines if the button triggers a special action (e.g., throwing an object).
 * @param {HTMLElement} button - The button element being interacted with.
 */
function handleButtonPress(key, isActive, specialAction, button) {
    keyboard[key] = isActive;

    if (specialAction && isActive && world?.checkThrowObjects) {
        world.checkThrowObjects();
    }
    if (isActive) {
        button.classList.add('active');
    } else {
        button.classList.remove('active');
    }
}




/**
 * Handles the pressing and releasing of buttons. This function updates the keyboard state,
 * triggers special actions like throwing objects, and toggles the button's active class.
 * 
 * @param {string} key - The key corresponding to the keyboard action.
 * @param {boolean} isActive - Whether the button is currently active or not.
 * @param {boolean} specialAction - Determines if the button triggers a special action (e.g., throwing an object).
 * @param {HTMLElement} button - The button element being interacted with.
 */
function handleButtonPress(key, isActive, specialAction, button) {
    keyboard[key] = isActive;

    if (specialAction && isActive && world?.checkThrowObjects) {
        world.checkThrowObjects();
    }
    if (isActive) {
        button.classList.add('active');
    } else {
        button.classList.remove('active');
    }
}

/**
 * Toggles the fullscreen mode for the game canvas. This function checks for different browser
 * methods to request fullscreen and applies the appropriate one.
 */
function toggleFullscreen() {
    let canvas = document.getElementById('canvas');
    if (canvas.requestFullscreen) {
        canvas.requestFullscreen();
    } else if (canvas.mozRequestFullScreen) {
        canvas.mozRequestFullScreen();
    } else if (canvas.webkitRequestFullscreen) {
        canvas.webkitRequestFullscreen();
    } else if (canvas.msRequestFullscreen) {
        canvas.msRequestFullscreen();
    }
}

/**
 * Toggles the mute state of the game. The mute state is saved to localStorage and the button icon is updated accordingly.
 */
function toggleMute() {
    isMuted = !isMuted;
    audioManager.muteAll(isMuted);

    localStorage.setItem('isMuted', isMuted);

    document.getElementById('mute-btn').src = isMuted ? 'img/landing_page/unmute.png' : 'img/landing_page/mute.png';
}

/**
 * Listens for keydown events and updates the corresponding keyboard key state.
 * Also, checks if the 'Q' key is pressed to trigger the object-throwing functionality.
 */
window.addEventListener('keydown', (event) => {
    if (event.keyCode == 68) keyboard.RIGHT = true;
    if (event.keyCode == 65) keyboard.LEFT = true;
    if (event.keyCode == 32) keyboard.UP = true;
    if (event.keyCode == 83) keyboard.DOWN = true;
    if (event.keyCode == 81) {
        keyboard.Q = true;
        if (world && typeof world.checkThrowObjects === 'function') {
            world.checkThrowObjects();
        }
    }
});

/**
 * Listens for keyup events and updates the corresponding keyboard key state to false.
 */
window.addEventListener('keyup', (event) => {
    if (event.keyCode == 68) keyboard.RIGHT = false;
    if (event.keyCode == 65) keyboard.LEFT = false;
    if (event.keyCode == 32) keyboard.UP = false;
    if (event.keyCode == 83) keyboard.DOWN = false;
    if (event.keyCode == 81) keyboard.Q = false;
});
