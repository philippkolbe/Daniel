let images = [];
let textred = 0
let textblue = 0
let isAllowedToClick = true;
let countpointsred = 0
let countpointsblue = 0
function fnOnload() {
    for (let i = 1; i <= 8; i++) {
        let name = i;
        images.push(name);
        images.push(name);
    }

    images.sort(fnCompare);
}

function fnCompare(a, b) {
    return Math.random()*2 - 1;
}

function onclickImage(image) {
    if (isAllowedToClick) {
        openImage(image);

        let i;
        let count = 0
        let picalt1, pic1;
        let picalt2, pic2;
        for (i = 1; i <= 16; i++) {
            let pic = document.getElementById(i)
            let nr = pic.alt;
            if (nr != "Hidden" && nr != "Collected") {
                count++
                if (count == 1) 
                    picalt1 = nr, pic1 = i
                else if (count == 2)
                    picalt2 = nr, pic2 = i
            }
        }
    
        if (picalt1 == picalt2) {
            setTimeout(callback, 500);
            isAllowedToClick = false;
            
            function callback() {
                discardImage(pic1)
                discardImage(pic2)
                isAllowedToClick = true;
                if (document.getElementById("cirred").getAttribute("fill") == "red") {
                    countpointsred++
                    let textred = document.getElementById("textred")
                    textred.innerHTML = countpointsred
                } else {
                    countpointsblue++
                    let textblue = document.getElementById("textblue")
                    textblue.innerHTML = countpointsblue
                }

                
                if (countpointsblue + countpointsred == 8) {
                    if (countpointsred < countpointsblue)
                        alert("Blue won!");
                    else if (countpointsblue < countpointsred)
                        alert("Red won!");
                    else
                        alert("Draw!")
                }    
            }
        } else if (picalt2 != undefined) {
            setTimeout(callback, 1000);
            isAllowedToClick = false;

            function callback() {        
                closeImage(pic1)
                closeImage(pic2)
                isAllowedToClick = true;
                lightchange()
            }   
        }
    }
}

function openImage(image) {
    let name = images[image.id - 1];
    let src = "./images/" + name + ".jpg";
    image.src = src;
    image.alt = name;
}
function closeImage(id) {
    let image = document.getElementById(id);
    image.src = "./images/hidden.jpg";
    image.alt = "Hidden";
}
function discardImage(id) {
    let image = document.getElementById(id);
    image.src = "./images/collected.jpg";
    image.alt = "Collected";
    image.removeAttribute("onclick");
}

function lightchange() {
    let red = document.getElementById("cirred")
    let blue = document.getElementById("cirblue")
    
    if (red.getAttribute("fill") == "red") {
        red.setAttribute("fill", "white")
        blue.setAttribute("fill", "blue")
    } else {
        red.setAttribute("fill", "red")
        blue.setAttribute("fill", "white")
    }
}

/* let intervalImage1, intervalImage2;

function openImageAnimation(id, src, alt) {
    if (!intervalImage1) {
        intervalImage1 = setInterval(onInterval, 1);
    } else {
        intervalImage2 = setInterval(onInterval, 1);
    }

    function onInterval() {
        decreaseWidth(interval);
    }
}

function decreaseWidth(interval) {
    if (width > 0) {
        width -= 2;
        img.width = width;
        margin += 1;
        img.style.marginLeft = margin + "px";
    } else {
        img.src = "1.jpg";
        clearInterval(intervalImage1);
        clearInterval(intervalImage2);
        intervalImage1 = setInterval(increaseWidth, 1);
    }
}

function increaseWidth() {
    if (width < startWidth) {
        width += 2;
        img.width = width;
        margin -= 1;
        img.style.marginLeft = margin + "px";
    } else {
        clearInterval(interval);
    }
} */