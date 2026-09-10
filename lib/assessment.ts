export type Axis = 'anxiety' | 'avoidance' | 'secure';
export type Domain = 'closeness' | 'trust' | 'needs' | 'communication' | 'conflict' | 'boundaries' | 'regulation' | 'repair';
export type ProfileKey = 'secure' | 'anxious' | 'dismissive' | 'fearful';

export type Question = {
  id: number;
  text: string;
  axis: Axis;
  domain: Domain;
  reverse?: boolean;
};

export const questions: Question[] = [
  { id: 1, text: 'I notice small changes in closeness and wonder whether something is wrong.', axis: 'anxiety', domain: 'closeness' },
  { id: 2, text: 'I can ask for reassurance without feeling ashamed of needing it.', axis: 'secure', domain: 'needs' },
  { id: 3, text: 'When someone wants emotional closeness, part of me wants more distance.', axis: 'avoidance', domain: 'closeness' },
  { id: 4, text: 'During conflict, I worry that the relationship may be ending.', axis: 'anxiety', domain: 'conflict' },
  { id: 5, text: 'I am comfortable depending on people I trust when I genuinely need support.', axis: 'avoidance', domain: 'trust', reverse: true },
  { id: 6, text: 'I can stay connected to my own needs while also considering someone else’s.', axis: 'secure', domain: 'boundaries' },
  { id: 7, text: 'If a message goes unanswered, my mind quickly fills in painful explanations.', axis: 'anxiety', domain: 'trust' },
  { id: 8, text: 'I prefer to handle difficult feelings alone rather than let someone see them.', axis: 'avoidance', domain: 'communication' },
  { id: 9, text: 'After a disagreement, I can calm myself before deciding what it means.', axis: 'secure', domain: 'regulation' },
  { id: 10, text: 'I need frequent signs that I still matter to the people I love.', axis: 'anxiety', domain: 'needs' },
  { id: 11, text: 'I feel uneasy when a relationship begins to require more vulnerability from me.', axis: 'avoidance', domain: 'closeness' },
  { id: 12, text: 'I can express disappointment directly without attacking or disappearing.', axis: 'secure', domain: 'communication' },
  { id: 13, text: 'I replay conversations to look for signs that I have been rejected.', axis: 'anxiety', domain: 'communication' },
  { id: 14, text: 'Keeping my independence feels safer than relying deeply on another person.', axis: 'avoidance', domain: 'trust' },
  { id: 15, text: 'I can hear “not right now” without automatically hearing “not ever.”', axis: 'anxiety', domain: 'boundaries', reverse: true },
  { id: 16, text: 'When emotions become intense, I tend to shut down or go numb.', axis: 'avoidance', domain: 'regulation' },
  { id: 17, text: 'I can set a boundary and remain warm and connected.', axis: 'secure', domain: 'boundaries' },
  { id: 18, text: 'I sometimes say yes, over-explain, or over-give because I fear losing connection.', axis: 'anxiety', domain: 'boundaries' },
  { id: 19, text: 'I become irritated when someone expects me to talk about feelings before I am ready.', axis: 'avoidance', domain: 'communication' },
  { id: 20, text: 'I trust that healthy conflict can lead to understanding rather than abandonment.', axis: 'secure', domain: 'conflict' },
  { id: 21, text: 'I feel responsible for restoring closeness as quickly as possible after tension.', axis: 'anxiety', domain: 'repair' },
  { id: 22, text: 'I minimize my needs because needing less feels more secure.', axis: 'avoidance', domain: 'needs' },
  { id: 23, text: 'I can receive care without immediately questioning it or pulling away.', axis: 'avoidance', domain: 'trust', reverse: true },
  { id: 24, text: 'Even in a stable relationship, I sometimes expect to be left or replaced.', axis: 'anxiety', domain: 'trust' },
  { id: 25, text: 'When I am hurt, distance feels more manageable than working through it together.', axis: 'avoidance', domain: 'repair' },
  { id: 26, text: 'I can name what I feel and make a clear request.', axis: 'secure', domain: 'needs' },
  { id: 27, text: 'I become preoccupied with where I stand when someone seems less available.', axis: 'anxiety', domain: 'closeness' },
  { id: 28, text: 'I find it difficult to stay present when someone is upset with me.', axis: 'avoidance', domain: 'conflict' },
  { id: 29, text: 'I can take space during conflict and clearly communicate when I will return.', axis: 'secure', domain: 'repair' },
  { id: 30, text: 'Strong emotions can make me act before I have had time to understand what I need.', axis: 'anxiety', domain: 'regulation' },
  { id: 31, text: 'People close to me sometimes experience me as emotionally hard to reach.', axis: 'avoidance', domain: 'communication' },
  { id: 32, text: 'I can let closeness develop gradually without chasing it or resisting it.', axis: 'anxiety', domain: 'closeness', reverse: true },
];

