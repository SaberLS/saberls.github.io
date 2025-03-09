// import getTransitionDuration from './getTransitionDuration.js'

/**
 * Represents a 3D Cube with interactive features.
 *
 * @class Cube
 * @param {HTMLElement} cube - The HTML element representing the cube.
 */
class Cube {
  constructor(cube) {
    /**  @member {HTMLElement} - The HTML element representing the cube.*/
    this.main = cube;

    /**  @member {number} - `timeoutID` used to `cancelTimeout()` delayed rotation */
    this.willRotate = 0;

    /**  @member {number} - `timeoutID` used to `cancelTimeout()` delayed rotation */
    this.transitionDuration = this.getTransitionDuration();

    // ----------------- Events ----------------- \\
    this.main.addEventListener('animationcancel', () => {
      // console.log('animationcancel');
      this.setDefaultTransform(); // 3. Starts transition which reverses the .rotate animation
    });

    this.main.addEventListener('mouseover', ({ target }) => {
      this.stop();
      target.classList.add('select');
    });

    this.main.addEventListener('mouseout', (event) => {
      this.rotate(event);
      event.target.classList.remove('select');
    });
  }

  /**
   * Rotates the cube based on the mouse out event.
   *
   * @param {HTMLElement} event.relatedTarget - The element the mouse is moving to.
   */
  rotate = ({ relatedTarget: movedTo }) => {
    // console.log('mouse out');
    // console.log(movedTo);

    this.willRotate = setTimeout(() => {
      // if cursor was moved out of window or on element which is not part of cube
      if (movedTo === null || !movedTo.classList.contains('face')) {
        // console.log('rotate');
        // console.log(this.main.style);
        this.main.style.transform = ''; // set transform to default value
        this.main.classList.add('rotate'); // start rotate animation
      }
    }, this.transitionDuration);
  };

  /**
   * Stops the cube's rotation based on its current state.
   * If the cube is currently rotating, it freezes the rotation at its current animation state.
   * If the cube is not rotating but a rotation is scheduled,
   * it cancels that scheduled rotation.
   *
   * @returns {void} This method does not return a value.
   */
  stop = () => {
    if (this.isRotating()) {
      this.freezeRotation();
    } else {
      this.cancelScheduledRotation();
    }
  };

  /**
   * Freezes the cube's rotation at its current animation state.
   *
   * This method sets the cube's transform style to its current computed value,
   * effectively stopping the rotation animation at its current position.
   * After freezing the rotation, the method removes the 'rotate' class from the cube's class list,
   * which cancels the ongoing animation.
   *
   * @returns {String}  Transform style at which animation stopped.
   */
  freezeRotation() {
    // 1. set transform to current computed value to stop at current animation state
    const stopAt = this.getComputedTransform();
    this.main.style.transform = this.getComputedTransform();

    // 2. cancel animation
    this.main.classList.remove('rotate');
    return stopAt;
  }

  /**
   * Cancels any scheduled rotation of the cube.
   *
   * This method checks if there's a pending rotation (scheduled by setTimeout)
   * and cancels it if it exists. It also resets the willRotate flag.
   *
   * @returns {void} This method does not return a value.
   */
  cancelScheduledRotation() {
    if (this.willRotate) {
      clearTimeout(this.willRotate);
      this.willRotate = 0;
    }
  }

  /**
   * Checks if the cube is currently rotating.
   *
   * @returns {boolean} - True if the cube is rotating, false otherwise.
   */
  isRotating() {
    return this.main.classList.contains('rotate');
  }

  /**
   * Retrieves the current computed transform value of the cube.
   *
   * @returns {string} - The current computed transform value.
   */
  getComputedTransform() {
    return window.getComputedStyle(this.main).transform;
  }

  /**
   * Resets the cube's transform style to its default value.
   *
   * This method clears any existing transform styles applied to the cube,
   * effectively resetting it to its original position and orientation.
   *
   * @returns {void} This method does not return a value.
   */
  setDefaultTransform() {
    this.main.style.transform = '';
  }

  /**
   * Retrieves the transition duration of the cube's rotate animation.
   *
   * @returns {number} - The transition duration in milliseconds.
   */
  getTransitionDuration() {
    return getTransitionDuration(this.main);
  }
}

/**
 * Calculates the transition duration of an element in milliseconds.
 *
 * @param {HTMLElement} element - The HTML element to check for transition duration.
 * @returns {number} The transition duration in milliseconds.
 */
function getTransitionDuration(element) {
  // This returns a string representing the duration, typically in seconds (e.g., "0.5s").
  const durationString =
    window.getComputedStyle(element)['transition-duration'];

  // If the element does not have a transition-duration, it returns 0.
  if (durationString === '') return 0;

  // Convert the string duration to milliseconds by removing the "s" suffix and multiplying by 1000.
  const timeout = durationString.slice(0, durationString.length - 1) * 1000;
  return timeout;
}

// eslint-disable-next-line no-unused-vars
const cube = new Cube(document.querySelector('.cube'));
