define([], function() {
   return Juicy.Component.create('Fade', {
      constructor: function(entity) {
         this.opacity = 1;

         this.endOpacity = 1;
         this.speed = 0;

         this.componentsToFade = [];
         for (name in entity.components) {
            if (typeof(entity.components[name].opacity) != 'undefined') {
               this.componentsToFade.push(entity.components[name]);
            }
         }

         entity.fadeIn = this.in.bind(this);
         entity.fadeOut = this.out.bind(this);
      },
      set: function(config) {
         this.speed = config.speed || this.speed;
      },
      out: function(time) {
         time = time || 1;

         this.endOpacity = 0;
         this.speed = this.opacity * time;
      },
      in: function(time) {
         time = time || 1;

         this.endOpacity = 1;
         this.speed = (1 - this.opacity) * time;
      },
      update: function(dt) {
         var opacity = this.opacity;

         if (opacity > this.endOpacity) {
            opacity -= dt * this.speed;
         }
         if (opacity < this.endOpacity) {
            opacity += dt * this.speed;
            if (opacity > this.endOpacity) {
               opacity = this.endOpacity;
            }
         }

         this.opacity = opacity;
         this.componentsToFade.forEach(function(component) {
            component.opacity = opacity;
         });
      }
   });
});