export const profiles: Record<ProfileKey, {
  name: string;
  shortName: string;
  essence: string;
  rootCause: string;
  strengths: string[];
  coreWounds: string[];
  fears: string[];
  emotions: string[];
  needs: string[];
  expectations: string[];
  triggers: string[];
  communication: string[];
  coping: string[];
  secureAlternatives: string[];
  growth: string[];
}> = {
  secure: {
    name: 'Secure', shortName: 'Secure',
    essence: 'You tend to experience closeness and independence as compatible. You can usually communicate needs, tolerate ordinary relationship uncertainty, and return to connection after conflict.',
    rootCause: 'Secure functioning grows from enough repeated experiences of care, responsiveness, repair, and respect. It does not mean you had a perfect past or never feel activated; it means you can usually remain connected to yourself and another person at the same time.',
    strengths: ['Emotionally regulated and balanced', 'Clear, considerate communication', 'Respect for your own and others’ boundaries', 'Capacity for honest repair and compromise', 'Comfort with both intimacy and independence'],
    coreWounds: ['Your reactions are usually more connected to the present situation than to one dominant attachment wound', 'Stress may still activate older personal experiences, especially in an unusually unsafe or inconsistent relationship'],
    fears: ['Prolonged dishonesty or betrayal', 'A relationship that repeatedly refuses repair', 'Ongoing disrespect, toxicity, or unfairness'],
    emotions: ['Calm and present more often than overwhelmed', 'Able to feel disappointment without losing your center', 'Open to joy, connection, grief, and vulnerability'],
    needs: ['Stability and clarity', 'Reciprocity and teamwork', 'Honest communication', 'Growth and shared enjoyment', 'Room for both closeness and autonomy'],
    expectations: ['Both people can speak, listen, and be taken seriously', 'Conflict can be worked through without becoming excessive', 'Partners can rely on one another without losing themselves', 'A healthy relationship includes both shared and separate lives'],
    triggers: ['Repeated dishonesty', 'Persistent boundary violations', 'Contempt or manipulation', 'Relationships that resist mutual repair'],
    communication: ['Open and direct without being needlessly harsh', 'Able to listen while holding your own perspective', 'Can ask for support and give space', 'Generally patient during repair'],
    coping: ['Speak up and work through the issue', 'Seek perspective from trusted people', 'Take a clear pause and return', 'Use self-soothing without abandoning the relationship'],
    secureAlternatives: ['Keep naming needs before resentment builds', 'Let another person carry their share of the emotional work', 'Stay curious when another attachment pattern differs from yours'],
    growth: ['Maintain your boundaries when someone else is activated', 'Avoid over-functioning as the “secure one”', 'Continue choosing relationships that support mutuality and repair'],
  },
  anxious: {
    name: 'Anxious Preoccupied', shortName: 'Anxious Preoccupied',
    essence: 'Connection matters deeply to you, and your attachment system may become highly alert to distance, inconsistency, or uncertainty. You may seek quick reassurance when closeness feels threatened.',
    rootCause: 'This pattern often develops when care or attention felt inconsistent, unpredictable, or connected to how well you pleased others. Your system learned to monitor closeness closely and move toward connection quickly because distance could feel like danger.',
    strengths: ['Warm, thoughtful, and attentive', 'Emotionally perceptive and expressive', 'Loyal, collaborative, and willing to repair', 'Generous with encouragement and care', 'Able to build connection quickly'],
    coreWounds: ['I may be abandoned or left alone', 'I am not good enough or lovable enough', 'I may be rejected, excluded, or disliked', 'I must work to keep connection'],
    fears: ['Being rejected or replaced', 'Being excluded or seen as “bad”', 'Losing the relationship after conflict', 'Not being important enough to someone'],
    emotions: ['Anxiety and worry', 'Loneliness and insecurity', 'Urgency or desperation', 'Sadness and regret'],
    needs: ['Consistency and follow-through', 'Closeness and emotional presence', 'Reassurance and validation', 'To feel seen, heard, and included', 'Collaboration and partnership'],
    expectations: ['A partner will be emotionally available when you need reassurance', 'Closeness should be restored quickly after tension', 'Important people will notice needs without always being asked', 'The relationship will remain a clear priority'],
    triggers: ['Silence or delayed responses', 'Ambiguous commitment', 'Sudden changes in warmth', 'Feeling excluded or deprioritized', 'A boundary that sounds like rejection'],
    communication: ['May lead with feelings and explain in detail', 'Can be vulnerable and eager to talk things through', 'May agree or over-give to prevent disapproval', 'May repeat the point when reassurance has not landed'],
    coping: ['Reassurance-seeking or repeated checking', 'People-pleasing and self-abandonment', 'Testing the relationship or provoking proof of care', 'Over-explaining, criticizing, or urgently pursuing repair', 'Managing another person’s feelings at your own expense'],
    secureAlternatives: ['Name the fear before acting on it', 'Ask one direct question instead of testing', 'Regulate first, then request reassurance clearly', 'Keep a boundary even when closeness feels uncertain'],
    growth: ['Pause before treating uncertainty as proof', 'Build self-soothing alongside healthy reassurance', 'Let consistency accumulate over time', 'Practice boundaries that protect your energy and identity'],
  },
  dismissive: {
    name: 'Dismissive Avoidant', shortName: 'Dismissive Avoidant',
    essence: 'Self-reliance may feel safer than emotional dependence. When closeness or conflict becomes intense, you may protect yourself by minimizing needs, becoming highly practical, or creating distance.',
    rootCause: 'This pattern often develops when vulnerability, dependence, or emotional expression was not reliably welcomed. Your system learned that competence and self-containment were safer than needing others, so distance can become the fastest route back to control.',
    strengths: ['Independent, practical, and resilient', 'Calm and analytical under pressure', 'Comfortable setting limits', 'Thoughtful problem-solver', 'Protective of harmony and autonomy'],
    coreWounds: ['I am unsafe when I depend on others', 'I may become trapped or overwhelmed', 'My feelings or needs will be dismissed', 'If I am vulnerable, I may be weak or rejected'],
    fears: ['Losing freedom or being controlled', 'Being criticized or emotionally overwhelmed', 'Having to depend too heavily on another person', 'Conflict that becomes endless or engulfing'],
    emotions: ['Irritation and frustration', 'Numbness or depletion', 'Shame kept out of view', 'Loneliness that may be difficult to name'],
    needs: ['Safety and harmony', 'Time and space to process', 'Respect for independence', 'Clear, low-pressure communication', 'Appreciation and intellectual connection'],
    expectations: ['Space will be respected without punishment', 'Each person can meet many of their own needs', 'Conflict will not consume the relationship', 'Requests will be clear, practical, and contained'],
    triggers: ['Feeling controlled or pressured', 'Emotional urgency', 'Repeated demands for immediate disclosure', 'Criticism or disrespect', 'A boundary being ignored'],
    communication: ['May communicate more through actions than words', 'Can become brief, logical, or indirect under stress', 'May avoid conflict or try to end it quickly', 'May need private processing before discussing feelings'],
    coping: ['Withdrawing to decompress', 'Stonewalling or going quiet', 'Minimizing feelings and needs', 'Over-relying on work, screens, food, alcohol, gaming, or other comforts', 'Passive resistance or delayed engagement'],
    secureAlternatives: ['State the need for space and name a return time', 'Share one honest feeling before solving the problem', 'Differentiate healthy independence from isolation', 'Let support in through small, specific requests'],
    growth: ['Name the need for space without disappearing', 'Practice sharing one layer more than feels automatic', 'Return to repair at a specific time', 'Allow interdependence without treating it as loss of self'],
  },
  fearful: {
    name: 'Fearful Avoidant', shortName: 'Fearful Avoidant',
    essence: 'You may deeply want closeness while also experiencing it as risky. Your system can move between reaching for connection and protecting itself through distance, especially when trust or safety feels uncertain.',
    rootCause: 'This pattern often forms when closeness was both deeply wanted and connected with fear, unpredictability, betrayal, or powerlessness. Your system learned two protective moves—reach for safety and retreat from danger—so it may alternate between them quickly.',
    strengths: ['Deep, perceptive, and emotionally sensitive', 'Resilient and courageous', 'Generous, nurturing, and empathetic', 'Strong awareness of nuance and trust', 'Passionate and capable of profound connection'],
    coreWounds: ['I may be betrayed or abandoned', 'I am unsafe when I lose control', 'I may be trapped, powerless, or humiliated', 'I am unworthy, weak, or not good enough'],
    fears: ['Betrayal or deception', 'Being trapped, controlled, or powerless', 'Being publicly shamed or seen as “bad”', 'Being emotionally attacked or abandoned'],
    emotions: ['Fear and anxiety', 'Anger and hurt', 'Overwhelm and frustration', 'Guilt or shame'],
    needs: ['Trust and emotional depth', 'Predictability and patient pacing', 'Independence alongside intimacy', 'Respectful, explicit boundaries', 'Presence, passion, and growth'],
    expectations: ['Trust will not be broken', 'A partner will consistently show that you are wanted', 'Independence will be respected', 'Your thoughts, feelings, and perceptions will be taken seriously'],
    triggers: ['Mixed signals or secrecy', 'Feeling trapped or abandoned', 'Disrespect or dismissal', 'Sudden changes or pressure', 'Boundary violations or loss of control'],
    communication: ['May explain intensely and notice subtle inconsistencies', 'Can move from agreeable to confrontational when threatened', 'Wants emotional depth but may limit vulnerability', 'May fear appearing weak or giving another person leverage'],
    coping: ['Reaching for connection and then withdrawing', 'Testing loyalty or investigating for certainty', 'Fight, flight, freeze, or people-pleasing', 'Stonewalling, criticism, or emotional volatility', 'Using isolation or comforts to escape overwhelm'],
    secureAlternatives: ['Slow the reach-withdraw cycle before making a decision', 'Ask for paced connection and clear facts', 'Separate present cues from earlier danger', 'Use boundaries before distress becomes an explosion'],
    growth: ['Build trust through small, consistent experiences', 'Replace all-or-nothing decisions with paced choices', 'Practice direct requests without testing', 'Develop regulation skills that work before and during conflict'],
  },
};

