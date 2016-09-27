/**
 * Changes rotation of the given object until it is stopped manually.
 *
 * Quaternion support will be added on later revisions.
 *
 * Created by MuratCan on 25.8.2016.
 */
HOLO.RotationAnimation = function (object, alpha, rotationVector) {
    this._object = object;
    this._steps = 1;

    //Setting alpha
    var a;
    if (alpha !== undefined && typeof alpha !== "number") throw new Error('Alpha is not a float value.');
    else a = alpha || 1;

    //setting rotationVector
    if (rotationVector.constructor === Array)
        this._calcSteps(new THREE.Vector3(rotationVector[0], rotationVector[1], rotationVector[2]), a);
    else if (rotationVector.isVector3) this._calcSteps(rotationVector, a);
    else throw new Error('Object is not an array or vector: ');
}
;

HOLO.RotationAnimation.prototype = {
    constructor: HOLO.RotationAnimation,

    /**
     * Returns true if the animation has been finished.
     *
     * @returns {boolean}
     */
    get finished() {
        return this._steps < 1;
    },

    /**
     * Starts animation if stopped.
     */
    start : function () {
        this._steps = 1;
    },

    /**
     * Stops the animation.
     */
    stop : function () {
        this._steps = 0;
    },

    /**
     * Calculates the units of change that the object is going to take in every step.(in every axis)
     *
     * @param rotationVector
     * @param alpha
     * @private
     */
    _calcSteps: function (rotationVector, alpha) {
        this._changeX = rotationVector.x * alpha;
        this._changeY = rotationVector.y * alpha;
        this._changeZ = rotationVector.z * alpha;
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
    },

    /**
     * Function that is called by animator object.
     */
    animate: function () {
        this._lerp();
    }
};