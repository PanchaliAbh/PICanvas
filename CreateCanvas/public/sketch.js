var canvas;
var socket;
var pnumber;
let font;
var skc="";
var skc2="";
let xc = 100;
let yc = 100;
let xc2 = 100;
let yc2 = 100;
let d=33;
let d2=33;
var i2=0;
var i=0;
var size;
var mp=0;


function preload() {
  font = loadFont('./font/OpenSans-Regular.otf');
}





function setup() {
  // put setup code here
  canvas=createCanvas(windowWidth,windowHeight);
  socket=io.connect('http://localhost:4200');
  socket.on('mouse', newDrawing);
}


function newDrawing(data){  

   if(data.pnumber==0){
        clear();
    }else if (data.pnumber==1) {
        fill(255);
        clear();
        rect(data.x, data.y, data.px, data.py); 
    }else if (data.pnumber==2) {
        if(data.mp2>=1){
            fill(255);
           ellipse(data.x, data.y, 100, 100); 
        }
    }else if (data.pnumber==3) {
        line(30, 20, 85, 75);
    }else if (data.pnumber==4) {
        if (data.KKCC >= 'a' && data.KKCC <= 'z') {
            skc2 += data.KKCC; 
            print(skc2);
            let bbox2 = font.textBounds(skc2, data.x, data.y, 30);
            fill(255);
            stroke(0);
            rect(bbox2.x, bbox2.y, bbox2.w+10, bbox2.h+10);
            fill(0);
            textFont(font);
            textSize(30);
            text(skc2, data.x, data.y);
        }
    }else if (data.pnumber==5) {
        stroke(0);
        line(data.x, data.y, data.px, data.py);
    }


}

function mouseDragged(){

    console.log('sending: ' + mouseX + ',' + mouseY);
    var data={
      x:mouseX,
      y: mouseY,
      pnumber:pnumber,
      px:pmouseX,
      py:pmouseY,
      i:i,
      psize:size
    }
    
    socket.emit('mouse', data);

    if(pnumber==0){
        clear();
    }else if (pnumber==1) {
      fill(255);
     clear();
     rect(mouseX, mouseY, pmouseX, pmouseY); 
    }else if (pnumber==5) {
        stroke(0);
        if (mouseIsPressed === true) {
          line(mouseX, mouseY, pmouseX, pmouseY);
        }
    }

}



function draw(number) {
  // put drawing code here   
 
  if(number==0){
        pnumber=0;
        mouseDragged();
    }else if (number==1) {
        pnumber=1;
        mouseDragged();
    }else if (number==2) {
        pnumber=2;
        mousePressed();
    }else if (number==3) {
        pnumber=3;        
        mousePressed();
    }else if (number==4) {
        pnumber=4;
        skc="";
        skc2="";
        keyPressed();
        skc="";
    }else if (number==5) {
        pnumber=5;
        mouseDragged();
    }
}  

function mousePressed() {
    console.log('sending: ' + mouseX + ',' + mp);
    var data={
      x:mouseX,
      y: mouseY,
      pnumber:pnumber,
      mp2:mp
    }
    
  if (pnumber==2) {
    socket.emit('mouse', data);
    mp++;
    if(mp>1){
        fill(255);
       ellipse(mouseX, mouseY, 100, 100); 
    } 
  }else if (pnumber==3) {
       line(30, 20, 85, 75);
  }
}



function keyPressed() {
    console.log('sending: ' + mouseX + ',' + key);
    var data={
      x:mouseX,
      y: mouseY,
      pnumber:pnumber,
      KKCC:key,
      kCode:keyCode
    }
    
    socket.emit('mouse', data);


    if (pnumber==4) {
        if (pnumber==4) {
            if (key >= 'a' && key <= 'z') {
            skc += key; 
            let bbox = font.textBounds(skc, mouseX, mouseY, 30);
            fill(255);
            stroke(0);
            rect(bbox.x, bbox.y, bbox.w+10, bbox.h+10);
            fill(0);
            textFont(font);
            textSize(30);
            text(skc, mouseX, mouseY);

            } 
        }
    }

}