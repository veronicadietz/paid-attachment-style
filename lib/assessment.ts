export type Axis = 'anxiety' | 'avoidance' | 'secure';
export type Domain = 'closeness' | 'trust' | 'needs' | 'communication' | 'conflict' | 'boundaries' | 'regulation' | 'repair';
export type ProfileKey = 'secure' | 'anxious' | 'dismissive' | 'fearful';
export const PROFILE_DISPLAY_ORDER: ProfileKey[] = ['anxious', 'dismissive', 'fearful', 'secure'];

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
  { id: 22, text: "I minimize my needs because I don't want to come across as needy.", axis: 'avoidance', domain: 'needs' },
  { id: 23, text: 'I can receive care without immediately questioning it or pulling away.', axis: 'avoidance', domain: 'trust', reverse: true },
  { id: 24, text: 'Even in a stable relationship, I sometimes expect to be left or replaced.', axis: 'anxiety', domain: 'trust' },
  { id: 25, text: 'When I am hurt, distance feels more manageable than working through it together.', axis: 'avoidance', domain: 'repair' },
  { id: 26, text: 'I can name what I feel and make a clear request.', axis: 'secure', domain: 'needs' },
  { id: 27, text: 'I become preoccupied with what I mean to someone when I perceive they are becoming less available to me.', axis: 'anxiety', domain: 'closeness' },
  { id: 28, text: 'I find it difficult to stay present when someone is upset with me.', axis: 'avoidance', domain: 'conflict' },
  { id: 29, text: 'I can take space during conflict and clearly communicate when I will return.', axis: 'secure', domain: 'repair' },
  { id: 30, text: 'Strong emotions can make me act before I have had time to understand what I need.', axis: 'anxiety', domain: 'regulation' },
  { id: 31, text: 'People close to me have told me they find me hard to reach emotionally, at times.', axis: 'avoidance', domain: 'communication' },
  { id: 32, text: 'I can let closeness develop gradually without chasing it or resisting it.', axis: 'anxiety', domain: 'closeness', reverse: true },
];

export type AttachmentProfile = {
  name: string;
  shortName: string;
  essence: string;
  introduction: string;
  characteristics: string[];
  primaryCoreWound: string;
  otherCoreWounds: string[];
  emotionalPatterns: string[];
  fears: string[];
  personalityNeeds: string[];
  relationshipNeeds: string[];
  conflictPatterns: string[];
  boundaries: string[];
  communicationStrategies: string[];
  copingMechanisms: string[];
  expectations: string[];
};

