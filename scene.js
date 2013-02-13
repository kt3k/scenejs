/**
 * scene.js 0.1.0
 * author: Yosiya Hinosawa ( @kt3k ) 
 * license: MIT License ( http://kt3k.mit-license.org/ )
 */

/**
 * define yggs scene interface
 */

window.scene = (function () {

    var scene = function (args) {
    };

    var pt = scene.prototype;

    pt.state = exports.IS_STOPPED;

    pt.stateChange = function () {
    };

    pt.methodOnStart = function (onStart) {
        return function (done, fail) {
            if (this.state !== exports.IS_STOPPED) {
                throw 'failed to start the scene: scene is not stopped, state = ' + this.state;
            }

            this.state = exports.IS_STARTING;

            var self = this;

            var wrappedDone = function () {
                self.state = exports.IS_RUNNING;
                done();
            };

            onStart.call(this, wrappedDone, fail);
        };
    };

    pt.methodOnStop = function (onStop) {
        return function (done, fail) {
            if (this.state !== exports.IS_RUNNING) {
                throw 'failed to stop the scene: scene is not running, state = ' + this.state;
            }

            this.state = exports.IS_STOPPING;

            var self = this;

            var wrappedDone = function () {
                self.state = exports.IS_STOPPED;
                done();
            };

            onStop.call(this, wrappedDone, fail);
        };
    };

    pt.onStart = null;

    pt.onStop = null;

    pt.onConfirm = null;

    var exports = function (args) {
        return new scene(args);
    };

    pt.constructor = exports;

    exports.prototype = pt;

    exports.IS_STOPPED = 0;
    exports.IS_STARTING = 1;
    exports.IS_RUNNING = 2;
    exports.IS_STOPPING = 3;

    return exports;

}());
