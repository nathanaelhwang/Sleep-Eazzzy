// Module page renderers — fully i18n'd via useT + useModContent + useModules.

function useMod(slug) {
  const mods = useModules();
  return mods.find(m => m.slug === slug);
}

function ModuleIntro({ mod }) {
  const t = useT();
  const c = useModContent(1);
  const { lang } = useLang();
  const isZh = lang === 'zh-Hant' || lang === 'zh-Hans';
  const robertSrc = isZh ? 'assets/robert-zh.jpg' : 'assets/robert.jpg';
  const sarahSrc = isZh ? 'assets/sarah-zh.jpg' : 'assets/sarah.jpg';
  // Fall back to English welcome content if the active language hasn't translated it yet.
  const cEn = window.SE_I18N.MODULE_CONTENT.en[1];
  const w = {
    welcome_eyebrow: c.welcome_eyebrow || cEn.welcome_eyebrow,
    welcome_name: c.welcome_name || cEn.welcome_name,
    welcome_role: c.welcome_role || cEn.welcome_role,
    welcome_text: c.welcome_text || cEn.welcome_text,
    lede_questions: c.lede_questions || cEn.lede_questions,
    lede_body: c.lede_body || cEn.lede_body,
    metaphor_eyebrow: c.metaphor_eyebrow || cEn.metaphor_eyebrow,
    metaphor_text: c.metaphor_text || cEn.metaphor_text,
    overview_title: c.overview_title || cEn.overview_title,
    overview_sub: c.overview_sub || cEn.overview_sub,
    overview_items: c.overview_items || cEn.overview_items,
    disclaimer_label: c.disclaimer_label || cEn.disclaimer_label,
    disclaimer_body: c.disclaimer_body || cEn.disclaimer_body,
  };
  return (
    <>
      <ModuleHero mod={mod}/>
      <div className="container container-narrow mod-body">
        <VideoPlayer title={`${t('module_label')} ${mod.num}: ${mod.title}`} time={mod.duration}/>

        {/* Warm welcome from Wendy */}
        <div className="welcome-card">
          <img src="assets/wendy.png" alt="Wendy" className="welcome-avatar"/>
          <div className="welcome-body">
            <div className="welcome-eyebrow">{w.welcome_eyebrow}</div>
            <div className="welcome-name">{w.welcome_name}</div>
            <div className="welcome-role">{w.welcome_role}</div>
            <p className="welcome-text">{w.welcome_text}</p>
          </div>
        </div>

        {/* Inviting prose lede */}
        <div className="intro-prose">
          <p className="intro-lede">{w.lede_questions}</p>
          <p className="intro-dropcap">{w.lede_body}</p>
        </div>

        {/* Train metaphor highlight */}
        <div className="metaphor-block">
          <div className="metaphor-eyebrow">{w.metaphor_eyebrow}</div>
          <p className="metaphor-text">{w.metaphor_text}</p>
        </div>

        {/* Arousal threshold visualization */}
        <ArousalThreshold/>

        {/* Program Overview */}
        <div className="program-overview">
          <div className="overview-title">{w.overview_title}</div>
          <div className="overview-sub">{w.overview_sub}</div>
          <div className="overview-grid">
            {w.overview_items.map((item, i) => (
              <div key={i} className="overview-item">
                <span className="overview-item-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="overview-item-text">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Gentle disclaimer */}
        <div className="intro-disclaimer">
          <div className="intro-disclaimer-icon">i</div>
          <div className="intro-disclaimer-content">
            <h4>{w.disclaimer_label}</h4>
            <p>{w.disclaimer_body}</p>
          </div>
        </div>

        <SleepQuiz/>

        <div className="lesson-block">
          <h4>{c.cases_h}</h4>
          <p>{c.cases_p}</p>
          <div className="case-grid" style={{marginTop: 16}}>
            <div className="case-card">
              <div className="case-head">
                <img src={robertSrc} alt="Robert" className="case-photo"/>
                <div>
                  <div className="case-name">{c.robert_h}</div>
                  <div className="case-age">{c.robert_age}</div>
                </div>
              </div>
              <p style={{fontSize: 14}}>{c.robert_p}</p>
              <div className="case-stat"><span>{c.robert_before}</span><span>{c.robert_hrs}</span></div>
              <div className="case-bar"><div className="case-bar-fill" style={{width: '38%'}}/></div>
              <div className="case-after">{c.robert_after} <strong>{c.robert_after_b}</strong></div>
            </div>
            <div className="case-card">
              <div className="case-head">
                <img src={sarahSrc} alt="Sarah" className="case-photo"/>
                <div>
                  <div className="case-name">{c.sarah_h}</div>
                  <div className="case-age">{c.sarah_age}</div>
                </div>
              </div>
              <p style={{fontSize: 14}}>{c.sarah_p}</p>
              <div className="case-stat"><span>{c.sarah_before}</span><span>{c.sarah_hrs}</span></div>
              <div className="case-bar"><div className="case-bar-fill" style={{width: '25%'}}/></div>
              <div className="case-after">{c.sarah_after} <strong>{c.sarah_after_b}</strong></div>
            </div>
          </div>
        </div>

        <Callout label={c.next_label}>{c.next_p}</Callout>

        <MarkComplete moduleId={mod.id}/>
        <ModuleNav current={mod.id}/>
      </div>
    </>
  );
}

function ModuleCognitive({ mod }) {
  const t = useT();
  const c = useModContent(2);
  return (
    <>
      <ModuleHero mod={mod}/>
      <div className="container container-narrow mod-body">
        <VideoPlayer title={`${t('module_label')} ${mod.num}: ${mod.title}`} time={mod.duration}/>
        <HostCard quote={c.hostQuote}/>

        <div className="lesson-block" style={{marginTop: 24}}>
          <h4>{c.h1}</h4>
          <p>{c.p1a}</p>
          <p>{c.p1b}</p>
        </div>

        <div className="lesson-block">
          <h4>{c.h2}</h4>
          <ul>
            <li>{c.li1}</li>
            <li>{c.li2}</li>
          </ul>
          <p>{c.p2}</p>
        </div>

        <PullQuote>{c.pull}</PullQuote>

        <div className="lesson-block">
          <h4>{c.h3}</h4>
          <p>{c.p3}</p>
          <ul style={{marginTop: 8}}>
            {(c.thoughts || []).map((th, i) => <li key={i}>{th}</li>)}
          </ul>
          <p style={{marginTop: 14}}>{c.p3b}</p>
        </div>

        <div id="tool-reframe" style={{scrollMarginTop: 80}}>
          <ReframeJournal/>
        </div>

        <Callout label={c.assignment_label}>{c.assignment}</Callout>

        <MarkComplete moduleId={mod.id}/>
        <ModuleNav current={mod.id}/>
      </div>
    </>
  );
}

function ModuleHygiene({ mod }) {
  const t = useT();
  const c = useModContent(3);
  const { lang } = useLang();
  const hyg = window.SE_I18N.HYGIENE_I18N[lang] || window.SE_I18N.HYGIENE_I18N.en;
  const dos = hyg.dos || window.SE_DATA.HYGIENE_DOS;
  const donts = hyg.donts || window.SE_DATA.HYGIENE_DONTS;
  return (
    <>
      <ModuleHero mod={mod}/>
      <div className="container container-narrow mod-body">
        <VideoPlayer title={`${t('module_label')} ${mod.num}: ${mod.title}`} time={mod.duration}/>
        <HostCard quote={c.hostQuote}/>

        <div className="do-dont" style={{marginTop: 24}}>
          <div className="do-col">
            <h4>{hyg.do_label}</h4>
            <ul>
              {dos.map((d, i) => (
                <li key={i}><span className="ic">✓</span><span>{d}</span></li>
              ))}
            </ul>
          </div>
          <div className="dont-col">
            <h4>{hyg.dont_label}</h4>
            <ul>
              {donts.map((d, i) => (
                <li key={i}><span className="ic">✕</span><span>{d}</span></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lesson-block" style={{marginTop: 24}}>
          <h4>{c.blue_h}</h4>
          <p>{c.blue_p1}</p>
          <p>{c.blue_p2}</p>
          <p>{c.blue_p3}</p>
        </div>

        <PullQuote>{c.pull}</PullQuote>

        <Callout label={c.rule_label}>{c.rule}</Callout>

        <MarkComplete moduleId={mod.id}/>
        <ModuleNav current={mod.id}/>
      </div>
    </>
  );
}

function ModuleRelaxation({ mod }) {
  const t = useT();
  const c = useModContent(4);
  return (
    <>
      <ModuleHero mod={mod}/>
      <div className="container container-narrow mod-body">
        <VideoPlayer title={`${t('module_label')} ${mod.num}: ${mod.title}`} time={mod.duration}/>
        <HostCard quote={c.hostQuote}/>

        <div className="lesson-block" style={{marginTop: 24}}>
          <h4>{c.h1}</h4>
          <ol>
            {(c.tools || []).map((tool, i) => <li key={i}>{tool}</li>)}
          </ol>
        </div>

        <div id="tool-breathing" style={{scrollMarginTop: 80}}>
          <BreathingTimer/>
        </div>
        <p style={{margin:'12px 4px 0', fontSize: 14, color:'var(--muted)'}}>
          <a onClick={() => navigate('/library')} style={{color:'var(--denim)', textDecoration:'underline', cursor:'pointer', fontWeight: 600}}>
            {t('library_see')}
          </a>{' '}
          {t('library_breathing_hint')}
        </p>

        <div className="lesson-block">
          <h4>{c.pmr_h}</h4>
          <p>{c.pmr_p}</p>
        </div>

        <div id="tool-pmr" style={{scrollMarginTop: 80}}>
          <PMRWalkthrough/>
        </div>
        <p style={{margin:'12px 4px 0', fontSize: 14, color:'var(--muted)'}}>
          <a onClick={() => navigate('/library')} style={{color:'var(--denim)', textDecoration:'underline', cursor:'pointer', fontWeight: 600}}>
            {t('library_see')}
          </a>{' '}
          {t('library_pmr_hint')}
        </p>

        <div className="lesson-block">
          <h4>{c.gi_h}</h4>
          <p>{c.gi_p}</p>
          <p style={{marginTop: 10}}>
            <a onClick={() => navigate('/library')} style={{color:'var(--denim)', textDecoration:'underline', cursor:'pointer', fontWeight: 600}}>
              {t('library_see')}
            </a>{' '}
            <span style={{color:'var(--muted)'}}>
              {t('library_relaxation_hint')}
            </span>
          </p>
        </div>

        <div className="lesson-block">
          <h4>{c.jr_h}</h4>
          <p>{c.jr_p}</p>
        </div>

        <Callout label={c.tonight_label}>{c.tonight}</Callout>

        <MarkComplete moduleId={mod.id}/>
        <ModuleNav current={mod.id}/>
      </div>
    </>
  );
}

function ModuleStimulus({ mod }) {
  const t = useT();
  const c = useModContent(5);
  const STEPS = c.steps || [];
  return (
    <>
      <ModuleHero mod={mod}/>
      <div className="container container-narrow mod-body">
        <VideoPlayer title={`${t('module_label')} ${mod.num}: ${mod.title}`} time={mod.duration}/>
        <HostCard quote={c.hostQuote}/>

        <div className="lesson-block" style={{marginTop: 24}}>
          <h4>{c.why_h}</h4>
          <p>{c.why_p1}</p>
          <p>{c.why_p2}</p>
        </div>

        <PullQuote>{c.pull}</PullQuote>

        <h3 style={{marginTop: 36, marginBottom: 16}}>{c.rule_h}</h3>
        {STEPS.map((s, i) => (
          <div key={i} className="flow-step">
            <div className="flow-num">{i + 1}</div>
            <div>
              <h4>{s.t}</h4>
              <p>{s.b}</p>
            </div>
          </div>
        ))}

        <Callout label={c.feels_label}>{c.feels}</Callout>

        <MarkComplete moduleId={mod.id}/>
        <ModuleNav current={mod.id}/>
      </div>
    </>
  );
}

function ModuleCompression({ mod }) {
  const t = useT();
  const c = useModContent(6);
  return (
    <>
      <ModuleHero mod={mod}/>
      <div className="container container-narrow mod-body">
        <VideoPlayer title={`${t('module_label')} ${mod.num}: ${mod.title}`} time={mod.duration}/>
        <HostCard quote={c.hostQuote}/>

        <div className="lesson-block" style={{marginTop: 24}}>
          <h4>{c.h1}</h4>
          <p>{c.p1a}</p>
          <p>{c.p1b}</p>
        </div>

        <div className="lesson-block">
          <h4>{c.bob_h}</h4>
          <p>{c.bob_p}</p>
        </div>

        <div id="tool-calc" style={{scrollMarginTop: 80}}>
          <CompressionCalc/>
        </div>

        <div className="lesson-block">
          <h4>{c.steps_h}</h4>
          <ol>
            {(c.steps || []).map((s, i) => <li key={i}>{s}</li>)}
          </ol>
          <p>{c.steps_p}</p>
        </div>

        <Callout label={c.pair_label}>{c.pair}</Callout>

        <MarkComplete moduleId={mod.id}/>
        <ModuleNav current={mod.id}/>
      </div>
    </>
  );
}

function ModuleSleepPlan({ mod }) {
  const t = useT();
  const c = useModContent(7);
  return (
    <>
      <ModuleHero mod={mod}/>
      <div className="container container-narrow mod-body">
        <VideoPlayer title={`${t('module_label')} ${mod.num}: ${mod.title}`} time={mod.duration}/>
        <HostCard quote={c.hostQuote}/>

        <div className="lesson-block" style={{marginTop: 24}}>
          <h4>{c.h1}</h4>
          <p>{c.p1}</p>
          <ul style={{marginTop: 10}}>
            {(c.items || []).map((it, i) => <li key={i}>{it}</li>)}
          </ul>
        </div>

        <RoutineBuilder/>

        <div className="lesson-block">
          <h4>{c.h2}</h4>
          <p><strong>{c.p2a_b}</strong> {c.p2a}</p>
          <p><strong>{c.p2b_b}</strong> {c.p2b}</p>
        </div>

        <PullQuote>{c.pull}</PullQuote>

        <Callout label={c.next_label}>{c.next}</Callout>

        <MarkComplete moduleId={mod.id}/>
        <ModuleNav current={mod.id}/>
      </div>
    </>
  );
}

function ModuleBonus({ mod }) {
  const t = useT();
  const c = useModContent(mod.id);
  return (
    <>
      <ModuleHero mod={mod}/>
      <div className="container container-narrow mod-body">
        <HostCard quote={c.hostQuote}/>
        <div className="lesson-block" style={{marginTop: 24}}>
          <p style={{fontSize: 17}}>{c.summary}</p>
        </div>
        {mod.id === 9 && (
          <div className="lesson-block">
            <h4>{t('pos_examples_h')}</h4>
            <p>{t('pos_examples_p')}</p>
            <div className="pos-grid">
              <figure className="pos-fig">
                <img src="assets/sleep-supine.png" alt={t('pos_supine_cap')}/>
                <figcaption>{t('pos_supine_cap')}</figcaption>
              </figure>
              <figure className="pos-fig">
                <img src="assets/sleep-side.png" alt={t('pos_side_cap')}/>
                <figcaption>{t('pos_side_cap')}</figcaption>
              </figure>
            </div>
          </div>
        )}
        {(c.sections || []).map((s, i) => (
          <div key={i} className="lesson-block">
            <h4>{s.h}</h4>
            <p dangerouslySetInnerHTML={{__html: s.p}}/>
          </div>
        ))}
        <MarkComplete moduleId={mod.id}/>
        <ModuleNav current={mod.id}/>
      </div>
    </>
  );
}

function ModulePage({ slug, query }) {
  const mods = useModules();
  const mod = mods.find(m => m.slug === slug);
  useEffect(() => {
    if (!query) return;
    const params = new URLSearchParams(query);
    const tool = params.get('tool');
    if (!tool) return;
    // Wait for the tool DOM to mount, then scroll.
    const timer = setTimeout(() => {
      const el = document.getElementById('tool-' + tool);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 120);
    return () => clearTimeout(timer);
  }, [slug, query]);
  if (!mod) return <NotFound/>;
  if (mod.id === 1) return <ModuleIntro mod={mod}/>;
  if (mod.id === 2) return <ModuleCognitive mod={mod}/>;
  if (mod.id === 3) return <ModuleHygiene mod={mod}/>;
  if (mod.id === 4) return <ModuleRelaxation mod={mod}/>;
  if (mod.id === 5) return <ModuleStimulus mod={mod}/>;
  if (mod.id === 6) return <ModuleCompression mod={mod}/>;
  if (mod.id === 7) return <ModuleSleepPlan mod={mod}/>;
  return <ModuleBonus mod={mod}/>;
}

function NotFound() {
  const t = useT();
  return (
    <div className="container" style={{padding: '120px 0', textAlign: 'center'}}>
      <h1>—</h1>
      <p style={{color: 'var(--muted)', margin: '16px 0 24px'}}>{t('done_back')}</p>
      <button className="btn btn-primary" onClick={() => navigate('/')}>← {t('done_back')}</button>
    </div>
  );
}

Object.assign(window, { ModulePage, NotFound });
