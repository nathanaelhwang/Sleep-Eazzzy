'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import type { Module } from '@/lib/data';
import { BonusModule } from './Modules/BonusModule';
import { CognitiveModule } from './Modules/CognitiveModule';
import { CompressionModule } from './Modules/CompressionModule';
import { HygieneModule } from './Modules/HygieneModule';
import { IntroModule } from './Modules/IntroModule';
import { RelaxationModule } from './Modules/RelaxationModule';
import { SleepPlanModule } from './Modules/SleepPlanModule';
import { StimulusModule } from './Modules/StimulusModule';

export function ModulePage({ mod }: { mod: Module }) {
  const searchParams = useSearchParams();
  const tool = searchParams.get('tool');

  useEffect(() => {
    if (!tool) return;
    // Wait one tick for the widget DOM to mount, then scroll.
    const timer = setTimeout(() => {
      const el = document.getElementById('tool-' + tool);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 120);
    return () => clearTimeout(timer);
  }, [tool, mod.id]);

  switch (mod.id) {
    case 1: return <IntroModule mod={mod} />;
    case 2: return <CognitiveModule mod={mod} />;
    case 3: return <HygieneModule mod={mod} />;
    case 4: return <RelaxationModule mod={mod} />;
    case 5: return <StimulusModule mod={mod} />;
    case 6: return <CompressionModule mod={mod} />;
    case 7: return <SleepPlanModule mod={mod} />;
    default: return <BonusModule mod={mod} />;
  }
}
