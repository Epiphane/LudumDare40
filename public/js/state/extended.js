define([], function() {
   return Juicy.State.extend({
      constructor: function() {
         this.entities = [];
      },
      add: function(entity) {
         this.entities.push(entity);
      },
      update: function(dt, game) {
         this.entities = this.entities.filter(function(entity) {
            entity.update(dt);

            return !entity.remove;
         });
      },
      render: function(context) {
         context.fillStyle = '#000';
         context.clearRect(0, 0, this.game.width, this.game.height);

         this.entities.forEach(function(entity) {
            entity.render(context);
         });
      }
   });
});