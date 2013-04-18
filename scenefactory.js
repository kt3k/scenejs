/**
 * scenefactory.js v1.0
 * author: Yosiya Hinosawa ( @kt3k )
 */

window.FactoryFactory = function (parent, modifier) {
    'use strict';

    parent = parent || Object;

    return function (additionals) {

        return (function () {
            var exports = function () {
                return new Class();
            };

            var Class = function () {
                constructor.apply(this, arguments);
            };

            var constructor = additionals.constructor || parent;
            delete additionals.constructor;

            constructor.__super__ = parent;

            var classPrototype = Class.prototype = exports.prototype = new parent();

            classPrototype.constructor = exports;

            modifier(additionals);

            Object.keys(additionals).forEach(function (key) {
                classPrototype[key] = additionals[key]
            });

            return exports;
        }());
    };
};

window.SceneFactory = function (additionals) {
    'use strict';

    return (function () {
        var exports = function () {
            return new Scene();
        };

        var Scene = function () {
            constructor.apply(this, arguments);
        };

        var constructor = additionals.constructor;
        delete additionals.constructor;

        var parent = window.scene;

        var scenePrototype = Scene.prototype = exports.prototype = new parent();

        scenePrototype.constructor = exports;

        Function.prototype.E = function (dtor) { return dtor(this); };

        scenePrototype.onEnter = additionals.onEnter.E(window.scene.OnEnterMethod);

        scenePrototype.onExit = additionals.onExit.E(window.scene.OnExitMethod);

        Object.keys(additionals).forEach(function (key) {
            if (key === 'onExit' || key === 'onEnter') {
                return;
            }

            scenePrototype[key] = additionals[key];
        });

        delete Function.prototype.E;

        return exports;
    }());
};

window.SceneFactory = window.FactoryFactory(window.scene, function (scenePrototype) {
    'use strict';

    scenePrototype.onEnter = window.scene.OnEnterMethod(scenePrototype.onEnter);

    scenePrototype.onExit = window.scene.OnExitMethod(scenePrototype.onExit);
});
