(() => {
  'use strict';
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];
  const stage = $('#stage');
  const states = SLIDES.map(() => 0);
  const visited = new Set();
  let index = 0, memoryOn = true, presenter = null, presenterStarted = null;
  let lastFocus = null, renderToken = 0;
  const printMode = new URLSearchParams(location.search).has('print');
  const totalSeconds = SLIDES.reduce((n,s) => n+s.seconds,0);
  const formatTime = n => `${Math.floor(n/60)}:${String(n%60).padStart(2,'0')}`;
  const pad = n => String(n).padStart(2,'0');
  const safe = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  stage.innerHTML = SLIDES.map((s,i) => `<section class="slide" id="slide-${i+1}" data-slide="${i}" aria-label="Slide ${i+1} of ${SLIDES.length}: ${safe(s.title)}" aria-hidden="true" inert>${s.html}<footer class="slide-footer"><span class="source"><a href="${SOURCES[s.source].url}" target="_blank" rel="noopener">${SOURCES[s.source].short}</a><span> · ${s.sourceDetail}</span></span><span class="folio">${pad(i+1)}</span></footer></section>`).join('');
  const sections = $$('.slide');

  function updateVisual(i, complete=false) {
    const data = SLIDES[i], section = sections[i], step = complete ? data.steps : states[i];
    section.dataset.step = step;
    $$('[data-reveal]',section).forEach(el=>el.classList.toggle('shown',step>=Number(el.dataset.reveal)));
    $$('[data-bar]',section).forEach(el=>el.classList.toggle('show',step>=Number(el.dataset.bar)));
    const nodes = $$('[data-node]',section);
    nodes.forEach(el=>{
      const n = Number(el.dataset.node);
      el.classList.toggle('lit',n<=step);
      el.classList.toggle('focus',n===step);
    });
    $$('[data-edge]',section).forEach(el=>el.classList.toggle('lit',Number(el.dataset.edge)<=step));
    if(data.messages){
      $('[data-message]',section).textContent=data.messages[step][0];
      const caption=$('[data-stage-caption]',section);
      if(caption)caption.textContent=data.messages[step][1];
      const num=$('[data-stage-number]',section);
      if(num)num.textContent=pad(step+1);
    }
    if(data.kind==='memory')updateMemory(step,section);
    if(data.kind==='network'){
      $('[data-network-title]',section).textContent=['One goal, shared state.','First, define the work.','Then, gather evidence.','Make the test executable.','Challenge, then integrate.'][step];
    }
    const localNext = $('[data-advance]',section);
    if(localNext){
      localNext.textContent=step===data.steps?'Continue to next slide →':data.kind==='network'?'Delegate next role →':data.kind==='memory'?'Advance learning loop →':'Advance loop →';
    }
  }
  function updateMemory(step,section){
    const ready=step>=3;
    $('[data-memory-heading]',section).textContent=memoryOn?(ready?'A reusable starting point.':'Experience not yet stored.'):'Each task starts afresh.';
    $('[data-memory-code]',section).innerHTML=memoryOn&&ready?'search_flights(route,date)<br>→ filter nonstop<br><b>→ check fare & availability</b>':'Enter route and date<br>→ inspect flight results.';
    $('[data-memory-result]',section).textContent=memoryOn?(ready?'Reuse the search steps for a new route and date. Check fares and availability again.':'Advance to Memory to see how experience guides a future flight search.'):'The next flight search has no stored workflow to consult. It must construct its own plan again.';
    $$('[data-memory]',section).forEach(b=>{const selected=(b.dataset.memory==='on')===memoryOn;b.classList.toggle('selected',selected);b.setAttribute('aria-pressed',selected)});
  }
  function sizeStage(){
    const box=$('.viewport').getBoundingClientRect();
    const scale=Math.max(.12,Math.min((box.width-32)/1600,(box.height-24)/900));
    document.documentElement.style.setProperty('--scale',scale);
  }
  function animateSignals(step){
    const section=sections[index];
    $$('[data-signal]',section).forEach(el=>{el.classList.remove('run','returning');el.onanimationend=null;});
    if(!step||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    const signal=$(`[data-signal="${step}"]`,section);
    if(signal){
      signal.style.animation='none';signal.getBoundingClientRect();signal.style.animation='';signal.classList.add('run');
      // A finite round trip: delegation followed by the return of an artifact.
      signal.style.animationDirection='normal';
      signal.onanimationend=()=>{
        if(SLIDES[index].kind==='network'&&!signal.classList.contains('returning')){
          signal.classList.add('returning');signal.classList.remove('run');signal.getBoundingClientRect();signal.style.animationDirection='reverse';signal.classList.add('run');
        }else{signal.classList.remove('run','returning');signal.onanimationend=null;}
      };
    }
  }
  function updateControls(){
    const s=SLIDES[index],step=states[index];
    $('#slide-count').textContent=`${pad(index+1)} / ${SLIDES.length}`;
    $('#chapter-name').textContent=s.chapter;
    $('#next-label').textContent=step<s.steps?'Reveal':index===SLIDES.length-1?'End':index===0?'Begin':'Next';
    $('#next').disabled=index===SLIDES.length-1&&step===s.steps;
    $('#prev').disabled=index===0&&step===0;
    $('#step-count').textContent=s.steps?`${step} / ${s.steps} reveals`:'';
    $('#progress').style.width=`${(index+1)/SLIDES.length*100}%`;
    $$('.app-header [data-jump]').forEach(b=>{
      const ch=Number(b.dataset.jump);
      b.classList.toggle('current',ch===2?index>=2&&index<7:ch===7?index>=7&&index<11:index>=11&&index<15);
    });
    $('#announcement').textContent=`Slide ${index+1}: ${s.title}${s.steps?`, reveal ${step} of ${s.steps}`:''}`;
    updateNotes();updatePresenter();
  }
  function goTo(target, options={}){
    if(target<0||target>=SLIDES.length)return;
    $$('.signal').forEach(el=>{el.classList.remove('run','returning');el.onanimationend=null;});
    index=target;
    if(!visited.has(index)&&SLIDES[index].kind==='benchmark')states[index]=1;
    visited.add(index);
    if(options.complete)states[index]=SLIDES[index].steps;
    sections.forEach((s,i)=>{s.classList.toggle('active',i===index);s.setAttribute('aria-hidden',i!==index);s.inert=i!==index;});
    // Establish the initial geometry before chart transitions start on entry.
    sections[index].getBoundingClientRect();
    updateVisual(index);updateControls();
    if(options.hash!==false&&location.hash!==`#/${index+1}`)history.replaceState(null,'',`#/${index+1}`);
    document.title=`${pad(index+1)} · ${SLIDES[index].title} — Agentic Reasoning`;
    const token=++renderToken;
    requestAnimationFrame(()=>{if(token===renderToken)animateSignals(states[index]);});
  }
  function advance(){
    const s=SLIDES[index];
    if(states[index]<s.steps){states[index]++;updateVisual(index);animateSignals(states[index]);updateControls();}
    else goTo(index+1);
  }
  function previous(){
    if(states[index]>0){states[index]--;updateVisual(index);updateControls();}
    else goTo(index-1,{complete:true});
  }
  function replay(){
    states[index]=0;memoryOn=true;
    sections[index].classList.remove('active');sections[index].getBoundingClientRect();sections[index].classList.add('active');
    $$('.signal',sections[index]).forEach(el=>{el.classList.remove('run','returning');el.onanimationend=null});
    updateVisual(index);updateControls();
    $('#benchmark-tooltip').hidden=true;
  }
  function restart(){
    states.fill(0);visited.clear();memoryOn=true;presenterStarted=Date.now();goTo(0);replay();
  }
  function toggleDialog(id){
    const d=$(`#${id}`);
    if(d.open){closeDialog(id);return;}
    lastFocus=document.activeElement;
    if(id==='notes-dialog')updateNotes();
    if(id==='overview-dialog')renderOverview();
    d.showModal();
  }
  function closeDialog(id){$(`#${id}`).close();if(lastFocus?.isConnected)lastFocus.focus();}
  function updateNotes(){
    const s=SLIDES[index],before=SLIDES.slice(0,index).reduce((n,s)=>n+s.seconds,0);
    $('#notes-title').textContent=`${pad(index+1)} / ${s.title}`;
    $('#notes-timing').textContent=`${formatTime(s.seconds)} on this slide · cumulative ${formatTime(before)}–${formatTime(before+s.seconds)} · ${formatTime(totalSeconds)} total`;
    $('#notes-content').innerHTML=s.notes.map(p=>`<p>${p}</p>`).join('');
  }
  function renderOverview(){
    $('#overview-grid').innerHTML=SLIDES.map((s,i)=>`<button class="overview-tile" data-goto="${i}" aria-current="${i===index}"><span>${pad(i+1)} / ${formatTime(s.seconds)}</span>${s.title}</button>`).join('');
  }
  async function fullscreen(){
    try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}
    catch{ $('#announcement').textContent='Fullscreen is unavailable in this browser. Use the browser’s fullscreen command.'; }
  }
  function openPresenter(){
    if(presenter&&!presenter.closed){presenter.focus();updatePresenter();return;}
    presenter=window.open('about:blank','agentic-presenter','width=1120,height=820');
    if(!presenter){$('#announcement').textContent='The presenter window was blocked. Allow popups or use the embedded Notes panel.';return;}
    presenterStarted=Date.now();
    presenter.document.write(`<!doctype html><html lang="en"><head><title>Presenter · Agentic Reasoning</title><meta charset="utf-8"><style>*{box-sizing:border-box}body{margin:0;background:#f5f2e9;color:#203c34;font-family:'Segoe UI',Arial,sans-serif;padding:30px}header{display:flex;justify-content:space-between;border-bottom:1px solid #d5d9cd;padding-bottom:20px;font-size:13px;letter-spacing:1px}h1{font:40px/1.15 Georgia,serif;max-width:900px;margin:24px 0 12px}#timing{color:#29685e;font-size:14px}main{display:grid;grid-template-columns:1.7fr 1fr;gap:35px;margin-top:26px}#speaker p{font-size:19px;line-height:1.6;margin:0 0 19px}aside{border-left:1px solid #d5d9cd;padding-left:25px}aside h2{font:25px Georgia,serif}aside p{font-size:17px;line-height:1.6}button{padding:12px 18px;background:#203c34;color:#f5f2e9;border:0;cursor:pointer;font-size:14px;margin:0 8px 12px 0}#current-stage{color:#29685e}footer{margin-top:20px;font-size:13px;color:#66716a}</style></head><body><header><span>AGENTIC REASONING / PRESENTER</span><span id="elapsed">0:00</span></header><h1 id="title"></h1><div id="timing"></div><main><div id="speaker"></div><aside><h2>Current teaching stage</h2><p id="current-stage"></p><h2>Up next</h2><p id="up-next"></p><button id="back">← Previous</button><button id="forward">Next stage →</button><button id="restart">Replay slide</button><button id="reset-timer">Reset timer</button><footer>Arrow keys / Space advance the main deck. Keep this window on your own screen; project the presentation window. Notes remain available if this popup is closed.</footer></aside></main></body></html>`);
    presenter.document.close();
    presenter.document.getElementById('back').onclick=previous;
    presenter.document.getElementById('forward').onclick=advance;
    presenter.document.getElementById('restart').onclick=replay;
    presenter.document.getElementById('reset-timer').onclick=()=>{presenterStarted=Date.now()};
    presenter.addEventListener('keydown',e=>{
      if(e.target.closest('button'))return;
      if(['ArrowRight',' ','PageDown'].includes(e.key)){e.preventDefault();advance();}
      if(['ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();previous();}
      if(e.key.toLowerCase()==='r')replay();
    });
    updatePresenter();
  }
  function updatePresenter(){
    if(!presenter||presenter.closed)return;
    try{
      const d=presenter.document,s=SLIDES[index];
      d.getElementById('title').textContent=`${pad(index+1)} / ${s.title}`;
      d.getElementById('timing').textContent=$('#notes-timing').textContent;
      d.getElementById('speaker').innerHTML=s.notes.map(p=>`<p>${p}</p>`).join('');
      d.getElementById('current-stage').textContent=s.messages?s.messages[states[index]][0]:`${states[index]} of ${s.steps} progressive reveals shown.`;
      d.getElementById('up-next').textContent=SLIDES[index+1]?.title||'End of presentation.';
    }catch{/* Main deck remains usable if the presenter window navigates away. */}
  }
  setInterval(()=>{
    if(!presenter||presenter.closed)return;
    try{presenter.document.getElementById('elapsed').textContent=`ELAPSED ${formatTime(Math.floor((Date.now()-presenterStarted)/1000))}`;}catch{}
  },1000);

  $('#next').onclick=advance;$('#prev').onclick=previous;$('#replay').onclick=replay;
  $('#fullscreen').onclick=fullscreen;
  $('#notes-button').onclick=()=>toggleDialog('notes-dialog');
  $('#overview').onclick=()=>toggleDialog('overview-dialog');
  $('#help-button').onclick=()=>toggleDialog('help-dialog');
  $('#presenter-window').onclick=openPresenter;
  document.addEventListener('click',e=>{
    const jump=e.target.closest('[data-jump]');if(jump)goTo(Number(jump.dataset.jump));
    const goto=e.target.closest('[data-goto]');if(goto){goTo(Number(goto.dataset.goto));closeDialog('overview-dialog');}
    const close=e.target.closest('[data-close]');if(close)closeDialog(close.dataset.close);
    if(e.target.closest('[data-advance]'))advance();
    if(e.target.closest('[data-replay]'))replay();
    const mem=e.target.closest('[data-memory]');if(mem){memoryOn=mem.dataset.memory==='on';updateVisual(index);}
  });
  const details={
    mind2web:'Mind2Web · GPT-4 cross-task step success: 36.2% → 45.1%. (45.1 − 36.2) ÷ 36.2 × 100 ≈ 24.6% relative improvement. AWM offline vs. MindAct; Table 3.',
    webarena:'WebArena · GPT-4 task success: 23.5% → 35.5%. (35.5 − 23.5) ÷ 23.5 × 100 ≈ 51.1% relative improvement. AWM online vs. published BrowserGym; Table 1.'
  };
  $$('[data-tooltip]').forEach(el=>{
    const show=()=>{const t=$('#benchmark-tooltip');t.textContent=details[el.dataset.tooltip];t.hidden=false;};
    const hide=()=>{$('#benchmark-tooltip').hidden=true;};
    el.addEventListener('mouseenter',show);el.addEventListener('mouseleave',hide);el.addEventListener('focus',show);el.addEventListener('blur',hide);
    el.addEventListener('click',show);el.addEventListener('keydown',e=>{if(['Enter',' '].includes(e.key)){e.preventDefault();show();}});
    el.setAttribute('aria-describedby','benchmark-tooltip');
  });
  document.addEventListener('keydown',e=>{
    if(e.ctrlKey||e.metaKey||e.altKey)return;
    const key=e.key.toLowerCase(),opened=$('dialog[open]');
    if(opened){if(key==='n'&&opened.id==='notes-dialog'){e.preventDefault();closeDialog(opened.id);}return;}
    if(e.target.closest('input,textarea,select,[contenteditable="true"]'))return;
    if(e.target.closest('button,a,[data-tooltip]')&&[' ','enter'].includes(key))return;
    if(['arrowright','pagedown',' '].includes(key)){e.preventDefault();e.shiftKey?goTo(index+1):advance();}
    else if(['arrowleft','pageup'].includes(key)){e.preventDefault();e.shiftKey?goTo(index-1,{complete:true}):previous();}
    else if(key==='home'){e.preventDefault();goTo(0);}
    else if(key==='end'){e.preventDefault();goTo(SLIDES.length-1);}
    else if(key==='r')e.shiftKey?restart():replay();
    else if(key==='n')toggleDialog('notes-dialog');
    else if(key==='p')openPresenter();
    else if(key==='o')toggleDialog('overview-dialog');
    else if(key==='f')fullscreen();
    else if(key==='?')toggleDialog('help-dialog');
  });
  let pointerStart=null;
  $('.viewport').addEventListener('pointerdown',e=>{if(!e.target.closest('button,a,[data-tooltip]'))pointerStart={x:e.clientX,y:e.clientY};});
  $('.viewport').addEventListener('pointerup',e=>{
    if(!pointerStart)return;const dx=e.clientX-pointerStart.x,dy=e.clientY-pointerStart.y;pointerStart=null;
    if(Math.abs(dx)>70&&Math.abs(dy)<70)dx<0?advance():previous();
  });
  function readHash(){const match=location.hash.match(/^#\/(\d+)$/);return match?Math.max(0,Math.min(SLIDES.length-1,Number(match[1])-1)):0;}
  window.addEventListener('hashchange',()=>goTo(readHash(),{hash:false}));
  window.addEventListener('resize',sizeStage);
  window.addEventListener('beforeprint',()=>SLIDES.forEach((_,i)=>updateVisual(i,true)));
  window.addEventListener('afterprint',()=>SLIDES.forEach((_,i)=>updateVisual(i,printMode)));
  if(printMode){document.body.classList.add('static-mode');SLIDES.forEach((_,i)=>updateVisual(i,true));}
  goTo(readHash());sizeStage();
  if(printMode)SLIDES.forEach((_,i)=>updateVisual(i,true));
  // Deliberate QA/presentation API; works from file:// without a local server.
  window.deck={goTo,advance,previous,replay,restart,openPresenter,get index(){return index},get step(){return states[index]},get slides(){return SLIDES},totalSeconds,completeAll:()=>SLIDES.forEach((_,i)=>updateVisual(i,true))};
})();
