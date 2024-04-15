
import { preload } from './scenes/preload.js';
import { create } from './scenes/create.js';
import { update } from './scenes/update.js';

var w = 400;
var h = 800;


var config = {
    type: Phaser.AUTO,
    width: w,
    height: h,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
var game = new Phaser.Game(config);

var player;
var cursors;
var background;
var obstacles;
var platformsStat;
var score ;



