export type Module = {
  id: number;
  slug: string;
  num: string;
  title: string;
  subtitle: string;
  duration: string;
  tags: string[];
  bonus?: boolean;
};

export type QuizOption = { text: string; explanation: string };
export type QuizQuestion = {
  q: string;
  options: QuizOption[];
  correct: number;
  feedback: string;
};

export type ReframePair = { neg: string; pos: string };
export type PMRStep = { name: string; instruction: string };
export type RoutineItem = { name: string; icon: string };
export type RoutineSlot = { time: string; name: string; icon: string };

export const MODULES: Module[] = [
  { id: 1,  slug: 'intro',            num: '01', title: 'Welcome & The Sleep Quiz',     subtitle: 'Meet Wendy, learn what insomnia is, and test what you already know.',      duration: '8 min',  tags: ['Foundation', 'Quiz'] },
  { id: 2,  slug: 'cognitive',        num: '02', title: 'Cognitive Therapy',             subtitle: 'Reframe the thoughts that keep your insomnia going.',                      duration: '10 min', tags: ['Mindset', 'Journal'] },
  { id: 3,  slug: 'hygiene',          num: '03', title: 'Sleep Hygiene',                 subtitle: 'The do’s and don’ts that build a strong sleep foundation.',                duration: '9 min',  tags: ['Habits'] },
  { id: 4,  slug: 'relaxation',       num: '04', title: 'Relaxation Techniques',         subtitle: '4-7-8 breathing, progressive muscle relaxation, guided imagery, and journaling.', duration: '14 min', tags: ['Practice', 'Audio'] },
  { id: 5,  slug: 'stimulus-control', num: '05', title: 'Stimulus Control',              subtitle: 'What to do when you can’t sleep — the 5-step rule that retrains your brain.', duration: '8 min',  tags: ['Technique'] },
  { id: 6,  slug: 'compression',      num: '06', title: 'Sleep Compression Therapy',     subtitle: 'Build sleep pressure with a custom schedule — includes a calculator.',     duration: '11 min', tags: ['Schedule', 'Tool'] },
  { id: 7,  slug: 'sleep-plan',       num: '07', title: 'Your Sleep Plan',               subtitle: 'Pull it all together into a bedtime routine you can stick with.',          duration: '9 min',  tags: ['Plan', 'Builder'] },
  { id: 8,  slug: 'medications',      num: 'B1', title: 'Sleep Medications',             subtitle: 'How meds fit (or don’t fit) alongside CBT-I.',                             duration: '6 min',  tags: ['Bonus'], bonus: true },
  { id: 9,  slug: 'positioning',      num: 'B2', title: 'Sleep Positioning',             subtitle: 'Reduce strain so chronic pain doesn’t wake you up.',                       duration: '5 min',  tags: ['Bonus'], bonus: true },
  { id: 10, slug: 'disorders',        num: 'B3', title: 'Common Sleep Disorders',        subtitle: 'Signs that suggest something other than insomnia.',                        duration: '7 min',  tags: ['Bonus'], bonus: true },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    q: 'How many hours of sleep do you actually need?',
    options: [
      { text: '4 hours', explanation: 'Too little for most adults — chronic short sleep is associated with daytime fatigue and a range of health risks.' },
      { text: '7 hours', explanation: 'Close to the population average, but the right number is personal — not a fixed target.' },
      { text: '9 hours', explanation: 'More than most adults need. Spending too long in bed can actually fragment sleep.' },
      { text: 'It depends', explanation: 'Correct. The right amount of sleep is whatever leaves you feeling rested and not struggling with sleepiness during the day. It varies from person to person — though most adults land around 7 to 7½ hours.' },
      { text: 'None — sleep is for the weak', explanation: 'A fun answer, but sleep is essential for memory, mood, immunity, and almost every system in the body.' },
    ],
    correct: 3,
    feedback: 'The right amount of sleep is whatever leaves you feeling rested and not struggling with sleepiness while awake. It varies person to person, but most people need 7 to 7½ hours a night.',
  },
  {
    q: 'What’s the best way to improve chronic insomnia?',
    options: [
      { text: 'Relaxation techniques', explanation: 'Correct. Deep breathing, progressive muscle relaxation, and guided imagery are core components of CBT — and we’ll work through them together in Module 4.' },
      { text: 'Sleeping pills', explanation: 'Sleep medications like Ambien tend to be only partially effective and often work only for days or weeks before the brain adapts to them.' },
      { text: 'Acupuncture', explanation: 'Acupuncture has not been proven effective for most people with chronic insomnia.' },
      { text: 'Exercising right before bed', explanation: 'Exercise is excellent for sleep — but not within three hours of bedtime, when it raises body temperature and increases alertness. Late afternoon or early evening is ideal.' },
      { text: 'Listening to your spouse’s problems at midnight', explanation: 'Being a good listener is wonderful — but try to do it earlier in the day, not at bedtime.' },
    ],
    correct: 0,
    feedback: 'Deep breathing, progressive muscle relaxation, and guided imagery are core CBT tools — you’ll learn them all in Module 4. Sleeping pills lose effect as your brain adjusts; late-night exercise raises your body temperature and works against sleep.',
  },
  {
    q: 'What should you do if you can’t fall asleep?',
    options: [
      { text: 'Eat a snack', explanation: 'Eating before sleep can lead to nighttime bathroom trips and weight gain — not what we’re after.' },
      { text: 'Get up and do something boring', explanation: 'Correct. After about 20 minutes of being unable to sleep, get out of bed and do something quiet and unstimulating. Return only when you feel sleepy again. This is Stimulus Control — covered in Module 5.' },
      { text: 'Drink a glass of wine', explanation: 'Alcohol can feel sedating, but a few hours later it produces rebound alertness, fragments sleep, and can trigger bad dreams. Avoid drinking within three hours of bed.' },
      { text: 'Lie in bed — at least you’re resting', explanation: 'This is one of the worst things you can do. Instead of resting, you build frustration and fear, and condition your brain to associate the bed with alertness rather than sleep.' },
      { text: 'Wake up your spouse to complain', explanation: 'Tempting, perhaps — but hard on the relationship and likely to make the situation worse for both of you.' },
    ],
    correct: 1,
    feedback: 'After about 20 minutes, get up and do something relaxing or boring in dim light. Only return to bed when you feel sleepy again. This is Stimulus Control — covered in Module 5.',
  },
  {
    q: 'Does caffeine affect your sleep?',
    options: [
      { text: 'No, not really', explanation: 'Unfortunately, it does — and the effects last longer than most people expect.' },
      { text: 'It makes me expend more energy, so I sleep better', explanation: 'A common belief, but caffeine actually delays sleep onset and reduces sleep quality.' },
      { text: 'Sleep can be worse — but it’s fine if I drink before 6pm', explanation: 'Closer, but still too late. Caffeine’s effects can last up to 12 hours — most people should stop by noon.' },
      { text: 'It can cause leg twitches that disturb sleep', explanation: 'Correct. Caffeine can trigger leg twitches and restless leg syndrome, making it harder to fall asleep — or waking you in the night. Its effects can last up to 12 hours, so a noon cutoff is wise.' },
      { text: 'If you have to ask, you’re not a real coffee drinker', explanation: 'A fun answer — but no amount of devotion changes how caffeine interacts with the brain.' },
    ],
    correct: 3,
    feedback: 'Caffeine can stay in your system up to 12 hours, so limit it to before noon. It can also trigger leg twitches or restless leg syndrome that disrupt sleep.',
  },
];

