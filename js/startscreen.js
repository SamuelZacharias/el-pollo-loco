/**
 * Sets up event listeners for the start button and screen orientation handling.
 * Initializes the game when the start button is clicked and manages the screen rotation message.
 */
document.addEventListener('DOMContentLoaded', function () {
    setupStartButton();
    setupOrientationListener();
});

/**
 * Sets up the start button to initialize the game and hide the landing page.
 */
function setupStartButton() {
    document.getElementById('start-button').addEventListener('click', function () {
        document.getElementById('landing-page').style.display = 'none';
        document.getElementById('impressum').classList.add('hidden');
        document.getElementById('game-container').classList.remove('hidden');
        init();
    });
}

/**
 * Sets up the orientation listener and manages screen orientation changes.
 */
function setupOrientationListener() {
    const rotateMessageContainer = document.getElementById('rotate-message-container');
    const rotateIcon = document.getElementById('rotate-icon');

    if (!rotateIcon || !rotateMessageContainer) {
        console.error("Das Element 'rotate-message-container' oder 'rotate-icon' wurde nicht gefunden.");
        return;
    }

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
}

/**
 * Checks the screen orientation and displays a rotate message if necessary.
 */
function checkOrientation() {
    const rotateMessageContainer = document.getElementById('rotate-message-container');
    const rotateIcon = document.getElementById('rotate-icon');

    if (window.innerHeight > window.innerWidth) {
        rotateMessageContainer.style.display = 'flex';
        startIconAnimation(rotateIcon);
    } else {
        rotateMessageContainer.style.display = 'none';
        stopIconAnimation();
    }
}

/**
 * Starts an animation that alternates the rotate icon image every 500ms.
 * 
 * @param {HTMLElement} icon - The rotate icon element.
 */
function startIconAnimation(icon) {
    let isShowingFirstImage = true;
    icon.animationInterval = setInterval(() => {
        icon.src = isShowingFirstImage ? 'img/landing_page/rotate.png' : 'img/landing_page/rotate1.png';
        isShowingFirstImage = !isShowingFirstImage;
    }, 500);
}

/**
 * Stops the rotation icon animation by clearing the interval.
 */
function stopIconAnimation() {
    const rotateIcon = document.getElementById('rotate-icon');
    clearInterval(rotateIcon.animationInterval);
}


/**
 * Restarts the game by clearing previous game loops, resetting intervals and timeouts,
 * and initializing the game level again.
 */
function restartGame() {
    cancelAnimationFrame(world.animationFrameId);
    clearAllIntervals();
    clearAllTimeouts();

    const canvas = document.getElementById('canvas');

    initLevel();
    world = new World(canvas, keyboard);

    world.run();

    document.getElementById('end-game-buttons').style.display = 'none';
}

/**
 * Clears all active intervals by iterating through a large range of possible interval IDs.
 */
function clearAllIntervals() {
    for (let i = 1; i < 10000; i++) {
        clearInterval(i);
    }
}

/**
 * Clears all active timeouts by iterating through a large range of possible timeout IDs.
 */
function clearAllTimeouts() {
    for (let i = 1; i < 10000; i++) {
        clearTimeout(i);
    }
}

/**
 * Redirects the user to the main menu by changing the current window's location to the index page.
 */
function exitToMainMenu() {
    window.location.href = 'index.html';
}
