define([
   'helper/sound_samples'
], function(
   SoundSamples
) {
   const SOUND = 'typewriter';

   return Juicy.Components.Text.create('ScrollText', {
      constructor: function() {
         Juicy.Components.Text.apply(this, arguments);

         this.prevText = '';
         this.speed = 15;
         this.tick = 0;
         this.ticking = false;
      },
      set: function(config) {
         if (typeof(config.text) != 'undefined') {
            this.prevText = config.text;
            config.text = config.text.replace(/\|/g, '');
         }

         this.speed = config.speed || this.speed;

         Juicy.Components.Text.prototype.set.call(this, config);
      },
      reset: function() {
         Juicy.Components.Text.prototype.set.call(this, { text: '' });
         this.tick = 0;
         this.ticking = false;
      },
      start: function() {
         if (this.soundSample) {
            SoundSamples.put(SOUND, this.soundSample);
            this.soundSample = null;
         }

         this.ticking = true;
         this.soundSample = SoundSamples.get(SOUND);
         this.soundSample.play();
      },
      update: function(dt) {
         Juicy.Components.Text.prototype.update.apply(this, arguments);
         
         if (this.ticking) {
            this.tick += this.speed * dt;
            if (this.tick > this.prevText.length) {
               this.tick = this.prevText.length;
               this.ticking = false;

               this.soundSample.pause();
               SoundSamples.put(SOUND, this.soundSample);
               this.soundSample = null;
            }
            
            if (this.prevText[Math.floor(this.tick)] === '|') {
               this.soundSample.pause();
            }
            else if (this.soundSample) {
               this.soundSample.play();
            }

            Juicy.Components.Text.prototype.set.call(this, { 
               text: this.prevText.substr(0, Math.floor(this.tick)).replace(/\|/g, '')
            });
         }
      }
   });
});