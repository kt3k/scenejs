/**
 * scenefactory.js v1.0
 * author: Yosiya Hinosawa ( @kt3k )
 */

Function.prototype.setBranchGenerator = function (modifier) {
    'use strict';

    var parent = this;
    modifier = typeof modifier === 'function' ? modifier : function () {};

    this.branch = function (additionals) {

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

window.scene.setBranchGenerator(function (scenePrototype) {
    'use strict';

    scenePrototype.onEnter = window.scene.OnEnterMethod(scenePrototype.onEnter);

    scenePrototype.onExit = window.scene.OnExitMethod(scenePrototype.onExit);
});
