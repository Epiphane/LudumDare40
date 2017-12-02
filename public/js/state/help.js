define([], function() {
   return Juicy.State.extend({
      constructor: function(prevState) {
         this.prevState = prevState;
      },
      init: function() { 
         // Initialize state
         this.background = new Juicy.Entity(this, ['Image']);
         this.background.setImage('img/title.png');

         this.robotoCondensed = new Juicy.Entity(this, ['Text']);
         this.robotoCondensed.getComponent('Text').set({
            font: '64px "Roboto Condensed"'
         });
      },
      key_ENTER: function() {
         this.game.setState(this.prevState);
      },
      render: function(context) {
         context.fillStyle = '#000';
         context.clearRect(0, 0, this.game.width, this.game.height);

         this.background.render(context);
      }
   });
})