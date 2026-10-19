
/* ==========================================
   LOG ANALYSIS & INCIDENT RESPONSE LAB
   ========================================== */

// Fictional security events for this simulation.
const securityLogs = [
    {
        time: "09:12:04",
        event: "Successful Login",
        account: "a.jones",
        ip: "192.0.2.14",
        severity: "info",
        details: "User authenticated successfully."
    },
    {
        time: "09:14:10",
        event: "Failed Login",
        account: "j.smith",
        ip: "198.51.100.23",
        severity: "warning",
        details: "Incorrect password."
    },
    {
        time: "09:14:32",
        event: "Failed Login",
        account: "j.smith",
        ip: "198.51.100.23",
        severity: "warning",
        details: "Incorrect password."
    },
    {
        time: "09:14:51",
        event: "Failed Login",
        account: "j.smith",
        ip: "198.51.100.23",
        severity: "high",
        details: "Repeated authentication failure."
    },
    {
        time: "09:15:08",
        event: "Failed Login",
        account: "j.smith",
        ip: "198.51.100.23",
        severity: "high",
        details: "Additional failed authentication attempt."
    },
    {
        time: "09:16:17",
        event: "Successful Login",
        account: "j.smith",
        ip: "198.51.100.23",
        severity: "high",
        details: "Successful login following repeated failures."
    },
    {
        time: "09:17:02",
        event: "New Location Login",
        account: "j.smith",
        ip: "203.0.113.42",
        severity: "high",
        details: "Login from an unfamiliar location."
    },
    {
        time: "09:18:20",
        event: "Session Created",
        account: "j.smith",
        ip: "203.0.113.42",
        severity: "info",
        details: "New authenticated session created."
    },
    {
        time: "09:19:11",
        event: "Restricted Resource Access",
        account: "j.smith",
        ip: "203.0.113.42",
        severity: "high",
        details: "Account accessed a restricted resource."
    },
    {
        time: "09:20:03",
        event: "Password Reset Requested",
        account: "m.lee",
        ip: "192.0.2.55",
        severity: "info",
        details: "Password reset request submitted."
    },
    {
        time: "09:21:15",
        event: "Failed Login",
        account: "m.lee",
        ip: "192.0.2.55",
        severity: "warning",
        details: "Incorrect password."
    },
    {
        time: "09:22:40",
        event: "Successful Login",
        account: "a.jones",
        ip: "192.0.2.14",
        severity: "info",
        details: "User session continued normally."
    }
];


// ==========================================
// DASHBOARD STATISTICS
// ==========================================

function updateDashboard() {
    document.getElementById("totalEvents").textContent =
        securityLogs.length;

    document.getElementById("failedLogins").textContent =
        securityLogs.filter(log =>
            log.event === "Failed Login"
        ).length;

    document.getElementById("suspiciousEvents").textContent =
        securityLogs.filter(log =>
            log.severity === "high"
        ).length;
}


// ==========================================
// DISPLAY THE LOGS
// ==========================================

function displayLogs(filter = "all") {
    const logEntries = document.getElementById("logEntries");
    const logCount = document.getElementById("logCount");

    // Remove previous rows.
    logEntries.replaceChildren();

    const filteredLogs = securityLogs.filter(log =>
        filter === "all" || log.severity === filter
    );

    filteredLogs.forEach(log => {
        const row = document.createElement("tr");

        const values = [
            log.time,
            log.event,
            log.account,
            log.ip,
            log.severity.toUpperCase(),
            log.details
        ];

        values.forEach(value => {
            const cell = document.createElement("td");

            // Use textContent so log data is treated as text,
            // not interpreted as HTML.
            cell.textContent = value;
            row.appendChild(cell);
        });

        row.classList.add(`severity-${log.severity}`);
        logEntries.appendChild(row);
    });

    logCount.textContent =
        `Showing ${filteredLogs.length} of ${securityLogs.length} events.`;
}


// ==========================================
// SEVERITY FILTER
// ==========================================

