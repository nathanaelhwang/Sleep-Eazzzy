import { at, type Night } from './night';

export type CaseNights = { before: Night; after: Night };

// Typical nights drawn to match the two case studies in Module 1.
// Robert, 72: in bed at 9 PM, asleep only 1 to 4 AM. After 4 weeks, ~7.5 h.
export const ROBERT: CaseNights = {
  before: { bed: [at(21), at(6)], sleep: [[at(1), at(4)]] },
  after: { bed: [at(22, 30), at(6, 30)], sleep: [[at(22, 45), at(6, 15)]] },
};

// Sarah, 35: 1 to 2 hours a night, in pieces. After 4 weeks, ~7.5 h in one stretch.
export const SARAH: CaseNights = {
  before: { bed: [at(22), at(6, 30)], sleep: [[at(0, 30), at(1, 30)], [at(4), at(4, 45)]] },
  after: { bed: [at(22, 45), at(6, 45)], sleep: [[at(23), at(6, 30)]] },
};
