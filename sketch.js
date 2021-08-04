var PLAY = 1;
var END = 0;
var gameState = PLAY;

var bheem_flying ,bheem ,fire_Img;
var background;
var backgroundImg;
var daku_flying ,daku1_flying;
var fireImage ,fire;
var agni_Img ,bullet;
var button_Img ,button;
var buton_Img ,button1;
var up_Img ,up;
var down_Img ,down;
var gameover_Img ,restart_Img;
var over ,restart;
var cloudsGroup, cloudImage;
var collideSound;

function preload(){
bheem_flying = loadAnimation("bheem 1.png");
backgroundImg = loadImage("backgroundImg.png");
daku_flying = loadImage("daku 2.png");
daku1_flying = loadImage("daku 1.png");
fireImage = loadImage("gg.png","ggg.png");
button_Img = loadImage("fire 1.png");
agni_Img = loadImage("firepink6.png");
buton_Img = loadImage("fire2.png");
up_Img = loadImage("up.png");
down_Img = loadImage("down.png")
gameover_Img = loadImage("gameover.image.jpg");
restart_Img = loadImage("restart.png");
cloudImage = loadImage("cloud.png");
collideSound = loadSound(collided.wav);
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  bheem = createSprite(100,height-200,20,50);
  bheem.addAnimation("flying" ,bheem_flying);
  bheem.scale=0.2;
  
  button = createSprite(width-100,height-50,50,50);
  button.addImage(button_Img);
  button.scale=0.1;

  button1 = createSprite(width-160,height-50,50,50);
  button1.addImage(buton_Img);
  button1.scale=0.3;
  
  up = createSprite(120,height-100,50,50);
  up.addImage(up_Img);
  up.scale=1;

  down = createSprite(120,height-50,50,50);
  down.addImage(down_Img);
  down.scale=1;

  over = createSprite(600,200,50,50);
  over.addImage(gameover_Img);
  over.scale=0.5;
  over.visible=false;
  
  restart = createSprite(600,280,50,50);
  restart.addImage(restart_Img);
  restart.scale=0.1;
  restart.visible=false;

  dakusGroup = new Group;
  thiefsGroup = new Group;
  hhsGroup = new Group;
  rcsGroup = new Group;
  crsGroup = new Group;
  firesGroup = new Group();
  pinksGroup = new Group();
  cloudsGroup = new Group;

  score = 0;
  
}
function draw() {
 background(backgroundImg); 

 textSize(20);
 fill("black")
 text("Score: "+ score,width-200,50);

 if(gameState === PLAY){

 if (keyDown("G") || mousePressedOver(button)) {
  createFire();
}

if (keyDown("F") || mousePressedOver(button1)) {
  createPink();
}

if(firesGroup.isTouching(dakusGroup)){
  score=score+2;
  dakusGroup.destroyEach();
  firesGroup.destroyEach();
}
if(pinksGroup.isTouching(dakusGroup)){
  score=score+2;
  dakusGroup.destroyEach();
  pinksGroup.destroyEach();
}
if(firesGroup.isTouching(thiefsGroup)){
  score=score+4;
  thiefsGroup.destroyEach();
  firesGroup.destroyEach();
}
if(pinksGroup.isTouching(thiefsGroup)){
  score=score+4;
  thiefsGroup.destroyEach();
  pinksGroup.destroyEach();
}
if(firesGroup.isTouching(rcsGroup)){
  score=score+6;
  rcsGroup.destroyEach();
  firesGroup.destroyEach();
}
if(pinksGroup.isTouching(rcsGroup)){
  score=score+6;
  rcsGroup.destroyEach();
  pinksGroup.destroyEach();
}
if(firesGroup.isTouching(hhsGroup)){
  score=score+8;
  hhsGroup.destroyEach();
  firesGroup.destroyEach();
}
if(pinksGroup.isTouching(hhsGroup)){
  score=score+8;
  hhsGroup.destroyEach();
  pinksGroup.destroyEach();
}
if(firesGroup.isTouching(crsGroup)){
  score=score+1;
  crsGroup.destroyEach();
  firesGroup.destroyEach();
}
if(pinksGroup.isTouching(crsGroup)){
  score=score+1;
  crsGroup.destroyEach();
  pinksGroup.destroyEach();
}

if(keyDown("up") || mousePressedOver(up)){
  bheem.y=bheem.y-5;
}

if(keyDown("down") || mousePressedOver(down)){
  bheem.y=bheem.y+5;
}

spawnClouds();
spawnDaku();
spawnThief();
spawnhh();
spawnrc();
spawncr();

if(dakusGroup.isTouching(bheem) || crsGroup.isTouching(bheem) || rcsGroup.isTouching(bheem) || hhsGroup.isTouching(bheem) || thiefsGroup.isTouching(bheem)){
  collideSound.play();
  gameState = END;
}
 }

 else if (gameState === END) {
  over.visible = true;
  restart.visible = true;
  
  dakusGroup.setVelocityXEach(0);
  hhsGroup.setVelocityXEach(0);
  crsGroup.setVelocityXEach(0);
  rcsGroup.setVelocityXEach(0);
  thiefsGroup.setVelocityXEach(0);
  cloudsGroup.setVelocityXEach(0);
  
  dakusGroup.setLifetimeEach(-1);
  hhsGroup.setLifetimeEach(-1);
  crsGroup.setLifetimeEach(-1);
  rcsGroup.setLifetimeEach(-1);
  thiefsGroup.setLifetimeEach(-1);
  cloudsGroup.setLifetimeEach(-1);

  dakusGroup.destroyEach();
  hhsGroup.destroyEach();
  crsGroup.destroyEach();
  rcsGroup.destroyEach();
  thiefsGroup.destroyEach();
  cloudsGroup.destroyEach();

  up.visible=false;
  down.visible=false;
  button.visible=false;
  button1.visible=false;
  bheem.visible=false;

  if(mousePressedOver(restart) || keyDown("SPACE")) {      
    reset();
  }
}

 drawSprites();
}

