/* ============================================================
   GemLive Interview — AI Mock Interview Coach
   Powered by Google Gemini API
   Built for Gemini Live Agent Challenge 2026
   ============================================================ */

// ===== Interview Agent Definitions =====
const AGENTS = [
  {
    id: 'interviewer',
    name: 'Interviewer',
    icon: '🎭',
    color: '#7c3aed',
    bg: 'rgba(124,58,237,0.12)',
    desc: 'Conducts realistic mock interviews',
    capabilities: ['Mock Interview', 'Follow-ups', 'Behavioral'],
    systemPrompt: `You are a professional INTERVIEWER at a top tech company in GemLive Interview platform.

YOUR ROLE:
- Conduct realistic, challenging mock interviews for the specified position
- Ask ONE question at a time, wait for the candidate's answer before asking the next
- Start with an introduction, then ask progressively harder questions
- Mix behavioral, technical, and situational questions
- Ask follow-up questions based on the candidate's answers (this is key for realism!)

INTERVIEW STRUCTURE (5-7 questions total):
1. Warm-up: "Tell me about yourself" or background question
2-3. Technical/role-specific questions
4-5. Behavioral questions (STAR method expected)
6. Situational/problem-solving question
7. Candidate's questions for you

IMPORTANT RULES:
- Be professional but friendly. Use the interviewer persona naturally.
- NEVER give the answer or feedback during the interview - that's the Feedback Coach's job.
- After all questions, say "Thank you for the interview! Let me have our Feedback Coach review your performance."
- If the candidate gives a weak answer, probe deeper with follow-ups.
- Keep questions relevant to the specified role and company type.`
  },
  {
    id: 'feedback',
    name: 'Feedback Coach',
    icon: '📝',
    color: '#10b981',
    bg: 'rgba(16,185,129,0.12)',
    desc: 'Analyzes answers & provides scoring',
    capabilities: ['Answer Analysis', 'Scoring', 'Tips'],
    systemPrompt: `You are the FEEDBACK COACH in GemLive Interview platform.

YOUR ROLE:
- Analyze the candidate's interview answers in detail
- Provide constructive, actionable feedback
- Score each answer on a scale of 1-10
- Suggest improved answers using the STAR method

FEEDBACK FORMAT for each answer:
## 📊 Answer Analysis
**Score: X/10**
**Strengths:** What they did well
**Areas to Improve:** What could be better
**💡 Suggested Better Answer:** A model answer they can learn from

SCORING CRITERIA:
- 9-10: Exceptional - Clear, specific, structured with great examples
- 7-8: Good - Solid answer with good structure, minor improvements possible
- 5-6: Average - Basic answer, lacks specifics or structure
- 3-4: Below Average - Vague, unfocused, missing key elements
- 1-2: Poor - Off-topic or no real content

Always be encouraging but honest. Focus on helping them improve.`
  },
  {
    id: 'resume',
    name: 'Resume Analyzer',
    icon: '📄',
    color: '#06b6d4',
    bg: 'rgba(6,182,212,0.12)',
    desc: 'Reviews resumes & identifies strengths',
    capabilities: ['CV Analysis', 'Skill Gap', 'Multimodal'],
    systemPrompt: `You are the RESUME ANALYZER in GemLive Interview platform. You are a multimodal AI that can analyze resume images.

YOUR ROLE:
- Analyze uploaded resume/CV images in detail
- Identify strengths, weaknesses, and areas for improvement
- Suggest interview topics based on resume content
- Provide a resume score and improvement tips

ANALYSIS FORMAT:
## 📄 Resume Analysis Report

### Overall Score: X/10

### 💪 Key Strengths
- List top 3-5 strengths from the resume

### ⚠️ Areas for Improvement
- List 3-5 specific improvements with actionable advice

### 🎯 Likely Interview Topics
Based on this resume, interviewers will likely ask about:
1. [Topic based on experience]
2. [Topic based on skills]
3. [Topic based on gaps]

### 💡 Quick Wins
Top 3 things they can change RIGHT NOW to improve their resume.

Be specific and reference actual content from their resume. If you can see the image clearly, mention specific details.`
  },
  {
    id: 'performance',
    name: 'Performance Coach',
    icon: '📊',
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.12)',
    desc: 'Tracks progress & creates improvement plans',
    capabilities: ['Progress Track', 'Study Plan', 'Reports'],
    systemPrompt: `You are the PERFORMANCE COACH in GemLive Interview platform.

YOUR ROLE:
- Provide overall interview performance summaries
- Create personalized improvement plans
- Track progress across multiple interview sessions
- Give strategic advice for interview preparation

WHEN SUMMARIZING AN INTERVIEW:
## 🏆 Interview Performance Summary

### Overall Rating: X/10

### Category Breakdown:
- Communication: X/10
- Technical Knowledge: X/10
- Problem Solving: X/10
- Cultural Fit: X/10
- Confidence: X/10

### Top 3 Strengths:
1. ...
2. ...
3. ...

### Top 3 Areas to Practice:
1. ...
2. ...
3. ...

### 📋 7-Day Improvement Plan:
Day 1-2: Focus on...
Day 3-4: Practice...
Day 5-6: Work on...
Day 7: Mock interview again

Be motivating and specific. Reference their actual interview answers when possible.`
  },
  {
    id: 'orchestrator',
    name: 'Orchestrator',
    icon: '🤖',
    color: '#f43f5e',
    bg: 'rgba(244,63,94,0.12)',
    desc: 'Coordinates all agents automatically',
    capabilities: ['Auto-Flow', 'Delegation', 'Synthesis'],
    systemPrompt: `You are the ORCHESTRATOR of GemLive Interview platform. You coordinate the multi-agent interview coaching system.

YOUR ROLE:
- Analyze user requests and route them to the appropriate agent
- Manage the interview flow: Interviewer → Feedback → Performance
- Synthesize insights from multiple agents
- Help users navigate the platform

When users ask general questions, provide a helpful overview of what each agent does:
🎭 Interviewer: Conducts realistic mock interviews
📝 Feedback Coach: Analyzes answers and provides scoring
📄 Resume Analyzer: Analyzes uploaded resumes (supports images)
📊 Performance Coach: Creates improvement plans and tracks progress

Guide users to the right agent for their needs.`
  }
];

