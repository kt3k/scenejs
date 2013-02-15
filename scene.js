/**
 * scene.js 0.1.0
 * author: Yosiya Hinosawa ( @kt3k )
 * license: MIT License ( http://kt3k.mit-license.org/ )
 */

/**
 * define yggs scene interface
 */

window.scene = (function () {
    'use strict';

    var scene = function () {
    };

    var pt = scene.prototype;

    pt.stateChange = function () {
    };

    pt.methodOnEnter = function (onEnter) {
        return function (done, fail) {
            if (this.state !== exports.IS_ABSENT) {
                throw 'failed to start the scene: scene is not stopped, state = ' + this.state;
            }

            this.state = exports.IS_ENTERING;

            var self = this;

            var wrappedDone = function () {
                self.state = exports.IS_PRESENT;
                done();
            };

            onEnter.call(this, wrappedDone, fail);
        };
    };

    pt.methodOnExit = function (onExit) {
        return function (done, fail) {
            if (this.state !== exports.IS_PRESENT) {
                throw 'failed to stop the scene: scene is not running, state = ' + this.state;
            }

            this.state = exports.IS_EXITTING;

            var self = this;

            var wrappedDone = function () {
                self.state = exports.IS_ABSENT;
                done();
            };

            onExit.call(this, wrappedDone, fail);
        };
    };

    pt.onEnter = null;

    pt.onExit = null;

    pt.onConfirmExit = function (reply) {
        var answer = true;

        if (this.exitConfrimNeeded) {
            answer = window.confirm(this.exitConfirmMessage);
        }

        reply(answer);
    };

    pt.exitConfirmMessage = 'Is it ok to leave this page?';

    pt.exitConfrimNeeded = false;

    var exports = function (args) {
        return new scene(args);
    };

    pt.constructor = exports;

    exports.prototype = pt;

    exports.IS_ABSENT = 0;
    exports.IS_ENTERING = 1;
    exports.IS_PRESENT = 2;
    exports.IS_EXITTING = 3;

    pt.state = exports.IS_ABSENT;

    return exports;

}());
