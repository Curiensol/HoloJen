/**
 * Created by MuratCan on 11.9.2016.
 *
 */
HOLO.Text = function (font, text, size, height, curveSegments) {
    this._font = font;
    this._text = text || 'HoloJen';
    this._textSize = size || 80;
    this._textHeight = height || 20;
    this._curveSegments = curveSegments || 2;

    this._textGeometry = new THREE.TextGeometry(this._text, {
        font: this._font,
        size: this._textSize,
        height: this._textHeight,
        curveSegments: this._curveSegments
    });
    this._textGeometry.center();

    this._textMaterial = new THREE.MultiMaterial([
        new THREE.MeshBasicMaterial({color: 0x4a5c66, overdraw: 0.5}),
        new THREE.MeshBasicMaterial({color: 0xffffff, overdraw: 0.5})
    ]);
    THREE.Mesh.call(this, this._textGeometry, this._textMaterial);
    this.type = "Mesh";
};

HOLO.Text.prototype = Object.assign(Object.create(THREE.Mesh.prototype), {
    constructor: HOLO.Text,

    computeBoundingBox: function () {
        this._textGeometry.computeBoundingBox();
        this.boundingBox = this._textGeometry.boundingBox;
    },

    clone: function () {
        return new this.constructor(this._font, this._text).copy( this );
    }
});