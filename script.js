let isDroneVisible= false;
	let xValue = "0";
	let yValue = "0";
	let droneManagement = "NORTH";
	let displayReport = false;
	const rotationDegree = {
      "NORTH": "0deg",
      "EAST" : "90deg",
      "SOUTH": "180deg",
      "WEST" : "-90deg"
    };

//create 10X10 square

 window.onload = function containerElement() {
  let text ="";
  let i;
for (var a=9; a >= 0; a--) {
text +="<tr>";
for(var b=0; b<10; b++) {
text +="<td id=" + b + a +"></td>";
}
text +="</tr>";
}
document.getElementById("tenxtenSquare").innerHTML = text;  
}
 

  // Place toy drone function

   function placeToyDrone(){
    document.getElementById('directionGroup').style.display = 'block';
     droneManagement = document.getElementById('droneManagement').value;

     xValue = document.getElementById('xValue').value;
     yValue = document.getElementById('yValue').value;
    displayReport = false;
    let elements = document.getElementsByClassName('attackClass');
     while(elements.length > 0){
          elements[0].removeAttribute("style");
          elements[0].classList.remove('attackClass');
      }
    setToyDrone(xValue,yValue,droneManagement.substring(0,1));
  } 

  //Set drone to specified co-ordinates
  const setToyDrone =((x,y,dir)=>{
    isDroneVisible = true;
    let elemSample = "";
    elemSample = document.getElementById('drone');
    if(!!elemSample){
        if(document.getElementById('drone').parentNode.style.backgroundImage.split(",").length > 1){
          document.getElementById('drone').parentNode.style.backgroundImage = "url(https://res.cloudinary.com/dmqk0i7jd/image/upload/c_scale,e_make_transparent:10,w_50/v1505039229/damage2_dj3206.png)";
          document.getElementById('drone').style.backgroundSize = "contain";
          document.getElementById('drone').parentNode.style.backgroundRepeat = "no-repeat";
    }else{
        document.getElementById('drone').parentNode.style.backgroundImage = "";
        document.getElementById('drone').parentNode.style.backgroundRepeat = "";    
      }
        elemSample.parentNode.removeChild(elemSample);
     }
      var spanEle = document.createElement("span");
      spanEle.setAttribute("id","drone");
      spanEle.setAttribute("class","circle");
      var t = document.createTextNode(""); //dir
      spanEle.appendChild(t);
      document.getElementById(x+y).appendChild(spanEle);
      if(document.getElementById(x+y).style.backgroundImage !== ""){
          document.getElementById(x+y).style.backgroundImage = "url(https://i.ya-webdesign.com/images/vector-drones-simple-12.png),url(https://res.cloudinary.com/dmqk0i7jd/image/upload/c_scale,e_make_transparent:10,w_50/v1505039229/damage2_dj3206.png)";
          document.getElementById(x+y).style.backgroundSize = "contain";
          document.getElementById(x+y).style.backgroundRepeat = "no-repeat, no-repeat";
        document.getElementById('drone').parentNode.style.transform = "rotate("+rotationDegree[droneManagement]+")";
    }else{
          document.getElementById(x+y).style.backgroundImage = "url(https://i.ya-webdesign.com/images/vector-drones-simple-12.png)";
          document.getElementById(x+y).style.backgroundRepeat = "no-repeat";
          document.getElementById(x+y).style.backgroundSize = "contain";
      document.getElementById('drone').parentNode.style.transform = "rotate("+rotationDegree[droneManagement]+")";
    }
  });


  // Report function
   function reportToyDrone () {
    displayReport = true;
    var droneEle = document.getElementById('drone').parentNode.id;
    var dir = droneManagement;
    document.getElementById('displayDReport').innerHTML =
     "<div class='container'><sapn><b>X Value:</b> "+'<b>' +droneEle.charAt(0)+'</b>'+" </span><br><span><b>Y Value:</b> "+'<b>'+droneEle.charAt(1)+'</b>'+"</span><br><span><b>Position:</b>"+'<b>'+dir +'</b>'+ "</span></div>";
  }


  // Move toy drone to next unit

    function moveToyDrone () {
    displayReport = false;
    var droneEleParent = document.getElementById('drone').parentNode.id;
    var droneEleDir = droneManagement;
    var x =  droneEleParent.charAt(0);
    var y = droneEleParent.charAt(1);
    if(droneEleDir === 'NORTH' && y < 9){
       y = parseInt(y)+1;
    }else if(droneEleDir === 'SOUTH' && y > 0){
       y = parseInt(y)-1;
    }else if(droneEleDir === 'EAST' && x < 9){
       x = parseInt(x)+1;
    }else if(droneEleDir === 'WEST' && x > 0){
      x = parseInt(x)-1;
    }
    setToyDrone(x,y,droneEleDir);
  }
  // Change toy drone direction
 const changeDirection = ((newDir) =>{
    document.getElementById('drone').parentNode.style.transform = "rotate(0deg)";
    let droneEleDir = droneManagement;
    const dirObj = {
      "NORTH-left" : "WEST",
      "SOUTH-left" : "EAST",
      "EAST-left":"NORTH",
      "WEST-left":"SOUTH",
      "NORTH-right":"EAST",
      "SOUTH-right":"WEST",
      "EAST-right":"SOUTH",
      "WEST-right":"NORTH"
    }
    droneManagement = dirObj[droneEleDir+"-"+newDir];
    document.getElementById('drone').parentNode.style.transform = "rotate("+rotationDegree[droneManagement]+")";
    
  });
  
  const toyDroneAttack = () =>{
    let droneEleParent = document.getElementById('drone').parentNode.id;
    let droneEleDir = droneManagement;
    let x =  droneEleParent.charAt(0);
    let y = droneEleParent.charAt(1);
    if(droneEleDir === 'NORTH' && y < 8){
       y = parseInt(y)+2;
      document.getElementById(x+y).classList.add("attackClass");
      destroyAttack(x,y);
    }else if(droneEleDir === 'SOUTH' && y > 1){
       y = parseInt(y)-2;
       document.getElementById(x+y).classList.add("attackClass");
       destroyAttack(x,y);
    }else if(droneEleDir === 'EAST' && x < 8){
       x = parseInt(x)+2;
       document.getElementById(x+y).classList.add("attackClass");
        destroyAttack(x,y);
    }else if(droneEleDir === 'WEST' && x >1 ){
      x = parseInt(x)-2;
       document.getElementById(x+y).classList.add("attackClass");
       destroyAttack(x,y);
    }
  }
   
 const destroyAttack = ((x,y)=>{
    setTimeout(function(){
      document.getElementById(x+y).style.backgroundImage = "url(https://res.cloudinary.com/dmqk0i7jd/image/upload/c_scale,e_make_transparent:10,w_50/v1505039229/damage2_dj3206.png)";
      document.getElementById(x+y).style.backgroundSize = "contain";
      document.getElementById(x+y).style.backgroundRepeat = "no-repeat";
     
    }, 500);
  });