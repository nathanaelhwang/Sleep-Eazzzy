'use client';

import { useState } from 'react';
import { useL, useT } from './LangProvider';

type Track = { id: string; title: string; sub: string };
type Section = { key: string; title: string; sub: string; tracks: Track[] };

export function LibraryPage() {
  const t = useT();
  const L = useL();
  const [open, setOpen] = useState<string | null>(null);

  const sections: Section[] = [
    {
      key: 'white',
      title: t('snd_white_h'),
      sub: t('snd_white_p'),
      tracks: [
        { id: 'V303hdgB0MI', title: L('Whispering Woodland Brook', 'Arroyo Susurrante del Bosque', '林間低語溪流', '林间低语溪流', '속삭이는 숲속 시냇물', 'جویبار نجواگر جنگل', 'Suối rì rào trong rừng', 'जंगल की मद्धिम बहती धारा'), sub: L('Stream over mossy stones', 'Arroyo sobre piedras musgosas', '流過青苔石的溪水', '流过青苔石的溪水', '이끼 낀 돌 위를 흐르는 시냇물', 'جریان آب روی سنگ‌های خزه‌بسته', 'Dòng suối chảy qua đá phủ rêu', 'काई से ढके पत्थरों पर बहती धारा') },
        { id: 'WT0pSLD63W0', title: L('Santorini Midnight Waves', 'Olas de Medianoche en Santorini', '聖托里尼午夜浪聲', '圣托里尼午夜浪声', '산토리니 한밤의 파도', 'موج‌های نیمه‌شب سانتورینی', 'Sóng đêm Santorini', 'सैंटोरीनी की आधी रात की लहरें'), sub: L('Mediterranean shoreline', 'Orilla mediterránea', '地中海海岸線', '地中海海岸线', '지중해 해안', 'سواحل مدیترانه', 'Bờ biển Địa Trung Hải', 'भूमध्य सागर का तट') },
        { id: 'H3upsuC_FcU', title: L('Himalayan Rainfall', 'Lluvia del Himalaya', '喜馬拉雅雨聲', '喜马拉雅雨声', '히말라야의 빗소리', 'بارش باران هیمالیا', 'Mưa Himalaya', 'हिमालय की बारिश'), sub: L('Steady mountain rain', 'Lluvia constante de montaña', '綿延的山間雨聲', '绵延的山间雨声', '꾸준한 산속 비', 'باران پیوسته کوهستان', 'Cơn mưa đều đặn trên núi', 'पहाड़ों की लगातार बारिश') },
        { id: 'k6mmuOrl3eY', title: L('Fireplace Tranquility', 'Tranquilidad de Chimenea', '寧靜壁爐', '宁静壁炉', '고요한 벽난로', 'آرامش شومینه', 'Tĩnh lặng bên lò sưởi', 'चिमनी की शांति'), sub: L('Crackling hearth', 'Hogar crepitante', '柴火爆裂的壁爐', '柴火爆裂的壁炉', '장작이 타닥거리는 화로', 'صدای ترق‌تروق شومینه', 'Lò sưởi tí tách', 'चटकती आँच') },
      ],
    },
    {
      key: 'relax',
      title: t('snd_relax_h'),
      sub: t('snd_relax_p'),
      tracks: [
        { id: 'iDMhd1VupaA', title: L('REM Ember Delta Waves', 'Ondas Delta REM Ember', 'REM Ember 德爾塔波', 'REM Ember 德尔塔波', 'REM Ember 델타파', 'امواج دلتای REM Ember', 'Sóng Delta REM Ember', 'REM Ember डेल्टा तरंगें'), sub: L('by Ookean', 'por Ookean', '作者：Ookean', '作者：Ookean', '작곡: Ookean', 'اثر: Ookean', 'của Ookean', 'Ookean द्वारा') },
        { id: 'c8-lX-K0eVs', title: L('Into Cryosleep', 'Hacia el Criosueño', '進入冷凍沉睡', '进入冷冻沉睡', '냉동수면 속으로', 'به‌سوی خواب انجمادی', 'Vào giấc đông lạnh', 'क्रायोस्लीप में'), sub: L('by Joseph Beg', 'por Joseph Beg', '作者：Joseph Beg', '作者：Joseph Beg', '작곡: Joseph Beg', 'اثر: Joseph Beg', 'của Joseph Beg', 'Joseph Beg द्वारा') },
        { id: 'rQws7fTVmPI', title: L('Autumn Fields', 'Campos de Otoño', '秋日原野', '秋日原野', '가을 들판', 'دشت‌های پاییزی', 'Cánh đồng mùa thu', 'पतझड़ के खेत'), sub: L('by Chaxti', 'por Chaxti', '作者：Chaxti', '作者：Chaxti', '작곡: Chaxti', 'اثر: Chaxti', 'của Chaxti', 'Chaxti द्वारा') },
      ],
    },
    {
      key: 'guided',
      title: t('snd_guided_h'),
      sub: t('snd_guided_p'),
      tracks: [
        { id: 'j4ZtuyeLrTk', title: L('Soft Landing: A Sleep Meditation', 'Aterrizaje Suave: Una Meditación para Dormir', '輕柔降落：睡眠冥想', '轻柔降落：睡眠冥想', '부드러운 착륙: 수면 명상', 'فرود نرم: یک مدیتیشن خواب', 'Hạ cánh nhẹ nhàng: Một buổi thiền ngủ', 'कोमल अवतरण: एक नींद ध्यान'), sub: L('Deep breathing & PMR combined', 'Respiración profunda y RMP combinadas', '深呼吸與 PMR 結合', '深呼吸与 PMR 结合', '심호흡과 점진적 근육 이완 결합', 'ترکیب تنفس عمیق و PMR', 'Kết hợp thở sâu & PMR', 'गहरी श्वास और PMR का संयोजन') },
      ],
    },
  ];

  const play = t('snd_play');

  return (
    <div className="wrap">
      <header className="page-head">
        <h1>{t('library_title')}</h1>
        <p>{t('snd_lede')}</p>
      </header>

      {sections.map((sec) => (
        <section key={sec.key} className="section" aria-labelledby={`snd-${sec.key}`}>
          <div className="sec-head">
            <h2 id={`snd-${sec.key}`}>{sec.title}</h2>
            <p>{sec.sub}</p>
          </div>
          <ul className="snd-grid">
            {sec.tracks.map((tr) => (
              <li key={tr.id}>
                <div className="snd-media">
                  {open === tr.id ? (
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${tr.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                      title={tr.title}
                      referrerPolicy="strict-origin-when-cross-origin"
                      allow="autoplay; encrypted-media; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : (
                    <button type="button" className="snd-play" onClick={() => setOpen(tr.id)} aria-label={`${play}: ${tr.title}`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`https://i.ytimg.com/vi/${tr.id}/hqdefault.jpg`} alt="" width={480} height={360} loading="lazy" />
                      <span className="snd-chip" aria-hidden="true">
                        <svg width="10" height="12" viewBox="0 0 10 12"><path d="M0 0 L10 6 L0 12 Z" fill="currentColor" /></svg>
                        {play}
                      </span>
                    </button>
                  )}
                </div>
                <h3 className="snd-title">{tr.title}</h3>
                <p className="snd-sub">{tr.sub}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
