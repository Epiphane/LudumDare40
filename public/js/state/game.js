define([
   'state/extended',
   'component/fade',
   'component/scroll_text'
], function(
   State,
   ScrollText
) {
   return State.extend({
      init: function() {
         // Initialize state
         var title = new Juicy.Entity(this, ['ScrollText', 'Fade']);
         title.position = new Juicy.Point(this.game.width / 2, 300);
         title.getComponent('ScrollText').set({
            font: '80px "Roboto Condensed"',
            text: 'NIGHT INVESTMENTS',
            fillStyle: '#fff',
            speed: 10
         });
         title.position.x -= title.width / 2;
         title.getComponent('ScrollText').reset();
         title.getComponent('ScrollText').start();

         var tagline = new Juicy.Entity(this, ['ScrollText', 'Fade']);
         tagline.position = new Juicy.Point(this.game.width / 2, 400);
         tagline.getComponent('ScrollText').set({
            font: '48px "Roboto Condensed"',
            text: 'December 7, 2040',
            fillStyle: '#fff',
            speed: 8
         });
         tagline.position.x -= tagline.width / 2;
         tagline.getComponent('ScrollText').reset();

         Juicy.Sound.play('red_eyes');

         this.add(title);
         this.add(tagline);

         this.game.delay(2.5, function() {
            tagline.getComponent('ScrollText').start();

            this.game.delay(4, function() {
               title.fadeOut();
               tagline.fadeOut();
            })
         });
      },
      click: function(pos) {
         console.log(pos);
      }
   });
});