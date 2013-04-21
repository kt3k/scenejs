/**
 * scenenavigator.js 1.0
 * author: Yosiya Hinosawa ( @kt3k )
 * license: MIT license ( http://kt3k.mit-license.org/ )
 */

window.sceneNavigator = (function () {
    'use strict';

    var sceneNavigator = function () {
        this.setIdling();
    };

    var exports = function () {
        return new sceneNavigator();
    };

    exports.IS_IDLING = 0;
    exports.IS_TRANSITIONING = 1;

    var sceneNavigatorPt = sceneNavigator.prototype = exports.prototype = {constructor: sceneNavigator};

    sceneNavigatorPt.go = function (scene, cancelCallback) {
        this.setNextScene(scene);

        this.checkState(cancelCallback);
    };

    sceneNavigatorPt.isScene = function (scene) {
        return scene instanceof window.scene;
    };

    sceneNavigatorPt.setNextScene = function (scene) {
        this.nextScene = scene;
    };

    sceneNavigatorPt.changeToNextScene = function () {
        this.currentScene = this.nextScene;
        this.clearNextScene();
    };

    sceneNavigatorPt.clearNextScene = function () {
        this.nextScene = null;
    };

    sceneNavigatorPt.hasNextScene = function () {
        return this.nextScene != null;
    };

    sceneNavigatorPt.isIdling = function () {
        return this.state === exports.IS_IDLING;
    };

    sceneNavigatorPt.setIdling = function () {
        this.state = exports.IS_IDLING;
    };

    sceneNavigatorPt.setTransitioning = function () {
        this.state = exports.IS_TRANSITIONING;
    };

    sceneNavigatorPt.checkState = function (cancelCallback) {
        if (this.hasNextScene() && this.isIdling()) {
            this.transition(cancelCallback);
        } else if (typeof cancelCallback === 'function') {
            cancelCallback();
        }
    };

    sceneNavigatorPt.transition = function (cancelCallback) {
        this.setTransitioning();

        if (this.currentScene == null) {
            this.enter();
        } else {
            this.confirmExit(cancelCallback);
        }
    };

    sceneNavigatorPt.confirmExit = function (cancelCallback) {
        var self = this;

        this.currentScene.onConfirmExit(function (yes) {
            if (yes) {
                self.exit();
            } else {
                self.confirmExitCancel();

                if (typeof cancelCallback === 'function') {
                    cancelCallback();
                }
            }
        });
    };

    sceneNavigatorPt.confirmExitCancel = function () {
        this.setIdling();
        this.clearNextScene();
    };

    sceneNavigatorPt.exit = function () {
        var self = this;

        this.currentScene.onExit(function () {
            self.enter();
        });
    };

    sceneNavigatorPt.enter = function () {
        var self = this;

        this.changeToNextScene();

        this.currentScene.onEnter(function () {
            self.enterComplete();
        });
    };

    sceneNavigatorPt.enterComplete = function () {
        this.setIdling();
        this.checkState();
    };

    return exports;
}());
