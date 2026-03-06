const API_BASE = "http://127.0.0.1:8000/api";

// ----------------- TAB CONTROLLER -----------------
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Reset Tabs
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        // Activate current
        btn.classList.add('active');
        document.getElementById(btn.dataset.target).classList.add('active');
    });
});

// ----------------- SIDEBAR CONTROLLER -----------------
const config = {
    model: document.getElementById('modelSelect'),
    key: document.getElementById('apiKey'),
    url: document.getElementById('customUrl'),
    grpApi: document.getElementById('groupApi'),
    grpUrl: document.getElementById('groupUrl'),

    getVals() {
        return {
            model: this.model.value,
            api_key: this.key.value.trim(),
            custom_url: this.url.value.trim()
        }
    }
}

config.model.addEventListener('change', () => {
    const v = config.model.value;
    config.grpApi.style.display = "flex";
    config.grpUrl.style.display = "none";
    config.key.value = "";

    if (v.includes("Mock")) {
        config.grpApi.style.display = "none";
    } else if (v.includes("Custom")) {
        config.grpUrl.style.display = "flex";
        config.key.placeholder = "Bearer Token (Optional)";
    } else {
        config.key.placeholder = "sk-or-v1-....";
    }
});

// ----------------- UTIL HELPERS -----------------
const toggleBtn = (btn, showLoad) => {
    const txt = btn.querySelector('.btn-text');
    const load = btn.querySelector('.loader-spinner');
    if (showLoad) { txt.style.display = 'none'; load.style.display = 'block'; btn.style.pointerEvents = 'none'; }
    else { txt.style.display = 'block'; load.style.display = 'none'; btn.style.pointerEvents = 'auto'; }
};

let chartInst = null;
const renderChart = (labels, data) => {
    if (chartInst) chartInst.destroy();
    Chart.defaults.color = "#94a3b8";
    const colors = data.map(s => s >= 80 ? '#10b981' : s >= 50 ? '#f59e0b' : '#ef4444');
    chartInst = new Chart(document.getElementById('vectorChart'), {
        type: 'bar',
        data: {
            labels, datasets: [{
                label: "Score", data, backgroundColor: colors, borderRadius: 4
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            scales: { y: { beginAtZero: true, max: 100 } },
            plugins: { legend: { display: false } }
        }
    });
};

// ----------------- TAB 1: SCANNER -----------------
let scannerReportCache = [];
document.getElementById('btnScanner').addEventListener('click', async (e) => {
    const btn = e.currentTarget;
    const task = document.getElementById('scannerTask').value;
    const c = config.getVals();

    if (!task) return alert("Task required");

    toggleBtn(btn, true);
    try {
        const res = await fetch(`${API_BASE}/evaluate`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task, model: c.model, api_key: c.api_key, custom_url: c.custom_url })
        });
        if (!res.ok) throw new Error("API Failure");
        const data = await res.json();

        // Render KPIs
        document.getElementById('scannerResults').style.display = "block";
        document.getElementById('kpiScore').innerText = `${data.overallScore.toFixed(0)}%`;
        const passed = data.results.filter(r => r.passed).length;
        document.getElementById('kpiPassed').innerText = `${passed}/${data.results.length}`;
        document.getElementById('kpiScore').style.color = data.overallScore >= 80 ? '#10b981' : data.overallScore >= 50 ? '#f59e0b' : '#ef4444';

        // Render Chart
        renderChart(data.results.map(r => r.attackType), data.results.map(r => r.score));

        // Render Traces
        scannerReportCache = data.results;
        const domTrace = document.getElementById('scannerTraces');
        domTrace.innerHTML = data.results.map(r => `
            <div class="trace-item" data-status="${r.passed ? 'PASS' : 'FAIL'}">
                <div class="trace-header">
                    <span>${r.passed ? '🛡️ PASS' : '🚨 FAIL'} | ${r.attackType}</span>
                    <span>${r.score}%</span>
                </div>
                <p class="help-text">Instruction Sent:</p>
                <div class="trace-box" style="margin: 0.5rem 0;">${r.promptUsed}</div>
                <p class="help-text">Target Model Readout:</p>
                <div class="trace-box" style="margin: 0.5rem 0;">${r.modelResponse}</div>
                <p style="color:#a78bfa; font-style:italic; font-size:0.85rem">🧠 Evaluator Node: ${r.evaluationReasoning}</p>
            </div>
        `).join("");

    } catch (err) {
        alert("Make sure backend is running: " + err);
    } finally {
        toggleBtn(btn, false);
    }
});

document.getElementById('btnExportScanner').addEventListener('click', () => {
    if (!scannerReportCache.length) return alert('No scans stored.');
    const rows = scannerReportCache.map(r => `"${r.attackType}","${r.promptUsed.replace(/"/g, '""')}","${r.modelResponse.replace(/"/g, '""')}","${r.score}","${r.passed}"`);
    const csv = "data:text/csv;charset=utf-8,Type,Prompt,Response,Score,Passed\n" + rows.join("\n");
    const link = document.createElement('a'); link.href = encodeURI(csv); link.download = "llmguard_scan.csv"; link.click();
});