export type AssessmentScores = {
  anxiety: number;
  avoidance: number;
  secureCapacity: number;
  alignments: Record<ProfileKey, number>;
  ranked: ProfileKey[];
  primary: ProfileKey;
  secondary: ProfileKey;
  isBlend: boolean;
  domainScores: Record<Domain, number>;
};

const clamp = (value: number) => Math.max(0, Math.min(100, Math.round(value)));

export function scoreAssessment(answers: number[]): AssessmentScores {
  if (answers.length !== questions.length || answers.some((answer) => answer < 1 || answer > 5)) {
    throw new Error('All 32 questions require an answer from 1 to 5.');
  }

  const normalized = questions.map((question, index) => {
    const value = question.reverse ? 6 - answers[index] : answers[index];
    return ((value - 1) / 4) * 100;
  });

  const meanForAxis = (axis: Axis) => {
    const values = normalized.filter((_, index) => questions[index].axis === axis);
    return clamp(values.reduce((sum, value) => sum + value, 0) / values.length);
  };

  const anxiety = meanForAxis('anxiety');
  const avoidance = meanForAxis('avoidance');
  const secureCapacity = meanForAxis('secure');

  const alignments: Record<ProfileKey, number> = {
    secure: clamp(((100 - anxiety) + (100 - avoidance) + secureCapacity) / 3),
    anxious: clamp((anxiety + (100 - avoidance) + (100 - secureCapacity)) / 3),
    dismissive: clamp(((100 - anxiety) + avoidance + (100 - secureCapacity)) / 3),
    fearful: clamp((anxiety + avoidance + (100 - secureCapacity)) / 3),
  };
  const ranked = (Object.keys(alignments) as ProfileKey[]).sort((a, b) => alignments[b] - alignments[a]);

  const domains = ['closeness', 'trust', 'needs', 'communication', 'conflict', 'boundaries', 'regulation', 'repair'] as Domain[];
  const domainScores = Object.fromEntries(domains.map((domain) => {
    const values = normalized.filter((_, index) => questions[index].domain === domain);
    return [domain, clamp(values.reduce((sum, value) => sum + value, 0) / values.length)];
  })) as Record<Domain, number>;

  return {
    anxiety,
    avoidance,
    secureCapacity,
    alignments,
    ranked,
    primary: ranked[0],
    secondary: ranked[1],
    isBlend: alignments[ranked[0]] - alignments[ranked[1]] <= 8,
    domainScores,
  };
}
