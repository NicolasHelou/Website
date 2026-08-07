function generatePassword(){
    const length = parseInt(document.getElementById("passwordLength").value);

    const useUpper = document.getElementById("uppercase").checked;
    const useLower = document.getElementById("lowercase").checked;
    const useNumbers = document.getElementById("numbers").checked;
    const useSymbols = document.getElementById("symbols").checked;

    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()-_=+[]{};:,.<>?";

    let characters ="";

    if(useUpper)
        characters+=upper;
    if(useLower)
        characters+=lower;
    if(useNumbers)
        characters += numbers;
    if(useSymbols)
        characters += symbols;

    if(characters.length === 0){
        alert("Select at least one character type.");
        return;
    }

    let password = "";

    for(let i = 0; i < length; i++){
        const randomArray = new Uint32Array(1);
        crypto.getRandomValues(randomArray);
        const randomIndex = randomArray[0] % characters.length;
        password += characters[randomIndex];
    }
    document.getElementById("generatedPassword").value = password;
}

function copyPassword(){
    const passwordBox = document.getElementById("generatedPassword");
    passwordBox.select();
    navigator.clipboard.writeText(passwordBox.value);
    alert("Password saved to clipboard!");
}