// ===== App State =====
const state = {
  apiKey: localStorage.getItem('gemlive_apikey') || '',
  currentAgent: AGENTS[0],
  messages: {},
  isStreaming: false,
  interview: {
    active: false,
    role: null,
    company: null,
    questionCount: 0,
    totalQuestions: 5,
    answers: [],
    scores: []
  },
  uploadedImage: null,
  imageBase64: null,
  recognition: null,
  isRecording: false,
  timer: { interval: null, seconds: 120, running: false }
};

// ===== DOM Helpers =====
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
  initAgentList();
  initEventListeners();
  checkApiKey();
  autoResizeTextarea();
});

function checkApiKey() {
  $('#apikey-modal').style.display = state.apiKey ? 'none' : 'flex';
}

// ===== Agent List =====
function initAgentList() {
  const list = $('#agent-list');
  list.innerHTML = AGENTS.map(a => `
    <div class="agent-card ${a.id === state.currentAgent.id ? 'active' : ''}" data-agent="${a.id}">
      <div class="agent-icon" style="background:${a.bg}">${a.icon}</div>
      <div class="agent-info">
        <div class="agent-name">${a.name}</div>
        <div class="agent-desc">${a.desc}</div>
      </div>
    </div>
  `).join('');
  list.querySelectorAll('.agent-card').forEach(c => c.addEventListener('click', () => selectAgent(c.dataset.agent)));
  updateAgentBar();
}