function spawnDaku() {
  if (frameCount % 400 === 0) {
    var daku = createSprite(width+20,height-300,40,10);
    daku.addImage(daku_flying);
    daku.scale = 0.2;
    daku.velocityX = -(3 +3*score/20);
    daku.lifetime = 410;
    dakusGroup.add(daku);
  }
  
}

function spawnThief() {
  if (frameCount % 500 === 0) {
    var thief = createSprite(width+20,height-400,40,10);
    thief.addImage(daku_flying);
    thief.scale = 0.2;
    thief.velocityX = -(3 +3*score/20);
    thief.lifetime = 420;
    thiefsGroup.add(thief);
  }
}

function spawnhh() {
  if (frameCount % 600 === 0) {
    var jj = createSprite(width+20,height-500,40,10);
    jj.addImage(daku1_flying);
    jj.scale = 0.5;
    jj.velocityX = -(3 +3*score/20);
    jj.lifetime = 420;
    hhsGroup.add(jj);
  }
}

function spawnrc() {
  if (frameCount % 600 === 0) {
    var cr = createSprite(width+20,height-600,40,10);
    cr.addImage(daku_flying);
    cr.scale = 0.2;
    cr.velocityX = -(3 +3*score/20);
    cr.lifetime = 420;
    rcsGroup.add(cr);
  }
  
}

function spawncr() {
  if (frameCount % 600 === 0) {
    var ff = createSprite(width+20,height-500,40,10);
    ff.addImage(daku1_flying);
    ff.scale = 0.5;
    ff.velocityX = -(3 +3*score/20);
    ff.lifetime = 420;
    crsGroup.add(ff);
  }
}

function createFire() {
  var fire= createSprite(0, 100, 60, 10);
  fire.addImage(fireImage);
  fire.x = 150;
  fire.y=bheem.y;
  fire.velocityX = +4;
  fire.lifetime = 300;
  fire.scale = 0.3;
  firesGroup.add(fire)
}

function createPink() {
  var bullet= createSprite(0, 100, 60, 10);
  bullet.addImage(agni_Img);
  bullet.x = 150;
  bullet.y=bheem.y;
  bullet.velocityX = +4;
  bullet.lifetime = 300;
  bullet.scale = 0.1;
  pinksGroup.add(bullet)
}

function spawnClouds() {
  if (frameCount % 60 === 0) {
    var cloud = createSprite(width+20,height-300,40,10);
    cloud.y = Math.round(random(100,220));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    cloud.lifetime = 450;
    cloudsGroup.add(cloud);
  }
}

function reset(){
  gameState = PLAY;
  over.visible = false;
  restart.visible = false;
  
  dakusGroup.destroyEach();
  hhsGroup.destroyEach();
  crsGroup.destroyEach();
  rcsGroup.destroyEach();
  thiefsGroup.destroyEach();
  cloudsGroup.destroyEach();
  up.visible=true;
  down.visible=true;
  button.visible=true;
  button1.visible=true;
  bheem.visible=true;

  score = 0;
  
}