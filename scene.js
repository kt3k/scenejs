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

    var IS_STOPPED = 0;
    var IS_STARTING = 1;
    var IS_RUNNING = 2;
    var IS_STOPPING = 3;

    pt.state = IS_STOPPED;

    pt.stateChange = function () {
    };

    pt.methodOnStart = function (onStart) {
        return function (done, fail) {
            if (this.state !== IS_STOPPED) {
                throw 'failed to start the scene: scene is not stopped, state = ' + this.state;
            }

            this.state = IS_STARTING;

            var self = this;

            var wrappedDone = function () {
                self.state = IS_RUNNING;
                done();
            };

            onStart.call(this, wrappedDone, fail);
        };
    };

    pt.methodOnStop = function (onStop) {
        return function (done, fail) {
            if (this.state !== IS_RUNNING) {
                throw 'failed to stop the scene: scene is not running, state = ' + this.state;
            }

            this.state = IS_STOPPING;

            var self = this;

            var wrappedDone = function () {
                self.state = IS_STOPPED;
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

    return exports;
}());
