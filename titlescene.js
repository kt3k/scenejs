/**
 * titlescene.js v0.1
 * author: Yosiya Hinosawa ( @kt3k )
 */

window.TitleImage = window.div.branch({
    constructor: function constructor(args) {
        constructor.parent.call(this);
        this.x = args.x;
        this.y = args.y;
        this.yMove = args.yMove;
        this.img = args.img;
    },

    appear: function () {
        return this
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
    },

    disapper: function () {
        return this
            .transition()
            .duration(500)
            .setY(this.y + this.yMove)
            .css({opacity: 0})
            .remove()
            .transitionCommit();
    }
});

window.TitleScene = window.scene.branch({
    onEnter: function (done) {
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

        this.flux = window.flux().init().start();

        this.timer = window.setTimeout(function () {
            window.location.href = "#scene=room";
        }, 20000);
    },

    onExit: function (done) {
        this.title
            .disapper()
            .callback(done);

        this.flux.stop();

        window.clearInterval(this.timer);
    }
});
