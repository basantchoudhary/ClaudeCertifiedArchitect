#!/usr/bin/env python3
"""
CCA-F Udemy lecture prototype generator.

Pipeline for ONE concept page:
  1. teaching script (beats)  ->  2. edge-tts voiceover  ->  3. measure durations
  4. Playwright walkthrough (scroll + spotlight, timed to narration,
     with typewriter code reveal + animated request/response message flow)
  5. assemble narration timeline  ->  6. mux audio+video into final MP4
"""
import asyncio, wave, subprocess, os, sys, contextlib, time
import edge_tts
import imageio_ffmpeg
from playwright.async_api import async_playwright

# ---------------------------------------------------------------- paths / config
ROOT   = "/Users/ishaan/ClaudeCertifiedArchitect/course-prototype"
PAGE   = "file:///Users/ishaan/ClaudeCertifiedArchitect/CCA-F/D1-Agentic-Architecture/subtopics/1-1-agent-vs-workflow-vs-call.html"
# output goes to out/<DOMAIN_DIR>/<LESSON_FILE>.mp4 — a per-domain tree with
# Udemy-friendly filenames (filename becomes the default lecture title on upload)
DOMAIN_DIR  = "D1-Agentic-Architecture"
LESSON_FILE = "CCA-F D1 1.1 — Agent vs Workflow vs Single LLM Call"
AUDIO  = os.path.join(ROOT, "audio")
WORK   = os.path.join(ROOT, "work")
OUT    = os.path.join(ROOT, "out")
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
VOICE  = "en-US-AvaNeural"             # warm, natural female; free Microsoft neural voice
RATE   = "+4%"

VIEW_W, VIEW_H = 1920, 1080     # 1080p (Udemy's recommended standard)
PAGE_ZOOM = "1.5"               # keeps 720p framing but draws text with ~2x the pixels
SR = 44100
# deterministic timeline constants (ms) — audio silence mirrors these exactly
RENDER_MS = 2600     # let the page + mermaid diagram render (pre-roll, silent)
LEAD_MS   = 600      # beat before first narration
SETTLE_MS = 900      # scroll + spotlight settle (silent)
TAIL_MS   = 500      # dwell after narration ends (silent)
GAP_MS    = 350      # between beats (silent)
PAUSE_MS  = 3800     # "pause & answer it yourself" think-time (silent) in practice beats
FLOW_STEPS = 6

