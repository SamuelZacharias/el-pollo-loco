/**
 * AudioManager class to manage game audio, including sound effects and background music.
 */
class AudioManager {
    /**
     * Initializes the AudioManager with predefined sound effects and background music.
     * Sets default volume levels and ensures the background music loops.
     */
    constructor() {
        this.sounds = {
            walking: new Audio('sounds/walking.mp3'),
            chicken: new Audio('sounds/chicken.mp3'),
            backgroundMusic: new Audio('sounds/background.wav'),
            hitEnemy: new Audio('sounds/bottle.wav'),
        };
        this.sounds.walking.volume = 0.1;
        this.sounds.hitEnemy.volume = 0.1;
        this.sounds.backgroundMusic.volume = 0.01;
        this.sounds.backgroundMusic.loop = true;
    }

    /**
     * Mutes or unmutes all game sounds.
     *
     * @param {boolean} muted - If true, all sounds will be muted; otherwise, they will be unmuted.
     */
    muteAll(muted) {
        Object.values(this.sounds).forEach((sound) => {
            sound.muted = muted;
        });
    }

    /**
     * Plays the sound effect for hitting an enemy.
     * Resets the sound's current time to 0 to ensure it plays from the beginning.
     */
    playHitSound() {
        this.sounds.hitEnemy.currentTime = 0;  // Reset the sound to the beginning
        this.sounds.hitEnemy.play();
    }

    /**
     * Plays the background music.
     * Catches and logs any error that may occur while attempting to play the music.
     */
    playBackgroundMusic() {
        this.sounds.backgroundMusic.play().catch((error) => {
            console.error("Fehler beim Abspielen der Hintergrundmusik: ", error);
        });
    }

    /**
     * Pauses the background music.
     */
    pauseBackgroundMusic() {
        this.sounds.backgroundMusic.pause();
    }

    /**
     * Sets the volume of the background music.
     *
     * @param {number} volume - The desired volume level (range from 0.0 to 1.0).
     */
    setBackgroundMusicVolume(volume) {
        this.sounds.backgroundMusic.volume = volume;
    }
}
