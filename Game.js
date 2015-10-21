BunnyDefender.Game = function(game) {};

BunnyDefender.Game.prototype = {
    
    create: function(){
        
        this.buildWorld();    
        
        
    }, //Runs once, use to setup what we need in the state
    
    buildWorld: function() {
        this.add.image(0,0, 'sky');
        this.add.image(0, 800, 'hill');
    }
    
    
    update: function() {}, //runs constantly - logics, checks, etc.
    
};