function selectAgent(id) {
  state.currentAgent = AGENTS.find(a => a.id === id);
  $$('.agent-card').forEach(c => c.classList.toggle('active', c.dataset.agent === id));
  updateAgentBar();
  // When switching agents during active interview, show interview context instead of welcome
  if (state.interview.active && id !== 'interviewer' && !state.messages[id]?.length) {
    const container = $('#messages');
    container.innerHTML = `
      <div class="interview-complete-banner" style="margin-top: 40px;">
        <h3>📋 Interview In Progress</h3>
        <p>You're currently being interviewed for <strong>${state.interview.role}</strong>.</p>
        <p style="margin-top:8px;color:var(--text-muted);font-size:12px;">Switch back to <strong>Interviewer</strong> to continue answering questions.<br>This agent will be activated automatically after the interview.</p>
      </div>`;
    return;
  }
  renderMessages();
}

function updateAgentBar() {
  const a = state.currentAgent;
  $('#agent-bar-icon').textContent = a.icon;
  $('#agent-bar-name').textContent = a.name;
  $('#agent-bar-desc').textContent = a.desc;
  $('#agent-capabilities').innerHTML = a.capabilities.map(c => `<span class="cap-badge">${c}</span>`).join('');
}

// ===== Event Listeners =====
function initEventListeners() {
  $('#btn-send').addEventListener('click', sendMessage);
  $('#user-input').addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } });
  $('#btn-save-apikey').addEventListener('click', saveApiKey);
  $('#apikey-input').addEventListener('keydown', e => { if (e.key === 'Enter') saveApiKey(); });
  $('#btn-new-chat').addEventListener('click', startNewInterview);

  // Role selection
  $$('.role-card').forEach(btn => btn.addEventListener('click', () => startInterview(btn.dataset.role, btn.dataset.company)));

  // Quick actions
  $$('.quick-action[data-prompt]').forEach(btn => btn.addEventListener('click', () => { $('#user-input').value = btn.dataset.prompt; sendMessage(); }));

  // Resume upload
  $('#btn-upload-resume').addEventListener('click', () => { selectAgent('resume'); $('#image-modal').style.display = 'flex'; });
  $('#btn-attach').addEventListener('click', () => $('#image-modal').style.display = 'flex');
  $('#btn-cancel-img').addEventListener('click', closeImageModal);
  $('#btn-confirm-img').addEventListener('click', confirmImage);
  $('#btn-remove-img').addEventListener('click', () => { $('#modal-preview').style.display = 'none'; $('#drop-zone').style.display = 'block'; state.uploadedImage = null; state.imageBase64 = null; });

  const fi = $('#file-input');
  fi.addEventListener('change', e => { if (e.target.files[0]) processImageFile(e.target.files[0]); });
  $('#drop-zone').addEventListener('click', () => fi.click());
  $('#drop-zone').addEventListener('dragover', e => { e.preventDefault(); e.currentTarget.style.borderColor = 'var(--accent)'; });
  $('#drop-zone').addEventListener('dragleave', e => { e.currentTarget.style.borderColor = ''; });
  $('#drop-zone').addEventListener('drop', e => { e.preventDefault(); e.currentTarget.style.borderColor = ''; if (e.dataTransfer.files[0]) processImageFile(e.dataTransfer.files[0]); });

  $('#btn-voice').addEventListener('click', toggleVoice);
  $('#btn-close-score')?.addEventListener('click', () => $('#score-modal').style.display = 'none');
  $('#btn-new-interview')?.addEventListener('click', () => { $('#score-modal').style.display = 'none'; startNewInterview(); });

  $$('.modal-backdrop').forEach(b => b.addEventListener('click', e => {
    const m = e.target.closest('.modal');
    if (m.id === 'apikey-modal' && !state.apiKey) return;
    m.style.display = 'none';
  }));
}

// ===== API Key =====
function saveApiKey() {
  const key = $('#apikey-input').value.trim();
  if (!key) return;
  state.apiKey = key;
  localStorage.setItem('gemlive_apikey', key);
  $('#apikey-modal').style.display = 'none';
  updateStatus('Agents Ready', false);
}

