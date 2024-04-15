

export function create ()
{
//background = this.add.image(0, 0, "sky").setOrigin(0, 0);


this.background = this.add.tileSprite(0,0,400,400*10,'sky').setOrigin(0, 0);


//creation de plateformes statiques
this.platformsStat = this.physics.add.staticGroup();
this.platformsStat.create(300, 850, 'ground').setScale(2).refreshBody(); //sol
//this.platformsStat.create(300, 30, 'ground').setScale(2).refreshBody(); // plafond


// Création d'un groupe d'obstacles
this.obstacles = this.physics.add.group({
    key: 'ground', 
    repeat: 5, 
    setXY: { x: 400, y: 0, stepY: 70 }, // Positionne initialement les obstacles hors de l'écran, ils ne servent que d'initialisateurs
});



// Créer un nouvel obstacle régulièrement
this.time.addEvent({
    delay: 2000, 
    callback: spawnObstacle,
    callbackScope: this,
    loop: true,
});

function spawnObstacle() {
// Recherche le premier obstacle inactif
var obstacle = this.obstacles.getFirstDead(true,0, 0, 'ground');
if (obstacle) {
    obstacle.setActive(true).setVisible(true);
    obstacle.setVelocityY(105); // Défini la vitesse pour les faire se déplacer vers le personnage

    //Défini une position Y aléatoire ou fixe selon le design du jeu
    obstacle.x = Phaser.Math.Between(100, 400 - 100);
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
this.physics.add.collider(this.player, this.obstacles, function () {this.scene.restart();}, null, this);

this.score = 0;
this.scoreText = this.add.text(100, 450,this.score.toString(), { fontSize: '32px', fill: '#FFF' });



this.increaseScore = function(nombre) {
    this.score += nombre;
    console.log(this.score);
    this.scoreText.setText(this.score.toString());
};

this.physics.add.overlap(this.obstacles, this.platformsStat, function() {
    if (!this.obstacles.hasScored) {
        console.log("overlap");
        this.increaseScore(1);
        this.obstacles.hasScored = true;

        this.time.delayedCall(1900, () => {
            this.obstacles.hasScored = false;
        }, [], this);}
}, null, this);





}