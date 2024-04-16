


export function create ()
{

this.background = this.add.tileSprite(0,0,400,400*3,'stars').setOrigin(0, 0);

this.nebulates = this.add.tileSprite(0,0,400,400*3,'nebulates').setOrigin(0, 0);

this.planets = this.add.tileSprite(0,0,400,400*3,'planets').setOrigin(0, 0);



//creation de plateformes statiques
this.platformsStat = this.physics.add.staticGroup();
this.platformsStat.create(300, 850, 'ground').setScale(2).refreshBody(); //sol

this.platformsStatpl = this.physics.add.staticGroup();
this.platformsStatpl.create(300, 30, 'ground').setScale(2).refreshBody(); // plafond


// Création d'un groupe d'obstacles
this.obstacles = this.physics.add.group({
    key: 'blackhole', 
    repeat: 5, 
    setXY: { x: 1400, y: 0, stepY: 70 }, // Positionne initialement les obstacles hors de l'écran, ils ne servent que d'initialisateurs
});

this.diff = 0;
this.delay = 2000;

// Créer un nouvel obstacle régulièrement
this.obstacleEvent = this.time.addEvent({
    delay: this.delay, 
    callback: spawnObstacle,
    callbackScope: this,
    loop: true,
});

function spawnObstacle() {
// Recherche le premier obstacle inactif
var obstacle = this.obstacles.getFirstDead(true,0, 0, 'blackhole');
if (obstacle) {
    obstacle.setActive(true).setVisible(true);
    obstacle.setVelocityY(105); // Défini la vitesse pour les faire se déplacer vers le personnage

    
    obstacle.x = Phaser.Math.Between(10, 390);
    obstacle.setScale(0.5);
    obstacle.passed = false;

    // Réinitialise l'obstacle lorsqu'il sort de l'écran à gauche
    obstacle.checkWorldBounds = true;
    obstacle.outOfBoundsKill = true;


}
}

this.player = this.physics.add.sprite(100, 450, 'dude');       
this.player.setBounce(0.05);
this.player.setCollideWorldBounds(false);

this.cameras.main.scrollY = this.player.y - this.cameras.main.height / 2;


this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
});

this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
});

this.anims.create({
    key: 'up',
    frames: [ { key: 'dude', frame: 4 } ],
    frameRate: 10,
    repeat: -1
});

this.anims.create({
    key: 'static',
    frames: [ { key: 'dude', frame: 4 } ],
    frameRate: 10,
    repeat: -1
});

this.cursors = this.input.keyboard.createCursorKeys();
this.physics.add.collider(this.player, this.platformsStat, function () {this.scene.restart();}, null, this);
this.physics.add.collider(this.player, this.platformsStatpl, function () {this.scene.restart();}, null, this);

this.physics.add.collider(this.player, this.obstacles, function () {this.scene.restart();}, null, this);

this.score = 0;
this.scoreText = this.add.text(370, 65,this.score.toString(), { fontSize: '32px', fill: '#FFF' });



this.increaseScore = function(nombre) {
    this.score += nombre;
    this.scoreText.setText(this.score.toString());
};

this.physics.add.overlap(this.obstacles, this.platformsStat, function() {
    if (!this.obstacles.hasScored) {
        this.increaseScore(1);
        this.obstacles.hasScored = true;

        this.time.delayedCall(this.delay - 100, () => {
            this.obstacles.hasScored = false;
        }, [], this);}
}, null, this);





}