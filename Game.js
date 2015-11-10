BunnyDefender.Game = function(game) {
    this.totalBunnies; //a counter for the number of bunnies
    this.bunnyGroup; //phaser grouping mechanism to control bunnies
    this.totalSpacerocks;
    this.spacerockgroup;
    this.burst;
    this.gameover;
    this.countdown;
    this.overmessage; //bitmap text over message
    this.secondsElapsed; //counter to keep track
    this.timer; //phaser function to keep track of the seconds elapse from when the game starts
    this.music;
    this.ouch;
    this.boom;
    this.ding;
};

BunnyDefender.Game.prototype = {
    
    create: function() {
        this.gameover = false; //need to set to false first
        this.secondsElapsed = 0;
        this.timer = this.time.create(false); //false tells the timer we don't want to remove itself from the game. setting it to true will have it run once
        this.timer.loop(1000, this.updateSeconds, this )//everytime it is loop (1000ms), it will hit the updateSeconds function
        this.totalBunnies = 20;
        this.totalSpacerocks = 13;
        this.music = this.add.audio('game_audio'); //play game audio
        this.music.play('', 0, 0.3, true);   //start at specific position //volume//loop or play it once
        this.ouch = this.add.audio('hurt_audio');
        this.boom = this.add.audio('explosion_audio');
        this.ding = this.add.audio('select_audio');
        this.buildWorld();
    },//Runs once, use to setup what we need in the state
    
    updateSeconds: function (){
        this.secondsElapsed++;
    },
    
    buildWorld: function() {
        this.add.image(0, 0, 'sky');
        this.add.image(0, 800, 'hill');
        this.buildBunnies();
        this.buildSpaceRocks();
        this.buildEmitter();
        this.countdown = this.add.bitmapText(10, 10, 'eightbitwonder', 'Bunnies Left to SAVE ' + this.totalBunnies, 20); //add the bitmap number counter with position 10,10, font size 20
        this.timer.start();
    },

        buildBunnies: function() {
        this.bunnygroup = this.add.group();
        this.bunnygroup.enableBody = true; //allow bunny groups to interact with other objs, works with physics engine for collision
        for(var i=0; i<this.totalBunnies; i++) { //FOR LOOP FTW!
            var b = this.bunnygroup.create(this.rnd.integerInRange(-10, this.world.width-50), this.rnd.integerInRange(this.world.height-180, this.world.height-60), 'bunny', 'Bunny0000'); //creates new entitiy and binds it to the bunny group, RND -10 and -50 means bunnies are going to be place from one end of the stage to the other at RND. Bunny000 = where inside the atlas to start (check the bunnies XML) in images
            b.anchor.setTo(0.5, 0.5);
            b.body.moves = false; //set false so we can animate the bunny manual, instead of using the phyics engine to take control of these precious bunny
            b.animations.add('Rest', this.game.math.numberArray(1,58)); //array of numbers corresponds to the bunnies XML
            b.animations.add('Walk', this.game.math.numberArray(68,107));
            b.animations.play('Rest', 24, true);
            this.assignBunnyMovement(b);
        }
    },

    assignBunnyMovement: function(b) {
        bposition = Math.floor(this.rnd.realInRange(50, this.world.width-50)); //base on random number. Position is where the bunny wants to go to, not where it is in. Bunny move between any number in the range
        bdelay = this.rnd.integerInRange(2000, 6000); //base on random number, helps all the bunny move at a different time
        if(bposition < b.x){
            b.scale.x = 1; // helps funny face in the right direction
        }else{
            b.scale.x = -1;
        }
        t = this.add.tween(b).to({x:bposition}, 3500, Phaser.Easing.Quadratic.InOut, true, bdelay); //properties, duration, ease, autoStart, delay
        t.onStart.add(this.startBunny, this);
        t.onComplete.add(this.stopBunny, this);
    },

    startBunny: function(b) {
        b.animations.stop('Rest');
        b.animations.play('Walk', 24, true);
    },

    stopBunny: function(b) {
        b.animations.stop('Walk');
        b.animations.play('Rest', 24, true);
        this.assignBunnyMovement(b);
    },
    
    buildSpaceRocks: function() {
        this.spacerockgroup = this.add.group(); //declare it as a new group
        for(var i=0; i<this.totalSpacerocks; i++) { //FOR LOOP FOR THE WIN!
            var r = this.spacerockgroup.create(this.rnd.integerInRange(0, this.world.width), this.rnd.realInRange(-1500, 0), 'spacerock', 'SpaceRock0000'); //-1500 positions the rocks far above the stage, SpaceRock0000 = spaceRock XML frames
            var scale = this.rnd.realInRange(0.3, 1.0);
            r.scale.x = scale; //random scale effects for the size of the rocks
            r.scale.y = scale;
            this.physics.enable(r, Phaser.Physics.ARCADE); //hurls the rock toward the bunnies
            r.enableBody = true; // enable for each spaceRock to interact with obj
            r.body.velocity.y = this.rnd.integerInRange(200, 400); // determine how fast the rocks will fall
            r.animations.add('Fall');
            r.animations.play('Fall', 24, true); //rocks fall, 24 frames per second, loops continuously
            r.checkWorldBounds = true;
            r.events.onOutOfBounds.add(this.resetRock, this);
        }
    },

    resetRock: function(r) {
        if(r.y > this.world.height) {
            this.respawnRock(r);   
        }
    },
    
    respawnRock: function(r) {
        if(this.gameover == false){
        r.reset(this.rnd.integerInRange(0, this.world.width), this.rnd.realInRange(-1500, 0));
        r.body.velocity.y = this.rnd.integerInRange(200, 400);
        }
    },
    
    buildEmitter:function() {
        this.burst = this.add.emitter(0, 0, 80); //create the first obj as emitter and positon it to 0,0
        this.burst.minParticleScale = 0.3; //amount  of particles emmitter can
        this.burst.maxParticleScale = 1.2; //number of partical
        this.burst.minParticleSpeed.setTo(-30, 30); //min/max speed//creates a nice little burst effect
        this.burst.maxParticleSpeed.setTo(30, -30);
        this.burst.makeParticles('explosion');
        this.input.onDown.add(this.fireBurst, this);
},

    fireBurst: function(pointer) {
        if (this.gameover == false){
        this.boom.play();
        this.volume = 0.3 // setting volumn, you can do it in the play function or here
        this.burst.emitX = pointer.x; //set x pointer
        this.burst.emitY = pointer.y; //set 6 pointer
        this.burst.start(true, 2000, null, 20); //(explode, lifespan, frequency, quantity) //true: whether or not the rock acts as an explosion.
        }
    },

    burstCollision: function(r, b) {
        this.respawnRock(r);
    },
    
    bunnyCollision: function (r, b) {
        if (b.exists) { //if bunny exist -->
            this.ouch.play();
            this.volume = 1;
            this.respawnRock(r); //--> respawn the rock
            this.makeGhost(b);
            b.kill(); //phaser function to kill a sprite (KILL THE BUNNY)
            this.totalBunnies--; //derement the bunnies if they are killed
            this.checkBunniesLeft();
        }
    },
    
    checkBunniesLeft: function() {
        if(this.totalBunnies <= 0){ //check to see if there are no BUNNIES = game over
            this.gameover = true;
            this.music.stop();
            this.countdown.setText('GAME OVER');
            this.overmessage = this.add.bitmapText(this.world.centerX-170, this.world.centerY-40, 'eightbitwonder', 'ALL DEAD\n\n' + 'Score' + this.secondsElapsed, 42); //setting the bitmap text to the center of the world, with 42 size
            this.overmessage.align = "center";
            this.overmessage.inputEnabled = true; //allow use to click on the text to respond to it
            this.overmessage.events.onInputDown.addOnce(this.quitGame, this); //responding to the text when clicked

        } else {
            this.countdown.setText('Bunnies left to SAVE ' + this.totalBunnies);
        }
    },
    
    quitGame: function(pointer){
        this.ding.play();
        this.state.start('StartMenu');
    },
    
    friendlyFire: function(b, e){ //if spacerocks are destroyed too close to the bunnies, the particles will kill it
      if (b.exists){
          this.ouch.play();
          this.volume = 1;
          this.makeGhost(b); //calls the ghost function below
          b.kill();
          this.totalBunnies--;
          this.checkBunniesLeft
      }  
    },
    
    makeGhost: function(b) {
        bunnyghost = this.add.sprite(b.x-20, b.y-180, 'ghost'); //aligning the ghost spirites with the bunnies
        bunnyghost.anchor.setTo(0.5, 0.5);
        bunnyghost.scale.x = b.scale.x //set which way the ghost is face, same as the scale x of the bunnies
        this.physics.enable(bunnyghost, Phaser.Physics.ARCADE); //allow bunny ghost to respond to gravity
        bunnyghost.enableBody = true; //make each of the bunny have a bod to respond to the phyics engine
        bunnyghost.checkWorldBounds = true;
        bunnyghost.body.velocity.y = -800; //gravity in the world is -800, which will cause the ghost will rush to the top of the screen
    },
    
    update: function() {
        this.physics.arcade.overlap(this.spacerockgroup, this.burst, this.burstCollision, null, this);
        this.physics.arcade.overlap(this.spacerockgroup, this.bunnygroup, this.bunnyCollision, null, this);
        this.physics.arcade.overlap(this.bunnygroup, this.burst, this.friendlyFire, null, this);
    } 
    
    
};