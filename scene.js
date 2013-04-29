/**
 * scene.js 0.1.0
 * author: Yosiya Hinosawa ( @kt3k )
 * license: MIT License ( http://kt3k.mit-license.org/ )
 * depends on: YLEP
 */

/**
 * define yggs scene interface
 */

window.scene = (function () {
    'use strict';

    var scene = function () {
        this.state = exports.IS_ABSENT;
    };

    var exports = function (args) {
        return new scene(args);
    };

    var scenePrototype = scene.prototype = exports.prototype = {constructor: exports};

    exports.IS_ABSENT = 0;
    exports.IS_ENTERING = 1;
    exports.IS_PRESENT = 2;
    exports.IS_EXITTING = 3;

    // on enter decorator
    exports.OnEnterMethod = function (onEnter) {
        return function (done) {
            if (this.state !== exports.IS_ABSENT) {
                throw 'failed to start the scene: scene is not stopped, state = ' + this.state;
            }

            this.state = exports.IS_ENTERING;

            var self = this;

            var wrappedDone = function () {
                self.state = exports.IS_PRESENT;
                done();
            };

            onEnter.call(this, wrappedDone);
        };
    };

    // on exit decorator
    exports.OnExitMethod = function (onExit) {
        return function (done) {
            if (this.state !== exports.IS_PRESENT) {
                throw 'failed to stop the scene: scene is not running, state = ' + this.state;
            }

            this.state = exports.IS_EXITTING;

            var self = this;

            var wrappedDone = function () {
                self.state = exports.IS_ABSENT;
                done();
            };

            onExit.call(this, wrappedDone);
        };
    };

    YLEP.executeOnContext(function () {

        // branching method
        exports.setBranchGenerator(function (scenePrototype) {
            scenePrototype.onEnter = exports.OnEnterMethod(scenePrototype.onEnter);

            scenePrototype.onExit = exports.OnExitMethod(scenePrototype.onExit);
        });
    });

    scenePrototype.onEnter = null;

    scenePrototype.onExit = null;

    scenePrototype.onConfirmExit = function (reply) {
        var answer = true;

        if (this.exitConfirmNeeded) {
            answer = window.confirm(this.exitConfirmMessage);
        }

        reply(answer);
    };

    scenePrototype.exitConfirmMessage = 'Do you really want to leave this scene?';

    scenePrototype.exitConfirmNeeded = false;

    return exports;
}());