# ---------------------------------------------------------------- the teaching script
# kind: spotlight | code | flow.  (sel, idx) selects document.querySelectorAll(sel)[idx]
BEATS = [
 dict(kind="spotlight", sel="header", idx=0, text=(
   "Before you build anything with Claude, you have to answer one deceptively simple question: "
   "do you even need an agent? Here is the principle that runs through this entire course — be "
   "deterministic first. Build the most predictable system the problem allows, and add agentic, "
   "model-driven behavior only where it's genuinely required. It's the Y-A-G-N-I rule — you aren't "
   "gonna need it — applied to A-I. In this lesson we'll turn that principle into a concrete tier "
   "decision that senior architects make almost automatically, and that the exam tests over and over.")),

 dict(kind="spotlight", sel="main table", idx=0, text=(
   "There are three tiers of power. A single L-L-M call — one request, one response. A workflow — "
   "several steps, but your code decides the order. And an agent — a loop where the model itself "
   "decides what to do next. Notice the pattern: the top two tiers are deterministic — your code "
   "owns the control flow. Only the agent hands that control to the model. So as you move down, you "
   "gain flexibility but give up determinism, and you pay in cost, latency, and predictability.")),

 dict(kind="spotlight", sel=".note", idx=0, text=(
   "Here's the line that trips people up. The difference between a workflow and an agent is not how "
   "many steps there are — it's who is in charge of the control flow. If your code decides the order "
   "of steps, it's a workflow. If the model decides its own next step, it's an agent. Memorize that "
   "sentence, because the exam loves to disguise a plain workflow as an agent.")),

 dict(kind="spotlight", sel=".mermaid", idx=0, fit=True, text=(
   "Let's turn that into a decision you can run in your head. Can one request answer it? Then it's a "
   "single call — cheapest and most predictable. If not, are the steps known in advance? If yes, it's "
   "a workflow. Only when the steps can't be pre-scripted, and the task genuinely needs tools and "
   "judgment, do you climb to the agent tier. Always pick the lowest tier that solves the problem.")),

 dict(kind="spotlight", sel="main table", idx=1, text=(
   "When you think you need an agent, run Anthropic's four-question gate. Is the task genuinely "
   "complex and hard to specify up front? Is it valuable enough to justify the extra cost? Is Claude "
   "actually capable of it? And can you catch and recover from its mistakes? All four must be yes. A "
   "single no means you drop back down to a workflow or a single call.")),

 dict(kind="code", sel="main pre", idx=0, text=(
   "Let's see the same idea in code. Tier one — a single call. Watch it come together: one message in, "
   "one answer out. No tools, no loop. For classification, summarizing, or extraction, this is all you "
   "need — and it's the cheapest thing you can ship.")),

 dict(kind="code", sel="main pre", idx=1, text=(
   "Tier two — the workflow. Same task, but now your code owns the steps: retrieve, then re-rank, then "
   "a single L-L-M call with the context you gathered. The model still does the thinking — but only at "
   "the one fixed point you chose. You decided the order. That's the whole distinction: here you are "
   "the orchestrator, not the model.")),

 dict(kind="code", sel="main pre", idx=2, text=(
   "Now tier three — the agent. Look at the while-loop as it appears. We call the model, and the model "
   "decides whether to use a tool or to stop. Our code isn't choosing the steps anymore; it just runs "
   "whatever the model asks for and loops back. That loop is the entire definition of an agent.")),

 dict(kind="flow", sel="", idx=0, text=(
   "Let's watch what actually happens inside that loop, turn by turn. First, your app sends the user's "
   "question to Anthropic. Claude replies — but instead of a final answer, it comes back with a stop "
   "reason of tool underscore use: it's asking to run a search. Your code runs that tool and sends the "
   "result back. Now Claude has what it needs, and this time it returns stop reason end turn — the "
   "finished answer. That back-and-forth, driven by the model, is the agent loop in motion.")),

 dict(kind="spotlight", sel=".trap", idx=0, text=(
   "And here's your exam trap. When a question says design an agent for a simple, single-step task, "
   "the correct answer is usually not an agent. Watch for keywords like cost-effective or lowest "
   "latency — they're signals pushing you down a tier. The disciplined architect always reaches for "
   "the simplest tool that works.")),

 dict(kind="spotlight", sel=".good", idx=0, text=(
   "So, the rule of thumb: single call, then workflow, then agent — and stop at the first tier that "
   "solves the problem. That is deterministic-first thinking — Y-A-G-N-I applied to A-I: don't add "
   "agentic complexity you don't need. Escalate only when the task genuinely can't be pre-scripted. "
   "Now let's pressure-test that with a couple of quick, exam-style questions.")),

 # ---- worked-example practice: pose -> PAUSE -> reveal & explain ----
 dict(kind="practice_q", sel="details", idx=0, pause=True, text=(
   "Question one. A client needs to classify a hundred thousand support emails a day into five "
   "categories, as cheaply as possible. Which tier would you choose? Pause the lesson and decide "
   "before I answer.")),
 dict(kind="practice_a", sel="details", idx=0, text=(
   "This is a single L-L-M call. It's one step and high-volume, so you'd batch it — likely on a "
   "smaller, cheaper model like Haiku. An agent would only add cost and latency for zero benefit. "
   "Reserve agents for tasks you genuinely can't pre-script.")),

 dict(kind="practice_q", sel="details", idx=2, pause=True, text=(
   "Question two. Your so-called agent always runs retrieve, then re-rank, then answer, in that exact "
   "fixed order. Is it really an agent? Pause and decide.")),
 dict(kind="practice_a", sel="details", idx=2, text=(
   "No — that's a workflow. Your code fixes the control flow, so calling it an agent doesn't make it "
   "one. It only becomes an agent if the model itself decides whether and when to retrieve. That's "
   "exactly the trap we flagged earlier.")),

 dict(kind="spotlight", sel=".pager", idx=0, text=(
   "And that's the tier decision locked in — one of Domain One's most-tested ideas. Next up, we'll "
   "look at the Messages API that every one of these tiers is built on. See you in the next lesson.")),
]

