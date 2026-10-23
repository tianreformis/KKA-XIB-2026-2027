function hitungTambah(){
    let number1 = document.getElementById("number1").value;
    let number2 = document.getElementById("number2").value;
    let result = parseInt(number1) + parseInt(number2);
    document.getElementById("result").value = result;
}

function hitungKurang(){
    let number1 = document.getElementById("number1").value;
    let number2 = document.getElementById("number2").value;
    let result = parseInt(number1) - parseInt(number2);
    document.getElementById("result").value = result;
}

function hitungKali(){
    let number1 = document.getElementById("number1").value;
    let number2 = document.getElementById("number2").value;
    let result = parseInt(number1) * parseInt(number2);
    document.getElementById("result").value = result;
}

function hitungBagi(){
    let number1 = document.getElementById("number1").value;
    let number2 = document.getElementById("number2").value;
    let result = parseInt(number1) / parseInt(number2);
    document.getElementById("result").value = result;
}