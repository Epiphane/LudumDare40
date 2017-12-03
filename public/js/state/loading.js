define([
   'state/title',
   'helper/sound_samples',
], function(
    TitleState,
    SoundSamples
) {
    return Juicy.State.extend({
        init: function() {
            // Initialize state
            this.background = new Juicy.Entity(this, ['Image']);
            this.background.setImage('img/title.png');

            this.robotoCondensed = new Juicy.Entity(this, ['Text']);
            this.robotoCondensed.getComponent('Text').set({
               font: '64px "Roboto Condensed"'
            });

            SoundSamples.register('typewriter', 'audio/typewriter-1.mp3', false, 0.3);

            Juicy.Sound.load('red_eyes', 'audio/red_eyes.mp3', true, 1, 0.2);
        },
        startGame: function() {
            this.game.setState(new TitleState());
        },
        update: function() {
            if (document.fonts.check('64px Roboto Condensed')) {
                this.startGame();
            }
        },
        render: function(context) {
            context.fillStyle = '#000';
            context.clearRect(0, 0, this.game.width, this.game.height);

            this.background.render(context);
        }
    });
})