function countAge(){
    let birthYear = document.getElementById("birthyear").value;
    let currentYear = 2026;
    let age = currentYear - birthYear;
    document.getElementById("age").innerHTML = "Your age is: " + age;
}  

