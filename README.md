<img src="http://phaser.io/images/img.png">

##What is Phaser?


PHASER IS AN AWESOME open source HTML5 game framework created by THE ONE AND ONLY, Photon Storm. It's designed to create games that will run on desktop and mobile web browsers. A lot of focus was given to performance inside of mobile web browsers, a growing and important area of web gaming. If the device is capable then it uses WebGL for rendering, but otherwise it seamlessly reverts to Canvas. 

####What is canvas you ask? 
The HTML <canvas> element is used to draw graphics, on the fly, via scripting (usually JavaScript). The <canvas> element is only a container for graphics.

##Let's talk about platforms...

Phaser is designed to create games that will run on desktop and mobile web browsers. A lot of focus was given to performance inside of mobile web browsers, a growing and important area of web gaming. If the device is capable then it uses WebGL for rendering, but otherwise it seamlessly reverts to Canvas.

###Desktop Browsers
Phaser is a JavaScript library designed to run on all major desktop browsers. This includes Internet Explorer 9 and Edge (LIKE ANYONE USES THOSE), Firefox, Chrome, and Safari.

###Mobile Browsers
On mobile, Phaser runs on iOS5 and above inside of Mobile Safari. On Android, it runs in 2.2 and above in both the stock browser and in Chrome. Chrome is now the standard Android browser, with recent versions even supporting WebGL, but you still can't ignore the millions of legacy Android devices that remain in use.

##Let's take a dive into the features...

###It's Just Plain JavaScript!!!
This may sound like a strange 'feature', but it should actually be quite a compelling one. Phaser doesn't use any faux OO-style practises internally. There's no massive inheritance chain or component system, and you don't have to force your objects into any fixed class structure, either. It's a simple straight-forward prototype chain, the way JavaScript was meant to be used.

This doesn't mean you can't build your game in a structured way; far from it. All it means is that we don't enforce it. It also means that Phaser is internally very easy to hack around with.


###Easy Asset Loading 
<img src="http://phaser.io/images/github/jump.jpg" align="right">

Phaser has a built-in asset Loader that can handle:

*Images

