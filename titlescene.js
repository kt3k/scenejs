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
        this.img = args.img;
    }
    .E(decorators.Chainable);

    prototype.appear = function (done) {
        this
        .css({
            position: 'absolute',
            top: '0px',
            left: '0px',
            width: this.img.width + 'px',
            height: this.img.height + 'px',
            backgroundImage: 'url(' + this.img.src + ')'
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
            img: {
                width: 128,
                height: 128,
                src: 'img/firefox-title.png'
            }
        })
        .appear(done);

        this.flow1 = window.flow().init(this.getTargetDom(), 0, 10000, -10).transition().duration(0).appear().transitionCommit();
        this.flow2 = window.flow().init(this.getTargetDom(), 100, 9000, -9).transition().duration(1000).appear().transitionCommit();
        this.flow3 = window.flow().init(this.getTargetDom(), 200, 8000, -8).transition().duration(2000).appear().transitionCommit();

        this.timer = window.setTimeout(function () {
            window.location.href = '#scene=room';
        }, 20000);
    };

    prototype.onExit = function (done) {
        this.title.disappear(done);
        this.flow1.disappear();
        this.flow2.disappear();
        this.flow3.disappear();

        window.clearInterval(this.timer);
    };
});