# ---------------------------------------------------------------- browser-side JS
SETUP_JS = r"""
(zoom) => {
  document.documentElement.style.zoom = zoom;
  // dim veil (everything behind it darkens; spotlighted element is raised above it)
  const veil = document.createElement('div');
  veil.id = 'cca-veil';
  Object.assign(veil.style, {position:'fixed', inset:'0', background:'#0d0f16',
    opacity:'0', transition:'opacity .5s ease', zIndex:'9990', pointerEvents:'none'});
  document.body.appendChild(veil);
  window.__ccaLast = null;
}
"""

SPOT_JS = r"""
({sel, idx, dim}) => {
  const veil = document.getElementById('cca-veil');
  if (window.__ccaLast) {
    const p = window.__ccaLast;
    p.style.boxShadow=''; p.style.transform=''; p.style.zIndex=''; p.style.position=p.__pp||'';
    p.style.clipPath='';
  }
  const el = document.querySelectorAll(sel)[idx];
  if (!el) return false;
  el.scrollIntoView({behavior:'smooth', block:'center'});
  el.__pp = el.style.position;
  el.style.position = 'relative';
  el.style.zIndex = '9995';
  el.style.transition = 'box-shadow .5s ease, transform .5s ease';
  el.style.boxShadow = '0 0 0 3px #764ba2, 0 10px 34px rgba(118,75,162,.55)';
  el.style.borderRadius = getComputedStyle(el).borderRadius || '8px';
  veil.style.opacity = dim;
  window.__ccaLast = el;
  return true;
}
"""

# like SPOT_JS but first scales a too-tall element down so the WHOLE thing fits on screen
FIT_SPOT_JS = r"""
({sel, idx, dim, fitFrac}) => {
  if (window.__ccaLast) {
    const p = window.__ccaLast;
    p.style.boxShadow=''; p.style.transform=''; p.style.zIndex=''; p.style.position=p.__pp||''; p.style.clipPath='';
  }
  const el = document.querySelectorAll(sel)[idx];
  if (!el) return false;
  el.__pp = el.style.position;
  el.style.position = 'relative';
  el.style.zIndex = '9995';
  el.style.transformOrigin = 'center center';
  el.style.transform = 'none';
  void el.offsetHeight;
  const rect = el.getBoundingClientRect();
  const scale = Math.min(1, (window.innerHeight * fitFrac) / rect.height);
  el.style.transition = 'transform .5s ease, box-shadow .5s ease';
  el.style.transform = 'scale(' + scale + ')';
  el.style.boxShadow = '0 0 0 3px #764ba2, 0 10px 34px rgba(118,75,162,.55)';
  el.style.borderRadius = getComputedStyle(el).borderRadius || '8px';
  el.scrollIntoView({behavior:'smooth', block:'center'});
  document.getElementById('cca-veil').style.opacity = dim;
  window.__ccaLast = el;
  return scale;
}
"""

# typewriter: reveal the raised code block top-down; hidden lines show the dark veil behind
TYPE_JS = r"""
({sel, idx, ms}) => {
  const el = document.querySelectorAll(sel)[idx];
  if (!el) return 0;
  el.style.transition = 'none';
  el.style.clipPath = 'inset(0 0 100% 0)';
  void el.offsetHeight;
  const lh = parseFloat(getComputedStyle(el).lineHeight) || 20;
  const lines = Math.max(1, Math.round(el.scrollHeight / lh));
  let i = 0;
  const step = Math.max(30, ms / lines);
  const t = setInterval(() => {
    i++;
    const pct = Math.max(0, 100 - (i / lines * 100));
    el.style.clipPath = 'inset(0 0 ' + pct + '% 0)';
    if (i >= lines) { clearInterval(t); el.style.clipPath = 'inset(0 0 0 0)'; }
  }, step);
  return lines;
}
"""

