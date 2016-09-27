/**
 * Changes position of the given object to the newLocation in given steps.
 *
 * Created by MuratCan on 25.8.2016.
 */
HOLO.ChangeLocationAnimation = function (object, newLocation, steps) {
    this._object = object;
    this._steps = steps;
    if(newLocation.constructor === Array) this._calcSteps(new THREE.Vector3(newLocation[0], newLocation[1], newLocation[2]));
    else if(newLocation.isVector3) this._calcSteps(newLocation);
    else throw new Error( 'Object is not an array or vector: ');
};

HOLO.ChangeLocationAnimation.prototype = {
    constructor: HOLO.ChangeLocationAnimation,

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
     * @param newLocation
     * @private
     */
    _calcSteps : function (newLocation) {
        this._changeX = (newLocation.x - this._object.position.x) / this._steps;
        this._changeY = (newLocation.y - this._object.position.y) / this._steps;
        this._changeZ = (newLocation.z - this._object.position.z) / this._steps;
    },

    /**
     * Changes the objects location by one step every time this function is called.
     * Decrements the step counter.
     *
     * @private
     */
    _lerp : function () {
        this._object.position.x += this._changeX;
        this._object.position.y += this._changeY;
        this._object.position.z += this._changeZ;
        this._steps -= 1;
    },

    /**
     * Function that is called by animator object.
     */
    animate: function () {
        this._lerp();
    }
};