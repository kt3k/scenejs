/**
 * titlescene.js v0.1
 * author: Yosiya Hinosawa ( @kt3k )
 */

window.SceneFactory = function (additionals) {
    'use strict';

    return (function () {
        var exports = function () {
            return new Scene();
        };

        var Scene = function () {
            additionals.constructor.apply(this, arguments);
        };

        var scene = window.scene;

        var scenePrototype = Scene.prototype = exports.prototype = new scene();

        scenePrototype.constructor = exports;

        Function.prototype.E = function (dtor) { return dtor(this); };

        scenePrototype.onEnter = additionals.onEnter.E(scene.OnEnterMethod);

        scenePrototype.onExit = additionals.onExit.E(scene.OnExitMethod);

        delete additionals.onExit;
        delete additionals.onEnter;
        delete additionals.constructor;

        Object.keys(additionals).forEach(function (key) {
            scenePrototype[key] = additionals[key];
        });

        delete Function.prototype.E;

        return exports;
    }());
};