FLOW_INIT_JS = r"""
() => {
  const veil = document.getElementById('cca-veil');
  veil.style.opacity = '0.92';
  if (window.__ccaLast) { const p=window.__ccaLast; p.style.boxShadow=''; p.style.zIndex=''; window.__ccaLast=null; }
  const s = document.createElement('style'); s.id='cca-flow-style';
  s.textContent = `
   #cca-flow{position:fixed;inset:0;z-index:10000;display:flex;flex-direction:column;
     align-items:center;justify-content:center;font-family:-apple-system,Segoe UI,Roboto,sans-serif;color:#eee}
   #cca-flow h4{font-size:22px;margin:0 0 26px;letter-spacing:.3px;color:#cbb6e6}
   .cca-stage{position:relative;width:900px;height:340px}
   .cca-box{position:absolute;top:70px;width:210px;padding:18px;border-radius:14px;text-align:center;
     box-shadow:0 8px 30px rgba(0,0,0,.5)}
   .cca-app{left:0;background:linear-gradient(135deg,#1b3a2e,#123)}
   .cca-api{right:0;background:linear-gradient(135deg,#3a2258,#221)}
   .cca-box .t{font-size:30px}.cca-box .n{font-weight:700;margin-top:6px;font-size:15px}
   .cca-box .s{font-size:12px;opacity:.75;margin-top:2px;font-family:ui-monospace,Menlo,monospace}
   .cca-bub{position:absolute;top:96px;max-width:330px;padding:10px 14px;border-radius:12px;font-size:13px;
     line-height:1.35;font-family:ui-monospace,Menlo,monospace;opacity:0;transition:all .6s cubic-bezier(.4,0,.2,1);
     box-shadow:0 6px 20px rgba(0,0,0,.45);white-space:pre-line}
   .cca-fromapp{left:230px;background:#1f6f4d;color:#eafff3;transform:translateX(-30px)}
   .cca-fromapi{right:230px;background:#6b3fa0;color:#f6efff;transform:translateX(30px)}
   .cca-cap{margin-top:30px;font-size:19px;font-weight:600;color:#9be7b4;opacity:0;transition:opacity .5s}
  `;
  document.head.appendChild(s);
  const w = document.createElement('div'); w.id='cca-flow';
  w.innerHTML = `
    <h4>Inside the agent loop — one turn at a time</h4>
    <div class="cca-stage" id="cca-stage">
      <div class="cca-box cca-app"><div class="t">🖥️</div><div class="n">YOUR APP</div><div class="s">the loop you run</div></div>
      <div class="cca-box cca-api"><div class="t">🧠</div><div class="n">ANTHROPIC API</div><div class="s">claude-opus-4-8</div></div>
    </div>
    <div class="cca-cap" id="cca-cap">The <b>model</b> chose each step — that's the agent loop</div>`;
  document.body.appendChild(w);
  window.__ccaBub = [];
}
"""

FLOW_STEP_JS = r"""
(i) => {
  const stage = document.getElementById('cca-stage');
  const mk = (cls, html, topOffset) => {
    const b = document.createElement('div');
    b.className = 'cca-bub ' + cls;
    b.innerHTML = html;
    b.style.top = (96 + topOffset) + 'px';
    stage.appendChild(b);
    requestAnimationFrame(() => { b.style.opacity='1'; b.style.transform='translateX(0)'; });
    window.__ccaBub.push(b);
  };
  const fade = () => window.__ccaBub.forEach(b => { b.style.opacity='0.28'; });
  if (i===1){ mk('cca-fromapp', '👤 <b>user</b> →\n"How do I reset my password?"', 0); }
  else if (i===2){ fade(); mk('cca-fromapi', '⏹ stop_reason: <b>tool_use</b>\n← call search_docs("reset")', 40); }
  else if (i===3){ fade(); mk('cca-fromapp', '🔧 <b>tool_result</b> →\n"Settings › Security › Reset…"', 80); }
  else if (i===4){ fade(); mk('cca-fromapi', '⏹ stop_reason: <b>end_turn</b>\n← ✅ final answer to user', 120); }
  else if (i===5){ document.getElementById('cca-cap').style.opacity='1'; }
}
"""

FLOW_CLEAR_JS = r"""
() => {
  document.getElementById('cca-flow')?.remove();
  document.getElementById('cca-flow-style')?.remove();
  document.getElementById('cca-veil').style.opacity='0';
}
"""

