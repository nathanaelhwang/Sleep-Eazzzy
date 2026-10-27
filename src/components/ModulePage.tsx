'use client';

import type { Module } from '@/lib/data';
import { BonusModule } from './Modules/BonusModule';
import { CognitiveModule } from './Modules/CognitiveModule';
import { CompressionModule } from './Modules/CompressionModule';
import { HygieneModule } from './Modules/HygieneModule';
import { IntroModule } from './Modules/IntroModule';
import { ModuleProgressProvider } from './Modules/progress';
import { RelaxationModule } from './Modules/RelaxationModule';
import { SleepPlanModule } from './Modules/SleepPlanModule';
import { StimulusModule } from './Modules/StimulusModule';

function ModuleBody({ mod }: { mod: Module }) {
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

/** `?tool=<item>` deep links (e.g. ?tool=calc) are handled by ModuleShell, which opens that item. */
export function ModulePage({ mod }: { mod: Module }) {
  return (
    <ModuleProgressProvider>
      <ModuleBody mod={mod} />
    </ModuleProgressProvider>
  );
}
