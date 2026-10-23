function changeColor(){
    const options = document.querySelector('input[name="color"]:checked').value;
    
    if (options ==="black"){
        document.body.className = "black";
    }
    else if (options ==="white"){
        document.body.className = "white";
    }
}