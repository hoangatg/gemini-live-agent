<p align="center">
  <img src="https://img.shields.io/badge/🎯-GemLive%20Interview-7c3aed?style=for-the-badge&labelColor=0d0d24" alt="GemLive Interview" />
</p>

<h1 align="center">GemLive Interview</h1>
<h3 align="center">AI Mock Interview Coach — Multi-Agent Platform</h3>

<p align="center">
  <strong>Practice real interviews with a team of 5 AI agents that coach you from start to finish.</strong><br/>
  <em>Built for the <a href="https://geminiliveagentchallenge.devpost.com/">Gemini Live Agent Challenge 2026</a></em>
</p>

<p align="center">
  <a href="https://gemlive-interview-coach.web.app"><img src="https://img.shields.io/badge/🌐_Live_Demo-gemlive--interview--coach.web.app-00c853?style=for-the-badge" alt="Live Demo" /></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Gemini_2.5_Flash-Google_AI-4285F4?style=flat-square&logo=google&logoColor=white" alt="Gemini" />
  <img src="https://img.shields.io/badge/Firebase-Hosting-FF9100?style=flat-square&logo=firebase&logoColor=white" alt="Firebase" />
  <img src="https://img.shields.io/badge/Streaming-SSE_Real--time-7c3aed?style=flat-square" alt="Streaming" />
  <img src="https://img.shields.io/badge/Vision-Multimodal-06b6d4?style=flat-square" alt="Vision" />
  <img src="https://img.shields.io/badge/License-MIT-10b981?style=flat-square" alt="License" />
</p>

---

## 📌 Table of Contents

