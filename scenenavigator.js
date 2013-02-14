/**
 * scenenavigator.js 1.0
 * author: Yosiya Hinosawa ( @kt3k )
 * license: MIT license ( http://kt3k.mit-license.org/ )
 */

window.sceneNavigator = (function () {
    'use strict';

    var sceneNavigator = function (scenes) {
        this.state = exports.IS_IDLING;

        if (scenes instanceof Array) {
            scenes.forEach(function (scene) {
                try {
                    self.addScene(scene);
                } catch (e) {
                    console.error(e);
                }
            });
        }
    };

    var pt = sceneNavigator.prototype;

    pt.addScene = function (scene) {
        var id = scene.id;

        if (id == null) {
            throw Error('failed to add a scene: scene id is null.');
        }

        if (this.table[id] != null) {
            throw Error('failed to add a scene: scene is already added.');
        }

        this.table[id] = scene;
    };

    pt.go = function (id) {
        this.setNextScene(this.getSceneById(id));

        this.checkState();
    };

    pt.getSceneById = function (id) {
        var scene = this.table[id];

        if (scene == null) {
            throw Error('failed to go to the scene: scene id does not exist.');
        }

        return scene;        
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
            this.confirm();
        }
    };

    pt.confirmExit = function () {
        var self = this;

        this.currentScene.onConfirm(function (yes) {
            if (yes) {
                self.exit();
            } else {
                self.clearNextScene();
                self.cancel();
            }
        });
    };

    pt.exit = function () {
        var self = this;

        this.currentScene.onExit(function () {
            self.enter();
        })
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

    pt.cancel = function () {
        this.setIdling();
        this.checkState();
    };

    var exports = function (args) {
        return new sceneNavigator(args);
    };

    exports.IS_IDLING = 0;
    exports.IS_TRANSITIONING = 1;

    pt.constructor = exports;

    exports.prototype = pt;

    return exports;

}());