*Sprite Sheets (PER NATHAN'S TALK YESTERDAY)

*Texture Atlases (including Texture Packer, JSON Hash, JSON Array, Flash CS6/CC, and Starling XML formats)

*Audio files

*Data Files (XML, JSON, plain text)

*JavaScript files (so you can part-load your games or JS based resources)

*Tilemaps (CSV and Tiled map formats)

*Bitmap Fonts

We routinely export texture atlas files from Flash directly to our Phaser games, and it supports fully trimmed atlases. Assets can be part-loaded, cached, and pulled from different URLs (for CDN support), and you can even turn any sprite into a progress bar with a single line of code.

###Rendering: WebGL and Canvas

Internally, Phaser uses Pixi.js for rendering. (WHAT IS PIXI? 2D webGL renderer with canvas fallback) It's basically the fastest kid in town for rendering. Their library focuses on Canvas and WebGL.

For games, this means that if the browser supports WebGL then the player will more often than not get a smoother experience. WebGL is common on desktop but still emerging on mobile; even so, it is where HTML5 games are headed in the future, so supporting it is vital. The latest release of Phaser introduced WebGL shader and filter support, and forthcoming ones will implement normal maps so you can benefit from new tools like Sprite Lamp.

###Audio: Web Audio and Legacy Audio
Audio has been one of the weakest points of HTML games for a long time. Only a couple of years ago, we were faced with the choice of having one single channel of high-latency audio that would cripple the device during playback or having no audio at all. But times have changed, and the Web Audio API came to our salvation. It allows for proper node-based audio support, with multiple channels, node routing and all kinds of effects. So Phaser fully supports Web Audio.

However, on Android especially, lots of devices still don't support thi—so we also support legacy Audio and the use of Audio Sprites: the method of packing a bunch of samples together into a single file and using playback markers to jump to different effects. Phaser will swap between the two depending on the device capabilities and also includes unlocking the audio sub-system automatically for you, something that catches out a lot of first-time mobile devs!

AUDIO SITE: http://www.superflashbros.net/as3sfxr/

###Input: Multi-Touch, Keyboard, Pointer, Mouse
When supporting desktop and mobile there are an increasingly varied number of potential input options. Phaser supports keyboard, mouse, touch, MSPointer (now Pointer under IE11), and combinations thereof. For example, on Windows Surface devices you could swap between using a mouse and touch, or indeed use both together.

###Physics, Tweens, and Particles
Bundled into the core library are the ArcadePhysics and ArcadeParticles systems. These are simple AABB light-weight libraries that allow you to apply gravity and motion to any Sprite, then test for collision and separation. Using a world-based quadtree to help minimise collision tests, you can achieve decent results quickly with little processing time required.

#####What is tweening? 

Inbetweening or tweening is the process of generating intermediate frames between two images to give the appearance that the first image evolves smoothly into the second image. Inbetweens are the drawings between the key frames which help to create the illusion of motion.

###Plugins
It is our aim that the core of Phaser will eventually settle down and hit a nice stable equilibrium, where we're not likely to touch it much beyond fixes and browser updates. However, we want Phaser to carry on growing, providing features for all kinds of games but without causing the core library to explode in growth. To this end, we've built in a plugin system.

Phaser plugins can register themselves with the core framework, be updated in line with the core game loop, and perform all kinds of useful additional tasks. A great example of this is the recently released EasyStar path finding plugin. We will be releasing plugins ourselves and expect to see more coming from the community in the future.

## Integrating Phaser

* Clone the git repository via https://github.com/photonstorm/phaser

### Bower / npm

Install via [bower](http://bower.io)

`bower install phaser`

Install via [npm](https://www.npmjs.com)

`npm install phaser`

### CDN

[jsDelivr](http://www.jsdelivr.com/#!phaser) is a "super-fast CDN for developers". Include the following in your html:

`<script src="//cdn.jsdelivr.net/phaser/2.4.4/phaser.js"></script>`

or the minified version:

`<script src="//cdn.jsdelivr.net/phaser/2.4.4/phaser.min.js"></script>`

[cdnjs.com](https://cdnjs.com/libraries/phaser) also offers a free CDN service. They have all versions of Phaser and even the custom builds:

`<script src="https://cdnjs.cloudflare.com/ajax/libs/phaser/2.4.4/phaser.js"></script>`


##SO how does Phaser really work?

###States

In Phaser, all the action occurs around States. You can think of them as main moments of your game. Think of a soccer game, you have a State when doors are open and people start coming in. Then you have a State when the pre-game show takes place. Then a State where the pre-game show stuff is removed from the field. Then a State when the game begins, and so forth.

Phaser gives you a lot of flexibility as what States you can have, but there is a de-facto convention which is used in many games and tutorials. The naming might vary a bit but it’s usually something like:

####Boot State: 
General game settings are defined, and the assets of the preloading screen are loaded (example the loading bar). Nothing is shown to the user.

####Preload State: 
The game assets (images, spritesheets, audio, textures, etc) are loaded into the memory (from the disk). The preloading screen is shown to the user, which usually includes a loading bar to show the progress.

####MainMenu State: 
Your game’s welcome screen. After the preload state, all the game images are already loaded into the memory, so they can quickly accessed.

####Game State: 
The actual game where the FUN takes place.

###States methods

States have some reserved methods which serve specific purposes. These are the ones we’ll use in this tutorial. You can find the full list here.

*init: is called upon State initialization. If you need to send parameters to the State this is where they’ll be accessible (more on that later)

*preload: this is where the assets are loaded.

*create: this is called upon asset loading completion.

*update: this is called on every game tick. Basically it’s called “many times per second” so this is where you want to include things that need to be constantly tested such as collision detection.

##So many states, is there a "cheatsheet" you made others can reference?
Yes, please refer for the "cheatsheet.html" file.
 
## Games made with Phaser

Thousands of games have been made in Phaser. From game jam entries to titles by some of the largest entertainment brands in the world. Here is a tiny sample:

<img src= "http://phaser.io/images/github/241/bubble-academy.png">
<img src= "http://phaser.io/images/github/241/woodventure.png">
<img src= "http://phaser.io/images/github/241/hopsop.png">
<img src= "http://phaser.io/images/github/241/banana-mania.png">
<img src= "http://phaser.io/images/github/241/salazar.png">
<img src= "http://phaser.io/images/github/241/phaser-shmup.png">
<img src= "http://phaser.io/images/github/241/trappy-trap.png">
<img src= "http://phaser.io/images/github/241/runaway-ruins.png">
<img src= "http://phaser.io/images/github/241/ananias.png">
<img src= "http://phaser.io/images/github/shot1a.jpg">
<img src= "http://phaser.io/images/github/shot2a.jpg">
<img src= "http://phaser.io/images/github/shot3a.jpg">
<img src= "http://phaser.io/images/github/shot4a.jpg">
<img src= "http://phaser.io/images/github/shot5b.jpg">
<img src= "http://phaser.io/images/github/shot6b.jpg">
<img src= "http://phaser.io/images/github/shot7b.jpg">
<img src= "http://phaser.io/images/github/shot8.jpg">
<img src= "http://phaser.io/images/github/shot9.jpg">

#### MORE: http://itch.io/

#DEMO TIME!
