'use client';

import { useState } from 'react';
import { useL, useT } from './LangProvider';

type Track = { id: string; title: string; sub: string };
type Section = { key: string; eyebrow: string; title: string; sub: string; tag: string; tracks: Track[] };

export function LibraryPage() {
  const t = useT();
  const L = useL();
  const [open, setOpen] = useState<string | null>(null);

  const sections: Section[] = [
    {
      key: 'white',
      eyebrow: L('Section 01 · Long-form', 'Sección 01 · Larga duración', '第一節 · 長時段', '第一节 · 长时段', '섹션 01 · 장시간', 'بخش ۰۱ · بلندمدت', 'Phần 01 · Dài hơi', 'खंड 01 · लंबे ट्रैक'),
      title: L('White Noise & Nature Sounds', 'Ruido Blanco y Sonidos de la Naturaleza', '白噪音與自然音', '白噪音与自然音', '백색소음과 자연의 소리', 'نویز سفید و صدای طبیعت', 'Tiếng ồn trắng & Âm thanh thiên nhiên', 'व्हाइट नॉइज़ और प्रकृति की ध्वनियाँ'),
      sub: L(
        'Over an hour each. Loop one all night as a steady bedtime cue — your brain will start to link the sound with sleep.',
        'Cada uno dura más de una hora. Ponlos en bucle toda la noche como una señal de dormir constante — tu cerebro empezará a asociar el sonido con el sueño.',
        '每段超過一小時。整夜循環播放，作為穩定的就寢提示——你的大腦會開始把這聲音和睡眠連結起來。',
        '每段超过一小时。整夜循环播放，作为稳定的就寝提示——你的大脑会开始把这声音和睡眠连结起来。',
        '각 곡이 1시간 이상입니다. 밤새 반복 재생해 잠들기 신호로 삼으세요 — 뇌가 그 소리와 잠을 연결하기 시작합니다.',
        'هر یک بیش از یک ساعت. یکی را تمام شب در حلقه پخش کنید تا نشانه‌ای پایدار برای خواب باشد — مغز شما شروع به ربط‌دادن این صدا با خواب می‌کند.',
        'Mỗi bản dài hơn một giờ. Hãy phát lặp một bản suốt đêm như một tín hiệu ngủ ổn định — não bạn sẽ bắt đầu liên kết âm thanh đó với giấc ngủ.',
        'हर ट्रैक एक घंटे से ज़्यादा। एक को पूरी रात लूप में चलाएँ ताकि वह सोने का स्थिर संकेत बने — आपका मस्तिष्क उस ध्वनि को नींद से जोड़ने लगेगा।'
      ),
      tag: L('60+ min · Loop all night', '60+ min · Reproducir toda la noche', '60+ 分鐘 · 整夜循環', '60+ 分钟 · 整夜循环', '60분 이상 · 밤새 반복 재생', '۶۰+ دقیقه · پخش حلقه‌ای تمام شب', 'Hơn 60 phút · Phát lặp cả đêm', '60+ मिनट · पूरी रात लूप'),
      tracks: [
        { id: 'V303hdgB0MI', title: L('Whispering Woodland Brook', 'Arroyo Susurrante del Bosque', '林間低語溪流', '林间低语溪流', '속삭이는 숲속 시냇물', 'جویبار نجواگر جنگل', 'Suối rì rào trong rừng', 'जंगल की मद्धिम बहती धारा'), sub: L('Stream over mossy stones', 'Arroyo sobre piedras musgosas', '流過青苔石的溪水', '流过青苔石的溪水', '이끼 낀 돌 위를 흐르는 시냇물', 'جریان آب روی سنگ‌های خزه‌بسته', 'Dòng suối chảy qua đá phủ rêu', 'काई से ढके पत्थरों पर बहती धारा') },
        { id: 'WT0pSLD63W0', title: L('Santorini Midnight Waves', 'Olas de Medianoche en Santorini', '聖托里尼午夜浪聲', '圣托里尼午夜浪声', '산토리니 한밤의 파도', 'موج‌های نیمه‌شب سانتورینی', 'Sóng đêm Santorini', 'सैंटोरीनी की आधी रात की लहरें'), sub: L('Mediterranean shoreline', 'Orilla mediterránea', '地中海海岸線', '地中海海岸线', '지중해 해안', 'سواحل مدیترانه', 'Bờ biển Địa Trung Hải', 'भूमध्य सागर का तट') },
        { id: 'H3upsuC_FcU', title: L('Himalayan Rainfall', 'Lluvia del Himalaya', '喜馬拉雅雨聲', '喜马拉雅雨声', '히말라야의 빗소리', 'بارش باران هیمالیا', 'Mưa Himalaya', 'हिमालय की बारिश'), sub: L('Steady mountain rain', 'Lluvia constante de montaña', '綿延的山間雨聲', '绵延的山间雨声', '꾸준한 산속 비', 'باران پیوسته کوهستان', 'Cơn mưa đều đặn trên núi', 'पहाड़ों की लगातार बारिश') },
        { id: 'k6mmuOrl3eY', title: L('Fireplace Tranquility', 'Tranquilidad de Chimenea', '寧靜壁爐', '宁静壁炉', '고요한 벽난로', 'آرامش شومینه', 'Tĩnh lặng bên lò sưởi', 'चिमनी की शांति'), sub: L('Crackling hearth', 'Hogar crepitante', '柴火爆裂的壁爐', '柴火爆裂的壁炉', '장작이 타닥거리는 화로', 'صدای ترق‌تروق شومینه', 'Lò sưởi tí tách', 'चटकती आँच') },
      ],
    },
    {
      key: 'relax',
      eyebrow: L('Section 02 · 10-minute', 'Sección 02 · 10 minutos', '第二節 · 十分鐘', '第二节 · 十分钟', '섹션 02 · 10분', 'بخش ۰۲ · ۱۰ دقیقه‌ای', 'Phần 02 · 10 phút', 'खंड 02 · 10 मिनट'),
      title: L('Relaxing Music for Wind-Down', 'Música Relajante para Antes de Dormir', '放鬆音樂', '放松音乐', '잠들기 전 이완 음악', 'موسیقی آرامش‌بخش پیش از خواب', 'Nhạc thư giãn trước giờ ngủ', 'सोने से पहले विश्राम के लिए संगीत'),
      sub: L(
        'Short tracks to play while getting into bed, doing 4-7-8 breathing, or running through Progressive Muscle Relaxation.',
        'Pistas cortas para escuchar al meterte a la cama, durante la respiración 4-7-8 o la Relajación Muscular Progresiva.',
        '上床、做 4-7-8 深呼吸或漸進式肌肉放鬆時播放的短曲。',
        '上床、做 4-7-8 深呼吸或渐进式肌肉放松时播放的短曲。',
        '잠자리에 들 때, 4-7-8 호흡을 할 때, 또는 점진적 근육 이완을 할 때 틀어두는 짧은 음악입니다.',
        'قطعه‌های کوتاه برای پخش هنگام رفتن به رختخواب، تمرین تنفس ۴-۷-۸، یا اجرای آرامش پیش‌رونده عضلانی.',
        'Những bản ngắn để phát khi bạn lên giường, tập thở 4-7-8 hoặc tập Thư giãn cơ tiến triển.',
        'बिस्तर पर जाते समय, 4-7-8 श्वास करते समय, या प्रगतिशील मांसपेशी विश्राम के दौरान चलाने के लिए छोटे ट्रैक।'
      ),
      tag: L('~10 min · For breathing & PMR', '~10 min · Para respiración y RMP', '約 10 分鐘 · 配合呼吸與 PMR', '约 10 分钟 · 配合呼吸与 PMR', '약 10분 · 호흡과 점진적 근육 이완용', '~۱۰ دقیقه · برای تنفس و PMR', '~10 phút · Dành cho thở & PMR', '~10 मिनट · श्वास और PMR के लिए'),
      tracks: [
        { id: 'iDMhd1VupaA', title: L('REM Ember Delta Waves', 'Ondas Delta REM Ember', 'REM Ember 德爾塔波', 'REM Ember 德尔塔波', 'REM Ember 델타파', 'امواج دلتای REM Ember', 'Sóng Delta REM Ember', 'REM Ember डेल्टा तरंगें'), sub: L('by Ookean', 'por Ookean', '作者：Ookean', '作者：Ookean', '작곡: Ookean', 'اثر: Ookean', 'của Ookean', 'Ookean द्वारा') },
        { id: 'c8-lX-K0eVs', title: L('Into Cryosleep', 'Hacia el Criosueño', '進入冷凍沉睡', '进入冷冻沉睡', '냉동수면 속으로', 'به‌سوی خواب انجمادی', 'Vào giấc đông lạnh', 'क्रायोस्लीप में'), sub: L('by Joseph Beg', 'por Joseph Beg', '作者：Joseph Beg', '作者：Joseph Beg', '작곡: Joseph Beg', 'اثر: Joseph Beg', 'của Joseph Beg', 'Joseph Beg द्वारा') },
        { id: 'rQws7fTVmPI', title: L('Autumn Fields', 'Campos de Otoño', '秋日原野', '秋日原野', '가을 들판', 'دشت‌های پاییزی', 'Cánh đồng mùa thu', 'पतझड़ के खेत'), sub: L('by Chaxti', 'por Chaxti', '作者：Chaxti', '作者：Chaxti', '작곡: Chaxti', 'اثر: Chaxti', 'của Chaxti', 'Chaxti द्वारा') },
      ],
    },
    {
      key: 'guided',
      eyebrow: L('Section 03 · Guided', 'Sección 03 · Guiada', '第三節 · 引導冥想', '第三节 · 引导冥想', '섹션 03 · 가이드 명상', 'بخش ۰۳ · هدایت‌شده', 'Phần 03 · Có hướng dẫn', 'खंड 03 · निर्देशित'),
      title: L('Guided Sleep Meditation', 'Meditación Guiada para Dormir', '引導式睡眠冥想', '引导式睡眠冥想', '가이드 수면 명상', 'مدیتیشن خواب هدایت‌شده', 'Thiền ngủ có hướng dẫn', 'निर्देशित नींद ध्यान'),
      sub: L(
        'A full guided session combining deep breathing and progressive muscle relaxation — press play, lie down, and follow the voice.',
        'Una sesión guiada completa que combina respiración profunda y relajación muscular progresiva — dale play, acuéstate y sigue la voz.',
        '結合深呼吸與漸進式肌肉放鬆的完整引導課程——按下播放、躺下，跟著聲音走。',
        '结合深呼吸与渐进式肌肉放松的完整引导课程——按下播放、躺下，跟着声音走。',
        '심호흡과 점진적 근육 이완을 결합한 완전한 가이드 세션입니다 — 재생을 누르고 누워서, 목소리를 따라가 보세요.',
        'یک جلسه کامل هدایت‌شده با ترکیب تنفس عمیق و آرامش پیش‌رونده عضلانی — پخش را بزنید، دراز بکشید و صدا را دنبال کنید.',
        'Một buổi hướng dẫn đầy đủ kết hợp thở sâu và thư giãn cơ tiến triển — nhấn phát, nằm xuống và đi theo giọng nói.',
        'गहरी श्वास और प्रगतिशील मांसपेशी विश्राम को मिलाकर एक पूरी निर्देशित सत्र — प्ले दबाएँ, लेट जाएँ, और आवाज़ का अनुसरण करें।'
      ),
      tag: L('Voice-led · Breathing + PMR', 'Con voz guía · Respiración + RMP', '人聲引導 · 呼吸 + PMR', '人声引导 · 呼吸 + PMR', '음성 가이드 · 호흡 + 점진적 근육 이완', 'با راهنمای صوتی · تنفس + PMR', 'Có giọng đọc · Thở + PMR', 'आवाज़ निर्देशित · श्वास + PMR'),
      tracks: [
        { id: 'j4ZtuyeLrTk', title: L('Soft Landing: A Sleep Meditation', 'Aterrizaje Suave: Una Meditación para Dormir', '輕柔降落：睡眠冥想', '轻柔降落：睡眠冥想', '부드러운 착륙: 수면 명상', 'فرود نرم: یک مدیتیشن خواب', 'Hạ cánh nhẹ nhàng: Một buổi thiền ngủ', 'कोमल अवतरण: एक नींद ध्यान'), sub: L('Deep breathing & PMR combined', 'Respiración profunda y RMP combinadas', '深呼吸與 PMR 結合', '深呼吸与 PMR 结合', '심호흡과 점진적 근육 이완 결합', 'ترکیب تنفس عمیق و PMR', 'Kết hợp thở sâu & PMR', 'गहरी श्वास और PMR का संयोजन') },
      ],
    },
  ];

  const labels = {
    play: L('Play on YouTube', 'Reproducir en YouTube', '在 YouTube 播放', '在 YouTube 播放', 'YouTube에서 재생', 'پخش در YouTube', 'Phát trên YouTube', 'YouTube पर चलाएँ'),
    preview: L('Tap to play', 'Toca para reproducir', '點擊播放', '点击播放', '눌러서 재생', 'برای پخش بزنید', 'Nhấn để phát', 'चलाने के लिए टैप करें'),
    tip: L('Tap thumbnail to play', 'Toca la miniatura para reproducir', '點縮圖播放', '点缩略图播放', '썸네일을 눌러 재생', 'برای پخش روی تصویر بزنید', 'Nhấn vào hình thu nhỏ để phát', 'चलाने के लिए थंबनेल पर टैप करें'),
    note: L('How to use this library', 'Cómo usar esta biblioteca', '如何使用本資料庫', '如何使用本资料库', '이 라이브러리 사용법', 'چگونه از این کتابخانه استفاده کنیم', 'Cách dùng thư viện này', 'इस पुस्तकालय का उपयोग कैसे करें'),
    noteBody: L(
      'Tap any thumbnail to play the audio inline. Pair Section 01 with bedtime; Section 02 with the breathing or PMR tools; Section 03 as a stand-alone wind-down.',
      'Toca cualquier miniatura para reproducir el audio aquí mismo. Empareja la Sección 01 con la hora de dormir; la Sección 02 con las herramientas de respiración o RMP; la Sección 03 como una sesión independiente.',
      '點任一縮圖即可在頁面內播放音訊。第一節搭配就寢；第二節配合呼吸或 PMR 工具；第三節可作為獨立的睡前放鬆。',
      '点任一缩略图即可在页面内播放音频。第一节搭配就寝；第二节配合呼吸或 PMR 工具；第三节可作为独立的睡前放松。',
      '썸네일을 누르면 페이지 내에서 오디오가 재생됩니다. 섹션 01은 잠자리에, 섹션 02는 호흡이나 점진적 근육 이완 도구와 함께, 섹션 03은 단독 이완 세션으로 사용하세요.',
      'روی هر تصویر بزنید تا صدا در همین صفحه پخش شود. بخش ۰۱ را با زمان خواب ترکیب کنید؛ بخش ۰۲ را با ابزارهای تنفس یا PMR؛ بخش ۰۳ را به‌عنوان یک جلسه آرامش مستقل.',
      'Nhấn vào bất kỳ hình thu nhỏ nào để phát âm thanh ngay trong trang. Kết hợp Phần 01 với giờ ngủ; Phần 02 với các công cụ thở hoặc PMR; Phần 03 dùng riêng để thả lỏng.',
      'किसी भी थंबनेल पर टैप करके ऑडियो को इसी पृष्ठ पर चलाएँ। खंड 01 को सोने के समय के साथ जोड़ें; खंड 02 को श्वास या PMR साधनों के साथ; खंड 03 को एक स्वतंत्र विश्राम सत्र के रूप में।'
    ),
  };

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
        <div className="callout" style={{ marginBottom: 32 }}>
          <div className="callout-label">{labels.note}</div>
          <p>{labels.noteBody}</p>
        </div>
        {sections.map((sec) => (
          <section key={sec.key} style={{ marginBottom: 56 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                gap: 16,
                flexWrap: 'wrap',
                marginBottom: 6,
              }}
            >
              <div className="module-num" style={{ color: 'var(--sand)' }}>
                {sec.eyebrow}
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted)', letterSpacing: '0.06em' }}>
                {sec.tag}
              </div>
            </div>
            <h2 style={{ marginTop: 4 }}>{sec.title}</h2>
            <p style={{ color: 'var(--muted)', maxWidth: 720, marginTop: 10, marginBottom: 22 }}>
              {sec.sub}
            </p>
            <div className="modules">
              {sec.tracks.map((tr) => {
                const isOpen = open === tr.id;
                return (
                  <div key={tr.id} className="module-card" style={{ cursor: 'default' }}>
                    <div className="module-card-head">
                      <div className="module-num">
                        ▶ {isOpen ? labels.play : labels.preview}
                      </div>
                    </div>
                    <h3 style={{ fontSize: 22, marginTop: 4 }}>{tr.title}</h3>
                    <p className="module-card-desc">{tr.sub}</p>
                    <div
                      style={{
                        borderRadius: 12,
                        overflow: 'hidden',
                        marginTop: 14,
                        background: 'var(--night)',
                        aspectRatio: '16/9',
                        position: 'relative',
                      }}
                    >
                      {isOpen ? (
                        <iframe
                          src={`https://www.youtube-nocookie.com/embed/${tr.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                          title={tr.title}
                          referrerPolicy="strict-origin-when-cross-origin"
                          style={{ width: '100%', height: '100%', border: 0, position: 'absolute', inset: 0 }}
                          allow="autoplay; encrypted-media; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      ) : (
                        <button
                          type="button"
                          onClick={() => setOpen(tr.id)}
                          aria-label={`${labels.preview}: ${tr.title}`}
                          style={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            border: 0,
                            cursor: 'pointer',
                            color: 'var(--cream)',
                            backgroundImage: `linear-gradient(135deg, rgba(15,30,58,0.45), rgba(45,74,115,0.45)), url(https://i.ytimg.com/vi/${tr.id}/hqdefault.jpg)`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <span
                            style={{
                              width: 64,
                              height: 64,
                              borderRadius: '50%',
                              background: 'var(--sand)',
                              color: 'var(--night)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: 22,
                              paddingLeft: 4,
                              boxShadow: '0 6px 24px rgba(15,30,58,0.5)',
                            }}
                          >
                            ▶
                          </span>
                        </button>
                      )}
                    </div>
                    <div
                      className="module-card-foot"
                      style={{ marginTop: 14, justifyContent: 'flex-start' }}
                    >
                      <span
                        className="tag"
                        style={{ background: 'transparent', color: 'var(--muted)', padding: '4px 0' }}
                      >
                        {labels.tip}
                      </span>
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