// ===== Interview Flow =====
function startInterview(role, company) {
  state.interview = { active: true, role, company, questionCount: 0, totalQuestions: 5, answers: [], scores: [] };
  state.currentAgent = AGENTS.find(a => a.id === 'interviewer');
  $$('.agent-card').forEach(c => c.classList.toggle('active', c.dataset.agent === 'interviewer'));
  updateAgentBar();
  state.messages['interviewer'] = [];
  renderMessages();

  // Show progress
  $('#progress-section').style.display = 'block';
  updateProgress();
  updateStatus('Interview Starting...', true);

  // Auto-start interview
  const prompt = `Start a mock interview for the position of "${role}" at a ${company}. Begin with a brief introduction of yourself as the interviewer and ask the first question. Remember: ask only ONE question at a time.`;
  autoSendAsSystem(prompt).then(() => startTimer());
}

function startNewInterview() {
  state.interview = { active: false, role: null, company: null, questionCount: 0, totalQuestions: 5, answers: [], scores: [] };
  state.messages[state.currentAgent.id] = [];
  $('#progress-section').style.display = 'none';
  stopTimer();
  updateStatus('Agents Ready', false);
  renderMessages();
}

function updateProgress() {
  const iv = state.interview;
  const pct = Math.min((iv.questionCount / iv.totalQuestions) * 100, 100);
  $('#progress-bar').style.width = pct + '%';
  $('#stat-questions').textContent = `${iv.questionCount}/${iv.totalQuestions}`;
  const avgScore = iv.scores.length ? (iv.scores.reduce((a, b) => a + b, 0) / iv.scores.length).toFixed(1) : '—';
  $('#stat-score').textContent = avgScore === '—' ? '—' : avgScore + '/10';
}

async function autoSendAsSystem(prompt) {
  if (!state.apiKey) { $('#apikey-modal').style.display = 'flex'; return; }
  await streamResponse(state.currentAgent, prompt);
}

// ===== Message Handling =====
function getMessages() {
  if (!state.messages[state.currentAgent.id]) state.messages[state.currentAgent.id] = [];
  return state.messages[state.currentAgent.id];
}

function renderMessages() {
  const msgs = getMessages();
  const container = $('#messages');

  if (msgs.length === 0) {
    container.innerHTML = '';
    // Re-create welcome screen
    const ws = document.createElement('div');
    ws.className = 'welcome-screen';
    ws.id = 'welcome-screen';
    ws.innerHTML = `
      <div class="welcome-icon">🎯</div>
      <h2>Welcome to <span class="gradient-text">GemLive Interview</span></h2>
      <p>Your AI-powered interview coach. Choose a role to start practicing, or upload your resume for personalized feedback.</p>
      <h3 class="section-title">Choose a Position</h3>
      <div class="role-grid">
        <button class="role-card" data-role="Software Engineer" data-company="Google"><span class="role-icon">💻</span><span class="role-name">Software Engineer</span><span class="role-company">Tech Company</span></button>
        <button class="role-card" data-role="Data Scientist" data-company="AI Startup"><span class="role-icon">📊</span><span class="role-name">Data Scientist</span><span class="role-company">AI Startup</span></button>
        <button class="role-card" data-role="Product Manager" data-company="Tech Company"><span class="role-icon">🚀</span><span class="role-name">Product Manager</span><span class="role-company">Tech Company</span></button>
        <button class="role-card" data-role="UX Designer" data-company="Design Agency"><span class="role-icon">🎨</span><span class="role-name">UX Designer</span><span class="role-company">Design Agency</span></button>
        <button class="role-card" data-role="DevOps Engineer" data-company="Cloud Company"><span class="role-icon">☁️</span><span class="role-name">DevOps Engineer</span><span class="role-company">Cloud Company</span></button>
        <button class="role-card" data-role="Marketing Manager" data-company="E-commerce"><span class="role-icon">📈</span><span class="role-name">Marketing Manager</span><span class="role-company">E-commerce</span></button>
      </div>
      <div class="welcome-divider"><span>or</span></div>
      <div class="quick-actions">
        <button class="quick-action" id="btn-upload-resume-2"><span class="qa-icon">📄</span><span>Upload Resume for Analysis</span></button>
        <button class="quick-action" data-prompt="Give me tips for acing a technical interview at a FAANG company"><span class="qa-icon">💡</span><span>Interview Tips & Strategies</span></button>
      </div>
    `;
    container.appendChild(ws);
    // Re-bind events
    ws.querySelectorAll('.role-card').forEach(b => b.addEventListener('click', () => startInterview(b.dataset.role, b.dataset.company)));
    ws.querySelectorAll('.quick-action[data-prompt]').forEach(b => b.addEventListener('click', () => { $('#user-input').value = b.dataset.prompt; sendMessage(); }));
    const uploadBtn = ws.querySelector('#btn-upload-resume-2');
    if (uploadBtn) uploadBtn.addEventListener('click', () => { selectAgent('resume'); $('#image-modal').style.display = 'flex'; });
    return;
  }

  container.innerHTML = msgs.map(m => createMessageHTML(m)).join('');
  scrollToBottom();
}