OPEN_DETAILS_JS = r"""
({sel, idx}) => { const d = document.querySelectorAll(sel)[idx]; if (d) d.open = true; }
"""

# "pause & answer it yourself" pill — the retrieval-practice beat
PAUSE_INIT_JS = r"""
(label) => {
  if (!document.getElementById('cca-pause-style')) {
    const s = document.createElement('style'); s.id='cca-pause-style';
    s.textContent = `
     @keyframes ccaPulse{0%,100%{transform:translateX(-50%) scale(1)}50%{transform:translateX(-50%) scale(1.05)}}
     #cca-pause{position:fixed;left:50%;bottom:8%;transform:translateX(-50%);z-index:10001;
       background:linear-gradient(135deg,#764ba2,#5a3d82);color:#fff;padding:16px 30px;border-radius:40px;
       font-family:-apple-system,Segoe UI,Roboto,sans-serif;font-size:22px;font-weight:700;letter-spacing:.3px;
       box-shadow:0 12px 40px rgba(118,75,162,.6);animation:ccaPulse 1.2s ease-in-out infinite;
       display:flex;align-items:center;gap:12px}`;
    document.head.appendChild(s);
  }
  const p = document.createElement('div'); p.id='cca-pause';
  p.innerHTML = '⏸ ' + label;
  document.body.appendChild(p);
}
"""

PAUSE_CLEAR_JS = r"""() => { document.getElementById('cca-pause')?.remove(); }"""

# ---------------------------------------------------------------- audio helpers
def run_ffmpeg(args):
    subprocess.run([FFMPEG, "-y", "-loglevel", "error", *args], check=True)

async def tts(text, path_mp3):
    await edge_tts.Communicate(text, VOICE, rate=RATE).save(path_mp3)

def mp3_to_wav(mp3, wav):
    run_ffmpeg(["-i", mp3, "-ar", str(SR), "-ac", "2", "-sample_fmt", "s16", wav])

def wav_frames(wav):
    with wave.open(wav, "rb") as w:
        return w.readframes(w.getnframes()), w.getnframes()

def silence_frames(ms):
    n = int(ms / 1000 * SR)
    return b"\x00" * (n * 4)   # 2 channels * 2 bytes

