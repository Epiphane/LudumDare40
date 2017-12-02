define([], function() {
   var soundSamples = {};
   var soundMetadata = {};

   return {
      create: function(name) {
         var meta = soundMetadata[name];
         return new Juicy.SoundSample(meta.src, meta.loop, meta.volume);
      },
      register: function(name, src, loop, volume) {
         soundMetadata[name] = {
            src: src,
            loop: loop,
            volume: volume
         };
         soundSamples[name] = [];
      },
      get: function(name) {
         if (!soundMetadata[name]) {
            throw new Error("SoundSample must have been registered")
         }
         else if (soundSamples[name].length === 0) {
            return this.create(name);
         }
         else {
            return soundSamples[name].pop();
         }
      },
      put: function(name, sample) {
         soundSamples[name].push(sample);
      }
   };
});