function createMessageHTML(msg) {
  const isUser = msg.role === 'user';
  const agent = AGENTS.find(a => a.id === msg.agentId) || state.currentAgent;
  const time = new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  let imageHtml = msg.image ? `<div style="margin-bottom:8px"><img src="${msg.image}" style="max-width:200px;border-radius:8px;border:1px solid var(--border-subtle)"></div>` : '';

  return `
    <div class="message ${isUser ? 'user' : 'assistant'}">
      <div class="message-avatar" ${isUser ? '' : `style="background:${agent.bg}"`}>${isUser ? 'H' : agent.icon}</div>
      <div class="message-content">
        <div class="message-header">
          <span class="message-name">${isUser ? 'You (Candidate)' : agent.name}</span>
          <span class="message-time">${time}</span>
          ${msg.agentTag ? `<span class="agent-tag">${msg.agentTag}</span>` : ''}
        </div>
        ${imageHtml}
        <div class="message-body">${isUser ? escapeHtml(msg.content) : formatMarkdown(msg.content)}</div>
      </div>
    </div>`;
}

// ===== Send Message =====
async function sendMessage() {
  if (state.isStreaming) return;
  const input = $('#user-input');
  const text = input.value.trim();
  if (!text && !state.imageBase64) return;
  if (!state.apiKey) { $('#apikey-modal').style.display = 'flex'; return; }

  const msgs = getMessages();
  const userMsg = { role: 'user', content: text, timestamp: Date.now(), agentId: state.currentAgent.id, image: state.imageBase64 ? state.uploadedImage : null };
  msgs.push(userMsg);

  input.value = '';
  input.style.height = 'auto';
  const imgB64 = state.imageBase64;
  clearAttachment();
  renderMessages();

  // Track interview questions
  if (state.interview.active && state.currentAgent.id === 'interviewer') {
    state.interview.questionCount++;
    state.interview.answers.push(text);
    updateProgress();
    stopTimer();
  }

  // Check if interview should end (after ~5 answers) and trigger multi-agent flow
  if (state.interview.active && state.interview.questionCount >= state.interview.totalQuestions && state.currentAgent.id === 'interviewer') {
    await streamResponse(state.currentAgent, text, imgB64);
    // Auto-trigger feedback
    await triggerFeedbackFlow();
    return;
  }

  await streamResponse(state.currentAgent, text, imgB64);
  // Restart timer for next question
  if (state.interview.active && state.currentAgent.id === 'interviewer') startTimer();
}

