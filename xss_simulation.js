function testXSS(){
    const input = document.getElementById("xssInput").value;
    const display = document.getElementById("xssInputDisplay");
    const result = document.getElementById("xssResult");
    display.textContent = input;

    if(
        input.includes("<script")||
        input.includes("javascript:")||
        input.includes("onerror=")||
        input.includes("onclick=")
    ){
        result.textContent = "Potential XSS payload detected! This input was treated as text and no scripts were executed.";
        result.style.color = "red";
    }
    else{
        result.textContent = "No XSS payload was detected in this input.";
        result.style.color = "green";
    }
}