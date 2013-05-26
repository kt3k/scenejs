/**
 * titlescene.js v0.1
 * author: Yosiya Hinosawa ( @kt3k )
 */

window.TitleImage = window.div.branch(function (prototype, parent, decorators) {
    'use strict';

    prototype.init = function (args) {
        this.x = args.x;
        this.y = args.y;
        this.yMove = args.yMove;
        this.width = args.width;
        this.height = args.height;
        this.src = args.src;
    }
    .E(decorators.Chainable);

    prototype.appear = function (done) {
        this
        .css({
            position: 'absolute',
            top: '0px',
            left: '0px',
            width: this.width + 'px',
            height: this.height + 'px',
            backgroundImage: 'url(' + this.src + ')'
        })
        .setY(this.y - this.yMove)
        .setX(this.x)
        .commit()
        .appendTo(window.document.body)
        .transition()
        .setY(this.y)
        .callback(done)
        .transitionCommit();
    }
    .E(decorators.Chainable);

    prototype.disappear = function (done) {
        this
        .transition()
        .duration(500)
        .setY(this.y + this.yMove)
        .css({opacity: 0})
        .remove()
        .callback(done)
        .transitionCommit();
    }
    .E(decorators.Chainable);
});

window.TitleScene = window.scene.branch(function (prototype, parent, decorators) {
    'use strict';

    prototype.onEnter = function (done) {
        this.title = window.TitleImage().init({
            x: 130,
            y: 100,
            yMove: 400,
            width: 128,
            height: 128,
            src: 'img/firefox-title.png'
        })
        .appear(done);

        this.flow1 = window.flow().init({
            dom: this.getTargetDom(),
            y: 0,
            duration: 10000,
            delay: 0,
            z: -10
        }).appear();

        this.flow2 = window.flow().init({
            dom: this.getTargetDom(),
            y: 100,
            duration: 9000,
            delay: 1000,
            z: -9
        }).appear();

        this.flow3 = window.flow().init({
            dom: this.getTargetDom(),
            y: 200,
            duration: 8000,
            delay: 2000,
            z: -8
        }).appear();

        this.timer = window.setTimeout(function () {
            window.location.href = '#scene=room';
        }, 20000);
    }
    .E(decorators.OnEnterMethod);

    prototype.onExit = function (done) {
        this.title.disappear(done);
        this.flow1.disappear();
        this.flow2.disappear();
        this.flow3.disappear();

        window.clearInterval(this.timer);
    }
    .E(decorators.OnExitMethod);
});
