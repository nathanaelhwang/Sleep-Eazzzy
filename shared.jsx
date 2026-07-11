// Shared UI primitives

const { useState, useEffect, useRef, useMemo } = React;

const storage = {
  get(key, fallback) {
    try { const v = localStorage.getItem('se_' + key); return v == null ? fallback : JSON.parse(v); }
    catch { return fallback; }
  },
  set(key, val) {
    try { localStorage.setItem('se_' + key, JSON.stringify(val)); } catch {}
  }
};

function useStored(key, initial) {
  const [val, setVal] = useState(() => storage.get(key, initial));
  useEffect(() => { storage.set(key, val); }, [key, val]);
  return [val, setVal];
}

// ── i18n ──
const LangContext = React.createContext({ lang: 'en', setLang: () => {} });
function useLang() { return React.useContext(LangContext); }
function useT() {
  const { lang } = useLang();
  const T = window.SE_I18N.TRANSLATIONS[lang] || window.SE_I18N.TRANSLATIONS.en;
  return (k) => T[k] != null ? T[k] : (window.SE_I18N.TRANSLATIONS.en[k] || k);
}
function useModules() {
  const { lang } = useLang();
  return window.SE_I18N.MODULES_I18N[lang] || window.SE_I18N.MODULES_I18N.en;
}
function useModContent(id) {
  const { lang } = useLang();
  const c = (window.SE_I18N.MODULE_CONTENT[lang] && window.SE_I18N.MODULE_CONTENT[lang][id]) || window.SE_I18N.MODULE_CONTENT.en[id];
  return c || {};
}
function LangProvider({ children }) {
  const [lang, setLang] = useStored('lang', 'en');
  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}
function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div style={{display: 'flex', gap: 4, marginLeft: 8, padding: 3, borderRadius: 999, background: 'var(--cream-2)'}}>
      {[['en','EN'],['es','ES'],['zh-Hant','繁'],['zh-Hans','简']].map(([l,label]) => (
        <button key={l} onClick={() => setLang(l)}
          style={{
            padding: '5px 11px', borderRadius: 999, fontSize: 12, fontWeight: 600, letterSpacing: '0.06em',
            textTransform: 'uppercase', cursor: 'pointer', border: 'none',
            background: lang === l ? 'var(--night)' : 'transparent',
            color: lang === l ? 'var(--cream)' : 'var(--ink)'
          }}>{label}</button>
      ))}
    </div>
  );
}

function useRoute() {
  const [route, setRoute] = useState(() => window.location.hash.slice(1) || '/');
  useEffect(() => {
    const onHash = () => { setRoute(window.location.hash.slice(1) || '/'); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return route;
}

function navigate(path) {
  window.location.hash = path;
}

function BrandMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="13" fill="#0f1e3a"/>
      <path d="M18.5 16.5a6 6 0 0 1-8-8 6 6 0 1 0 8 8z" fill="#c9b89a"/>
    </svg>
  );
}

function Nav({ route }) {
  const t = useT();
  return (
    <nav className="nav">
      <div className="container nav-inner">
        <div className="brand" onClick={() => navigate('/')}>
          <BrandMark />
          <span>Sleep Ea<span className="brand-z">zzz</span>y</span>
        </div>
        <div className="nav-links">
          <div className={"nav-link" + (route === '/' ? ' active' : '')} onClick={() => navigate('/')}>{t('home')}</div>
          <div className={"nav-link" + (route.startsWith('/module') ? ' active' : '')} onClick={() => navigate('/modules')}>{t('modules')}</div>
          <div className={"nav-link" + (route === '/tools' ? ' active' : '')} onClick={() => navigate('/tools')}>{t('tools')}</div>
          <div className={"nav-link" + (route === '/library' ? ' active' : '')} onClick={() => navigate('/library')}>{t('library')}</div>
          <div className={"nav-link" + (route === '/about' ? ' active' : '')} onClick={() => navigate('/about')}>{t('about')}</div>
          <LangToggle/>
        </div>
      </div>
    </nav>
  );
}

function HostCard({ quote }) {
  const t = useT();
  return (
    <div className="host-card">
      <div className="host-stars" aria-hidden="true">
        <svg width="100%" height="100%" preserveAspectRatio="none">
          <circle cx="20%" cy="30%" r="1" fill="#c9b89a" opacity="0.5"/>
          <circle cx="80%" cy="20%" r="1.5" fill="#c9b89a" opacity="0.7"/>
          <circle cx="60%" cy="70%" r="1" fill="#fff" opacity="0.4"/>
          <circle cx="30%" cy="80%" r="1" fill="#c9b89a" opacity="0.5"/>
          <circle cx="90%" cy="55%" r="1" fill="#fff" opacity="0.3"/>
        </svg>
      </div>
      <img src="assets/wendy.png" alt="Wendy, your CBT-I guide" className="host-photo"/>
      <div className="host-card-name">Wendy</div>
      <div className="host-card-role">{t('host_role')}</div>
      <div className="host-card-quote">{quote || t('host_quote_default')}</div>
    </div>
  );
}

function VideoPlayer({ title, time }) {
  const t = useT();
  return (
    <div className="video-card">
      <div className="video-ph-text">{t('video_placeholder')}</div>
      <div className="video-play" title={t('video_play')}><span style={{marginLeft: 4}}>▶</span></div>
      <div className="video-meta">
        <div className="video-title">{title}</div>
        <div className="video-time">{time}</div>
      </div>
    </div>
  );
}

function LessonBlock({ title, summary, full, defaultOpen }) {
  const t = useT();
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className="lesson-block">
      {title && <h4>{title}</h4>}
      {summary}
      {full && (
        <>
          <div className="expand-toggle" onClick={() => setOpen(!open)}>
            {open ? t('lesson_hide') : t('lesson_show')}
          </div>
          {open && <div className="expand-content">{full}</div>}
        </>
      )}
    </div>
  );
}

