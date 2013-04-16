/**
 * titlescene.js v0.1
 * author: Yosiya Hinosawa ( @kt3k )
 */

window.TitleScene = (function () {
    'use strict';

    var exports = function () {
        return new TitleScene();
    };

    var TitleScene = function () {};

    var scene = window.scene;

    var titlePrototype = TitleScene.prototype = exports.prototype = new scene();

    titlePrototype.constructor = exports;

    Function.prototype.E = function (dtor) { return dtor(this); };

    titlePrototype.onEnter = function (done) {
        this.title = window.div()
            .css({
                position: 'absolute',
                top: '0px',
                left: '0px',
                width: '128px',
                height: '128px',
                backgroundImage: 'url(img/firefox-title.png)'
            })
            .setY(-300)
            .setX(120)
            .commit()
            .appendTo(window.document.body)
            .transition()
            .setY(100)
            .callback(done)
            .transitionCommit();
    }.E(scene.OnEnterMethod);

    titlePrototype.onExit = function (done) {
        this.title
          .transition()
          .duration(500)
          .setY(400)
          .css({opacity: 0})
          .callback(done)
          .transition()
          .remove()
          .transitionCommit();
    }
    .E(scene.OnExitMethod);

    delete Function.prototype.E;

    return exports;
}());