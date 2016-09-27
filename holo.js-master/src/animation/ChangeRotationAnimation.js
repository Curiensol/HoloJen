/**
 * Changes rotation of the given object to the newLocation in given steps.
 *
 * Quaternion support will be added on later revisions.
 *
 * Created by MuratCan on 25.8.2016.
 */
HOLO.ChangeRotationAnimation = function (object, newRotation, steps) {
    this._object = object;
    this._steps = steps;
    if (newRotation.constructor === Array) {
        this._calcSteps(new THREE.Vector3(newRotation[0], newRotation[1], newRotation[2]));
    }
    else if (newRotation.isVector3) {
        this._calcSteps(newRotation);
    }
    else {
        throw new Error('Object is not an array or vector: ');
    }
}
;

HOLO.ChangeRotationAnimation.prototype = {
    constructor: HOLO.ChangeRotationAnimation,

    /**
     * Returns true if the animation has been finished.
     *
     * @returns {boolean}
     */
    get finished() {
        return this._steps < 1;
    },

    /**
     * Calculates the units of change that the object is going to take in every step.(in every axis)
     *
     * @param newRotation
     * @private
     */
    _calcSteps: function (newRotation) {
        this._changeX = (newRotation.x - this._object.rotation.x) / this._steps;
        this._changeY = (newRotation.y - this._object.rotation.y) / this._steps;
        this._changeZ = (newRotation.z - this._object.rotation.z) / this._steps;
    },

    /**
     * Changes the objects rotation by one step every time this function is called.
     * Decrements the step counter.
     *
     * @private
     */
    _lerp: function () {
        this._object.rotation.x += this._changeX;
        this._object.rotation.y += this._changeY;
        this._object.rotation.z += this._changeZ;
        this._steps -= 1;
    },

    /**
     * Function that is called by animator object.
     */
    animate: function () {
        this._lerp();
    }
};