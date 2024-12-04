/**
 * The Drawableobject class serves as a base class for objects that can be drawn on the canvas.
 * It provides common properties and methods for loading images and drawing them.
 */
class Drawableobject {
    img;             // Holds the current image to be drawn.
    imageCache = {}; // Caches loaded images to avoid redundant loading.
    currentImage = 0;
    y = 80;          // The y-coordinate position of the object on the canvas.
    x = 150;         // The x-coordinate position of the object on the canvas.
    width = 75;      // The width of the object on the canvas.
    height = 75;     // The height of the object on the canvas.

    /**
     * Loads an image from the given file path and assigns it to the object.
     * 
     * @param {string} path - The path to the image file.
     */
    loadImage(path) {
        if (!this.imageCache[path]) {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        }
        this.img = this.imageCache[path];  // Set the current image to the cached version
    }

    /**
     * Draws the object's image onto the given canvas context.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas context on which to draw the image.
     */
    draw(ctx) {
        if (this.img) {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } else {
            console.error('Error drawing image: Image not loaded properly.', this);
        }
    }

    /**
     * Optionally draws a frame around certain game objects for debugging purposes.
     * Only draws the frame if debugging is enabled.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas context on which to draw the frame.
     * @param {boolean} debug - If true, it will draw a frame for debugging purposes.
     */
    drawFrame(ctx, debug = false) {
        if (debug && (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof ThrowableObject || this instanceof Bottle || this instanceof Coin)) {
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.width, this.height);  // Draw a rectangle frame around the object
            ctx.strokeStyle = 'red';  // Set the color of the frame (for debugging)
            ctx.stroke();
        }
    }

    /**
     * Loads multiple images and caches them in the imageCache property.
     * 
     * @param {Array<string>} arr - An array of image file paths to be loaded.
     */
    loadImages(arr) {
        arr.forEach(path => {
            if (!this.imageCache[path]) {
                let img = new Image();
                img.src = path;
                this.imageCache[path] = img;
            }
        });
    }
}
