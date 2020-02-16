var array = [];

function buttonClicked() {
    var p = document.getElementById("data");
    var data = Math.random();
    p.innerHTML += data + "; ";

    var d = document.getElementById("average");
    array.push(data);
    var count = array.length;
    var ad = 0;
    for (i = 0; i < count; i++) {
        ad += array[i];
    }
    d.innerHTML = ad / count;
}

function onclick() {
    while (true) {
        buttonClicked();
    }
}