// ===== Multi-Agent Interview Flow =====
async function triggerFeedbackFlow() {
  const feedbackAgent = AGENTS.find(a => a.id === 'feedback');
  const perfAgent = AGENTS.find(a => a.id === 'performance');
  const msgs = getMessages();

  // Build interview transcript
  const transcript = msgs.filter(m => m.content).map(m =>
    `${m.role === 'user' ? 'CANDIDATE' : 'INTERVIEWER'}: ${m.content}`
  ).join('\n\n');

  // Switch to feedback agent
  updateStatus('📝 Feedback Coach analyzing...', true);
  const fbMsg = { role: 'assistant', content: '', timestamp: Date.now(), agentId: 'feedback', agentTag: '🔗 Auto-Review' };
  msgs.push(fbMsg);
  renderMessages();

  try {
    const fbResponse = await callGeminiDirect(feedbackAgent,
      `Here is the complete interview transcript for a ${state.interview.role} position:\n\n${transcript}\n\nPlease analyze each of the candidate's answers and provide detailed scoring and feedback.`
    );
    fbMsg.content = fbResponse;
    fbMsg.timestamp = Date.now();

    // Extract scores from feedback (look for X/10 patterns)
    const scoreMatches = fbResponse.match(/(\d+)\/10/g);
    if (scoreMatches) {
      state.interview.scores = scoreMatches.map(s => parseInt(s)).filter(n => n > 0 && n <= 10);
      updateProgress();
    }
    renderMessages();

    // Now get performance summary
    updateStatus('📊 Performance Coach summarizing...', true);
    const perfMsg = { role: 'assistant', content: '', timestamp: Date.now(), agentId: 'performance', agentTag: '🔗 Auto-Summary' };
    msgs.push(perfMsg);
    renderMessages();

    const perfResponse = await callGeminiDirect(perfAgent,
      `Here is the interview transcript and feedback for a ${state.interview.role} candidate:\n\nTRANSCRIPT:\n${transcript}\n\nFEEDBACK:\n${fbResponse}\n\nPlease provide an overall performance summary with category breakdown, strengths, weaknesses, and a 7-day improvement plan.`
    );
    perfMsg.content = perfResponse;
    perfMsg.timestamp = Date.now();
    renderMessages();
  } catch (err) {
    fbMsg.content = `⚠️ Error: ${err.message}`;
    renderMessages();
  }

  state.interview.active = false;
  stopTimer();
  updateStatus('Interview Complete! 🎉', false);
  launchConfetti();
}

