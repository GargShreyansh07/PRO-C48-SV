var canvas;
var title,titleImage,scene,backgroundImage;
var gameOverImage,gameOverFruit;
var bombImage;
var splashImage;
var PLAY = 1;
var END = 0;
var gameState = 1;
var score = 0;
var livesLeft = 3
var blastImage;
var knife,knifeImg;
var empty,oneCross,twoCross,threeCross;
var emptyImg,oneCrossImg,twoCrossImg,threeCrossImg;
var fruitGroup,fruit1,fruit2,fruit3,fruit4,fruit5,fruit6,fruit7,fruit8,fruit9,fruit10;
var bgSound,lose,fruitCutSound,endSound,win;


function preload() {
  backgroundImage = loadImage("assets/background.png")
  bombImage = loadImage("assets/bomb.png")
  blastImage = loadImage("assets/blast.png")
  knifeImg = loadImage("assets/knife.png")
  titleImage = loadImage("assets/fruit_salad.png")
  splashImage = loadImage("assets/splash.png")
  fruit1 = loadImage("assets/fruit1.png")
  fruit2 = loadImage("assets/fruit2.png")
  fruit3 = loadImage("assets/fruit3.png")
  fruit4 = loadImage("assets/fruit4.png")
  fruit5 = loadImage("assets/fruit5.png")
  fruit6 = loadImage("assets/fruit6.png")
  fruit7 = loadImage("assets/fruit7.png")
  fruit8 = loadImage("assets/fruit8.png")
  fruit9 = loadImage("assets/fruit9.png")
  fruit10 = loadImage("assets/fruit10.png");
  gameOverImage = loadImage("assets/gameOver.png")
  emptyImg = loadImage("assets/empty.png");
  oneCrossImg = loadImage("assets/oneCross.png");
  twoCrossImg = loadImage("assets/twoCross.png");
  threeCrossImg = loadImage("assets/threeCross.png")
  gameOverFruit = loadImage("assets/gameOverFruit.png");
  bgSound = loadSound("assets/BgSound.mp3")
  lose = loadSound("assets/LifeLostSound.mp3")
  fruitCutSound = loadSound("assets/FruitCutSound.mp3")
  endSound = loadSound("assets/End.mp3")
  win = loadSound("assets/win.mp3")

}
 function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  //scene = createSprite(0,0,800,800)
  //scene.addImage(backgroundImage)
  //scene.scale = 2

  title = createSprite(700,65,20,20);
  title.addImage(titleImage);
  title.scale = 0.5

  knife = createSprite(40,200,20,20);
  knife.addImage(knifeImg)
  knife.scale = 0.5;
  knife.setCollider("rectangle",40,0,35,35)

  empty = createSprite(1200,60,20,20)
    empty.addImage("emp",emptyImg)
    empty.scale = 0.57

    oneCross = createSprite(1200,60,20,20)
    oneCross.visible = false
    oneCross.addImage("oneC",oneCrossImg)
    oneCross.scale = 0.57

    twoCross = createSprite(1200,60,20,20)
    twoCross.visible = false;
    twoCross.addImage("twoC",twoCrossImg)
    twoCross.scale = 0.57

    threeCross = createSprite(1200,60,20,20)
    threeCross.visible = false;
    threeCross.addImage("threeC",threeCrossImg)
    threeCross.scale = 0.57

  // Groups
    fruitGroup=createGroup();
    bombGroup = createGroup();
}
function draw() {
  background(backgroundImage);
  
  if(gameState === PLAY){
    if(livesLeft===3){
      empty.visible = true
      oneCross.visible = false
      twoCross.visible = false
      threeCross.visible = false
    }
    if(livesLeft===2){
      empty.visible = false
      oneCross.visible = true
      twoCross.visible = false
      threeCross.visible = false
    }

    if(livesLeft===1){
      empty.visible = false
      oneCross.visible = false
      twoCross.visible = true
      threeCross.visible = false
    }
  
    //go to gameState "lost" when 0 lives are remaining
    if(livesLeft===0){
      empty.visible = false
      oneCross.visible = false
      twoCross.visible = false
      threeCross.visible = true
      gameState = "lost"
   }

    Fruits();
    Bomb();
    HBomb();
  
    knife.y=World.mouseY;
    knife.x=World.mouseX;

    if(fruitGroup.isTouching(knife)){
      fruitCutSound.play();
      for(var i=0;i<fruitGroup.length;i++){     
      
        if(fruitGroup[i].isTouching(knife)){
             fruitGroup[i].destroy()
      
             score = score+5
             } 
       
       }
    }
    
      // Go to end state if knife is touching bomb
      if(bombGroup.isTouching(knife)){
      lose.play();

        for(var i=0;i<bombGroup.length;i++){     
      
          if(bombGroup[i].isTouching(knife)){
               bombGroup[i].destroy()
              
              livesLeft=livesLeft-1
               } 
         
         }
      }
    
  }

  if(score === 100) {
    clear();
    image(gameOverFruit,550,200,300,300)
    fill("cyan")
    textSize(40);
    text("ENJOY YOUR FRUIT SALAD!!",420, 170);
    fruitGroup.destroyEach();
    bombGroup.destroyEach();
    fruitGroup.setVelocityYEach(0);
    bombGroup.setVelocityYEach(0);
    win.play();
  }

  if(gameState == "lost"){
  
    image(blastImage,380,100,700,600)
    fruitGroup.destroyEach();
    bombGroup.destroyEach();
    fruitGroup.setVelocityYEach(0);
    bombGroup.setVelocityYEach(0);
    knife.destroy();
    endSound.play();
  
   }

  drawSprites();
  //Display score
  fill("orange")
  textSize(25);
  text("Score : "+ score,50,50);
}

function Bomb(){
  if(World.frameCount%70===0){
    bomb=createSprite(700,1000,20,20);
    bomb.addImage(bombImage);
    bomb.scale = 0.3
    bomb.x=Math.round(random(50,1000));
    bomb.velocityY=-(8+(score/10));
    bomb.setLifetime=50;
    
    bombGroup.add(bomb);
  }
}

function HBomb(){
  if(World.frameCount%80===0){
    bomb1=createSprite(1300,700,20,20);
    bomb1.addImage(bombImage);
    bomb1.scale = 0.3
    bomb1.y=Math.round(random(50,900));
    bomb1.velocityX=-(8+(score/10));
    bomb1.setLifetime=50;
    
    bombGroup.add(bomb1);
  }
}

function Fruits(){
  if(World.frameCount%30===0){
    fruit=createSprite(700,1000,20,20);
    fruit.x = 0
    fruit.setCollider("circle",0,0,45) 
  //Increase the velocity of cake after score 20

       fruit.velocityY= -(12+(score/10));
     
     
    fruit.scale=0.35;
     r=Math.round(random(1,9));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else if (r == 4) {
      fruit.addImage(fruit4);
    } else if (r == 5) {
      fruit.addImage(fruit5);
    } else if (r == 6) {
      fruit.addImage(fruit6);
    } else if (r == 7) {
      fruit.addImage(fruit7);
    } else if (r == 8) {
      fruit.addImage(fruit8);
    } else if (r == 9) {
      fruit.addImage(fruit9);
    } else {
      fruit.addImage(fruit10);
    }
    
    fruit.x=Math.round(random(50,1000));
   
    
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}