function calculate(){
    //string
    let grade = document.getElementById("inputGrade").value;
    //int
    let gradeInt = parseInt(grade);
    let result ="";


    if (gradeInt >=75){
        result="Tuntas";
    } else {
        result="Tidak Tuntas";
    }
    document.getElementById("result").innerText = result;
}