document.getElementById("severityFilter")
    .addEventListener("change", event => {
        displayLogs(event.target.value);
    });

document.getElementById("resetLogFilter")
    .addEventListener("click", () => {
        document.getElementById("severityFilter").value = "all";
        displayLogs("all");
    });


// ==========================================
// INVESTIGATION CHALLENGE
// ==========================================

document.getElementById("submitInvestigation")
    .addEventListener("click", () => {
        const selected = document.querySelector(
            'input[name="incidentChoice"]:checked'
        );

        const result = document.getElementById("investigationResult");
        const status = document.getElementById("incidentStatus");

        if (!selected) {
            result.textContent =
                "Please select an investigation conclusion first.";
            result.className = "log-result warning";
            return;
        }

        if (selected.value === "compromise") {
            result.textContent =
                "Correct. Repeated failed logins followed by a successful login, " +
                "an unfamiliar source, and restricted resource access warrant " +
                "investigation for a possible account compromise. These events " +
                "are suspicious but do not independently prove malicious activity.";

            result.className = "log-result success";
            status.textContent = "Under Investigation";
        } else if (selected.value === "normal") {
            result.textContent =
                "Not quite. A successful login does not rule out compromise. " +
                "Review the repeated failures, subsequent successful login, " +
                "unfamiliar source, and restricted resource access.";

            result.className = "log-result danger";
        } else {
            result.textContent =
                "Not quite. A DDoS attack typically involves overwhelming a " +
                "service with traffic. These logs instead suggest a possible " +
                "account compromise that needs further investigation.";

            result.className = "log-result danger";
        }
    });


// ==========================================
// INCIDENT RESPONSE
// ==========================================

document.getElementById("submitResponse")
    .addEventListener("click", () => {
        const selectedActions = Array.from(
            document.querySelectorAll(
                'input[name="responseAction"]:checked'
            )
        ).map(input => input.value);

        const result = document.getElementById("responseResult");

        const requiredActions = [
            "disable",
            "revoke",
            "preserve",
            "escalate"
        ];

        const hasUnsafeAction = selectedActions.includes("ignore");

        const missingActions = requiredActions.filter(action =>
            !selectedActions.includes(action)
        );

        if (selectedActions.length === 0) {
            result.textContent =
                "Select at least one response action.";
            result.className = "log-result warning";
            return;
        }

        if (hasUnsafeAction) {
            result.textContent =
                "Your response needs improvement. Ignoring the activity " +
                "could allow a compromised account to remain active. " +
                "Consider containment, session revocation, evidence preservation, " +
                "and escalation.";

            result.className = "log-result danger";
            return;
        }

        if (missingActions.length === 0) {
            result.textContent =
                "Excellent response. You selected containment, session and " +
                "credential remediation, evidence preservation, and escalation. " +
                "In a real incident, coordinate these actions with the incident " +
                "response plan and authorized personnel.";

            result.className = "log-result success";
        } else {
            result.textContent =
                "Good start, but your response is incomplete. Consider all four " +
                "areas: contain the account, revoke sessions and address credentials, " +
                "preserve evidence, and escalate through the response plan.";

            result.className = "log-result warning";
        }
    });


// ==========================================
// RESTART THE INVESTIGATION
// ==========================================

document.getElementById("resetInvestigation")
    .addEventListener("click", () => {
        document.querySelectorAll(
            'input[name="incidentChoice"], input[name="responseAction"]'
        ).forEach(input => {
            input.checked = false;
        });

        document.getElementById("severityFilter").value = "all";

        document.getElementById("investigationResult").textContent =
            "Review the logs before submitting your conclusion.";
        document.getElementById("investigationResult").className =
            "log-result";

        document.getElementById("responseResult").textContent =
            "Select your response actions to begin.";
        document.getElementById("responseResult").className =
            "log-result";

        document.getElementById("incidentStatus").textContent =
            "Uninvestigated";

        displayLogs("all");
    });


// ==========================================
// INITIALIZE THE LAB
// ==========================================

updateDashboard();
displayLogs();
