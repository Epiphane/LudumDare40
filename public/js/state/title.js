define([
   'state/extended',
   'state/game',
   'state/help',
], function(
   State,
   GameState,
   HelpState
) {
   return State.extend({
      init: function() {
         // Initialize state
         var background = new Juicy.Entity(this, ['Image']);
         background.setImage('img/title.png');
         this.add(background);
         
         var title = new Juicy.Entity(this, ['Text']);
         title.position = new Juicy.Point(50, 100);
         title.getComponent('Text').set({
            font: '80px "Roboto Condensed"',
            text: 'ONE NIGHT',
            fillStyle: '#fff'
         });
         this.add(title);

         this.nMenuItems = 0;
         this.menuItem(0, 'Play');
         this.menuItem(1, 'Help');

         this.cursor = new Juicy.Entity(this, ['Image']);
         this.cursor.setImage('img/glasses.png');
         this.cursor.position.x = 70;
         this.setSelected(0);
         this.add(this.cursor);
      },
      menuItem: function(i, text) {
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

         this.nMenuItems ++;
         this.add(menuItem);
      },
      update: function() {
         State.prototype.update.apply(this, arguments);
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
         if (i < 0) i += this.nMenuItems;
         this.selected = i % this.nMenuItems;

         this.cursor.position.y = 305 + 100 * this.selected;
      },
      key_UP: function() {
         this.setSelected(this.selected - 1);
      },
      key_DOWN: function() {
         this.setSelected(this.selected + 1);
      }
   });
});