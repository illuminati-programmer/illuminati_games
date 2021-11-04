//basic properties of game
var width = 15;
var height = 15;
var emptyObject = "⬛";
var outputDivId = "#output";

var gui = Array();
var output;
var triggeredObjects = Array();


clearGUI();

//classes
function object(x,y,sprite,direction="none",trigger=false,callbackFunction=null, capturingObject=null){
    this.x=x;
    this.y=y;
    this.sprite=sprite;
    this.direction = direction;
    this.trigger = trigger;
    this.callbackFunction = callbackFunction;
    this.capturingObject = capturingObject;
    if(trigger){
        triggeredObjects.push(this);
    }
}

//gui functions
function render(){
    output.innerHTML="";
    for(i = 0; i < height; i++){
        for(let k = 0; k < width; k++){
           output.innerHTML += gui[i][k];        
        }
        output.innerHTML += "<br>";
    }
}

function clearGUI(){
    for(i = 0; i < height; i++){
        gui.push(Array());
        for(let k = 0; k < width; k++){
            gui[i].push(emptyObject);
        }
    }
    render();
}

function spawnObject(object){
    if(object.x==-1||object.x==width||object.y==-1||object.y==height){
        objectOut();
        return;
    }
    gui[object.y][object.x]=object.sprite;
    render();
    checkTriggers();
}

function removeObject(object){
    if(object.x==-1||object.x==width||object.y==-1||object.y==height){
        objectOut();
        return;
    }
    gui[object.y][object.x]=emptyObject;
    render();
}

function moveToPoint(x,y,object){
    removeObject(object);
    object.x = x;
    object.y = y;
    spawnObject(object);
}

function moveByDirection(object, steps=1){
    switch(object.direction){
        case "right":
            moveToPoint(object.x+steps, object.y, object);
            break;
        case "left":
            moveToPoint(object.x-steps, object.y, object);
            break;
        case "up":
            moveToPoint(object.x, object.y-steps, object);
            break;
        case "down":
            moveToPoint(object.x, object.y+steps, object);
            break;
    }
}



//game functions
function triggerF(object, capturingObject, callbackFunction){
    if(object.x == capturingObject.x&&object.y==capturingObject.y){
        callbackFunction();
    }
}

function checkTriggers(){
    for(let i = 0; i < triggeredObjects.length; i++){
        triggerF(triggeredObjects[i], triggeredObjects[i].capturingObject, triggeredObjects[i].callbackFunction);
    }
}

function changeDirection(object, direction){
    object.direction=direction;
}

function randInt(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}