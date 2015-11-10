BunnyDefender.StartMenu = function(game) {
	this.startBG;
	this.startPrompt;
    this.ding;
};

BunnyDefender.StartMenu.prototype = {
	
	create: function () {                      //built into phaser
        this.ding = this.add.audio('select_audio');
		startBG = this.add.image(0, 0, 'titlescreen'); //x,y of zero
		startBG.inputEnabled = true; //allow accept mouse clicks and touches
		startBG.events.onInputDown.addOnce(this.startGame, this); //find event handler to background, will invoke startGame
		
		startPrompt = this.add.bitmapText(this.world.centerX-155, this.world.centerY+180, 'eightbitwonder', 'TOUCH HERE WDI!', 24); //position bitmap text to a certain position, last property is size
	},
    
	startGame: function (pointer) {            //function I declared myself
        this.ding.play();
		this.state.start('Game'); //game is the final state we need to create!
	}
};
