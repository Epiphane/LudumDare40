define([
   'component/scroll_text'
], function(
   ScrollText
) {
   return Juicy.State.extend({
      init: function() {
         // Initialize state
         this.title = new Juicy.Entity(this, ['ScrollText']);
         this.title.position = new Juicy.Point(this.game.width / 2, 100);
         this.title.getComponent('ScrollText').set({
            font: '80px "Roboto Condensed"',
            text: 'ONE ||||||||| NIGHT',
            fillStyle: '#fff'
         });
         this.title.position.x -= this.title.width / 2;
         this.title.getComponent('ScrollText').reset();
         this.title.getComponent('ScrollText').start();
      },
      click: function(pos) {
         console.log(pos);
      },
      update: function(dt) {
         this.title.update(dt);
      },
      render: function(context) {
         context.fillStyle = '#000';
         context.clearRect(0, 0, this.game.width, this.game.height);

         this.title.render(context);
      }
   });
});