export const REFRAME_SUGGESTIONS: ReframePair[] = [
  { neg: '“It’s going to be another bad night.”',           pos: '“Just relax — I will eventually fall asleep.”' },
  { neg: '“I’m scared I won’t fall back asleep.”',           pos: '“Trying harder won’t help. I’ll relax and drift off.”' },
  { neg: '“If I don’t get my 6 hours I won’t function.”',    pos: '“I may not sleep as much as I hope, but I can still function.”' },
  { neg: '“Bad sleep is destroying my life.”',               pos: '“Almost half the people around me have trouble sleeping. I’m not alone.”' },
  { neg: '“I need that sleeping pill or I can’t sleep.”',    pos: '“I’m in control. My sleep is not in control of me.”' },
  { neg: '“Why can my partner sleep but not me?”',           pos: '“I used to sleep fine. It’s a matter of time before my changes work.”' },
];

export const PMR_STEPS: PMRStep[] = [
  { name: 'Feet',           instruction: 'Curl your toes downward. Feel the tension in the arches of your feet. Hold while you breathe in.' },
  { name: 'Calves',         instruction: 'Point your toes downward, then pull them toward your knees. Feel the stretch in your calves and shins.' },
  { name: 'Thighs',         instruction: 'Straighten your legs and tense your thighs and hamstrings. Then press your knees together.' },
  { name: 'Buttocks',       instruction: 'Squeeze your glutes together firmly. Hold the tension while you breathe in.' },
  { name: 'Abdomen',        instruction: 'Pull your belly button toward your spine, then push your stomach out. Feel each direction.' },
  { name: 'Chest',          instruction: 'Take a deep breath and hold it, expanding your ribcage. Then exhale fully and pause.' },
  { name: 'Arms & Hands',   instruction: 'Clench your fists. Then flex your biceps. Then straighten your arms and tense the triceps.' },
  { name: 'Shoulders',      instruction: 'Raise your shoulders toward your ears. Then squeeze your shoulder blades together behind you.' },
  { name: 'Face',           instruction: 'Close your eyes tightly and wrinkle your forehead. Hold, then let everything go soft.' },
];

