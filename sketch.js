//Create variables here
var dog;
var foodStock;
var database;
var foods;
var dogHappy;

function preload(){
bagroundIMG = loadImage("images/459c1a7826687970feadd8d9609464a3.jpg")
dogIMG =  loadImage("images/dogImg.png")
boneIMG = loadImage("images/6e6b003a49c65f15df4544109f73fa0d.png")
dog2IMG = loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(500, 500);

  database = firebase.database();
  foodStock = database.ref('foods');
  foodStock.on("value" , readStock);

  //Creating the dog2 sprite:-
  dog2 = createSprite(200,400,60,60);
  dog2.addImage(dog2IMG);
  dog2.scale = 0.2
  dog2.visible = false;

  
  //Creating the dog sprite:
dog = createSprite(200,400,60,60);
dog.addImage(dogIMG);
dog.scale = 0.2

 //Creating the bone sprite:
 bone = createSprite(200,200,60,60)
 bone.addImage(boneIMG);
 bone.scale = 0.1

  //Creating a ground:
  ground  = createSprite(200,500,1110,10)
    ground.visible = false;
}


function draw() {  
  background(bagroundIMG);

//if condition-1:-
if(keyDown("UP_ARROW")){
 dog2.velocityY = -2;
 writeStock(foods);
 dog2.visible = true;
 dog.visible = false;
}

 //if condition-3:-
 if(dog.isTouching(ground)){
  dog.collide(ground);
}


  drawSprites();

  textSize(35);
  textFont("Matura MT Script Capitals");
  fill("red");
  text("Food Remaining:"+foods,170,30);

  textSize(17);
  textFont("Algerian");
  fill("blue");
  text("Please press the up arrow key to feed the dog.",7,120);
}

function readStock(data){
  foods = data.val();
}

function writeStock(x){
 if(x<=0){
  x=0;
 }else{
   x=x-1;
 }
  database.ref('/').update({
    foods:x
  })
}



