/**
 * scene.js 0.1.0
 * author: Yosiya Hinosawa ( @kt3k )
 * license: MIT License ( http://kt3k.mit-license.org/ )
 * dependencies: YLEP
 */

/**
 * define yggs scene interface
 */

window.scene = Object.branch(function (scenePrototype, parent, decorators) {
    'use strict';

    scenePrototype.constructor = function () {
        this.state = IS_ABSENT;
    };

    var IS_ABSENT = 0;
    var IS_ENTERING = 1;
    var IS_PRESENT = 2;
    var IS_EXITTING = 3;

    // on enter decorator
    decorators.OnEnterMethod = function (onEnter) {
        return function (done) {
            if (this.state !== IS_ABSENT) {
                throw 'failed to start the scene: scene is not stopped, state = ' + this.state;
            }

            this.state = IS_ENTERING;

            var self = this;

            var wrappedDone = function () {
                self.state = IS_PRESENT;
                done();
            };

            onEnter.call(this, wrappedDone);
        };
    };

    // on exit decorator
    decorators.OnExitMethod = function (onExit) {
        return function (done) {
            if (this.state !== IS_PRESENT) {
                throw 'failed to stop the scene: scene is not running, state = ' + this.state;
            }

            this.state = IS_EXITTING;

            var self = this;

            var wrappedDone = function () {
                self.state = IS_ABSENT;
                done();
            };

            onExit.call(this, wrappedDone);
        };
    };

    // branching method
    this.setBranchGenerator();

    scenePrototype.onEnter = null;

    scenePrototype.onExit = null;

    scenePrototype.selector = 'body';

    scenePrototype.setSelector = function (selector) {
        this.selector = selector;

        return this;
    };

    scenePrototype.getTargetDom = function () {
        return window.document.querySelector(this.selector);
    };

    scenePrototype.onConfirmExit = function (reply) {
        var answer = true;

        if (this.exitConfirmNeeded) {
            answer = window.confirm(this.exitConfirmMessage);
        }

        reply(answer);
    };

    scenePrototype.exitConfirmMessage = 'Do you really want to leave this scene?';

    scenePrototype.exitConfirmNeeded = false;
});