export const HYGIENE_DOS: string[] = [
  'Sleep and wake at the same time every day — anchor your circadian rhythm.',
  'Block out light. Try blackout shades or an eye mask.',
  'Keep the room cool. About 67°F is a good target.',
  'Get regular exercise — ideally late afternoon or early evening.',
  'Turn off digital devices 1–2 hours before bed.',
  'Turn on Night Shift (iPhone) or Night Light (Android) starting 2 hours before bedtime.',
];

export const HYGIENE_DONTS: string[] = [
  'Don’t use the bed for anything other than sleep (or intimacy).',
  'Don’t look at the clock. Turn it around or remove it.',
  'Don’t check your phone in bed.',
  'Don’t eat heavy meals or drink fluids close to bedtime.',
  'Don’t drink alcohol within a couple hours of bed.',
  'Don’t smoke — nicotine is a stimulant.',
  'Don’t drink caffeine after noon.',
  'Don’t nap. If you must, before 3pm and under 20 minutes.',
];

export const ROUTINE_LIBRARY: RoutineItem[] = [
  { name: 'Put phone away',                  icon: '◐' },
  { name: 'Hot shower or bath',              icon: '✺' },
  { name: 'Dim the lights',                  icon: '◓' },
  { name: 'Light spa or nature sounds',      icon: '♪' },
  { name: 'Progressive muscle relaxation',   icon: '○' },
  { name: '4-7-8 deep breathing',            icon: '∿' },
  { name: 'Stretch on a yoga mat',           icon: '✕' },
  { name: 'Stress relief journaling',        icon: '✎' },
  { name: 'Reframe negative thoughts',       icon: '↻' },
  { name: 'Read in a quiet room',            icon: '▭' },
  { name: 'Guided imagery meditation',       icon: '☼' },
  { name: 'Go to bed',                       icon: '☾' },
  { name: 'Play ocean waves / white noise',  icon: '∽' },
];

export const DEFAULT_ROUTINE: RoutineSlot[] = [
  { time: '21:30', name: 'Put phone away',                icon: '◐' },
  { time: '21:45', name: 'Hot shower or bath',            icon: '✺' },
  { time: '22:00', name: 'Progressive muscle relaxation', icon: '○' },
  { time: '22:15', name: 'Stress relief journaling',      icon: '✎' },
  { time: '22:30', name: 'Read in a quiet room',          icon: '▭' },
  { time: '23:00', name: 'Go to bed',                     icon: '☾' },
];
