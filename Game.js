BunnyDefender.Game = function(game) {};
    this.totalBunnies; //a counter for the number of bunnies
    this.bunnyGroup; //phaser grouping mechanism to control bunnies


BunnyDefender.Game.prototype = {
    
    create: function(){
        this.totalBunnies = 20; //# of bunnies!
        this.buildWorld();    
        
        
    }, //Runs once, use to setup what we need in the state
    
    buildWorld: function() {
        this.add.image(0,0, 'sky');
        this.add.image(0, 800, 'hill');
        this.buildBunnies();
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
    }
},

    
    
    update: function() {}, //runs constantly - logics, checks, etc.
    
};