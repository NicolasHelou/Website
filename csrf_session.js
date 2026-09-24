function simulateCSRF(protectedRequest){
    const result = document.getElementById("csrfResult");
    const tokenStatus = document.getElementById("csrfTokenStatus");
    if (protectedRequest){
        tokenStatus.textContent = "Valid";
        result.textContent = "REQUEST BLOCKED: CSRF Protection Validated Request";
        result.className = "sec-result success";
    }
    else{
        tokenStatus.textContent = "Missing";
        result.textContent = "REQUEST ACCEPTED: The Request Did Not Contain CSRF Token";
        result.className = "sec-result danger";
    }
}

function checkCookieSecurity(){
    const secure = document.getElementById("secureCookie").checked;
    const httpOnly = document.getElementById("httpOnlyCookie").checked;
    const sameSite = document.getElementById("sameSiteCookie").checked;
    const result = document.getElementById("cookieResult");

    let securityScore = 0;
    if (secure){
        securityScore++;
    }
    if (httpOnly){
        securityScore++;
    }
    if (sameSite){
        securityScore++;
    }
 if (securityScore === 3) {

        result.textContent =
            "🟢 Hardened Session: All recommended cookie protections are enabled.";

        result.className = "security-result success";

    } else if (securityScore === 2) {

        result.textContent =
            "🟡 Mostly Protected: Two cookie security protections are enabled.";

        result.className = "security-result warning";

    } else if (securityScore === 1) {

        result.textContent =
            "🟠 Weak Configuration: Only one cookie protection is enabled.";

        result.className = "security-result warning";

    } else {

        result.textContent =
            "🔴 Insecure Configuration: No cookie security protections are enabled.";

        result.className = "security-result danger";
    }
}

function simulateHijacking(){
    const attackerSession = document.getElementById("attackerSession");
    const attackerStatus = document.getElementById("attackerStatus");
    const result = document.getElementById("sessionResult");
    attackerSession.textContent = sessionID;
    attackerStatus.textContent = "Authenicated";
    sessionHijacked = true;
    result.textContent = "SESSION HIJACKED: The Attacker Is Using The Stolen Session ID.";
    result.className = "sec-result danger";
}

function rotateSession(){
    const userSession = document.getElementById("userSession");
    const attackerSession = document.getElementById("attackerSession");
    const attackerStatus = document.getElementById("attackerStatus");
    const result = document.getElementById("sessionResult");

    sessionID = Math.random().toString(36).substring(2, 6).toUpperCase() + "-" + Math.random().toString(36).substring(2, 6).toUpperCase();
    userSession.textContent = sessionID;
    attackerSession.textContent = "Invalid";
    attackerStatus.textContent = "Session Expired";
    sessionHijacked = false;
    result.textContent = "SESSION ID ROTATED: The Previous Session ID Is No Longer Valid.";
    result.className = "sec-result success";
}