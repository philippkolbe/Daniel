var isLightOn = false;
const CITY_SRC = "images/city.jpg";

function lightSwitch(bttn) {
    var crcl = document.getElementById("crcl");

    var text;
    var color;

    if (isLightOn == false) {
        isLightOn = true;
        text = "ON";
        color = "yellow";
    } else {
        isLightOn = false;
        text = "OFF";
        color = "white";
    }

    bttn.innerHTML = text;
    crcl.setAttribute("fill", color);
}

function changeImage() {
    var img = document.getElementById("img");
    img.src = CITY_SRC;
}