function startScan() {
    const input = document.getElementById('scanInput').value.trim();
    if (!input) return alert("PROTOCOL ERROR: Please enter a target.");

    const modal = document.getElementById('scanModal');
    const result = document.getElementById('resultOutput');
    const status = document.getElementById('statusText');
    const scoreText = document.getElementById('riskScoreText');
    const scanner = document.getElementById('scannerAnimation');
    const label = document.getElementById('riskLevelLabel');

    modal.classList.remove('hidden');
    result.classList.add('hidden');
    scanner.classList.remove('hidden');
    status.innerText = "INITIALIZING KINETIC BASTION...";

    // 1. Accuracy Logic Engine
    const finalScore = calculateRiskScore(input.toLowerCase());

    // 2. Mock AI Step Sequence
    const steps = ["DECRYPTING METADATA...", "VERIFYING SSL LAYER...", "CROSS-REFERENCING BLACKLISTS...", "VERDICT READY"];
    let i = 0;
    const interval = setInterval(() => {
        if (i < steps.length) {
            status.innerText = steps[i];
            i++;
        } else {
            clearInterval(interval);
            finishScan(finalScore);
        }
    }, 800);

    function finishScan(score) {
        scanner.classList.add('hidden');
        result.classList.remove('hidden');
        
        // Animated Counter
        let count = 0;
        const counter = setInterval(() => {
            if (count >= score) {
                clearInterval(counter);
            } else {
                count++;
                scoreText.innerText = count + "%";
            }
        }, 20);

        // Update UI colors based on risk
        if (score > 60) {
            status.innerText = "THREAT DETECTED";
            status.style.color = "#ff4b2b";
            label.innerText = "CRITICAL PHISHING RISK";
            label.style.color = "#ff4b2b";
        } else {
            status.innerText = "SYSTEM SECURE";
            status.style.color = "#00f2fe";
            label.innerText = "NO MALICIOUS INTENT FOUND";
            label.style.color = "#00f2fe";
        }
    }
}

function calculateRiskScore(url) {
    let risk = 0;
    // Known Trusted
    const safe = ['google.com', 'facebook.com', 'apple.com', 'github.com', 'bybit.com', 'binance.com'];
    if (safe.some(s => url.includes(s))) return Math.floor(Math.random() * 5) + 1;

    // Red Flags
    if (!url.startsWith('https://')) risk += 45;
    const flags = ['free', 'gift', 'win', 'claim', 'verify', 'account-update', 'login-now'];
    flags.forEach(f => { if (url.includes(f)) risk += 25; });
    if (url.includes('.xyz') || url.includes('.top')) risk += 20;

    return Math.min(risk || Math.floor(Math.random() * 30) + 10, 99);
}

function closeModal() {
    document.getElementById('scanModal').classList.add('hidden');
}