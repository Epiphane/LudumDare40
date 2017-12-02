define([
   'state/game',
   'state/help',
], function(
   GameState,
   HelpState
) {
   return Juicy.State.extend({
      init: function() {
         // Initialize state
         this.background = new Juicy.Entity(this, ['Image']);
         this.background.setImage('img/title.png');
         
         this.title = new Juicy.Entity(this, ['Text']);
         this.title.position = new Juicy.Point(50, 100);
         this.title.getComponent('Text').set({
            font: '80px "Roboto Condensed"',
            text: 'ONE NIGHT',
            fillStyle: '#fff'
         });

         function menuItem(i, text) {
            var menuItem = new Juicy.Entity(this, ['Text']);
            menuItem.position = new Juicy.Point(150, 300 + 100 * i);
            menuItem.getComponent('Text').set({
               font: '64px "Roboto Condensed"',
               text: text.toUpperCase(),
               fillStyle: '#fff'
            });

            var glassImage = new Juicy.Entity(this, ['Image']);
            glassImage.setImage('img/glass_right.png');
            glassImage.position = new Juicy.Point(-50, 5);
            //menuItem.addChild(glassImage);

            return menuItem;
         }

         this.menu = [
            menuItem(0, 'Play'),
            menuItem(1, 'Help')
         ];

         this.cursor = new Juicy.Entity(this, ['Image']);
         this.cursor.setImage('img/glasses.png');
         this.cursor.position.x = 70;
         this.setSelected(0);
      },
      // mousemove: function(pos) {
      //    console.log(pos);
      // },
      update: function() {

      },
      key_ENTER: function() {
         switch(this.selected) {
            case 0:
               this.game.setState(new GameState());
               break;
            case 1:
               // Help
               this.game.setState(new HelpState(this));
               break;
         }
      },
      setSelected: function(i) {
         if (i < 0) i += this.menu.length;
         this.selected = i % this.menu.length;

         this.cursor.position.y = 305 + 100 * this.selected;
      },
      key_UP: function() {
         this.setSelected(this.selected - 1);
      },
      key_DOWN: function() {
         this.setSelected(this.selected + 1);
      },
      render: function(context) {
         context.fillStyle = '#000';
         context.clearRect(0, 0, this.game.width, this.game.height);

         this.background.render(context);
         this.title.render(context);

         this.menu.forEach(function(item) {
            item.render(context);
         });

         this.cursor.render(context);
      }
   });
});