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

            constructor.parent = parent;

            var classPrototype = Class.prototype = exports.prototype = new parent();

            classPrototype.constructor = Class;

            modifier(additionals);

            Object.keys(additionals).forEach(function (key) {
                classPrototype[key] = additionals[key]
            });

            return exports;
        }());
    };
};

window.SceneFactory = window.FactoryFactory(window.scene, function (scenePrototype) {
    'use strict';

    scenePrototype.onEnter = window.scene.OnEnterMethod(scenePrototype.onEnter);

    scenePrototype.onExit = window.scene.OnExitMethod(scenePrototype.onExit);
});
