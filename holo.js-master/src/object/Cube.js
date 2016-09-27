/**
 * Created by MuratCan on 7.9.2016.
 */
HOLO.Cube = function (width, height, depth, color, transparent, oppacity) {
    THREE.Group.call(this);
    this.type = 'Group';
    this._inside = [];
    this.autoScale = true;

    this._width = width || 200;
    this._height = height || 200;
    this._depth = depth || 200;
    this._color = color || 0x66ff33;
    this._transparent = transparent || true;
    this._oppacity = oppacity || 0.5;

    this._cubeGeometry = new THREE.CubeGeometry(this._width, this._height, this._depth);
    this._cubeMaterials = [
        new THREE.MeshBasicMaterial({
            color: this._color,
            transparent: this._transparent,
            opacity: this._oppacity,
            side: THREE.DoubleSide
        }),
        new THREE.MeshBasicMaterial({
            color: this._color,
            transparent: this._transparent,
            opacity: this._oppacity,
            side: THREE.DoubleSide
        }),
        new THREE.MeshBasicMaterial({
            color: this._color,
            transparent: this._transparent,
            opacity: this._oppacity,
            side: THREE.DoubleSide
        }),
        new THREE.MeshBasicMaterial({
            color: this._color,
            transparent: this._transparent,
            opacity: this._oppacity,
            side: THREE.DoubleSide
        }),
        new THREE.MeshBasicMaterial({
            color: this._color,
            transparent: this._transparent,
            opacity: this._oppacity,
            side: THREE.DoubleSide
        }),
        new THREE.MeshBasicMaterial({
            color: this._color,
            transparent: this._transparent,
            opacity: this._oppacity,
            side: THREE.DoubleSide
        })
    ];
    this._cubeFaceMaterial = new THREE.MeshFaceMaterial(this._cubeMaterials);
    this._cubeMesh = new THREE.Mesh(this._cubeGeometry, this._cubeFaceMaterial);
    this.add(this._cubeMesh);
    this._cubeGeometry.computeBoundingBox();
    this.boundingBox = this._cubeGeometry.boundingBox;
};

HOLO.Cube.prototype = Object.assign(Object.create(THREE.Group.prototype), {
    constructor: HOLO.Cube,

    addToCube: function (object) {
        if (this.autoScale) {
            this._fit(object);
            this._inside.push(object);
            if (this._inside.length > 1) {
                this.children = this.children.slice(0, 1);
                this._computeSpacing();
                var totalY = 0;
                for (var i = 0; i < this._inside.length; i++) {
                    this._inside[i].computeBoundingBox();
                    totalY += this._inside[i].boundingBox.max.y;
                }
                var scale = this._objectSpace / totalY;
                var start = +this.boundingBox.max.y / 2;
                var temp;
                for (var i = 0; i < this._inside.length; i++) {
                    temp = this._inside[i].clone();
                    if (totalY > this.boundingBox.max.y) temp.scale.set(scale, scale, scale);
                    temp.position.set(0, start, 0);
                    this.add(temp);
                    temp.computeBoundingBox();
                    start -= (temp.boundingBox.max.y + this._singleSpacing);
                }
            }
            else this.add(object);
        }
        else this.add(object);
    },

    _fit: function (object) {
        object.computeBoundingBox();
        var scale;
        if (object.boundingBox.max.x > this.boundingBox.max.x) {
            scale = this.boundingBox.max.x / object.boundingBox.max.x;
            object.scale.set(scale, scale, scale);
        }
        if (object.boundingBox.max.y > this.boundingBox.max.y) {
            scale = this.boundingBox.max.y / object.boundingBox.max.y;
            object.scale.set(scale, scale, scale);
        }
        if (object.boundingBox.max.z > this.boundingBox.max.z) {
            scale = this.boundingBox.max.z / object.boundingBox.max.z;
            object.scale.set(scale, scale, scale);
        }
    },

    _computeSpacing: function () {
        this._totalSpacing = this.boundingBox.max.y / this._inside.length + 1;
        this._singleSpacing = this._totalSpacing / this._inside.length - 1;
        this._objectSpace = this.boundingBox.max.y - this._totalSpacing;
    },

    set color(newColor) {
        for (var i = 0; i < this._cubeGeometry.faces.length; i++) {
            this._cubeGeometry.faces[i].color = newColor;
        }
        this._cubeGeometry.colorsNeedUpdate = true;
    },
    get color (){
        return new THREE.Color(this._color);
    }
});