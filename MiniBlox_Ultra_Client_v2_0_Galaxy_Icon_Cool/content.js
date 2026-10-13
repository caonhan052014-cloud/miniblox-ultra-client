(() => {
  if (window.__miniBloxUltra16Loaded) return;
  window.__miniBloxUltra16Loaded = true;

  let fps = 0, frames = 0, lastFps = performance.now();
  const clicks = [];
  const oldRAF = window.requestAnimationFrame.bind(window);
  window.requestAnimationFrame = function(cb) {
    return oldRAF(function(t) {
      frames++;
      if (t - lastFps >= 1000) { fps = Math.round(frames * 1000 / (t - lastFps)); frames = 0; lastFps = t; }
      cb(t);
    });
  };
  window.addEventListener('click', () => { const now = Date.now(); clicks.push(now); while (clicks.length && now - clicks[0] > 1000) clicks.shift(); }, true);

  function build() {
    if (!document.body || document.getElementById('mbuc-panel')) return;
    const panel = document.createElement('div');
    panel.id = 'mbuc-panel';
    panel.innerHTML = `
      <header id="mbuc-titlebar">
        <div class="mbuc-brand"><span class="mbuc-bolt">ϟ</span><div><strong>MiniBlox Ultra Client</strong><small>Compact Control Panel · v2.0</small></div></div>
        <div class="mbuc-head-actions"><span class="mbuc-key">B</span><button id="mbuc-min" title="Thu nhỏ">—</button><button id="mbuc-close" title="Đóng">×</button></div>
      </header>
      <nav class="mbuc-tabs"><button class="active" data-tab="home">Home</button><button data-tab="modules">Modules</button><button data-tab="settings">Settings</button></nav>
      <main>
        <section id="mbuc-home" class="mbuc-page">
          <div class="mbuc-stats"><div class="mbuc-stat"><span>FPS</span><b id="mbuc-fps">--</b></div><div class="mbuc-stat"><span>CPS</span><b id="mbuc-cps">0</b></div></div>
          <div class="mbuc-card"><h3>Hiệu năng</h3><label><input type="checkbox" id="mbuc-motion"> Giảm chuyển động của bảng</label><p class="mbuc-note">Các chỉ số là ước tính phía trình duyệt.</p></div>
          <div class="mbuc-tip">Nhấn <b>B</b> để mở/đóng. Bảng cố định ở giữa màn hình.</div>
        </section>
        <section id="mbuc-modules" class="mbuc-page" hidden>
          <div class="mbuc-module-window">
            <div class="mbuc-module-window-head"><div><h3>Modules</h3><p>Danh sách tính năng</p></div><button id="mbuc-modules-close" title="Đóng Modules">×</button></div>
            <div class="mbuc-module-grid">
              ${[['Kill Aura','Combat'],['Trigger Bot','Combat'],['X-Ray','Visual'],['ESP Players','Visual'],['ESP Block','Visual'],['Tracers','Visual'],['Fullbright','Visual'],['Dynamic Crosshair','Visual'],['Zoom','Visual'],['No Fall','Movement'],['Speed','Movement'],['High Jump','Movement'],['Sprint','Movement'],['Auto Respawn','Utility'],['Keystrokes HUD','Utility'],['AFK Auto','Utility'],['Auto Click','Utility'],['Fly','Movement']].map(([n,c])=>`<label class="mbuc-module"><span><small>${c}</small><b>${n}</b></span><input type="checkbox" data-module="${n}"><i></i></label>`).join('')}
            </div>
            <p class="mbuc-note">Đã tích hợp: Fullbright (hiển thị), Zoom, Dynamic Crosshair, Keystrokes HUD. Các module tác động gameplay/đối thủ cần API game và chưa được bật giả.</p>
          </div>
        </section>
        <section id="mbuc-settings" class="mbuc-page" hidden>
          <div class="mbuc-card"><h3>Điều khiển</h3><p><b>B</b> — mở / đóng bảng</p><p>Bảng cố định ở giữa màn hình</p><p>— — thu nhỏ bảng</p><p>× — đóng bảng</p></div>
          <div class="mbuc-card"><h3>Giao diện</h3><label><input type="checkbox" id="mbuc-motion2"> Giảm chuyển động của bảng</label></div>
        </section>
      </main>
      <footer><span>MINIBLOX ULTRA</span><span>Compact · B to toggle</span></footer>`;
    document.body.appendChild(panel);
    const floatButton = document.createElement('button');
    floatButton.id = 'mbuc-float-button';
    floatButton.type = 'button';
    floatButton.textContent = 'MB';
    floatButton.title = 'Mở MiniBlox Ultra Client (B)';
    document.body.appendChild(floatButton);

    const setMotion = v => { panel.classList.toggle('mbuc-reduced', v); const a=document.getElementById('mbuc-motion'), b=document.getElementById('mbuc-motion2'); if(a)a.checked=v;if(b)b.checked=v; };
    ['mbuc-motion','mbuc-motion2'].forEach(id => document.getElementById(id).addEventListener('change', e => setMotion(e.target.checked)));
    panel.querySelectorAll('.mbuc-tabs button').forEach(btn => btn.addEventListener('click', () => {
      if (btn.dataset.tab === 'modules') {
        panel.classList.add('mbuc-hidden');
        let moduleWindow = document.getElementById('mbuc-modules-window');
        if (!moduleWindow) {
          moduleWindow = document.createElement('div');
          moduleWindow.id = 'mbuc-modules-window';
          moduleWindow.innerHTML = `
            <header class="mbuc-separate-head"><div><strong>MiniBlox Ultra Client</strong><small>Modules · v2.0</small></div><button id="mbuc-separate-close" title="Đóng">×</button></header>
            <div class="mbuc-separate-title"><div><h3>Modules</h3><p>Bảng tính năng riêng</p></div><span class="mbuc-key">B</span></div>
            <div class="mbuc-module-grid">
              ${[['Kill Aura','Combat'],['Trigger Bot','Combat'],['X-Ray','Visual'],['ESP Players','Visual'],['ESP Block','Visual'],['Tracers','Visual'],['Fullbright','Visual'],['Dynamic Crosshair','Visual'],['Zoom','Visual'],['No Fall','Movement'],['Speed','Movement'],['High Jump','Movement'],['Sprint','Movement'],['Auto Respawn','Utility'],['Keystrokes HUD','Utility'],['AFK Auto','Utility'],['Auto Click','Utility'],['Fly','Movement']].map(([n,c])=>`<label class="mbuc-module"><span><small>${c}</small><b>${n}</b></span><input type="checkbox" data-module="${n}"><i></i></label>`).join('')}
            </div>
            <p class="mbuc-note">Đã tích hợp: Fullbright (hiển thị), Zoom, Dynamic Crosshair, Keystrokes HUD. Các module tác động gameplay/đối thủ cần API game và chưa được bật giả.</p>
            <footer><span>MINIBLOX ULTRA</span><span>Nhấn B để mở/đóng</span></footer>`;
          document.body.appendChild(moduleWindow);
          const moduleHead = moduleWindow.querySelector('.mbuc-separate-head');
          moduleHead.style.cursor='grab';
          let moduleDragging=false, msx=0, msy=0, mlx=0, mly=0;
          moduleHead.addEventListener('pointerdown', e => {
            if(e.target.closest('button')) return;
            moduleDragging=true;
            const r=moduleWindow.getBoundingClientRect();
            msx=e.clientX; msy=e.clientY; mlx=r.left; mly=r.top;
            moduleWindow.style.transform='none'; moduleWindow.style.left=mlx+'px'; moduleWindow.style.top=mly+'px';
            moduleHead.setPointerCapture(e.pointerId);
          });
          moduleHead.addEventListener('pointermove', e => {
            if(!moduleDragging)return;
            moduleWindow.style.left=Math.max(0,Math.min(window.innerWidth-moduleWindow.offsetWidth,mlx+e.clientX-msx))+'px';
            moduleWindow.style.top=Math.max(0,Math.min(window.innerHeight-50,mly+e.clientY-msy))+'px';
          });
          moduleHead.addEventListener('pointerup', ()=>moduleDragging=false);
          moduleHead.addEventListener('pointercancel', ()=>moduleDragging=false);
          document.getElementById('mbuc-separate-close').addEventListener('click', () => moduleWindow.classList.add('mbuc-separate-hidden'));
        }
        moduleWindow.classList.remove('mbuc-separate-hidden');
        return;
      }
      panel.querySelectorAll('.mbuc-tabs button').forEach(x=>x.classList.toggle('active', x===btn));
      panel.querySelectorAll('.mbuc-page').forEach(p=>p.hidden = p.id !== 'mbuc-' + btn.dataset.tab);
    }));
    const moduleClose = document.getElementById('mbuc-modules-close');
    if (moduleClose) moduleClose.addEventListener('click', () => {
      document.getElementById('mbuc-modules-window')?.classList.add('mbuc-separate-hidden');
      panel.classList.remove('mbuc-hidden');
    });
    document.getElementById('mbuc-close').addEventListener('click', () => panel.classList.add('mbuc-hidden'));
    document.getElementById('mbuc-min').addEventListener('click', () => panel.classList.toggle('mbuc-minimized'));

    // Drag main rectangular panel by its title bar
    {
      let dragging=false, startX=0, startY=0, startLeft=0, startTop=0;
      const titlebar=document.getElementById('mbuc-titlebar');
      titlebar.style.cursor='grab';
      titlebar.addEventListener('pointerdown', e => {
        if (e.target.closest('button')) return;
        dragging=true;
        const r=panel.getBoundingClientRect();
        startX=e.clientX; startY=e.clientY; startLeft=r.left; startTop=r.top;
        panel.style.transform='none'; panel.style.left=startLeft+'px'; panel.style.top=startTop+'px';
        titlebar.setPointerCapture(e.pointerId);
      });
      titlebar.addEventListener('pointermove', e => {
        if(!dragging)return;
        panel.style.left=Math.max(0,Math.min(window.innerWidth-panel.offsetWidth,startLeft+e.clientX-startX))+'px';
        panel.style.top=Math.max(0,Math.min(window.innerHeight-50,startTop+e.clientY-startY))+'px';
      });
      titlebar.addEventListener('pointerup', ()=>dragging=false);
      titlebar.addEventListener('pointercancel', ()=>dragging=false);
    }
    // Real, local visual/accessibility modules. No game-memory or combat automation.
    const active = new Set();
    let zoomLevel = 1.25;
    const originalFilters = new Map();
    const ensureCrosshair = () => {
      let el = document.getElementById('mbuc-crosshair');
      if (!el) { el = document.createElement('div'); el.id = 'mbuc-crosshair'; el.textContent = '+'; document.body.appendChild(el); }
      return el;
    };
    const ensureKeys = () => {
      let el = document.getElementById('mbuc-keystrokes');
      if (!el) {
        el = document.createElement('div'); el.id = 'mbuc-keystrokes';
        el.innerHTML = '<span data-key="W">W</span><div><span data-key="A">A</span><span data-key="S">S</span><span data-key="D">D</span></div>';
        document.body.appendChild(el);
      }
      return el;
    };
    function applyModule(name, enabled) {
      if (enabled) active.add(name); else active.delete(name);
      if (name === 'Fullbright') {
        document.querySelectorAll('canvas, video, #game, .game-container').forEach(el => {
          if (enabled) {
            if (!originalFilters.has(el)) originalFilters.set(el, el.style.filter);
            el.style.filter = 'brightness(1.45) contrast(1.08)';
          } else if (originalFilters.has(el)) { el.style.filter = originalFilters.get(el); originalFilters.delete(el); }
        });
      }
      if (name === 'Zoom') {
        document.querySelectorAll('canvas').forEach(el => {
          if (enabled) { el.style.transform = `scale(${zoomLevel})`; el.style.transformOrigin = 'center center'; }
          else { el.style.transform = ''; el.style.transformOrigin = ''; }
        });
      }
      if (name === 'Dynamic Crosshair') ensureCrosshair().classList.toggle('mbuc-widget-on', enabled);
      if (name === 'Keystrokes HUD') ensureKeys().classList.toggle('mbuc-widget-on', enabled);
      const note = document.querySelector('#mbuc-modules-window .mbuc-note');
      if (note) note.textContent = 'Hoạt động: ' + ([...active].filter(x => ['Fullbright','Zoom','Dynamic Crosshair','Keystrokes HUD'].includes(x)).join(', ') || 'không có') + '. Các module gameplay/đối thủ cần API game nên chưa được giả lập là đang chạy.';
    }
    panel.addEventListener('change', e => {
      const input = e.target;
      if (!input.matches('input[data-module]')) return;
      applyModule(input.dataset.module, input.checked);
      // Mirror state between the main hidden list and the separate Modules window.
      document.querySelectorAll(`input[data-module="${CSS.escape(input.dataset.module)}"]`).forEach(other => { if (other !== input) other.checked = input.checked; });
    });
    document.body.addEventListener('change', e => {
      const input = e.target;
      if (!input.matches('#mbuc-modules-window input[data-module]')) return;
      applyModule(input.dataset.module, input.checked);
      document.querySelectorAll(`input[data-module="${CSS.escape(input.dataset.module)}"]`).forEach(other => { if (other !== input) other.checked = input.checked; });
    });
    const heldKeys = new Set();
    window.addEventListener('keydown', e => { const k=e.key.toUpperCase(); if (['W','A','S','D'].includes(k)) { heldKeys.add(k); document.querySelectorAll(`#mbuc-keystrokes [data-key="${k}"]`).forEach(x=>x.classList.add('mbuc-key-held')); } });
    window.addEventListener('keyup', e => { const k=e.key.toUpperCase(); heldKeys.delete(k); document.querySelectorAll(`#mbuc-keystrokes [data-key="${k}"]`).forEach(x=>x.classList.remove('mbuc-key-held')); });
    floatButton.addEventListener('click', () => togglePanel());

    function togglePanel(){
      const moduleWindow = document.getElementById('mbuc-modules-window');
      if (moduleWindow && !moduleWindow.classList.contains('mbuc-separate-hidden')) {
        moduleWindow.classList.add('mbuc-separate-hidden');
        panel.classList.remove('mbuc-hidden');
        return;
      }
      panel.classList.toggle('mbuc-hidden');
      if(!panel.classList.contains('mbuc-hidden') && !panel.style.left){ panel.style.left='50%'; panel.style.top='50%'; panel.style.transform='translate(-50%,-50%)'; }
    }
    window.addEventListener('keydown', e => {
      if(e.key.toLowerCase()==='b' && !e.repeat && !['INPUT','TEXTAREA'].includes(document.activeElement.tagName) && !document.activeElement.isContentEditable){ togglePanel(); }
      if(e.key==='Escape') panel.classList.add('mbuc-hidden');
    });
    setInterval(() => {
      const f=document.getElementById('mbuc-fps'), c=document.getElementById('mbuc-cps');
      if(f) f.textContent=fps || '--';
      const now=Date.now(); while(clicks.length && now-clicks[0]>1000) clicks.shift();
      if(c)c.textContent=clicks.length;
    }, 250);
    panel.style.left='50%'; panel.style.top='50%'; panel.style.transform='translate(-50%,-50%)';
  }
  const timer = setInterval(() => { if(document.body){ clearInterval(timer); build(); } }, 100);
})();