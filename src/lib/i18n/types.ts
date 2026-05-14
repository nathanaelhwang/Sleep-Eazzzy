import type {
  Module,
  ReframePair,
  PMRStep,
  RoutineItem,
  RoutineSlot,
} from '../data';

export type Locale = 'en' | 'es' | 'zh-Hant' | 'zh-Hans';

export const DEFAULT_LOCALE: Locale = 'en';

export type Translations = Record<string, string | readonly string[]>;

export type RichQuizOption = { text: string; explanation: string };

export type LocalizedQuizQuestion = {
  q: string;
  options: (string | RichQuizOption)[];
  correct: number;
  feedback: string;
};

export type HygieneSet = {
  do_label: string;
  dont_label: string;
  dos: string[];
  donts: string[];
};

export type ModuleContent = Record<number, Record<string, unknown>>;

export type ArousalStage = { label: string; title: string; desc: string };

export type ArousalContent = {
  eyebrow: string;
  heading: string;
  headingEm: string;
  awake: string;
  asleep: string;
  threshold: string;
  arousal: string;
  hint: string;
  legend: { baseline: string; stress: string; habits: string };
  cbtPress: string;
  stages: ArousalStage[];
} | null;

export type Dictionary = {
  locale: Locale;
  t: Translations;
  modules: Module[];
  quiz: LocalizedQuizQuestion[];
  reframe: ReframePair[];
  pmr: PMRStep[];
  hygiene: HygieneSet;
  routineLib: RoutineItem[];
  defaultRoutine: RoutineSlot[];
  moduleContent: ModuleContent;
  arousal: ArousalContent;
};
