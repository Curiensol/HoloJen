/**
 * Changes scale of the given object to the newScale in given steps.
 *
 * Created by MuratCan on 25.8.2016.
 */
HOLO.ChangeScaleAnimation = function (object, newScale, steps) {
    this._object = object;
    this._steps = steps;
    if(newScale.constructor === Array) this._calcSteps(new THREE.Vector3(newScale[0], newScale[1], newScale[2]));
    else if(newScale.isVector3) this._calcSteps(newScale);
    else if(typeof newScale === "number") this._calcSteps(new THREE.Vector3(newScale, newScale, newScale));
    else throw new Error( 'Object is not an array or vector: ');
};

HOLO.ChangeScaleAnimation.prototype = {
    constructor: HOLO.ChangeScaleAnimation,

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
     * @param newScale
     * @private
     */
    _calcSteps : function (newScale) {
        this._changeX = Math.pow(newScale.x, 1/this._steps);
        this._changeY = Math.pow(newScale.y, 1/this._steps);
        this._changeZ = Math.pow(newScale.z, 1/this._steps);
    },

    /**
     * Changes the objects scale by one step every time this function is called.
     * Decrements the step counter.
     *
     * @private
     */
    _lerp : function () {
        this._object.scale.set(this._changeX, this._changeY, this._changeZ);
        this._steps -= 1;
    },

    /**
     * Function that is called by animator object.
     */
    animate: function () {
        this._lerp();
    }
};