- [The Problem](#-the-problem)
- [The Solution](#-the-solution)
- [Live Demo](#-live-demo)
- [Key Features](#-key-features)
- [Architecture](#-architecture--how-it-works)
- [The AI Agent Team](#-the-ai-agent-team)
- [Multi-Agent Orchestration Flow](#-multi-agent-orchestration-flow)
- [Technology Stack](#-technology-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Gemini API Integration Details](#-gemini-api-integration-details)
- [Design Philosophy](#-design-philosophy)
- [Hackathon Track Alignment](#-hackathon-track-alignment)
- [Future Roadmap](#-future-roadmap)
- [Author](#-author)
- [License](#-license)

---

## 🎯 The Problem

**Job interviews are broken.** Millions of candidates prepare alone with zero feedback:

| Pain Point | Impact |
|-----------|--------|
| 💸 Professional coaching costs **$100-500/session** | Inaccessible for most job seekers |
| 🤷 Solo practice gives **no realistic feedback** | Candidates repeat the same mistakes |
| 😰 No way to **simulate real pressure** | Interview anxiety remains unaddressed |
| 📋 Generic advice doesn't match **your specific role** | One-size-fits-all preparation is ineffective |

**Result:** 73% of candidates report interview anxiety as their #1 barrier to career growth.

## 💡 The Solution

**GemLive Interview** is an immersive AI-powered mock interview platform where **5 specialized Gemini agents** collaborate in real-time to deliver a complete interview coaching experience.

```
  Choose Position → AI Interviews You → Get Scored → Receive Coaching Plan
  
  🎭 Interviewer         📝 Feedback Coach       📊 Performance Coach
  "Tell me about..."  →  "Score: 8/10..."     →  "7-Day Plan: ..."
```

Unlike simple chatbots, GemLive Interview features **autonomous multi-agent orchestration** — after the interview, the system automatically chains Feedback Coach → Performance Coach without user intervention, creating an immersive, end-to-end coaching flow.

## 🌐 Live Demo

> **Try it now:** [https://gemlive-interview-coach.web.app](https://gemlive-interview-coach.web.app)

**Requirements:** A free [Gemini API Key](https://aistudio.google.com/apikey) (takes 30 seconds to get)

### Quick Walkthrough

1. **Enter your Gemini API key** (stored locally, never sent to our servers)
2. **Choose a position** — Software Engineer, Data Scientist, Product Manager, etc.
3. **Answer interview questions** — type or use voice input 🎤
4. **Watch 3 AI agents collaborate** after the interview to give you a complete report

---

## ✨ Key Features

### Core Interview Experience
| Feature | Description |
|---------|------------|
| 🎭 **Realistic Mock Interviews** | AI Interviewer conducts position-specific interviews with intelligent follow-up questions based on your answers |
| 📝 **Instant Answer Scoring** | Feedback Coach rates each answer 1-10 using STAR method criteria and suggests better responses |
| 📄 **Resume Intelligence** | Upload your resume image → AI identifies strengths, skill gaps, and predicts likely interview topics |
| 📊 **Performance Reports** | Category breakdown (Communication, Technical, Problem-Solving, Confidence) + personalized 7-day improvement plan |

### Advanced UX Features
| Feature | Description |
|---------|------------|
| ⏱️ **Countdown Timer** | 2-minute circular timer per question with color-coded urgency (green → amber → red) simulating real interview pressure |
| 🎊 **Confetti Celebration** | 60-particle animated confetti explosion when you complete an interview session |
| 🎤 **Voice Input + Wave Animation** | Answer by speaking with real-time audio wave visualization in the header |
| ⚡ **Streaming Responses** | Server-Sent Events (SSE) for real-time word-by-word AI response rendering |
| 🔗 **Autonomous Agent Orchestration** | After interview, agents chain automatically: Interviewer → Feedback → Performance |
| 🌙 **Premium Glassmorphism UI** | Dark theme with animated grid background, floating glows, and micro-animations |

### Supported Interview Positions
| 💻 Software Engineer | 📊 Data Scientist | 🚀 Product Manager |
|---|---|---|
| ☁️ DevOps Engineer | 🎨 UX Designer | 📈 Marketing Manager |

---

## 🏗️ Architecture — How It Works

### System Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                    GemLive Interview (SPA)                    │
│              Deployed on Firebase Hosting (GCP)               │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│   ┌─────────────┐                                            │
│   │   Frontend   │  HTML5 / CSS3 / Vanilla JS                │
│   │   (3 files)  │  Zero dependencies. Premium dark UI.      │
│   └──────┬──────┘                                            │
│          │                                                   │
│   ┌──────▼──────────────────────────────────────────────┐    │
│   │           Multi-Agent Orchestration Engine           │    │
│   │                                                      │    │
│   │  ┌─────────┐  ┌──────────┐  ┌─────────────────┐    │    │
│   │  │   🎭    │  │    📝    │  │       📊        │    │    │
│   │  │Interview│─▶│ Feedback │─▶│  Performance    │    │    │
│   │  │   er    │  │  Coach   │  │    Coach        │    │    │
│   │  └─────────┘  └──────────┘  └─────────────────┘    │    │
│   │       │                              ▲              │    │
│   │       │        ┌──────────┐          │              │    │
│   │       ├───────▶│    📄    │──────────┘              │    │
│   │       │        │  Resume  │                         │    │
│   │       │        │ Analyzer │ (Multimodal Vision)     │    │
│   │       │        └──────────┘                         │    │
│   │       │                                             │    │
│   │  ┌────▼────────────────────────────────────────┐    │    │
│   │  │         🤖 Orchestrator Agent               │    │    │
│   │  │    Routes requests, manages agent flow      │    │    │
│   │  └─────────────────────────────────────────────┘    │    │
│   └──────────────────────────────────────────────────────┘    │
│                           │                                   │
├───────────────────────────┼───────────────────────────────────┤
│                           ▼                                   │
│              Google Cloud Platform (GCP)                       │
│                                                               │
│   ┌─────────────────────────────────────────────────┐         │
│   │          Gemini 2.5 Flash API                   │         │
│   │                                                  │         │
│   │  📡 Streaming (SSE)    — Real-time responses     │         │
│   │  👁️ Vision/Multimodal  — Resume image analysis   │         │
│   │  💬 Multi-turn Context — Conversation history     │         │
│   │  🧠 System Prompts     — Per-agent personalities  │         │
│   │  📊 generateContent    — Batch analysis calls     │         │
│   └─────────────────────────────────────────────────┘         │
│                                                               │
│   ┌─────────────────────────────────────────────────┐         │
│   │  Firebase Hosting — CDN + SSL + Custom Domain    │         │
│   └─────────────────────────────────────────────────┘         │
└───────────────────────────────────────────────────────────────┘
```

### Data Flow

```
User Input ──▶ Agent Selection ──▶ System Prompt Injection ──▶ Gemini API
                                                                    │
                                                              SSE Stream
                                                                    │
Chat UI ◀── Markdown Renderer ◀── Token Accumulator ◀──────────────┘
```

---

## 🤖 The AI Agent Team

Each agent has a **unique system prompt** that defines its personality, expertise, and output format:

### 🎭 Interviewer Agent
- **Role:** Conducts position-specific mock interviews
- **Behavior:** Asks ONE question at a time, uses mix of behavioral + technical + situational questions
- **Intelligence:** Analyzes your answer in real-time to generate relevant follow-up questions
- **Flow:** Interview structure follows real-world patterns: warm-up → technical → behavioral → situational → closing

### 📝 Feedback Coach Agent
- **Role:** Scores and analyzes every answer
- **Scoring:** 1-10 scale based on clarity, specificity, STAR method structure, and relevance
- **Output:** Strengths, areas to improve, and a model answer for each question
- **Trigger:** Activated **automatically** after the interview via multi-agent orchestration

### 📄 Resume Analyzer Agent (Multimodal)
- **Role:** Analyzes uploaded resume images using Gemini Vision
- **Capabilities:** OCR + semantic analysis on resume screenshots/photos
- **Output:** Overall score, key strengths, improvement areas, predicted interview topics, and quick wins

### 📊 Performance Coach Agent
- **Role:** Creates comprehensive performance reports
- **Output:** 5-category breakdown (Communication, Technical Knowledge, Problem Solving, Cultural Fit, Confidence) + personalized 7-day improvement plan
- **Trigger:** Activated **automatically** after Feedback Coach via multi-agent orchestration

### 🤖 Orchestrator Agent
- **Role:** Coordinates all agents and manages the interview flow
- **Behavior:** Routes user requests to the appropriate agent, synthesizes multi-agent insights
- **Intelligence:** Guides users through the platform and recommends next steps

---

## 🔄 Multi-Agent Orchestration Flow

This is the **core innovation** of GemLive Interview — autonomous agent chaining that creates an immersive experience:

```
                    ┌──────────────────────┐
                    │  User selects role   │
                    │  (e.g., "Software    │
                    │   Engineer")         │
                    └──────────┬───────────┘
                               │
                    ┌──────────▼───────────┐
                    │  🎭 Interviewer      │
                    │  Asks 5-7 questions  │◄─── Timer: 2:00 per question
                    │  + follow-ups        │     Color: green → amber → red
                    └──────────┬───────────┘
                               │
                    ┌──────────▼───────────┐
                    │  Question answered?  │
                    │  questionCount >= 5  │
                    └──────────┬───────────┘
                          Yes  │
                    ┌──────────▼───────────┐
              ┌─────┤  🔗 Auto-Trigger     │
              │     │  (No user action     │
              │     │   needed!)           │
              │     └──────────────────────┘
              │
    ┌─────────▼───────────┐
    │  📝 Feedback Coach  │     Receives FULL transcript
    │  Scores each answer │     from Interviewer agent
    │  (1-10 per question)│
    └─────────┬───────────┘
              │
    ┌─────────▼───────────┐
    │  📊 Performance     │     Receives transcript +
    │  Coach              │     Feedback Coach's scores
    │  7-day plan +       │
    │  category breakdown │
    └─────────┬───────────┘
              │
    ┌─────────▼───────────┐
    │  🎊 Interview       │
    │  Complete!          │     Confetti animation
    │  Full report ready  │     Score displayed in sidebar
    └─────────────────────┘
```

**Key differentiator:** The transition between agents is **fully autonomous** — the system passes the full conversation transcript between agents, creating a seamless experience without any manual user navigation.

---

## 🛠️ Technology Stack

| Technology | Version | Purpose | Why This Choice |
|-----------|---------|---------|----------------|
| **Google Gemini 2.5 Flash** | Latest | Core AI engine for all 5 agents | Fastest model with streaming + vision support |
| **Gemini Streaming API (SSE)** | v1beta | Real-time word-by-word response display | Creates a natural, conversational feel |
| **Gemini Vision API** | v1beta | Multimodal resume image analysis | No need for separate OCR — Gemini handles it natively |
| **Firebase Hosting** | Latest | Production deployment on Google Cloud | Global CDN, free SSL, instant deploys |
| **Web Speech API** | Native | Voice-to-text for interview answers | Zero-dependency, works in Chrome/Edge |
| **Vanilla JavaScript** | ES2022 | Frontend application logic | Zero dependencies = fast load, no build step |
| **CSS3** | Custom | Glassmorphism dark theme + animations | Premium visual experience without frameworks |
| **HTML5** | Semantic | Application structure | Accessible, SEO-friendly markup |

### Why Zero Dependencies?

GemLive Interview is built with **zero npm dependencies**:
- ⚡ **Instant load** — No framework overhead (~30KB total)
- 🔒 **No supply chain risk** — No third-party packages
- 📱 **Works everywhere** — No build step, just HTML/CSS/JS
- 🚀 **Easy to deploy** — Copy 3 files to any hosting

---

## 🚀 Getting Started

### Prerequisites

| Requirement | How to Get It |
|------------|--------------|
| A web browser | Chrome or Edge recommended (for Voice Input) |
| Gemini API Key | Free at [aistudio.google.com/apikey](https://aistudio.google.com/apikey) |
| Node.js (optional) | Only needed for local dev server — [nodejs.org](https://nodejs.org) |
| Firebase CLI (optional) | Only needed for deployment — `npm install -g firebase-tools` |

### Option 1: Try the Live Demo (Fastest)

```
👉 https://gemlive-interview-coach.web.app
```

1. Open the URL
2. Enter your Gemini API key (stored locally in your browser, never sent to our servers)
3. Choose a position and start practicing!

### Option 2: Run Locally

```bash
# Clone the repository
git clone https://github.com/hoangatg/gemini-live-agent.git
cd gemini-live-agent

# Start a local server (any of these work)
npx http-server public -p 8080
# or
python -m http.server 8080 -d public
# or just open public/index.html in your browser

# Visit http://localhost:8080
```

### Option 3: Deploy to Firebase (Google Cloud)

```bash
# Login to Firebase
firebase login

# Initialize (if not already done)
firebase init hosting
# Select: public directory → "public"
# Single-page app → "Yes"

# Deploy
firebase deploy --only hosting

# Your app is now live on Google Cloud! 🎉
```

---

## 📂 Project Structure

```
gemini-live-agent/
├── public/                    # Application files (served by Firebase)
│   ├── index.html             # Main HTML — semantic, accessible structure
│   ├── style.css              # Premium dark theme — glassmorphism + animations
│   └── app.js                 # Core logic — agents, API calls, orchestration
│
├── firebase.json              # Firebase Hosting configuration
├── .firebaserc                # Firebase project reference
└── README.md                  # This file
```

### File Details

| File | Lines | Size | Responsibility |
|------|-------|------|---------------|
| `app.js` | ~760 | 30KB | Agent definitions, Gemini API calls (streaming + direct), multi-agent orchestration, timer, confetti, voice input, UI rendering |
| `style.css` | ~550 | 22KB | Complete design system: variables, layout, glassmorphism, animations (grid, glow, bounce, typing, confetti, wave), responsive breakpoints |
| `index.html` | ~260 | 12KB | Semantic HTML5 structure, modals (API key, image upload, score report), SVG timer, voice wave indicator |

---

## 🔌 Gemini API Integration Details

### Two API Call Patterns

GemLive Interview uses **two different Gemini API patterns** depending on the use case:

#### 1. Streaming (SSE) — For Interactive Conversations

```javascript
// Used by: Interviewer, Resume Analyzer, Orchestrator
const response = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?alt=sse&key=${apiKey}`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: agent.systemPrompt }] },
      contents: [...conversationHistory, { role: 'user', parts }],
      generationConfig: { temperature: 0.8, topP: 0.95, topK: 40, maxOutputTokens: 4096 }
    })
  }
);

// Process SSE stream for real-time display
const reader = response.body.getReader();
while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  // Parse SSE data and render incrementally
}
```

#### 2. Direct (Non-streaming) — For Batch Analysis

```javascript
// Used by: Feedback Coach, Performance Coach (after interview)
const response = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: agent.systemPrompt }] },
      contents: [{ role: 'user', parts: [{ text: fullTranscript }] }],
      generationConfig: { temperature: 0.8, topP: 0.95, maxOutputTokens: 4096 }
    })
  }
);
```

### Multimodal (Vision) for Resume Analysis

```javascript
// Resume Analyzer agent uses inline image data
const parts = [
  { inlineData: { mimeType: 'image/jpeg', data: base64ImageData } },
  { text: 'Analyze this resume and provide feedback...' }
];
```

### Conversation History Management

Each agent maintains its own conversation history with a **12-message sliding window**:

```javascript
const history = messages.slice(-12).map(m => ({
  role: m.role === 'user' ? 'user' : 'model',
  parts: [{ text: m.content }]
}));
```

---

## 🎨 Design Philosophy

### Premium Dark Theme
- **No generic colors** — Curated HSL palette with accent purples, cyans, and emeralds
- **Glassmorphism** — `backdrop-filter: blur(20px)` with translucent layers
- **Animated backgrounds** — Moving grid pattern + floating color orbs
- **Micro-animations** — Every interaction has a smooth, purposeful animation

### UX Principles
- **Zero-config start** — Enter API key and go. No signup, no account creation
- **Privacy-first** — API key stored in `localStorage` only. Never transmitted to any server except Google's API
- **Progressive disclosure** — Welcome screen → Role selection → Interview → Multi-agent review
- **Immersive experience** — Timer creates pressure. Confetti creates reward. Voice creates natural flow

---

## 🏆 Hackathon Track Alignment

### Gemini Live Agent Challenge Requirements

| Requirement | Implementation | ✅ |
|------------|----------------|---|
| **Must use a Gemini model** | Google Gemini 2.5 Flash | ✅ |
| **Built with Google GenAI SDK or ADK** | Direct Gemini REST API with streaming SSE | ✅ |
| **At least one Google Cloud service** | Firebase Hosting (with CDN + SSL) | ✅ |
| **Proof of deployment on Google Cloud** | Live at [gemlive-interview-coach.web.app](https://gemlive-interview-coach.web.app) | ✅ |
| **Multi-agent architecture** | 5 specialized agents with autonomous orchestration | ✅ |
| **Immersive experience** | Timer, voice input, wave animation, confetti, streaming responses | ✅ |

### Why This Project Stands Out

1. **True Multi-Agent Orchestration** — Not just multiple prompts, but autonomous agent chaining with transcript passing
2. **Zero Dependencies** — Entire app is 3 files (~64KB total). Fast, secure, auditable
3. **Production-Ready** — Live on Firebase with global CDN, SSL, and custom domain
4. **Real-World Impact** — Addresses a $10B+ interview prep market with AI that's 100× more affordable
5. **Multimodal** — Combines text, voice input, image analysis, and streaming in one coherent UX

---

## 🔮 Future Roadmap

| Phase | Feature | Status |
|-------|---------|--------|
| v1.0 | Core interview + multi-agent flow | ✅ Complete |
| v1.1 | Timer, confetti, voice wave | ✅ Complete |
| v2.0 | Gemini Live API integration (real-time audio/video) | 🔜 Planned |
| v2.1 | Interview history persistence (IndexedDB) | 🔜 Planned |
| v2.2 | Company-specific question banks (Google, Meta, Amazon) | 🔜 Planned |
| v3.0 | Video interview mode with webcam analysis | 💡 Idea |
| v3.1 | Multi-language support (Vietnamese, Japanese, Korean) | 💡 Idea |

---

## 👨‍💻 Author

**Hoang Nguyen** — Creator of [AI Agent Toolkit](https://github.com/hoangatg/ai-agent-toolkit) (38 Agents · 80 Skills · 31 Workflows)
- 🌐 Google Developer Program Member
- 🏆 Gemini Live Agent Challenge 2026 Participant
- 📧 hoangaccm416bang103@gmail.com

---

## 📄 License

This project is open source under the [MIT License](LICENSE).

---

<p align="center">
  <strong>Built with ❤️ and Google Gemini for the Gemini Live Agent Challenge 2026</strong><br/>
  <em>Powered by Gemini 2.5 Flash ✦</em>
</p>
