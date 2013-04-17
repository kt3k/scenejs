/**
 * scenefactory.js v1.0
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

        Object.keys(additionals).forEach(function (key) {
            if (key === 'onExit' || key === 'onEnter' || key === 'constructor') {
                return
            }

            scenePrototype[key] = additionals[key];
        });

        delete Function.prototype.E;

        return exports;
    }());
};

