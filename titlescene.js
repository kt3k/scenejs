/**
 * titlescene.js v0.1
 * author: Yosiya Hinosawa ( @kt3k )
 */

window.Title = window.div.branch({
    constructor: function (x) {
        this.x = x;
    },

    appear: function (done) {
        return this
            .css({
                position: 'absolute',
                top: '0px',
                left: '0px',
                width: '128px',
                height: '128px',
                backgroundImage: 'url(img/firefox-title.png)'
            })
            .setY(-300)
            .setX(this.x)
            .commit()
            .appendTo(window.document.body)
            .transition()
            .setY(100)
            .callback(done)
            .transitionCommit();
    },

    disapper: function (done) {
        return this
            .transition()
            .duration(500)
            .setY(400)
            .css({opacity: 0})
            .callback(done)
            .transition()
            .remove()
            .transitionCommit();
    }
});

window.TitleScene = window.scene.branch({
    onEnter: function (done) {
        this.title = window.Title(130).appear(done);

        this.timer = window.setTimeout(function () {
            window.location.href = "#scene=room";
        }, 2000);
    },

    onExit: function (done) {
        this.title.disapper(done);

        window.clearInterval(this.timer);
    }
});
