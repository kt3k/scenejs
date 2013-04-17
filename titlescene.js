/**
 * titlescene.js v0.1
 * author: Yosiya Hinosawa ( @kt3k )
 */

window.TitleScene = SceneFactory({
    constructor: function () {},

    onEnter: function (done) {
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
    },

    onExit: function (done) {
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
});
