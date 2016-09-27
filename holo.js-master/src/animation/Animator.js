/**
 * Container for all animations.
 *
 * Created by MuratCan on 25.8.2016.
 */
HOLO.Animator = function () {
    this._animations = [];
};

HOLO.Animator.prototype = {
    constructor: HOLO.Animator,

    /**
     * Adds given animation to the array.
     *
     * @param animation
     */
    add: function (animation) {
        this._animations.push(animation);
    },

    /**
     * Removes given animation from the array
     *
     * @param animation
     */
    remove: function (animation) {
        var index = this._animations.indexOf(animation);
        if(index > -1) this._animations.splice(index, 1);
    },

    /**
     * Animates all animations in the array.
     * If there is a finished animation, removes from the list.
     */
    animate: function () {
        for(var i = 0; i < this._animations.length; i++){
            this._animations[i].animate();
            if(this._animations[i].finished)this.remove(this._animations[i]);
        }
    }
};