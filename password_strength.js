function checkPassword(){
    const password = document.getElementById("passwordInput").value;
    const result = document.getElementById("passwordResult");
    const reason = document.getElementById("passwordReason");
    let score = 0;
    let plength = false;
    let pcaptial = false;
    let pmini = false;
    let pnumber = false;
    let pspecial = false;
    let reasons = [];
    if (password.length >= 8){
        score++;
        plength = true;
    }
    if(/[A-Z]/.test(password)){
        score++;
        pcaptial = true;
    }
    if(/[a-z]/.test(password)){
        score++;
        pmini = true;
    }
    if(/[0-9]/.test(password)){
        score++;
        pnumber = true;
    }
    if(/[!@#$%^&*(),.{}|<>]/.test(password)){
        score++;
        pspecial = true;
    }
    if(score <= 2){
        result.textContent = "Weak Password";
        result.style.color = "red";
    }
    else if (score <= 4){
        result.textContent = "Moderate Password";
        result.style.color = "orange";
    }
    else{
        result.textContent = "Strong Password";
        result.style.color = "green";
    }
    if(plength == false){
        reasons.push("Password shorter than 8 characters.");
    }
    if(pcaptial == false){
        reasons.push("Password does not utilize any capital letters.");
    }
    if(pmini == false){
        reasons.push("Password does not utilize any lowercase letters.");
    }
    if(pnumber == false){
        reasons.push("Password does not utilize any numbers.");
    }
    if(pspecial == false){
        reasons.push("Password does not utilize any special characters.");
    }
    reason.innerHTML = reasons.join("<br>");
}