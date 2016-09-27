/**
 * Created by MuratCan on 7.9.2016.
 */

//Constructor
HOLO.Model = function (geometry, material) {
    THREE.Mesh.call(this, geometry, material);
    this.type = 'Mesh';
};

//Prototypes
HOLO.Model.prototype = Object.assign( Object.create( THREE.Mesh.prototype ), {
    constructor: HOLO.Model,

    computeBoundingBox: function () {
        this.geometry.computeBoundingBox();
        this.boundingBox = this.geometry.boundingBox;
    }
});