// ===== Stream Response from Gemini =====
async function streamResponse(agent, prompt, imageBase64 = null) {
  state.isStreaming = true;
  updateStatus(`${agent.icon} ${agent.name} thinking...`, agent.id === 'interviewer');
  $('#btn-send').disabled = true;

  const msgs = getMessages();
  const assistantMsg = { role: 'assistant', content: '', timestamp: Date.now(), agentId: agent.id };
  msgs.push(assistantMsg);

  const container = $('#messages');
  const typingEl = document.createElement('div');
  typingEl.className = 'message assistant';
  typingEl.innerHTML = `
    <div class="message-avatar" style="background:${agent.bg}">${agent.icon}</div>
    <div class="message-content">
      <div class="message-header"><span class="message-name">${agent.name}</span></div>
      <div class="message-body" id="streaming-body">
        <div class="typing-indicator"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div>
      </div>
    </div>`;
  container.appendChild(typingEl);
  scrollToBottom();

  try {
    // Build history
    const history = msgs.slice(0, -1).filter(m => m.content).slice(-12).map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }));

    const parts = [];
    if (imageBase64) parts.push({ inlineData: { mimeType: 'image/jpeg', data: imageBase64 } });
    parts.push({ text: prompt });

    const requestBody = {
      system_instruction: { parts: [{ text: agent.systemPrompt }] },
      contents: [...history, { role: 'user', parts }],
      generationConfig: { temperature: 0.8, topP: 0.95, topK: 40, maxOutputTokens: 4096 }
    };

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?alt=sse&key=${state.apiKey}`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(requestBody) }
    );

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `API Error: ${res.status}`);
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let fullText = '';
    const streamingBody = document.getElementById('streaming-body');

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      for (const line of chunk.split('\n')) {
        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.slice(6));
            const t = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
            if (t) { fullText += t; streamingBody.innerHTML = formatMarkdown(fullText); scrollToBottom(); }
          } catch (e) {}
        }
      }
    }

    assistantMsg.content = fullText;
    assistantMsg.timestamp = Date.now();

  } catch (error) {
    assistantMsg.content = `⚠️ **Error:** ${error.message}\n\nPlease check your API key and try again.`;
    const sb = document.getElementById('streaming-body');
    if (sb) sb.innerHTML = formatMarkdown(assistantMsg.content);
  }

  state.isStreaming = false;
  $('#btn-send').disabled = false;
  if (!state.interview.active || state.currentAgent.id !== 'interviewer') updateStatus('Agents Ready', false);
  renderMessages();
}

// Direct call (non-streaming)
async function callGeminiDirect(agent, prompt, imageBase64 = null) {
  const parts = [];
  if (imageBase64) parts.push({ inlineData: { mimeType: 'image/jpeg', data: imageBase64 } });
  parts.push({ text: prompt });

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${state.apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: agent.systemPrompt }] },
        contents: [{ role: 'user', parts }],
        generationConfig: { temperature: 0.8, topP: 0.95, maxOutputTokens: 4096 }
      })
    }
  );
  if (!res.ok) { const e = await res.json().catch(() => ({})); throw new Error(e.error?.message || `API Error: ${res.status}`); }
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated.';
}

// ===== Image Handling =====
function processImageFile(file) {
  if (!file.type.startsWith('image/')) return;
  const reader = new FileReader();
  reader.onload = e => {
    state.uploadedImage = e.target.result;
    state.imageBase64 = e.target.result.split(',')[1];
    $('#preview-img').src = e.target.result;
    $('#modal-preview').style.display = 'block';
    $('#drop-zone').style.display = 'none';
  };
  reader.readAsDataURL(file);
}

function confirmImage() {
  if (!state.uploadedImage) return;
  closeImageModal();
  const attachments = $('#input-attachments');
  const preview = $('#attachment-preview');
  preview.innerHTML = `<div class="attachment-item"><img src="${state.uploadedImage}" alt="Resume"><button class="attachment-remove" onclick="clearAttachment()">✕</button></div>`;
  attachments.style.display = 'block';
  $('#user-input').placeholder = 'Add a message about your resume (optional)...';
  // Auto-select resume agent if image is uploaded
  if (state.currentAgent.id !== 'resume') selectAgent('resume');
}

function clearAttachment() {
  state.uploadedImage = null; state.imageBase64 = null;
  $('#input-attachments').style.display = 'none';
  $('#attachment-preview').innerHTML = '';
  $('#user-input').placeholder = 'Type your answer... (Shift+Enter for new line)';
}
window.clearAttachment = clearAttachment;

function closeImageModal() {
  $('#image-modal').style.display = 'none';
  $('#modal-preview').style.display = 'none';
  $('#drop-zone').style.display = 'block';
}

// ===== Voice Input =====
function toggleVoice() {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) { alert('Voice not supported. Use Chrome.'); return; }
  if (state.isRecording) { state.recognition.stop(); return; }
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  state.recognition = new SR();
  state.recognition.lang = 'en-US';
  state.recognition.interimResults = true;
  state.recognition.onstart = () => {
    state.isRecording = true;
    $('#btn-voice').classList.add('recording');
    $('#voice-status').classList.add('active');
    updateStatus('🎤 Listening...', false);
  };
  state.recognition.onresult = e => { let t = ''; for (let i = e.resultIndex; i < e.results.length; i++) t += e.results[i][0].transcript; $('#user-input').value = t; };
  state.recognition.onend = () => {
    state.isRecording = false;
    $('#btn-voice').classList.remove('recording');
    $('#voice-status').classList.remove('active');
    updateStatus(state.interview.active ? `${state.currentAgent.icon} ${state.currentAgent.name} ready` : 'Agents Ready', false);
  };
  state.recognition.onerror = () => {
    state.isRecording = false;
    $('#btn-voice').classList.remove('recording');
    $('#voice-status').classList.remove('active');
  };
  state.recognition.start();
}

// ===== Utilities =====
function updateStatus(text, isInterviewing) {
  $('#status-text').textContent = text;
  const bar = $('#status-bar');
  if (isInterviewing) bar.classList.add('interviewing'); else bar.classList.remove('interviewing');
}

function scrollToBottom() { const c = $('#messages-container'); c.scrollTop = c.scrollHeight; }

function autoResizeTextarea() {
  const ta = $('#user-input');
  ta.addEventListener('input', () => { ta.style.height = 'auto'; ta.style.height = Math.min(ta.scrollHeight, 150) + 'px'; });
}

function escapeHtml(t) { const d = document.createElement('div'); d.textContent = t; return d.innerHTML; }

function formatMarkdown(text) {
  if (!text) return '';
  let h = text;
  h = h.replace(/```(\w*)\n([\s\S]*?)```/g, (_, l, c) => `<pre><code class="language-${l}">${escapeHtml(c.trim())}</code></pre>`);
  h = h.replace(/`([^`]+)`/g, '<code>$1</code>');
  h = h.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  h = h.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  h = h.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  h = h.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  h = h.replace(/^# (.+)$/gm, '<h1>$1</h1>');
  h = h.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');
  h = h.replace(/^[\-\*] (.+)$/gm, '<li>$1</li>');
  h = h.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');
  h = h.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');
  h = h.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" style="color:var(--accent-light)">$1</a>');
  h = h.split('\n\n').map(p => { p = p.trim(); if (!p) return ''; if (/^<[hpuolb]/.test(p)) return p; return `<p>${p}</p>`; }).join('');
  h = h.replace(/([^>])\n([^<])/g, '$1<br>$2');
  return h;
}

// ===== Countdown Timer =====
function startTimer() {
  stopTimer();
  state.timer.seconds = 120;
  state.timer.running = true;
  const container = $('#timer-container');
  if (container) container.style.display = 'flex';
  updateTimerDisplay();
  state.timer.interval = setInterval(() => {
    state.timer.seconds--;
    updateTimerDisplay();
    if (state.timer.seconds <= 0) {
      stopTimer();
      updateTimerTip('⏰ Time\'s up! Send your answer.');
    }
  }, 1000);
}

function stopTimer() {
  if (state.timer.interval) clearInterval(state.timer.interval);
  state.timer.interval = null;
  state.timer.running = false;
  const container = $('#timer-container');
  if (container) container.style.display = 'none';
}

function updateTimerDisplay() {
  const s = state.timer.seconds;
  const m = Math.floor(s / 60);
  const sec = s % 60;
  const timerText = $('#timer-text');
  const progress = $('#timer-progress');
  if (!timerText || !progress) return;
  timerText.textContent = `${m}:${sec.toString().padStart(2, '0')}`;
  // Circular progress (106.8 is circumference of r=17)
  const pct = s / 120;
  progress.style.strokeDashoffset = 106.8 * (1 - pct);
  // Color coding
  progress.className = 'timer-circle-progress';
  if (s <= 30) { progress.classList.add('danger'); updateTimerTip('⚡ Wrap up your answer'); }
  else if (s <= 60) { progress.classList.add('warning'); updateTimerTip('Keep it concise'); }
  else { updateTimerTip('Take your time'); }
}

function updateTimerTip(text) {
  const tip = $('#timer-tip');
  if (tip) tip.textContent = text;
}

// ===== Confetti Animation =====
function launchConfetti() {
  const container = document.createElement('div');
  container.className = 'confetti-container';
  const colors = ['#7c3aed', '#06b6d4', '#10b981', '#f59e0b', '#f43f5e', '#a78bfa', '#34d399', '#fbbf24', '#fb7185'];
  for (let i = 0; i < 60; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + '%';
    piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    piece.style.width = (Math.random() * 8 + 6) + 'px';
    piece.style.height = (Math.random() * 8 + 6) + 'px';
    piece.style.animationDuration = (Math.random() * 2 + 2) + 's';
    piece.style.animationDelay = (Math.random() * 1.5) + 's';
    container.appendChild(piece);
  }
  document.body.appendChild(container);
  setTimeout(() => container.remove(), 5000);
}
