let input = document.getElementById('input');
let output = document.getElementById('name');

input.addEventListener('input', function() {
    let data = input.value;
    if (data!== null && data!== "") {
        output.innerHTML = data;
    }
    else {
        output.innerHTML = "Guest";
    }
}
);