export const profiles: Record<ProfileKey, AttachmentProfile> = {
  secure: {
    name: 'Secure Attachment', shortName: 'Secure Attachment',
    essence: 'You tend to feel comfortable with both closeness and independence. You generally trust that you are worthy of love, that others can be available, and that relationships can survive conflict and big emotions.',
    introduction: 'Secure attachment generally develops when a child experiences their caregiver as emotionally available, responsive, and predictable most of the time. When they\'re upset, someone notices. When they reach for comfort, they\'re usually met with warmth rather than rejection or dismissal. Their feelings are allowed to exist, and they learn that needing other people doesn\'t make them needy or "too much." Over time, the child internalizes a powerful message: I am worthy of love, and the people I love can be trusted to be there for me. They learn that relationships can survive conflict, separation, and big emotions. As adults, they tend to feel comfortable with both closeness and independence because neither one feels particularly threatening.',
    characteristics: ['Emotionally regulated', 'Balanced', 'Excellent at sharing boundaries', 'Clear on your needs', 'You do not mind conflict but do not end up in unnecessary conflict', 'You can often focus or redirect your mind away from core wounds, fears, unmet needs, and resentments', 'Good at speaking up for yourself and asking for an opportunity or a raise', 'Good at working with others', 'Strong communicator', 'Can hear and understand multiple people’s perspectives', 'Not quick to be involved in drama and good at trading and staying away from it', 'Feel worthy of asking for your needs and sharing your opinion', 'Naturally more comfortable sharing feelings and opinions with others', 'Active listener', 'Less likely to take things personally', 'Trusting', 'Stable', 'Trustworthy', 'Honest'],
    primaryCoreWound: 'No dominant attachment core wound',
    otherCoreWounds: ['Your core wounds are more likely to be based on individual experiences from the past rather than overarching themes based on attachment style'],
    emotionalPatterns: ['More optimistic', 'Calm', 'Open', 'Joyful', 'Present'],
    fears: ['Whatever is unresolved from your past is less likely to fall into a patterned category', 'Disrespect, toxicity, or unfairness are outside your comfort zone'],
    personalityNeeds: ['Stability', 'Harmony', 'Growth', 'Connection', 'Empowerment', 'Clarity', 'Certainty', 'Open to change in a healthy amount', 'Balance (work-life balance)', 'To be heard', 'Enjoyment'],
    relationshipNeeds: ['Stability', 'Harmony', 'Connection', 'Growth', 'Balance', 'Clear and honest communication'],
    conflictPatterns: ['Very much value working through conflict', 'Do not like to leave things unresolved', 'Feel relatively comfortable working through conflict though you do not seek it out', 'Communicate effectively', 'Do not take things as personally', 'Good at asserting boundaries', 'Do not mind being vulnerable', 'Can share feelings', 'Can validate the other person’s feelings and perspectives well', 'Will be respectful in conflict-oriented situations', 'Want both parties to feel happy about the resolution', 'Fair'],
    boundaries: ['Assertive', 'Respectful of self and others', 'Clear at communicating', 'Authentic', 'Fairly consistent at communicating boundaries', 'Validate others’ emotions and perspectives', 'Attuned to self', 'Take self into consideration', 'Feel worthy of setting boundaries'],
    communicationStrategies: ['Often fair', 'Considerate', 'Conscientious', 'Open when communicating', 'Good at listening to others and taking their opinions into consideration', 'Have no problem asserting themselves if they feel it is the right thing', 'Value their own opinions and will share them with others', 'Will speak up if they feel there is a problem', 'Want everyone to get along and be a team', 'Respectful', 'Generally quite patient'],
    copingMechanisms: ['Will speak up', 'Will see needs through', 'Will go to a partner to work things out', 'Can also self-soothe well', 'Will try to deal with things more immediately and dislike repressing', 'May seek external help or support from family and friends', 'Will take time to reflect when needed'],
    expectations: ['A partner should want to resolve things', 'Conflict is normal but should not be excessive', 'Both parties should be able to be heard, understood, and seen in a relationship', 'Interdependence', 'Partners can emotionally rely on each other', 'Partners will work through things when faced with challenges', 'Difficult moments happen in relationships, but they will work as a team through them', 'A relationship should extend to all areas of life'],
  },
  anxious: {
    name: 'Anxious Preoccupied', shortName: 'Anxious Preoccupied',
    essence: 'You may stay highly tuned in to shifts in mood, distance, and attention because connection can feel uncertain. This can show up as overthinking, reassurance-seeking, fear of abandonment, and feeling especially activated when someone you love pulls away.',
    introduction: 'Anxious attachment often develops when love and emotional availability feel inconsistent or unpredictable. Sometimes a caregiver is warm, attentive, and deeply connected - and other times they may be distracted, unavailable, overwhelmed, or difficult to reach emotionally. The child doesn\'t know which version of connection they\'re going to get, so they learn to stay very tuned in to the caregiver. They may become especially sensitive to changes in mood, tone, distance, or attention because noticing those shifts helps them preserve connection. The nervous system essentially learns, I need to stay close and pay attention, because connection could disappear. As adults, this can show up as overthinking, reassurance-seeking, fear of abandonment, and feeling especially activated when someone they love begins to pull away.',
    characteristics: ['Charismatic', 'Thoughtful', 'Kind', 'Attentive in close relationships', 'Warm', 'Likeable', 'Move quickly in relationships of all types', 'Friendly', 'Flexible', 'Supportive', 'Collaborative', 'Trusting of connection', 'Prioritize relationships', 'Value social interaction and inclusion'],
    primaryCoreWound: 'I will be abandoned',
    otherCoreWounds: ['I am unsafe', 'I will be alone', 'I am not good enough', 'I am/will be rejected', 'I am/will be unloved', 'I am excluded', 'I am/will be disliked', 'I am bad'],
    emotionalPatterns: ['Lonely', 'Insecure', 'Fearful', 'Anxious', 'Worry', 'Desperation', 'Regret', 'Sad'],
    fears: ['Not being good enough', 'Being rejected', 'Failing', 'Being disliked or excluded', 'Getting in trouble or being seen as “bad”', 'Being abandoned in some way, such as being fired out of the blue or everyone turning on you'],
    personalityNeeds: ['Validation', 'Encouragement', 'To feel seen and heard', 'To feel valued', 'Respond significantly better to positive reinforcement', 'To feel important', 'To feel included', 'To express your opinions', 'To feel a sense of certainty in life'],
    relationshipNeeds: ['Love and intimacy', 'Closeness and connection', 'Validation and reassurance', 'Approval and importance', 'Certainty and consistency', 'Presence - to feel seen, heard, and understood', 'Inclusion and community', 'Collaboration and teamwork'],
    conflictPatterns: ['Often avoid conflict through people-pleasing', 'If there is conflict, you may work to resolve it between people', 'May become more focused on interpersonal conflict than work conflict', 'Conflict impacts you deeply and can create significant distress', 'Flexible and willing to discuss and resolve conflict', 'Often willing to communicate if a conflict has already taken place', 'Effective compromiser', 'Likely to put your needs for approval from others ahead of your own preferred outcome', 'Sometimes try to manage others’ feelings around conflict above your own'],
    boundaries: ['Often without boundaries in close relationships', 'May overextend or emotionally abandon yourself when others put up boundaries because this is not part of the way you learned to attach to others', 'Feel afraid of abandonment if you set boundaries', 'Self-sabotage boundaries because you prioritize proximity', 'Often do not realize the importance of healthy boundaries in relationships'],
    communicationStrategies: ['Often from the point of view of how you feel', 'Over-explain things at times', 'Communicate fairly directly', 'Can be indirect at times to avoid disapproval or interpersonal conflict', 'Often very agreeable and use agreeable language', 'Often like to discuss feelings and perceptions about things', 'Good at sharing your internal world with others and being open', 'Vulnerable'],
    copingMechanisms: ['Clinginess - trying to maintain proximity', 'Trying to gently provoke the expression of care from a partner, such as making them jealous to provoke a response', 'Testing', 'Seeking validation', 'Attention or approval-seeking behaviors', 'Expression of panic, anxiety, or neediness', 'Criticism of partner', 'Fawning'],
    expectations: ['My partner should soothe my emotions', 'My partner should give me certainty at all times', 'My partner should know how I feel and read my mind', 'My partner is responsible for meeting all of my needs, and vice versa', 'My partner should be available', 'The romantic relationship should be the highest priority', 'Romantic gestures in a relationship should be frequent'],
  },
  dismissive: {
    name: 'Dismissive Avoidant Attachment', shortName: 'Dismissive Avoidant Attachment',
    essence: 'You may feel safest relying on yourself and keeping emotional needs private. This can show up as fierce independence, discomfort with vulnerability, and pulling away when relationships begin to feel emotionally intense.',
    introduction: 'Dismissive-avoidant attachment often develops when a child learns that their emotional needs won\'t reliably be met - or that expressing those needs isn\'t particularly welcome. They may grow up in a home where independence is highly valued, emotions aren\'t talked about much, or vulnerability is minimized with messages like "you\'re fine," "stop crying," or "go figure it out." So the child adapts by learning to soothe themselves and rely less and less on other people. Eventually, they may stop reaching altogether - not because they don\'t need connection, but because needing it has come to feel uncomfortable or unsafe. The nervous system learns, I\'m safest when I take care of myself. In adulthood, this can look like fierce independence, discomfort with vulnerability, and pulling away when relationships begin to feel emotionally intense.',
    characteristics: ['Intellectual', 'Conflict-avoidant', 'Practical', 'Grounded in your approach', 'Do not let emotions take over', 'Independent', 'Think things through carefully', 'Enjoy endless learning', 'Value security', 'Prioritize harmony and practicality in relationships', 'Deeply care about autonomy', 'Can avoid things instead of approaching them head on', 'Good at speaking up for survival needs', 'Express boundaries', 'Comfortable asking for what you feel you deserve', 'Resilient', 'Work well under pressure', 'Analytical', 'May shut down when feeling stressed', 'Take criticism very personally', 'Slow to warm up in relationships', 'Guarded'],
    primaryCoreWound: 'I am defective',
    otherCoreWounds: ['I am unsafe', 'I am trapped', 'I am helpless/incapable', 'I am weak if vulnerable', 'I am not good enough', 'I am/will be powerless', '“Why bother” belief response'],
    emotionalPatterns: ['Shame', 'Low-level anxiety', 'Irritation', 'Impatience', 'Frustration', 'Overwhelm', 'Numbness', 'Exhaustion/depletion'],
    fears: ['Being shamed', 'Being criticized and hurt by criticism', 'Being “unsafe”', 'Having to jump too far outside of your comfort zone', 'Having to work with others too much and it draining your energy', 'Seeming incompetent', 'Having conflict', 'Feeling trapped or having to over-commit to things'],
    personalityNeeds: ['To feel safe', 'Intellectual stimulation', 'An environment with consistent learning', 'Positive reinforcement and words of affirmation', 'To feel valued', 'To feel acknowledged', 'Freedom to be independent and autonomous', 'To feel like your opinions are heard and taken into consideration', 'A certain degree of space', 'Prefer not to work intensively with people or in teams', 'To feel that if you speak up, your stance on a topic will be valued', 'To feel respected', 'To feel like the people around you are logical and rational', 'To feel like people around you are direct'],
    relationshipNeeds: ['Safety', 'Harmony', 'Acceptance', 'Trust', 'Comfort', 'Learning/intellectual connection', 'Appreciation and acknowledgement', 'Independence', 'Freedom', 'Understanding', 'To feel wanted'],
    conflictPatterns: ['Often avoid conflict', 'Will internalize frustrations more often than not', 'Will sometimes pretend you agree and then do what you want anyway as an avoidance strategy', 'May even prefer to stop talking to people altogether rather than approach conflict', 'Are careful not to use awful words in conflict and will try to remain neutral', 'Can remain fairly non-emotional and grounded if you do enter into conflict', 'Rational', 'Will try to see both sides', 'Will analyze situations until you feel like you have come up with the most rational approach'],
    boundaries: ['Excellent at setting large, strong boundaries', 'Assume others are good at setting their boundaries and will speak up for themselves too', 'May struggle to set many small boundaries', 'May not know how to communicate, negotiate, or set boundaries in romantic relationships around emotional situations', 'May disconnect or become avoidant if you feel that a boundary has been crossed', 'May assume others do not understand you and your boundaries', 'May set boundaries via actions more than via words'],
    communicationStrategies: ['Communicate more actions than words', 'May communicate very indirectly over text when trying to avoid conflict', 'Avoid conflict or try to get out of it as quickly as possible, sometimes without resolution', 'Repress feelings and may minimize others’ feelings incidentally', 'Often avoid anything too personal or private and vulnerable', 'Do not share needs enough outside of survival needs', 'Will sometimes pretend you are doing better than you are to avoid showing weakness', 'May engage in more surface conversation until comfortable'],
    copingMechanisms: ['Withdrawing to decompress', 'Stonewalling', 'Ignoring or dismissing', 'Passive aggression', 'Numbing', 'Avoiding', 'Excess of creature comforts, such as binging on TV, food, gaming, alcohol, or gambling'],
    expectations: ['My partner should always be understanding when I need space', 'Conflict should not be occurring in this relationship', 'Being with a partner should not mean making compromises to keep the relationship fully untouched', 'My partner and I should each meet our own needs and then come together without too much investment', 'My partner should not soothe through me or emotionally rely on me', 'My partner should be the perfect match, with flaw-finding sometimes used subconsciously as a strategy to avoid conflict', 'My level of independence should not change versus healthy interdependence'],
  },
  fearful: {
    name: 'Fearful Avoidant Attachment', shortName: 'Fearful Avoidant Attachment',
    essence: 'You may deeply want love and connection while also experiencing closeness as unsafe. This can create a push-pull pattern: craving intimacy, then withdrawing or shutting down when connection feels vulnerable.',
    introduction: 'Fearful-avoidant attachment often forms when the person a child depends on for safety is also, at times, a source of fear, unpredictability, emotional chaos, or hurt. The child is caught in an impossible bind: I need you to feel safe, but I don\'t always feel safe with you. They may desperately want comfort and connection while simultaneously learning that getting too close can lead to pain. Their nervous system adapts by becoming highly alert to both abandonment and intimacy. This creates the push-pull pattern we often see later in relationships - come close to me, but not too close. As adults, they may crave deep love and connection, yet suddenly withdraw, shut down, or become frightened once that connection feels vulnerable. Underneath both sides of the pattern is often the same longing: I want to feel safe enough to love and be loved.',
    characteristics: ['Present', 'Hypervigilant', 'Charming', 'Likeable', 'Generous in close relationships', 'Intense', 'Hot and cold in close relationships', 'Suspicious', 'Hypervigilant', 'Extremist at times', 'All-or-nothing thinker', 'Emotional', 'Deep', 'Nurturing', 'Resilient', 'Headstrong'],
    primaryCoreWound: 'I will be betrayed',
    otherCoreWounds: ['I am unsafe', 'I am unworthy', 'I am bad', 'I am/will be abandoned', 'I am trapped', 'I am helpless/powerless/out of control', 'I am not good enough', 'I am disrespected', 'I am/will be unloved', 'I am weak'],
    emotionalPatterns: ['Angry', 'Hurt', 'Frustrated when feeling trapped', 'Overwhelmed', 'Pressured', 'Guilty', 'Ashamed', 'Anxious', 'Offended'],
    fears: ['Being betrayed', 'Feeling unworthy', 'Feeling trapped, helpless, or powerless', 'Being publicly shamed', 'Getting in trouble or being seen as “bad”', 'Being verbally or emotionally attacked with a strong “fight back” response'],
    personalityNeeds: ['Growth/opportunity', 'To feel empowered', 'To feel seen and heard', 'To feel connected', 'Respond well to criticism if it is delivered respectfully', 'To feel understood by others', 'To express your opinions', 'To feel respected by others', 'To feel emotionally connected'],
    relationshipNeeds: ['Emotional depth', 'Passion', 'Trust', 'Presence', 'Safety', 'Novelty', 'Growth', 'Independence', 'Freedom', 'Intimacy', 'To feel wanted'],
    conflictPatterns: ['Oscillate from people-pleasing to wanting to stand up for yourself at times', 'Sometimes jump the gun and make assumptions about a situation before completely investigating it', 'Can act from a place of panic and volatility at times', 'Feel a need to over-defend yourself in conflict at times', 'Can become spiteful if you feel hurt', 'Ultimately, once the dust has settled, you are often excellent at empathizing and seeing another’s perspective', 'Like to handle things directly or may become avoidant', 'Likely to put your need for approval ahead of your own preferred outcome at times', 'At times try to manage others’ feelings around conflict above your own', 'Can struggle with guilt post-conflict', 'Sometimes can be a bit too sharp with your words'],
    boundaries: ['Often without boundaries in close relationships', 'Eventually become frustrated with feeling taken advantage of, partially due to lack of boundaries, and at times lash out, feel guilty, and return to being boundaryless or over-giving', 'May feel like you are good at setting boundaries, but if you look closely you may set boundaries almost exclusively from a place of charged emotion or anger'],
    communicationStrategies: ['Over-explain things at times', 'Communicate very directly', 'Can oscillate from being agreeable to confrontational', 'Often like to discuss feelings and perceptions about things', 'Sometimes avoid anything too personal, such as how you feel, anything private, or vulnerable', 'Do not share needs enough outside of survival needs', 'Will sometimes pretend you are doing better than you are to avoid showing weakness'],
    copingMechanisms: ['Testing', 'Withdrawing to decompress', 'Stonewalling', 'Spitefulness', 'Criticism', 'Emotional volatility', 'Fight, flight, freeze, and fawning', 'Excess of creature comforts, such as binging on TV, food, gaming, alcohol, or gambling'],
    expectations: ['Nobody should ever break their trust', 'No lying, ever', 'A romantic partner should be as giving as they are', 'A romantic partner should always respect their independence', 'They should always feel wanted by their partner', 'Partner should always make them feel wanted', 'Partner should be faithful in thought, emotion, opinion, and action'],
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

export function normalizeProfileShares(scores: AssessmentScores) {
  const total = PROFILE_DISPLAY_ORDER.reduce((sum, key) => sum + scores.alignments[key], 0) || 1;
  const exact = PROFILE_DISPLAY_ORDER.map((key) => ({ key, value: scores.alignments[key] / total * 100 }));
  const result = Object.fromEntries(exact.map(({ key, value }) => [key, Math.floor(value)])) as Record<ProfileKey, number>;
  let remaining = 100 - Object.values(result).reduce((sum, value) => sum + value, 0);
  exact.sort((a, b) => (b.value - Math.floor(b.value)) - (a.value - Math.floor(a.value)));
  for (let index = 0; index < remaining; index += 1) result[exact[index].key] += 1;
  return result;
}

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
    // The paid deliverable always identifies one definitive primary style.
    // Secondary scores remain available for internal context but never create
    // a second "winner" or a blended report.
    isBlend: false,
    domainScores,
  };
}
