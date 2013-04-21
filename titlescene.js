/**
 * titlescene.js v0.1
 * author: Yosiya Hinosawa ( @kt3k )
 */

window.TitleImage = window.div.branch({
    constructor: function (args) {
        this.x = args.x;
        this.y = args.y;
        this.yMove = args.yMove;
        this.img = args.img;
    },

    appear: function (done) {
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
            .callback(done)
            .transitionCommit();
    },

    disapper: function (done) {
        return this
            .transition()
            .duration(500)
            .setY(this.y + this.yMove)
            .css({opacity: 0})
            .callback(done)
            .transition()
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
        }).appear(done);

        this.timer = window.setTimeout(function () {
            window.location.href = "#scene=room";
        }, 2000);
    },

    onExit: function (done) {
        this.title.disapper(done);

        window.clearInterval(this.timer);
    }
});
