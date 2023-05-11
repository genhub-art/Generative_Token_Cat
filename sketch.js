
let colors = [
  "pink", "lightblue", "lightgreen", "lightyellow", "orange", "darkgrey"

]
let eye_colors = ["brown", "blue", "green", "yellow", "red", "black", "purple", "orange", "pink"]

let cat_color = colors[Math.floor(rand() * colors.length)]
let ear_height = 5 + Math.floor(rand() * 35);
let nose_radius = 5 + Math.floor(rand() * 10);
let head_radius = 85 + Math.floor(rand() * 90);
let eye_color = eye_colors[Math.floor(rand() * eye_colors.length)]

function setup() {
  createCanvas(windowWidth, windowHeight);
  windowResized()
  window.metadata = () => {
    return {
      name: `Googly Eyes Cat #${token_id}`,
      description: `A ${head_radius >= 150 ? "fat " : ""}${cat_color.replace("light", "").replace("dark","")} cat with ${eye_color} googly eyes.`,
      image: canvas.toDataURL("image/png"),
      attributes: [
        {
          trait_type: "Head Size",
          value: head_radius
        },
        {
          trait_type: "Eye Color",
          value: eye_color
        },
        {
          trait_type: "Ear Length",
          value: ear_height
        },
        {
          trait_type: "Nose Size",
          value: nose_radius
        },
        {
          trait_type: "Fur Color",
          value: cat_color.replace("light", "").replace("dark","")
        }
      ],
      properties: {
        "Head Size": head_radius,
        "Eye Color": eye_color,
        "Ear Length": ear_height,
        "Nose Size": nose_radius,
        "Fur Color": cat_color.replace("light", "").replace("dark","")
      }
    }
  }
  console.log(metadata())
}

function draw() {
  background(220);
  drawCatFace();
}



function drawCatFace() {

  let x = 0
  let y = 0
  
  translate(width/2, height/2)
  
  let mX = mouseX - width/2
  let mY = mouseY - height/2
  
  scale(width/200)
  
  //head
  stroke(0);
  fill(cat_color);
  ellipse(x, y, head_radius, head_radius); // head
  
  let ears_offset = 50*head_radius/185;
  triangle(x - ears_offset, y - 45, x - 20 - ears_offset , y - 45, x - 10 - ears_offset, y - 65 - ear_height); // left ear
  triangle(x + ears_offset, y - 45, x + 20 + ears_offset, y - 45, x + 10 + ears_offset, y - 65 - ear_height); // right ear
  

  
  // eyes
  let eyeDist = dist(mX, mY, x, y);
  let eyeSize = map(eyeDist, 0, width, 15, 15);
  fill(255);
  ellipse(x - 25, y - 25, 30, 25); // left eye
  ellipse(x + 25, y - 25, 30, 25); // right eye
  
  // pupils
  fill(eye_color);
  let angle = atan2(mY - y, mX - x);
  let pupilX = x - 25 + cos(angle) * eyeSize / 2;
  let pupilY = y - 25 + sin(angle) * eyeSize / 2;
  ellipse(pupilX, pupilY, eyeSize, eyeSize); // left pupil
  
  pupilX = x + 25 + cos(angle) * eyeSize / 2;
  pupilY = y - 25 + sin(angle) * eyeSize / 2;
  ellipse(pupilX, pupilY, eyeSize, eyeSize); // right pupil
  
  // nose
  fill(255, 0, 0);
  ellipse(x, y, nose_radius, nose_radius);
  
  // mouth 
  strokeWeight(2);
  line(x - 10, y + 10, x, y + 15);
  line(x, y + 15, x + 10, y + 10);

  

  //whiskers
  strokeWeight(0.5);
  line(x - 10, y, x - 30, y - 5);
  line(x - 10, y, x - 30, y + 5);
  line(x - 10, y, x - 30, y );

  line(x + 10, y, x + 30, y - 5);
  line(x + 10, y, x + 30, y + 5);
  line(x + 10, y, x + 30, y );
}


function windowResized() {
  let square_dimension = Math.min(Math.min(windowWidth, windowHeight), 5000);
  resizeCanvas(square_dimension, square_dimension);
}