# ---------------------------------------------------------------- main
async def main():
    for d in (AUDIO, WORK, OUT):
        os.makedirs(d, exist_ok=True)

    # 1+2+3: voiceover per beat, measure durations
    print(">> generating voiceover ...")
    durations = []
    beat_wavs = []
    for i, b in enumerate(BEATS):
        mp3 = os.path.join(AUDIO, f"beat{i}.mp3")
        wav = os.path.join(AUDIO, f"beat{i}.wav")
        await tts(b["text"], mp3)
        mp3_to_wav(mp3, wav)
        frames, n = wav_frames(wav)
        dur_ms = int(n / SR * 1000)
        durations.append(dur_ms)
        beat_wavs.append(frames)
        print(f"   beat {i:>2} [{b['kind']:>9}]  {dur_ms/1000:5.1f}s")

    # 4: record the walkthrough, capturing the REAL wall-clock offset at which
    #    each beat's narration should begin (resolution-proof: no drift because
    #    audio is placed at measured timestamps, not a predicted timeline)
    print(">> recording walkthrough (timestamp-aligned) ...")
    placements = []            # (start_sec, frames)
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        ctx = await browser.new_context(
            viewport={"width": VIEW_W, "height": VIEW_H},
            record_video_dir=WORK,
            record_video_size={"width": VIEW_W, "height": VIEW_H},
        )
        # clear stale recordings so the file lookup is unambiguous
        for f in os.listdir(WORK):
            if f.endswith(".webm"):
                os.remove(os.path.join(WORK, f))
        page = await ctx.new_page()
        vid = page.video               # capture exact recording handle
        t0 = time.monotonic()          # ~= first video frame
        await page.goto(PAGE, wait_until="load")
        await page.evaluate(SETUP_JS, PAGE_ZOOM)
        await page.wait_for_timeout(RENDER_MS)
        await page.wait_for_timeout(LEAD_MS)

        def mark(i):
            placements.append((time.monotonic() - t0, beat_wavs[i]))

        for i, b in enumerate(BEATS):
            dur = durations[i]
            if b["kind"] in ("spotlight", "code"):
                dim = "0.66" if b["kind"] == "code" else "0.55"
                if b.get("fit"):
                    await page.evaluate(FIT_SPOT_JS, {"sel": b["sel"], "idx": b["idx"],
                                                      "dim": dim, "fitFrac": 0.82})
                else:
                    await page.evaluate(SPOT_JS, {"sel": b["sel"], "idx": b["idx"], "dim": dim})
                await page.wait_for_timeout(SETTLE_MS)
                if b["kind"] == "code":
                    await page.evaluate(TYPE_JS, {"sel": b["sel"], "idx": b["idx"],
                                                  "ms": min(2200, dur)})
                mark(i)                                   # narration starts now
                await page.wait_for_timeout(dur)
                await page.wait_for_timeout(TAIL_MS)
            elif b["kind"] == "flow":
                await page.evaluate(FLOW_INIT_JS)
                await page.wait_for_timeout(SETTLE_MS)
                mark(i)                                   # narration spans the steps
                step_ms = dur // FLOW_STEPS
                for s in range(FLOW_STEPS):
                    await page.evaluate(FLOW_STEP_JS, s)
                    await page.wait_for_timeout(step_ms)
                await page.wait_for_timeout(TAIL_MS)
                await page.evaluate(FLOW_CLEAR_JS)
            elif b["kind"] == "practice_q":
                # pose the question, then a silent PAUSE so the learner answers
                await page.evaluate(SPOT_JS, {"sel": b["sel"], "idx": b["idx"], "dim": "0.6"})
                await page.wait_for_timeout(SETTLE_MS)
                mark(i)
                await page.wait_for_timeout(dur)
                await page.wait_for_timeout(TAIL_MS)
                if b.get("pause"):
                    await page.evaluate(PAUSE_INIT_JS, "Pause & pick your answer")
                    await page.wait_for_timeout(PAUSE_MS)      # silent think-time
                    await page.evaluate(PAUSE_CLEAR_JS)
            elif b["kind"] == "practice_a":
                # reveal the answer, then explain it
                await page.evaluate(OPEN_DETAILS_JS, {"sel": b["sel"], "idx": b["idx"]})
                await page.evaluate(SPOT_JS, {"sel": b["sel"], "idx": b["idx"], "dim": "0.6"})
                await page.wait_for_timeout(SETTLE_MS)
                mark(i)
                await page.wait_for_timeout(dur)
                await page.wait_for_timeout(TAIL_MS)
            await page.wait_for_timeout(GAP_MS)

        total_sec = time.monotonic() - t0
        await ctx.close()          # flush video
        webm = await vid.path()    # exact path of THIS recording
        await browser.close()

    # assemble narration aligned to the ACTUAL recorded timeline
    print(">> assembling narration track (aligned to real timestamps) ...")
    narration = os.path.join(WORK, "narration.wav")
    buf = bytearray(int((total_sec + 1.0) * SR) * 4)      # silent bed, 4 bytes/frame
    for start_sec, frames in placements:
        off = int(start_sec * SR) * 4
        end = off + len(frames)
        if end > len(buf):
            buf.extend(b"\x00" * (end - len(buf)))
        buf[off:end] = frames
    with wave.open(narration, "wb") as out:
        out.setnchannels(2); out.setsampwidth(2); out.setframerate(SR)
        out.writeframes(bytes(buf))

    print(f">> video: {webm}")

    # 6: mux audio + video into final mp4
    print(">> muxing final mp4 ...")
    final = os.path.join(OUT, DOMAIN_DIR, LESSON_FILE + ".mp4")
    os.makedirs(os.path.dirname(final), exist_ok=True)
    run_ffmpeg(["-i", webm, "-i", narration,
                "-map", "0:v:0", "-map", "1:a:0",
                "-c:v", "libx264", "-preset", "medium", "-crf", "18",
                "-pix_fmt", "yuv420p", "-r", "30",
                "-c:a", "aac", "-b:a", "192k", "-shortest", final])
    print(f"\nDONE -> {final}")

if __name__ == "__main__":
    asyncio.run(main())
