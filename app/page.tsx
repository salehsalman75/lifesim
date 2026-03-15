"use client";

import { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import ShareButtons from "@/components/ShareButtons";

export default function Home() {
const [age, setAge] = useState("");
const [career, setCareer] = useState("");
const [goal, setGoal] = useState("");
const [fear, setFear] = useState("");
const [location, setLocation] = useState("");

const [score, setScore] = useState<number | null>(null);
const [successProbability, setSuccessProbability] = useState<number | null>(null);
const [wealthTrajectory, setWealthTrajectory] = useState("");
const [riskLevel, setRiskLevel] = useState("");
const [story, setStory] = useState("");

const [loading, setLoading] = useState(false);

const [peopleToday, setPeopleToday] = useState(2350);

useEffect(() => {
const interval = setInterval(() => {
setPeopleToday((p) => p + Math.floor(Math.random() * 2));
}, 9000);

return () => clearInterval(interval);
}, []);

async function simulate() {
setLoading(true);

const res = await fetch("/api/simulate", {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({ age, career, goal, fear, location }),
});

const data = await res.json();

setScore(data.score);
setSuccessProbability(data.successProbability);
setWealthTrajectory(data.wealthTrajectory);
setRiskLevel(data.riskLevel);
setStory(data.previewText);

setLoading(false);
}

async function downloadScreenshot() {
const element = document.getElementById("future-result");

if (!element) return;

const canvas = await html2canvas(element, {
scale: 2,
backgroundColor: null,
});

const link = document.createElement("a");
link.download = "future-score.png";
link.href = canvas.toDataURL();
link.click();
}

return (
<main style={mainStyle}>
<div style={containerStyle}>
{/* LEFT SIDE */}
<section style={cardStyle}>
<div style={badgeStyle}>AI Future Simulation</div>

<h1 style={titleStyle}>See your life in 10 years 🔮</h1>

<p style={subtitleStyle}>
Answer a few questions and preview your AI future.
</p>

<p style={{ opacity: 0.6 }}>
Free preview • Full AI life simulation $7
</p>

<p style={socialProofStyle}>
🔥 {peopleToday.toLocaleString()} people simulated their future today
</p>

<div style={inputGrid}>
<input
style={inputStyle}
placeholder="Age"
value={age}
onChange={(e) => setAge(e.target.value)}
/>

<input
style={inputStyle}
placeholder="Career"
value={career}
onChange={(e) => setCareer(e.target.value)}
/>

<input
style={inputStyle}
placeholder="Biggest goal"
value={goal}
onChange={(e) => setGoal(e.target.value)}
/>

<input
style={inputStyle}
placeholder="Biggest fear"
value={fear}
onChange={(e) => setFear(e.target.value)}
/>

<input
style={inputStyle}
placeholder="Location"
value={location}
onChange={(e) => setLocation(e.target.value)}
/>
</div>

<button style={simulateButton} onClick={simulate}>
{loading ? "Simulating..." : "Simulate my future"}
</button>
</section>

{/* RESULT SIDE */}
<section id="future-result" style={cardStyle}>
<h2>Your future</h2>

{score === null && (
<p style={{ opacity: 0.6 }}>Your AI simulation will appear here.</p>
)}

{score !== null && (
<>
<h1 style={{ fontSize: 42 }}>{score} / 100</h1>
<p>Future Score</p>

<div style={{ marginTop: 10 }}>
<div>Success probability: {successProbability}%</div>
<div>Wealth trajectory: {wealthTrajectory}</div>
<div>Risk level: {riskLevel}</div>
</div>

<p style={storyStyle}>{story}</p>

<div style={paywallStyle}>
Most people stop before the most important part.
</div>

<a
href="https://salman754.gumroad.com/l/lgdnq"
target="_blank"
rel="noreferrer"
style={payButton}
>
Unlock the rest of your future — $7
</a>

<button onClick={downloadScreenshot} style={downloadButton}>
Download my result
</button>

<ShareButtons
score={score ?? 0}
successProbability={successProbability ?? 0}
/>
</>
)}
</section>
</div>
</main>
);
}

/* ---------- STYLES ---------- */

const mainStyle: React.CSSProperties = {
minHeight: "100vh",
padding: 40,
background:
"radial-gradient(circle at top,#1e293b 0%,#0f172a 40%,#020617 100%)",
color: "white",
fontFamily: "Arial",
};

const containerStyle: React.CSSProperties = {
maxWidth: 1100,
margin: "0 auto",
display: "grid",
gridTemplateColumns: "1fr 1fr",
gap: 24,
};

const cardStyle: React.CSSProperties = {
background: "rgba(255,255,255,0.06)",
padding: 30,
borderRadius: 20,
border: "1px solid rgba(255,255,255,0.1)",
};

const badgeStyle: React.CSSProperties = {
background: "rgba(255,255,255,0.08)",
padding: "6px 12px",
borderRadius: 20,
display: "inline-block",
fontSize: 12,
};

const titleStyle: React.CSSProperties = {
fontSize: 36,
marginTop: 10,
};

const subtitleStyle: React.CSSProperties = {
opacity: 0.7,
};

const socialProofStyle: React.CSSProperties = {
marginTop: 10,
fontSize: 14,
opacity: 0.7,
};

const inputGrid: React.CSSProperties = {
display: "grid",
gap: 10,
marginTop: 20,
};

const inputStyle: React.CSSProperties = {
padding: 12,
borderRadius: 10,
border: "1px solid rgba(255,255,255,0.15)",
background: "rgba(255,255,255,0.05)",
color: "white",
};

const simulateButton: React.CSSProperties = {
marginTop: 20,
padding: 14,
borderRadius: 10,
border: "none",
background: "#6366f1",
color: "white",
fontWeight: 700,
cursor: "pointer",
};

const storyStyle: React.CSSProperties = {
marginTop: 14,
lineHeight: 1.6,
opacity: 0.9,
};

const paywallStyle: React.CSSProperties = {
marginTop: 16,
padding: 12,
borderRadius: 12,
background: "rgba(99,102,241,0.2)",
textAlign: "center",
};

const payButton: React.CSSProperties = {
display: "inline-block",
marginTop: 16,
padding: "12px 18px",
borderRadius: 12,
background: "linear-gradient(135deg,#7c3aed,#8b5cf6)",
color: "white",
textDecoration: "none",
fontWeight: 800,
};

const downloadButton: React.CSSProperties = {
marginTop: 12,
padding: "10px 16px",
borderRadius: 10,
border: "none",
background: "#22c55e",
color: "white",
fontWeight: 700,
cursor: "pointer",
};

