
import { preload } from './scenes/preload.js';
import { create } from './scenes/create.js';
import { update } from './scenes/update.js';





var config = {
    type: Phaser.AUTO,
    width: 400,
    height: 800,
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

