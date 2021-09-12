const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world;
var canvas, angle, tower, ground, cannon;
var balls = []
var boats  = []
var boatAnimation = []
var brokenboatAnimation = []
var score = 0

function preload() {
 bgI = loadImage("assets/background.gif")
 boatAnimationImg = loadImage("assets/boat/boat.png")
 boatAnimationjson = loadJSON("assets/boat/boat.json")
 brokenboatAnimationImg = loadImage("assets/boat/broken_boat.png")
 brokenboatAnimationjson = loadJSON("assets/boat/broken_boat.json")
 bgsound = loadSound("assets/background_music.mp3")
}

function setup() {
  canvas = createCanvas(1200,600);
  engine = Engine.create();
  world = engine.world;
  bgsound.play()
  bgsound.setVolume(0.2)
  ground = new Ground(0, height - 10, width * 4, 1);
  tower = new Tower(150, 350, 160, 310);
  cannon = new Cannon(150,150,100,50,-PI/4)
  var boatFrames = boatAnimationjson.frames
  for ( var i = 0 ; i < boatFrames.length ; i++){
    var pos = boatFrames[i].position
    var img = boatAnimationImg.get(pos.x,pos.y,pos.w,pos.h)
    boatAnimation.push(img)
  }
  var brokenboatFrames = brokenboatAnimationjson.frames
  for ( var i = 0 ; i < brokenboatFrames.length ; i++){
    var pos = brokenboatFrames[i].position
    var img = brokenboatAnimationImg.get(pos.x,pos.y,pos.w,pos.h)
    brokenboatAnimation.push(img)
  }

  
}

function draw() {
  background(bgI);
  textSize(30)
  fill("white")
  text("Score: "+score,20,50)
  Engine.update(engine);
  cannon.display()
  tower.display();
  showboats()
  for(var i = 0 ; i < balls.length; i++){
    if(balls[i]){
balls[i].display()
if(balls[i].body.position.x > width || balls[i].body.position.y > height-110){
  World.remove(world,balls[i].body)
  delete balls[i]
}
} 
for( var j = 0 ; j < boats.length ; j++){
  if(balls[i]!==undefined && boats[j]!==undefined){
    if(Matter.SAT.collides(balls[i].body,boats[j].body).collided){
      World.remove(world,balls[i].body)
      delete balls[i]
      boats[j].remove(j)
      score = score+ 20
    
    }
  }
}
}
  
}
function keyPressed(){
  if(keyCode == DOWN_ARROW){
    ball = new Cannonball(cannon.x+25,cannon.y-31)
    balls.push(ball)
  }
}

function keyReleased(){
  if(keyCode == DOWN_ARROW){
    balls[balls.length -1].fire()
  }
}

function showboats(){
  if(boats.length > 0){
    if(boats[boats.length - 1] === undefined ||boats[boats.length-1].body.position.x < width -200){
      boat = new Boat(width,height -100,170,170,boatAnimation)
    boats.push(boat)
    }
    for(var i = 0; i < boats.length; i++ ){
      if(boats[i]){
      boats[i].display()
      boats[i].animate()
    Matter.Body.setVelocity(boats[i].body,{x:-1,y:0})
    if(Matter.SAT.collides(tower.body,boats[i].body).collided){
      swal({
        title:"Game Over",
        text:"Better Luck Next Time",
        confirmButtonText:"Try Again"
      },
      function(isConfirm){
        if(isConfirm){
          location.reload()
        }
      })
    }
    }
  }
  } else{
    boat = new Boat(width,height -100,170,170,boatAnimation)
    boats.push(boat)
  }
}
