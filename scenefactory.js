/**
 * titlescene.js v0.1
 * author: Yosiya Hinosawa ( @kt3k )
 */

window.SceneFactory = function (additional) {
    'use strict';

    return (function () {
        var exports = function () {
            return new Scene();
        };

        var Scene = function () {
            additional.constructor.apply(this, arguments);
        };

        var scene = window.scene;

        var scenePrototype = Scene.prototype = exports.prototype = new scene();

        scenePrototype.constructor = exports;

        Function.prototype.E = function (dtor) { return dtor(this); };

        scenePrototype.onEnter = additional.onEnter.E(scene.OnEnterMethod);

        scenePrototype.onExit = additional.onExit.E(scene.OnExitMethod);

        delete Function.prototype.E;

        return exports;
    }());
};

