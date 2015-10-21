var BunnyDefender = {};

BunnyDefender.Boot = function(game) {};

BunnyDefender.Boot.prototype = {
	
	preload: function() {
		this.load.image('preloaderBar', 'images/loader_bar.png');
		this.load.image('titleimage', 'images/TitleImage.png');
	},

	create: function() {
		this.input.maxPointers = 1; 
		this.stage.disableVisibilityChange = false; //pause game when browser is not focused
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.minWidth = 270;
		this.scale.minHeight = 480;
		this.scale.pageAlignHorizontally = true; //center game!
		this.scale.pageAlignVertically = true; //center game!
		this.stage.forcePortrait = true;  // force portrait mode - Mobile!
		this.scale.setScreenSize(true);  // true will force screen resize no matter what

		this.input.addPointer(); //correspond to the 1 pointer up there
		this.stage.backgroundColor = '#171642';

		this.state.start('Preloader');
	}
	
};