function Callout({ label, children }) {
  return (
    <div className="callout">
      {label && <div className="callout-label">{label}</div>}
      {typeof children === 'string' ? <p>{children}</p> : children}
    </div>
  );
}

function PullQuote({ children }) {
  return <div className="pull-quote">“{children}”</div>;
}

function ModuleHero({ mod }) {
  const t = useT();
  const mods = useModules();
  const label = mod.bonus ? t('bonus_label') : t('module_label');
  return (
    <header className="mod-hero">
      <div className="container">
        <div className="mod-eyebrow">{label} {mod.num} · {mod.duration}</div>
        <h1>{mod.title}</h1>
        <p className="mod-hero-sub">{mod.subtitle}</p>
        <div className="mod-progress-bar">
          {mods.filter(m => !m.bonus).map(m => (
            <div key={m.id} className={m.id < mod.id ? 'done' : (m.id === mod.id ? 'active' : '')}/>
          ))}
        </div>
      </div>
    </header>
  );
}

function ModuleNav({ current }) {
  const t = useT();
  const mods = useModules();
  const idx = mods.findIndex(m => m.id === current);
  const prev = idx > 0 ? mods[idx - 1] : null;
  const next = idx < mods.length - 1 ? mods[idx + 1] : null;
  return (
    <div className="bottom-nav">
      {prev ? (
        <div className="bn-btn" onClick={() => navigate('/module/' + prev.slug)}>
          <div className="bn-label">← {t('prev_label')} {prev.num}</div>
          <div className="bn-title">{prev.title}</div>
        </div>
      ) : <div/>}
      {next ? (
        <div className="bn-btn next" onClick={() => navigate('/module/' + next.slug)}>
          <div className="bn-label">{t('next_label')} {next.num} →</div>
          <div className="bn-title">{next.title}</div>
        </div>
      ) : (
        <div className="bn-btn next" onClick={() => navigate('/')}>
          <div className="bn-label">{t('done_label')} →</div>
          <div className="bn-title">{t('done_back')}</div>
        </div>
      )}
    </div>
  );
}

function MarkComplete({ moduleId }) {
  const t = useT();
  const [progress, setProgress] = useStored('progress', {});
  const done = !!progress[moduleId];
  const toggle = () => setProgress({ ...progress, [moduleId]: !done });
  return (
    <div className="widget" style={{textAlign: 'center', background: done ? 'var(--cream-2)' : 'white'}}>
      <h3 style={{fontSize: 22, marginBottom: 8}}>{done ? t('module_done') : t('finished_q')}</h3>
      <p style={{color: 'var(--muted)', marginBottom: 20}}>{done ? t('module_done_sub') : t('finished_sub')}</p>
      <button className={"btn " + (done ? "btn-ghost" : "btn-primary")} onClick={toggle}>
        {done ? t('mark_uncomplete') : t('mark_complete')}
      </button>
    </div>
  );
}

function PrintBtn() {
  const t = useT();
  return <button className="print-btn" onClick={() => window.print()}>{t('routine_print')}</button>;
}

Object.assign(window, {
  useState, useEffect, useRef, useMemo,
  useStored, storage,
  useRoute, navigate,
  Nav, BrandMark, LangProvider, LangToggle, useLang, useT, useModules, useModContent,
  HostCard, VideoPlayer, LessonBlock, Callout, PullQuote,
  ModuleHero, ModuleNav, MarkComplete, PrintBtn
});