// ----------------- TAB 2: ANALYZER -----------------
document.getElementById('btnAnalyze').addEventListener('click', async (e) => {
    const btn = e.currentTarget;
    const prompt = document.getElementById('analyzerPrompt').value;
    if (!prompt) return alert("Prompt required");
    toggleBtn(btn, true);

    try {
        const res = await fetch(`${API_BASE}/analyze`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt })
        });
        const data = await res.json();

        document.getElementById('analyzerResults').style.display = "block";
        const scrEl = document.getElementById('analyzeScore');
        scrEl.innerText = `Score: ${data.score}/100`;
        scrEl.style.color = data.score > 80 ? '#10b981' : data.score > 50 ? '#f59e0b' : '#ef4444';

        document.getElementById('analyzeIssues').innerHTML = data.issues.map(i => `<li style="font-size:1.1rem;margin-bottom:0.5rem;">${i}</li>`).join("");

        document.getElementById('analyzeSuggestions').innerHTML = data.suggestions.map((s, idx) => {
            const blockedAttr = s.blocked ? 'style="background: rgba(239, 68, 68, 0.1); border: 1px solid var(--danger); cursor: not-allowed; opacity: 0.6;"' : `style="background: rgba(16,185,129,0.05); border: 1px solid var(--success); cursor: pointer; transition: 0.2s;" onclick="useSuggestion('${s.text.replace(/'/g, "\\'")}')"`;
            const badge = s.blocked ? '<span style="background:var(--danger); color:white; padding:2px 6px; border-radius:4px; font-size:10px; margin-left:10px;">🛡️ BLOCKED (High Risk)</span>' : '';
            return `
                <div class="trace-box" ${blockedAttr}>
                    <strong>Opt ${idx + 1} (${s.type}):</strong> ${s.text} ${badge}
                </div>
            `;
        }).join("");

    } catch (err) { alert(err) } finally { toggleBtn(btn, false); }
});

// ----------------- TAB 3: RED TEAM -----------------
const redLvl = document.getElementById('redLevel');
redLvl.addEventListener('input', () => document.getElementById('lblLevel').innerText = redLvl.value);

document.getElementById('btnRedTeam').addEventListener('click', async (e) => {
    const btn = e.currentTarget;
    const c = config.getVals();

    toggleBtn(btn, true);
    try {
        const taskVal = document.getElementById('redTask').value || "test limits";
        const res = await fetch(`${API_BASE}/redteam`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ model: c.model, api_key: c.api_key, level: parseInt(redLvl.value), task: taskVal, custom_url: c.custom_url })
        });
        const data = await res.json();

        document.getElementById('redTeamResults').style.display = "block";
        document.getElementById('redTeamTraces').innerHTML = data.attacks.map(atk => `
            <div class="trace-item" data-status="${atk.passed ? 'PASS' : 'FAIL'}" style="border-left-color: ${atk.passed ? '#10b981' : '#ef4444'}">
                <div class="trace-header" style="color: ${atk.passed ? '#10b981' : '#ef4444'}">
                    <span>${atk.passed ? '🛡️ DEFENDED' : '🚨 BREACHED'} | Score: ${atk.score}%</span>
                </div>
                <div class="trace-box" style="border-color:${atk.passed ? '#10b981' : '#ef4444'}; margin-bottom: 1rem;">${atk.payload}</div>
                <p class="help-text">Target Node Response:</p>
                <div class="trace-box" style="background:rgba(0,0,0,0.6);">${atk.response}</div>
                <p style="color:#a78bfa; font-style:italic; font-size:0.85rem">🧠 Reason: ${atk.reason}</p>
            </div>
        `).join("");
    } catch (err) { alert(err); } finally { toggleBtn(btn, false); }
});

window.useSuggestion = (text) => {
    document.getElementById('redTask').value = text;
    document.querySelectorAll('.tab-btn')[2].click();
};

// --- AUTH LOGIC ---
const authModal = document.getElementById('authModal');
const authTitle = document.getElementById('authTitle');
const btnAuthSubmit = document.getElementById('btnAuthSubmit');
const authToggleLink = document.getElementById('authToggleLink');
const authToggleText = document.getElementById('authToggleText');
let isSignup = false;

window.openAuthModal = () => authModal.style.display = 'flex';
window.closeAuthModal = () => authModal.style.display = 'none';

authToggleLink.onclick = (e) => {
    e.preventDefault();
    isSignup = !isSignup;
    authTitle.innerText = isSignup ? "Create Account" : "Welcome Back";
    btnAuthSubmit.innerText = isSignup ? "Sign Up" : "Login";
    authToggleText.innerText = isSignup ? "Already have an account?" : "Don't have an account?";
    authToggleLink.innerText = isSignup ? "Login" : "Sign Up";
};

btnAuthSubmit.onclick = async () => {
    const user = document.getElementById('authUser').value;
    const pass = document.getElementById('authPass').value;
    if (!user || !pass) return alert("Fill all fields");

    const endpoint = isSignup ? '/signup' : '/login';
    try {
        const res = await fetch(`${API_BASE}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: user, password: pass })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.detail || "Auth failed");

        localStorage.setItem('llmguard_user', user);
        unlockDashboard(user);
        closeAuthModal();
    } catch (err) { alert(err.message); }
};

function unlockDashboard(user) {
    document.getElementById('authLockedOverlay').style.display = 'none';
    const authBtn = document.getElementById('navAuthBtn');
    authBtn.innerText = `Logout (${user})`;
    authBtn.onclick = logout;
}

window.logout = () => {
    localStorage.removeItem('llmguard_user');
    document.getElementById('authLockedOverlay').style.display = 'flex';
    const authBtn = document.getElementById('navAuthBtn');
    authBtn.innerText = "Login / Signup";
    authBtn.onclick = openAuthModal;
    // Optional: window.location.reload(); 
};

window.addEventListener('load', () => {
    const savedUser = localStorage.getItem('llmguard_user');
    if (savedUser) unlockDashboard(savedUser);
});


