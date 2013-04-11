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

    var pt = sceneNavigator.prototype = exports.prototype = {constructor: exports};

    pt.go = function (scene) {
        this.setNextScene(scene);

        this.checkState();
    };

    pt.isScene = function (scene) {
        return scene instanceof window.scene;
    };

    pt.setNextScene = function (scene) {
        this.nextScene = scene;
    };

    pt.changeToNextScene = function () {
        this.currentScene = this.nextScene;
        this.clearNextScene();
    };

    pt.clearNextScene = function () {
        this.nextScene = null;
    };

    pt.hasNextScene = function () {
        return this.nextScene != null;
    };

    pt.isIdling = function () {
        return this.state === exports.IS_IDLING;
    };

    pt.setIdling = function () {
        this.state = exports.IS_IDLING;
    };

    pt.setTransitioning = function () {
        this.state = exports.IS_TRANSITIONING;
    };

    pt.checkState = function () {
        if (this.hasNextScene() && this.isIdling()) {
            this.transition();
        }
    };

    pt.transition = function () {
        this.setTransitioning();

        if (this.currentScene == null) {
            this.enter();
        } else {
            this.confirmExit();
        }
    };

    pt.confirmExit = function () {
        var self = this;

        this.currentScene.onConfirmExit(function (yes) {
            if (yes) {
                self.exit();
            } else {
                self.confirmExitCancel();
            }
        });
    };

    pt.confirmExitCancel = function () {
        this.setIdling();
        this.clearNextScene();
    };

    pt.exit = function () {
        var self = this;

        this.currentScene.onExit(function () {
            self.enter();
        });
    };

    pt.enter = function () {
        var self = this;

        this.changeToNextScene();

        this.currentScene.onEnter(function () {
            self.enterComplete();
        });
    };

    pt.enterComplete = function () {
        this.setIdling();
        this.checkState();
    };

    return exports;
}());
