// Top-level pages and app shell

function Home() {
  const t = useT();
  const mods = useModules();
  const [progress] = useStored('progress', {});
  const core = mods.filter(m => !m.bonus);
  const bonus = mods.filter(m => m.bonus);

  const completedCount = Object.values(progress).filter(Boolean).length;
  const nextMod = mods.find(m => !progress[m.id]) || mods[0];

  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div>
              <div className="eyebrow">{t('eyebrow_program')}</div>
              <h1>{t('hero_title_a')}<em>{t('hero_title_em')}</em>{t('hero_title_b')}<br/>{t('hero_title_c')}</h1>
              <p className="hero-sub">{t('hero_sub')}</p>
              <div className="hero-cta">
                <button className="btn btn-primary" onClick={() => navigate('/module/' + nextMod.slug)}>
                  {completedCount > 0 ? `${t('hero_continue')} · ${t('module_label')} ${nextMod.num}` : t('hero_start')}
                </button>
                <button className="btn btn-ghost" onClick={() => navigate('/about')}>{t('how_it_works')}</button>
              </div>
            </div>
            <HostCard/>
          </div>

          <div className="stats">
            <div><div className="stat-num">7</div><div className="stat-label">{t('stat_modules')}</div></div>
            <div><div className="stat-num">2–4 wk</div><div className="stat-label">{t('stat_results')}</div></div>
            <div><div className="stat-num">{completedCount}/{mods.length}</div><div className="stat-label">{t('stat_progress')}</div></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">{t('section_program_eyebrow')}</div>
              <h2>{t('section_program_title_a')}<br/>{t('section_program_title_b')}</h2>
              <p>{t('section_program_sub')}</p>
            </div>
            <div style={{display: 'flex', gap: 12, alignItems: 'center'}}>
              <button className="btn btn-ghost" onClick={() => navigate('/tools')}>{t('skip_to_tools')}</button>
            </div>
          </div>

          <div className="modules">
            {core.map(m => {
              const status = progress[m.id] ? 'done' : '';
              return (
                <div key={m.id} className="module-card" onClick={() => navigate('/module/' + m.slug)}>
                  <div className="module-card-head">
                    <div className="module-num">{t('module_label')} {m.num}</div>
                    <div className="module-time">{m.duration}</div>
                  </div>
                  <h3>{m.title}</h3>
                  <p className="module-card-desc">{m.subtitle}</p>
                  <div className="module-card-foot">
                    <div className="module-tags">
                      {m.tags.map((tg, i) => <span key={i} className="tag">{tg}</span>)}
                    </div>
                    <div className="module-status">
                      <span className={"status-dot " + status}/>
                      {status === 'done' ? t('complete') : t('not_started')}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section" style={{paddingTop: 0}}>
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">{t('section_bonus_eyebrow')}</div>
              <h2>{t('section_bonus_title')}</h2>
              <p>{t('section_bonus_sub')}</p>
            </div>
          </div>
          <div className="modules">
            {bonus.map(m => (
              <div key={m.id} className="module-card" onClick={() => navigate('/module/' + m.slug)}>
                <div className="module-card-head">
                  <div className="module-num">{t('bonus_label')} · {m.num}</div>
                  <div className="module-time">{m.duration}</div>
                </div>
                <h3>{m.title}</h3>
                <p className="module-card-desc">{m.subtitle}</p>
                <div className="module-card-foot">
                  <div className="module-tags">
                    {m.tags.map((tg, i) => <span key={i} className={"tag" + (tg === 'Bonus' ? ' bonus' : '')}>{tg}</span>)}
                  </div>
                  <div className="module-status">
                    <span className={"status-dot " + (progress[m.id] ? 'done' : '')}/>
                    {progress[m.id] ? t('complete') : t('optional')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{background: 'var(--cream-2)', borderTop: '1px solid var(--line-2)', borderBottom: '1px solid var(--line-2)'}}>
        <div className="container container-narrow" style={{textAlign: 'center'}}>
          <div className="eyebrow" style={{justifyContent: 'center'}}>{t('cases_eyebrow')}</div>
          <h2 style={{marginTop: 8}}>{t('cases_title')}</h2>
          <p style={{maxWidth: 620, margin: '20px auto 0', color: 'var(--muted)'}}>{t('cases_body')}</p>
          <button className="btn btn-primary" style={{marginTop: 28}} onClick={() => navigate('/module/intro')}>{t('cases_cta')}</button>
        </div>
      </section>
    </>
  );
}

function ToolsPage() {
  const t = useT();
  const { lang } = useLang();
  const L = (en, es, zh, zhs) => ({en, es, 'zh-Hant': zh, 'zh-Hans': zhs}[lang] || en);
  const tools = [
    { title: t('quiz_label') || 'Sleep Quiz', desc: 'Test what you already know about sleep.', mod: 'intro' },
    { title: t('reframe_title'), desc: t('reframe_sub'), mod: 'cognitive', tool: 'reframe' },
    {
      title: L('Deep Breathing Relaxation', 'Relajación con Respiración Profunda', '深呼吸放鬆法', '深呼吸放松法'),
      desc: t('breath_sub'), mod: 'relaxation', tool: 'breathing'
    },
    {
      title: L('Progressive Muscle Relaxation', 'Relajación Muscular Progresiva', '漸進式肌肉放鬆', '渐进式肌肉放松'),
      desc: t('pmr_step_of'), mod: 'relaxation', tool: 'pmr'
    },
    {
      title: L('Build your Sleep Compression Therapy Schedule', 'Crea tu horario de Terapia de Compresión del Sueño', '建立你的睡眠壓縮療法時程', '建立你的睡眠压缩疗法时间表'),
      desc: t('calc_sub'), mod: 'compression', tool: 'calc'
    },
    { title: t('routine_title'), desc: t('routine_sub'), mod: 'sleep-plan' },
  ];
  return (
    <>
      <header className="mod-hero">
        <div className="container">
          <div className="mod-eyebrow">{t('tools_eyebrow')}</div>
          <h1>{t('tools_title')}</h1>
          <p className="mod-hero-sub">{t('tools_sub')}</p>
        </div>
      </header>
      <div className="container mod-body">
        <div className="modules">
          {tools.map((tool, i) => (
            <div key={i} className="module-card" onClick={() => navigate('/module/' + tool.mod + (tool.tool ? '?tool=' + tool.tool : ''))}>
              <div className="module-card-head">
                <div className="module-num">{t('tool_label')} {String(i + 1).padStart(2, '0')}</div>
              </div>
              <h3>{tool.title}</h3>
              <p className="module-card-desc">{tool.desc}</p>
              <div className="module-card-foot">
                <div className="module-tags"><span className="tag">{t('interactive')}</span></div>
                <div className="module-status">{t('tool_open')}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function LibraryPage() {
  const t = useT();
  const { lang } = useLang();
  const L = (en, es, zh, zhs) => ({en, es, 'zh-Hant': zh, 'zh-Hans': zhs}[lang] || en);

  const sections = [
    {
      key: 'white',
      eyebrow: L('Section 01 · Long-form', 'Sección 01 · Larga duración', '第一節 · 長時段', '第一节 · 长时段'),
      title: L('White Noise & Nature Sounds', 'Ruido Blanco y Sonidos de la Naturaleza', '白噪音與自然音', '白噪音与自然音'),
      sub: L(
        'Over an hour each. Loop one all night as a steady bedtime cue — your brain will start to link the sound with sleep.',
        'Cada uno dura más de una hora. Ponlos en bucle toda la noche como una señal de dormir constante — tu cerebro empezará a asociar el sonido con el sueño.',
        '每段超過一小時。整夜循環播放，作為穩定的就寢提示——你的大腦會開始把這聲音和睡眠連結起來。',
        '每段超过一小时。整夜循环播放，作为稳定的就寝提示——你的大脑会开始把这声音和睡眠连结起来。'
      ),
      tag: L('60+ min · Loop all night', '60+ min · Reproducir toda la noche', '60+ 分鐘 · 整夜循環', '60+ 分钟 · 整夜循环'),
      tracks: [
        { id: 'V303hdgB0MI', title: L('Whispering Woodland Brook', 'Arroyo Susurrante del Bosque', '林間低語溪流', '林间低语溪流'), sub: L('Stream over mossy stones', 'Arroyo sobre piedras musgosas', '流過青苔石的溪水', '流过青苔石的溪水') },
        { id: 'WT0pSLD63W0', title: L('Santorini Midnight Waves', 'Olas de Medianoche en Santorini', '聖托里尼午夜浪聲', '圣托里尼午夜浪声'), sub: L('Mediterranean shoreline', 'Orilla mediterránea', '地中海海岸線', '地中海海岸线') },
        { id: 'H3upsuC_FcU', title: L('Himalayan Rainfall', 'Lluvia del Himalaya', '喜馬拉雅雨聲', '喜马拉雅雨声'), sub: L('Steady mountain rain', 'Lluvia constante de montaña', '綿延的山間雨聲', '绵延的山间雨声') },
        { id: 'k6mmuOrl3eY', title: L('Fireplace Tranquility', 'Tranquilidad de Chimenea', '寧靜壁爐', '宁静壁炉'), sub: L('Crackling hearth', 'Hogar crepitante', '柴火爆裂的壁爐', '柴火爆裂的壁炉') },
      ],
    },
    {
      key: 'relax',
      eyebrow: L('Section 02 · 10-minute', 'Sección 02 · 10 minutos', '第二節 · 十分鐘', '第二节 · 十分钟'),
      title: L('Relaxing Music for Wind-Down', 'Música Relajante para Antes de Dormir', '放鬆音樂', '放松音乐'),
      sub: L(
        'Short tracks to play while getting into bed, doing 4-7-8 breathing, or running through Progressive Muscle Relaxation.',
        'Pistas cortas para escuchar al meterte a la cama, durante la respiración 4-7-8 o la Relajación Muscular Progresiva.',
        '上床、做 4-7-8 深呼吸或漸進式肌肉放鬆時播放的短曲。',
        '上床、做 4-7-8 深呼吸或渐进式肌肉放松时播放的短曲。'
      ),
      tag: L('~10 min · For breathing & PMR', '~10 min · Para respiración y RMP', '約 10 分鐘 · 配合呼吸與 PMR', '约 10 分钟 · 配合呼吸与 PMR'),
      tracks: [
        { id: 'iDMhd1VupaA', title: L('REM Ember Delta Waves', 'Ondas Delta REM Ember', 'REM Ember 德爾塔波', 'REM Ember 德尔塔波'), sub: L('by Ookean', 'por Ookean', '作者：Ookean', '作者：Ookean') },
        { id: 'c8-lX-K0eVs', title: L('Into Cryosleep', 'Hacia el Criosueño', '進入冷凍沉睡', '进入冷冻沉睡'), sub: L('by Joseph Beg', 'por Joseph Beg', '作者：Joseph Beg', '作者：Joseph Beg') },
        { id: 'rQws7fTVmPI', title: L('Autumn Fields', 'Campos de Otoño', '秋日原野', '秋日原野'), sub: L('by Chaxti', 'por Chaxti', '作者：Chaxti', '作者：Chaxti') },
      ],
    },
    {
      key: 'guided',
      eyebrow: L('Section 03 · Guided', 'Sección 03 · Guiada', '第三節 · 引導冥想', '第三节 · 引导冥想'),
      title: L('Guided Sleep Meditation', 'Meditación Guiada para Dormir', '引導式睡眠冥想', '引导式睡眠冥想'),
      sub: L(
        'A full guided session combining deep breathing and progressive muscle relaxation — press play, lie down, and follow the voice.',
        'Una sesión guiada completa que combina respiración profunda y relajación muscular progresiva — dale play, acuéstate y sigue la voz.',
        '結合深呼吸與漸進式肌肉放鬆的完整引導課程——按下播放、躺下，跟著聲音走。',
        '结合深呼吸与渐进式肌肉放松的完整引导课程——按下播放、躺下，跟着声音走。'
      ),
      tag: L('Voice-led · Breathing + PMR', 'Con voz guía · Respiración + RMP', '人聲引導 · 呼吸 + PMR', '人声引导 · 呼吸 + PMR'),
      tracks: [
        { id: 'j4ZtuyeLrTk', title: L('Soft Landing: A Sleep Meditation', 'Aterrizaje Suave: Una Meditación para Dormir', '輕柔降落：睡眠冥想', '轻柔降落：睡眠冥想'), sub: L('Deep breathing & PMR combined', 'Respiración profunda y RMP combinadas', '深呼吸與 PMR 結合', '深呼吸与 PMR 结合') },
      ],
    },
  ];

  const labels = {
    play: L('Play on YouTube', 'Reproducir en YouTube', '在 YouTube 播放', '在 YouTube 播放'),
    preview: L('Tap to play', 'Toca para reproducir', '點擊播放', '点击播放'),
    tip: L('Tap thumbnail to play', 'Toca la miniatura para reproducir', '點縮圖播放', '点缩略图播放'),
    note: L(
      'How to use this library',
      'Cómo usar esta biblioteca',
      '如何使用本資料庫',
      '如何使用本资料库'
    ),
    noteBody: L(
      'Tap any thumbnail to play the audio inline. Pair Section 01 with bedtime; Section 02 with the breathing or PMR tools; Section 03 as a stand-alone wind-down.',
      'Toca cualquier miniatura para reproducir el audio aquí mismo. Empareja la Sección 01 con la hora de dormir; la Sección 02 con las herramientas de respiración o RMP; la Sección 03 como una sesión independiente.',
      '點任一縮圖即可在頁面內播放音訊。第一節搭配就寢；第二節配合呼吸或 PMR 工具；第三節可作為獨立的睡前放鬆。',
      '点任一缩略图即可在页面内播放音频。第一节搭配就寝；第二节配合呼吸或 PMR 工具；第三节可作为独立的睡前放松。'
    ),
  };

  const [open, setOpen] = React.useState(null);

  return (
    <>
      <header className="mod-hero">
        <div className="container">
          <div className="mod-eyebrow">{t('library_eyebrow')}</div>
          <h1>{t('library_title')}</h1>
          <p className="mod-hero-sub">{t('library_sub')}</p>
        </div>
      </header>
      <div className="container mod-body">
        <div className="callout" style={{marginBottom: 32}}>
          <div className="callout-label">{labels.note}</div>
          <p>{labels.noteBody}</p>
        </div>
        {sections.map((sec) => (
          <section key={sec.key} style={{marginBottom: 56}}>
            <div style={{display:'flex', alignItems:'baseline', justifyContent:'space-between', gap:16, flexWrap:'wrap', marginBottom: 6}}>
              <div className="module-num" style={{color:'var(--sand)'}}>{sec.eyebrow}</div>
              <div style={{fontSize:12, color:'var(--muted)', letterSpacing:'0.06em'}}>{sec.tag}</div>
            </div>
            <h2 style={{marginTop: 4}}>{sec.title}</h2>
            <p style={{color:'var(--muted)', maxWidth: 720, marginTop: 10, marginBottom: 22}}>{sec.sub}</p>
            <div className="modules">
              {sec.tracks.map((tr) => {
                const isOpen = open === tr.id;
                return (
                  <div key={tr.id} className="module-card" style={{cursor:'default'}}>
                    <div className="module-card-head">
                      <div className="module-num">▶ {isOpen ? labels.play : labels.preview}</div>
                    </div>
                    <h3 style={{fontSize: 22, marginTop: 4}}>{tr.title}</h3>
                    <p className="module-card-desc">{tr.sub}</p>

                    <div style={{
                      borderRadius: 12, overflow: 'hidden', marginTop: 14,
                      background: 'var(--night)', aspectRatio: '16/9',
                      position: 'relative'
                    }}>
                      {isOpen ? (
                        <iframe
                          src={`https://www.youtube-nocookie.com/embed/${tr.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                          title={tr.title}
                          referrerPolicy="strict-origin-when-cross-origin"
                          style={{width:'100%', height:'100%', border:0, position:'absolute', inset:0}}
                          allow="autoplay; encrypted-media; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      ) : (
                        <button
                          onClick={() => setOpen(tr.id)}
                          aria-label={`${labels.preview}: ${tr.title}`}
                          style={{
                            position:'absolute', inset:0, width:'100%', height:'100%',
                            border: 0, cursor: 'pointer', color: 'var(--cream)',
                            backgroundImage: `linear-gradient(135deg, rgba(15,30,58,0.45), rgba(45,74,115,0.45)), url(https://i.ytimg.com/vi/${tr.id}/hqdefault.jpg)`,
                            backgroundSize: 'cover', backgroundPosition: 'center',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                          }}
                        >
                          <span style={{
                            width: 64, height: 64, borderRadius: '50%',
                            background: 'var(--sand)', color: 'var(--night)',
                            display:'flex', alignItems:'center', justifyContent:'center',
                            fontSize: 22, paddingLeft: 4,
                            boxShadow: '0 6px 24px rgba(15,30,58,0.5)'
                          }}>▶</span>
                        </button>
                      )}
                    </div>

                    <div className="module-card-foot" style={{marginTop: 14, justifyContent:'flex-start'}}>
                      <span className="tag" style={{background:'transparent', color:'var(--muted)', padding:'4px 0'}}>{labels.tip}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}

function AboutPage() {
  const t = useT();
  return (
    <>
      <header className="mod-hero">
        <div className="container">
          <div className="mod-eyebrow">{t('about_eyebrow')}</div>
          <h1>{t('about_title')}</h1>
          <p className="mod-hero-sub">{t('about_sub')}</p>
        </div>
      </header>
      <div className="container container-narrow mod-body">
        <HostCard/>
        <div className="lesson-block" style={{marginTop: 24}}>
          <h4>{t('about_what_h')}</h4>
          <p>{t('about_what_p')}</p>
        </div>
        <div className="lesson-block">
          <h4>{t('about_who_h')}</h4>
          <p>{t('about_who_p')}</p>
        </div>
        <div className="lesson-block">
          <h4>{t('about_isnt_h')}</h4>
          <p>{t('about_isnt_p')}</p>
        </div>
        <div className="disclaimer-box" style={{marginTop: 24}}>
          {t('disclaimer')}
        </div>
      </div>
    </>
  );
}

function ModulesIndex() {
  const t = useT();
  const mods = useModules();
  const [progress] = useStored('progress', {});
  return (
    <>
      <header className="mod-hero">
        <div className="container">
          <div className="mod-eyebrow">{t('all_eyebrow')}</div>
          <h1>{t('all_title')}</h1>
          <p className="mod-hero-sub">{t('all_sub')}</p>
        </div>
      </header>
      <div className="container mod-body">
        <div className="modules">
          {mods.map(m => (
            <div key={m.id} className="module-card" onClick={() => navigate('/module/' + m.slug)}>
              <div className="module-card-head">
                <div className="module-num">{m.bonus ? t('bonus_label') + ' · ' : t('module_label') + ' '}{m.num}</div>
                <div className="module-time">{m.duration}</div>
              </div>
              <h3>{m.title}</h3>
              <p className="module-card-desc">{m.subtitle}</p>
              <div className="module-card-foot">
                <div className="module-tags">{m.tags.map((tg, i) => <span key={i} className={"tag" + (tg === 'Bonus' ? ' bonus' : '')}>{tg}</span>)}</div>
                <div className="module-status">
                  <span className={"status-dot " + (progress[m.id] ? 'done' : '')}/>
                  {progress[m.id] ? t('complete') : t('open_label')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function Footer() {
  const t = useT();
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="brand" style={{color: 'var(--cream)'}}>
              <BrandMark/>
              <span style={{color: 'var(--cream)'}}>Sleep Ea<span style={{color: 'var(--sand)'}}>zzz</span>y</span>
            </div>
            <p>{t('footer_tag')}</p>
          </div>
          <div>
            <h4>{t('footer_program')}</h4>
            <a onClick={() => navigate('/')}>{t('home')}</a>
            <a onClick={() => navigate('/modules')}>{t('modules')}</a>
            <a onClick={() => navigate('/tools')}>{t('tools')}</a>
            <a onClick={() => navigate('/library')}>{t('library')}</a>
          </div>
          <div>
            <h4>{t('footer_resources')}</h4>
            <a onClick={() => navigate('/about')}>{t('footer_about')}</a>
            <a onClick={() => navigate('/about')}>{t('footer_disclaimer')}</a>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© {new Date().getFullYear()} OWND LLC. {t('footer_copy')}</div>
          <div>{t('footer_consult')}</div>
        </div>
      </div>
    </footer>
  );
}

function NotFound() {
  return <div className="container mod-body" style={{textAlign:'center', padding:'80px 20px'}}><h2>404</h2><p>Page not found.</p><button className="btn btn-primary" onClick={() => navigate('/')}>Home</button></div>;
}

function App() {
  const route = useRoute();
  let page;
  if (route === '/' || route === '') page = <Home/>;
  else if (route === '/modules') page = <ModulesIndex/>;
  else if (route === '/tools') page = <ToolsPage/>;
  else if (route === '/library') page = <LibraryPage/>;
  else if (route === '/about') page = <AboutPage/>;
  else if (route.startsWith('/module/')) {
    const rest = route.slice('/module/'.length);
    const qIdx = rest.indexOf('?');
    const slug = qIdx >= 0 ? rest.slice(0, qIdx) : rest;
    const query = qIdx >= 0 ? rest.slice(qIdx + 1) : '';
    page = <ModulePage slug={slug} query={query}/>;
  }
  else page = <NotFound/>;

  return (
    <>
      <Nav route={route}/>
      {page}
      <Footer/>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <LangProvider><App/></LangProvider>
);
