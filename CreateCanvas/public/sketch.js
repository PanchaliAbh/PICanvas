var canvas;
var socket;
var pnumber;
let font;
var skc="";
var xl1,yl1,wl1,hl1;
var skc2="";
let textString = 'Lorem ipsum dolor sit amet.';



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
        rect(data.x, data.y, data.px, data.py);
    }else if (data.pnumber==2) {
        circle(100, 100, 90);
    }else if (data.pnumber==3) {
        line(30, 20, 85, 75);
    }else if (data.pnumber==4) {
        skc2 += data.KKCC; 
        print(skc2);
        let bbox2 = font.textBounds(skc2, 10, 30, 30);
        fill(255);
        stroke(0);
        rect(bbox2.x, bbox2.y, bbox2.w, bbox2.h);
        fill(0);
        textFont(font);
        textSize(30);
        text(skc2, 10, 30);
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
      KKCC:key
    }
    
    socket.emit('mouse', data);

    if(pnumber==0){
        clear();
    }else if (pnumber==1) {
        if (mouseIsPressed === true) {
          fill(255);
          rect(mouseX, mouseY, pmouseX, pmouseY);
        }
    }else if (pnumber==2) {
        circle(100, 100, 90);
    }else if (pnumber==3) {
        line(30, 20, 85, 75);
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
        mouseDragged();
    }else if (number==3) {
        pnumber=3;        
        mouseDragged();
    }else if (number==4) {
        pnumber=4;
        keyPressed();
    }else if (number==5) {
        pnumber=5;
        mouseDragged();
    }
}  


function keyPressed() {
    console.log('sending: ' + mouseX + ',' + key);
    var data={
      x:mouseX,
      y: mouseY,
      pnumber:pnumber,
      KKCC:key,
      xl2:xl1
    }
    
    socket.emit('mouse', data);
    if (pnumber==4) {
        if (key >= 'a' && key <= 'z') {
        skc += key; 
        let bbox = font.textBounds(skc, 10, 30, 30);
        fill(255);
        stroke(0);
        rect(bbox.x, bbox.y, bbox.w, bbox.h);
        fill(0);
        textFont(font);
        textSize(30);
        text(skc, 10, 30);
        } 
    }               
}