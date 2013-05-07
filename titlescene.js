/**
 * titlescene.js v0.1
 * author: Yosiya Hinosawa ( @kt3k )
 */

window.TitleImage = window.div.branch(function (prototype, parent, decorators) {
    'use strict';

    prototype.constructor = function (args) {
        parent.constructor.call(this);
        this.x = args.x;
        this.y = args.y;
        this.yMove = args.yMove;
        this.img = args.img;
    };

    prototype.appear = function () {
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
        .transitionCommit();
    }
    .E(decorators.Chainable);

    prototype.disapper = function () {
        this
        .transition()
        .duration(500)
        .setY(this.y + this.yMove)
        .css({opacity: 0})
        .remove()
        .transitionCommit();
    }
    .E(decorators.Chainable);
});

window.TitleScene = window.scene.branch(function (prototype, parent, decorators) {
    'use strict';

    prototype.onEnter = function (done) {
        this.title = window.TitleImage({
            x: 130,
            y: 100,
            yMove: 400,
            img: {
                width: 128,
                height: 128,
                src: 'img/firefox-title.png'
            }
        })
        .appear()
        .callback(done);

        this.flow1 = window.flow().init(this.getTargetDom(), 0, 10000, -10).transition().duration(0).start().transitionCommit();
        this.flow2 = window.flow().init(this.getTargetDom(), 100, 9000, -9).transition().duration(1000).start().transitionCommit();
        this.flow3 = window.flow().init(this.getTargetDom(), 200, 8000, -8).transition().duration(2000).start().transitionCommit();

        this.timer = window.setTimeout(function () {
            window.location.href = '#scene=room';
        }, 20000);
    };

    prototype.onExit = function (done) {
        this.title.disapper().callback(done);
        this.flow1.stop();
        this.flow2.stop();
        this.flow3.stop();

        window.clearInterval(this.timer);
    };
});
