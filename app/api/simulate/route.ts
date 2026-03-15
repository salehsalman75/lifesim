import OpenAI from "openai";

const openai = new OpenAI({
apiKey: process.env.OPENAI_API_KEY!,
});

function randomScore(min: number, max: number) {
return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFrom(arr: string[]) {
return arr[Math.floor(Math.random() * arr.length)];
}

function buildPreview(fullText: string, maxChars: number) {
if (fullText.length <= maxChars) return fullText;

const truncated = fullText.slice(0, maxChars);

const lastStop = Math.max(
truncated.lastIndexOf("."),
truncated.lastIndexOf("!"),
truncated.lastIndexOf("?"),
truncated.lastIndexOf(","),
truncated.lastIndexOf(" ")
);

if (lastStop > 220) {
return truncated.slice(0, lastStop).trim();
}

return truncated.trim();
}

export async function POST(req: Request) {
try {
const body = await req.json();

const score = randomScore(60, 95);
const successProbability = randomScore(55, 90);

const riskLevel = randomFrom([
"Low",
"Medium",
"Elevated",
"High",
]);

const wealthTrajectory = randomFrom([
"Stable growth",
"High potential",
"Breakthrough opportunity",
"Unpredictable",
]);

const aiPrompt = `
Write a realistic future life analysis for the user.

Sections:
- Future Direction
- Career and Wealth Path
- Hidden Risk
- Turning Point
- 10 Year Outcome

Tone:
- grounded
- realistic
- insightful
- personal

User:
Age: ${body.age}
Career: ${body.career}
Goal: ${body.goal}
Fear: ${body.fear}
Location: ${body.location}
`;

const completion = await openai.chat.completions.create({
model: "gpt-4.1-mini",
temperature: 0.85,
messages: [
{
role: "system",
content: "You generate insightful life trajectory reports.",
},
{
role: "user",
content: aiPrompt,
},
],
});

const fullFutureText =
completion.choices?.[0]?.message?.content?.trim() || "";

const previewText = buildPreview(fullFutureText, 520);

return Response.json({
score,
successProbability,
riskLevel,
wealthTrajectory,
previewText,
});
} catch (error) {
console.error("SIMULATION_ERROR:", error);

return new Response(
JSON.stringify({
error: "Simulation failed",
}),
{
status: 500,
headers: {
"Content-Type": "application/json",
},
}
);
}
}


