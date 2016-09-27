/**
 * Created by MuratCan on 4.9.2016.
 */
HOLO.ThreeSidedDisplay = function (renderer) {
    this.cameraDistance = 1000;
    this.reflectFromAbove = true;

    var _width, _height, _startX, _startY;

    var _cameraF = new THREE.PerspectiveCamera(),
        _cameraL = new THREE.PerspectiveCamera(),
        _cameraR = new THREE.PerspectiveCamera();
    var _position = new THREE.Vector3();
    var _quaternion = new THREE.Quaternion();
    var _scale = new THREE.Vector3();

    renderer.autoClear = false;

    this.setSize = function (width, height) {
        if (width < height) {
            _width = width / 2;
            _height = width / 2;
            _startX = 0;
            _startY = (height - (3 * _height)) / 2;
        } else {
            _height = height / 2;
            _width = height / 2;
            _startX = (width - (3 * _width)) / 2;
            _startY = 0;
        }
        renderer.setSize(width, height);
    };

    this.render = function (scene, camera) {
        this.cameraDistance = camera.far/2;
        scene.updateMatrixWorld();
        this._setCameras(camera);
        this._setScissors();
    };

    this._setCameras = function (camera) {
        if (camera.parent === null) camera.updateMatrixWorld();
        camera.matrixWorld.decompose(_position, _quaternion, _scale);

        var _center = new THREE.Vector3(0, 0, -this.cameraDistance).applyQuaternion(_quaternion).round().add(_position);
        var _left = new THREE.Vector3(-this.cameraDistance, 0, 0).applyQuaternion(_quaternion).round().add(_center);
        var _right = new THREE.Vector3(this.cameraDistance, 0, 0).applyQuaternion(_quaternion).round().add(_center);

        var _rotateX_90 = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1,0,0), Math.PI / 2);
        var _rotateY_90 = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0), Math.PI / 2);
        var _rotateY_M90 = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0), - Math.PI / 2);
        var _rotateZ_180 = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,0,1), Math.PI);

        var _quatR = new THREE.Quaternion().copy(_quaternion).multiply(_rotateX_90).multiply(_rotateY_90);
        var _quatL = new THREE.Quaternion().copy(_quaternion).multiply(_rotateX_90).multiply(_rotateY_M90);

        _cameraF.position.copy(_position);
        if(this.reflectFromAbove) _cameraF.quaternion.copy(_quaternion.multiply(_rotateZ_180));
        else _cameraF.quaternion.copy(_quaternion);
        _cameraF.far = camera.far;

        _cameraR.position.copy(_right);
        _cameraR.quaternion.copy(_quatR);
        _cameraR.far = camera.far;

        _cameraL.position.copy(_left);
        _cameraL.quaternion.copy(_quatL);
        _cameraL.far = camera.far;
    };

    this._setScissors = function () {
        renderer.clear();
        renderer.setScissorTest(true);

        if (this.reflectFromAbove) {
            renderer.setScissor(_startX + _width, _startY + _height, _width, _height);
            renderer.setViewport(_startX + _width, _startY + _height, _width, _height);
            renderer.render(scene, _cameraF);

            renderer.setScissor(_startX, _startY, _width, _height);
            renderer.setViewport(_startX, _startY, _width, _height);
            renderer.render(scene, _cameraR);

            renderer.setScissor(_startX + (2 * _width), _startY, _width, _height);
            renderer.setViewport(_startX + (2 * _width), _startY, _width, _height);
            renderer.render(scene, _cameraL);

        } else {
            renderer.setScissor(_startX + _height, _startY, _width, _height);
            renderer.setViewport(_startX + _height, _startY, _width, _height);
            renderer.render(scene, _cameraF);

            renderer.setScissor(_startX, _startY + _height, _height, _width);
            renderer.setViewport(_startX, _startY + _height, _height, _width);
            renderer.render(scene, _cameraL);

            renderer.setScissor(_startX + _height + _width, _startY + _height, _height, _width);
            renderer.setViewport(_startX + _height + _width, _startY + _height, _height, _width);
            renderer.render(scene, _cameraR);
        }

        renderer.setScissorTest(false);
    };
};
