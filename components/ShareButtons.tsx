"use client";

export default function ShareButtons({
score,
successProbability,
}: {
score: number;
successProbability: number;
}) {
const shareText = `I just simulated my life in 10 years 🔮

Future score: ${score}/100
Success probability: ${successProbability}%

What score would you get?

Try yours:
https://lifesim.ai`;

function shareX() {
const tweet = encodeURIComponent(shareText);
window.open(`https://twitter.com/intent/tweet?text=${tweet}`, "_blank");
}

function shareWhatsApp() {
const text = encodeURIComponent(shareText);
window.open(`https://wa.me/?text=${text}`, "_blank");
}

function copyText() {
navigator.clipboard.writeText(shareText);
alert("Result copied!");
}

return (
<div
style={{
display: "flex",
gap: 10,
marginTop: 20,
flexWrap: "wrap",
}}
>
<button
onClick={shareX}
style={{
padding: "10px 16px",
borderRadius: 10,
border: "none",
background: "#000",
color: "white",
cursor: "pointer",
fontWeight: 700,
}}
>
Share on X
</button>

<button
onClick={shareWhatsApp}
style={{
padding: "10px 16px",
borderRadius: 10,
border: "none",
background: "#25D366",
color: "white",
cursor: "pointer",
fontWeight: 700,
}}
>
WhatsApp
</button>

<button
onClick={copyText}
style={{
padding: "10px 16px",
borderRadius: 10,
border: "none",
background: "#3b82f6",
color: "white",
cursor: "pointer",
fontWeight: 700,
}}
>
Copy result
</button>
</div>
);
}
