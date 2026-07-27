/**
 * Per-theme content for the gym storefront preview.
 *
 * Each of the 10 gym themes gets its own hero, class list, coaches, gallery,
 * facility features, pricing tiers, testimonials, stats and walkthrough video —
 * so switching theme changes the whole page, not just the accent colour.
 */

const img = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?w=${w}&auto=format&fit=crop&q=80`;

export interface GymClass {
  name: string;
  meta: string;
  img: string;
}
export interface GymCoach {
  n: string;
  r: string;
  img: string;
}
export interface GymPlan {
  name: string;
  m: number;
  y: number;
  feats: string[];
  pop?: boolean;
}
export interface GymReview {
  n: string;
  r: string;
  q: string;
}
export interface GymFeature {
  i: string;
  t: string;
  d: string;
}

export interface GymThemeContent {
  eyebrow: string;
  headline: string;
  sub: string;
  primaryCta: string;
  secondaryCta: string;
  portalLabel: string;
  joinLabel: string;
  heroImage: string;
  videoUrl: string;
  videoTitle: string;
  videoSub: string;
  classesTitle: string;
  classesSub: string;
  classes: GymClass[];
  featuresTitle: string;
  features: GymFeature[];
  coachesTitle: string;
  coachRole: string;
  coaches: GymCoach[];
  gallery: string[];
  galleryTitle: string;
  stats: { v: string; l: string }[];
  plans: GymPlan[];
  reviews: GymReview[];
  ctaHeadline: string;
  ctaSub: string;
  navLinks: string[];
  portalNav: string[];
  prs: { n: string; v: string; p: number }[];
}

const V = 'https://storage.googleapis.com/gtv-videos-bucket/sample';

/* ------------------------------------------------------------------ */

const CONTENT: Record<string, GymThemeContent> = {
  /* 1 ---------------------------------------------------- VOLT APEX */
  'gym-volt-apex': {
    eyebrow: 'Athletic Performance Lab',
    headline: 'Train like\nthe season\nstarts tomorrow.',
    sub: 'Sports-science backed programming, force-plate testing and speed work built for athletes who compete.',
    primaryCta: 'Book Performance Test',
    secondaryCta: 'See Programmes',
    portalLabel: 'Athlete Portal',
    joinLabel: 'Join the Squad',
    heroImage: img('photo-1517838277536-f5f99be501cd', 1600),
    videoUrl: `${V}/ForBiggerJoyrides.mp4`,
    videoTitle: 'Inside the performance lab',
    videoSub: 'Force plates, timing gates, and a 40m indoor sprint track.',
    classesTitle: 'Performance Blocks',
    classesSub: 'Periodised training blocks, not random workouts.',
    classes: [
      { name: 'Speed & Acceleration', meta: '60 min · Track', img: img('photo-1476480862126-209bfaa8edc8') },
      { name: 'Max Strength Block', meta: '75 min · Platform', img: img('photo-1581009146145-b5ef050c2e1e') },
      { name: 'Power & Plyometrics', meta: '50 min · Turf', img: img('photo-1517836357463-d25dfeac3438') },
      { name: 'Conditioning Engine', meta: '45 min · Erg Bay', img: img('photo-1538805060514-97d9cc17730c') },
      { name: 'Return to Sport', meta: '60 min · 1:1', img: img('photo-1571019614242-c5c5dee9f50b') },
      { name: 'Testing & Screening', meta: '90 min · Lab', img: img('photo-1552674605-db6ffd4facb5') },
    ],
    featuresTitle: 'Built for measurable gains',
    features: [
      { i: '📈', t: 'Force Plate Testing', d: 'Quarterly jump and asymmetry testing with a written report.' },
      { i: '🏃', t: '40m Indoor Track', d: 'Timing gates and sled lanes for year-round speed work.' },
      { i: '🧊', t: 'Recovery Bay', d: 'Contrast plunge, compression boots and soft-tissue therapists.' },
    ],
    coachesTitle: 'Your performance staff',
    coachRole: 'Performance Staff',
    coaches: [
      { n: 'Vikram Sethi', r: 'Head of Performance', img: img('photo-1567013127542-490d757e51fc', 500) },
      { n: 'Rhea Kapoor', r: 'Strength & Power', img: img('photo-1594381898411-846e7d193883', 500) },
      { n: 'Daniel Osei', r: 'Speed & Agility', img: img('photo-1500648767791-00dcc994a43e', 500) },
      { n: 'Meera Nair', r: 'Rehab & Screening', img: img('photo-1544005313-94ddf0286df2', 500) },
    ],
    galleryTitle: 'The training floor',
    gallery: [
      'photo-1540497077202-7c8a3999166f',
      'photo-1517838476312-10d79c07750d',
      'photo-1534438327276-14e5300c3a48',
      'photo-1552674605-db6ffd4facb5',
      'photo-1476480862126-209bfaa8edc8',
      'photo-1581009146145-b5ef050c2e1e',
    ].map((i) => img(i, 700)),
    stats: [
      { v: '240+', l: 'Athletes Coached' },
      { v: '40m', l: 'Indoor Sprint Track' },
      { v: '12', l: 'Performance Staff' },
      { v: '4x', l: 'Testing / Year' },
    ],
    plans: [
      { name: 'Foundation', m: 2499, y: 24990, feats: ['Full facility access', 'Group performance blocks', 'Quarterly testing'] },
      { name: 'Competitor', m: 4999, y: 49990, feats: ['Everything in Foundation', 'Individual programming', 'Monthly force-plate test', 'Recovery bay access'], pop: true },
      { name: 'Pro Squad', m: 8999, y: 89990, feats: ['Everything in Competitor', '8 one-to-one sessions', 'Physio screening', 'Season planning'] },
    ],
    reviews: [
      { n: 'Karan Bhatia', r: 'Semi-pro footballer', q: 'Shaved 0.18s off my 30m in one block. The testing means nothing is guesswork.' },
      { n: 'Aditi Rao', r: 'National swimmer', q: 'The rehab staff got my shoulder back without missing a competition window.' },
      { n: 'Sameer Khan', r: 'Rugby · 2 seasons', q: 'Programming actually periodises around my fixture list. First gym that has done that.' },
    ],
    ctaHeadline: 'Get tested. Get a plan.',
    ctaSub: 'Book a free movement screen and force-plate baseline this week.',
    navLinks: ['Programmes', 'Staff', 'Testing', 'Membership'],
    portalNav: ['Overview', 'My Blocks', 'Test Results', 'Session Booking', 'Recovery', 'Membership'],
    prs: [
      { n: 'Back Squat', v: '165 kg', p: 94 },
      { n: '30m Sprint', v: '3.94 s', p: 88 },
      { n: 'CMJ Height', v: '54 cm', p: 79 },
      { n: 'Yo-Yo IR2', v: 'L21.4', p: 71 },
    ],
  },

  /* 2 ------------------------------------------------ CARBON STEALTH */
  'gym-stealth-carbon': {
    eyebrow: 'Hardcore Barbell Club',
    headline: 'No mirrors.\nNo music.\nJust plates.',
    sub: 'A stripped-back barbell gym for people who already know what they came to do. Calibrated plates, chalk allowed, 24/7 keycard.',
    primaryCta: 'Claim a Key',
    secondaryCta: 'See the Floor',
    portalLabel: 'Member Access',
    joinLabel: 'Get Keycard',
    heroImage: img('photo-1583454110551-21f2fa2afe61', 1600),
    videoUrl: `${V}/ForBiggerBlazes.mp4`,
    videoTitle: 'Twelve platforms. One rule.',
    videoSub: 'Rack your weights. That is the whole handbook.',
    classesTitle: 'What We Run',
    classesSub: 'Barbell-first. Everything else is optional.',
    classes: [
      { name: 'Powerlifting', meta: '90 min · Platform', img: img('photo-1581009146145-b5ef050c2e1e') },
      { name: 'Strongman Yard', meta: '75 min · Outdoor', img: img('photo-1534438327276-14e5300c3a48') },
      { name: 'Olympic Lifting', meta: '75 min · Platform', img: img('photo-1517836357463-d25dfeac3438') },
      { name: 'Accessory Hypertrophy', meta: '60 min · Floor', img: img('photo-1526506118085-60ce8714f8c5') },
      { name: 'Grip & Forearm', meta: '30 min · Rig', img: img('photo-1541534741688-6078c6bfb5c5') },
      { name: 'Open Floor', meta: '24/7 · Keycard', img: img('photo-1517838476312-10d79c07750d') },
    ],
    featuresTitle: 'The equipment list',
    features: [
      { i: '🏋️', t: '12 Competition Platforms', d: 'Eleison and Rogue bars, calibrated kilo plates, jerk blocks.' },
      { i: '🔗', t: 'Strongman Yard', d: 'Yoke, farmers handles, atlas stones and a 30m sled track.' },
      { i: '🔑', t: '24/7 Keycard Access', d: 'Train at 4am if that is when it happens. No staffed-hours rule.' },
    ],
    coachesTitle: 'The people who run the floor',
    coachRole: 'Floor Staff',
    coaches: [
      { n: 'Marcus Vaughn', r: 'Powerlifting Coach', img: img('photo-1567013127542-490d757e51fc', 500) },
      { n: 'Tanvi Deshpande', r: 'Olympic Lifting', img: img('photo-1594381898411-846e7d193883', 500) },
      { n: 'Owen Blake', r: 'Strongman', img: img('photo-1500648767791-00dcc994a43e', 500) },
      { n: 'Priya Menon', r: 'Hypertrophy', img: img('photo-1544005313-94ddf0286df2', 500) },
    ],
    galleryTitle: 'The floor',
    gallery: [
      'photo-1583454110551-21f2fa2afe61',
      'photo-1526506118085-60ce8714f8c5',
      'photo-1541534741688-6078c6bfb5c5',
      'photo-1534258936925-c58bed479fcb',
      'photo-1550345332-09e3ac987658',
      'photo-1546483875-ad9014c88eba',
    ].map((i) => img(i, 700)),
    stats: [
      { v: '12', l: 'Comp Platforms' },
      { v: '24/7', l: 'Keycard Access' },
      { v: '380 kg', l: 'House Deadlift PR' },
      { v: '0', l: 'Mirrors' },
    ],
    plans: [
      { name: 'Keycard', m: 1799, y: 17990, feats: ['24/7 floor access', 'Chalk provided', 'Locker + shower'] },
      { name: 'Barbell Club', m: 3299, y: 32990, feats: ['Everything in Keycard', 'Weekly coached session', 'Meet-prep programming', 'Strongman yard'], pop: true },
      { name: 'Meet Prep', m: 5999, y: 59990, feats: ['Everything in Barbell Club', 'Individual meet cycle', 'Handler on comp day', 'Video technique review'] },
    ],
    reviews: [
      { n: 'Jaskirat S.', r: 'Member · 4 years', q: 'No queue for a rack, ever. Bars are true and the plates are calibrated. That is all I want.' },
      { n: 'Elena Cruz', r: 'Powerlifter', q: 'Hit a 175kg deadlift in my first meet after ten months here. The coaching is blunt and it works.' },
      { n: 'Farhan Ali', r: 'Member · 2 years', q: 'The 24/7 access is the whole reason I can still train around night shifts.' },
    ],
    ctaHeadline: 'Come lift. Decide after.',
    ctaSub: 'One free session on the floor. No tour, no sales pitch.',
    navLinks: ['Training', 'Staff', 'Equipment', 'Membership'],
    portalNav: ['Overview', 'My Lifts', 'Programme', 'Meet Prep', 'Keycard', 'Membership'],
    prs: [
      { n: 'Deadlift', v: '245 kg', p: 100 },
      { n: 'Back Squat', v: '190 kg', p: 91 },
      { n: 'Bench Press', v: '132 kg', p: 84 },
      { n: 'Total', v: '567 kg', p: 93 },
    ],
  },

  /* 3 -------------------------------------------------- ZEN ESSENCE */
  'gym-zen-essence': {
    eyebrow: 'Yoga & Mindful Movement',
    headline: 'Breathe deeper.\nMove better.\nRest properly.',
    sub: 'Small classes, warm floors and teachers who actually adjust. Mats, props, tea and showers all provided.',
    primaryCta: 'Book a Class',
    secondaryCta: 'View Timetable',
    portalLabel: 'Student Login',
    joinLabel: 'Start Practising',
    heroImage: img('photo-1544367567-0f2fcb009e0b', 1600),
    videoUrl: `${V}/ForBiggerEscapes.mp4`,
    videoTitle: 'A morning in the studio',
    videoSub: 'Heated floors, natural light, and rooms capped at sixteen.',
    classesTitle: 'Our Practices',
    classesSub: 'Every class capped at sixteen so nobody gets missed.',
    classes: [
      { name: 'Vinyasa Flow', meta: '60 min · All levels', img: img('photo-1544367567-0f2fcb009e0b') },
      { name: 'Hot Yoga 40°', meta: '75 min · Heated', img: img('photo-1506126613408-eca07ce68773') },
      { name: 'Yin & Restore', meta: '75 min · Gentle', img: img('photo-1588286840104-8957b019727f') },
      { name: 'Pranayama & Breath', meta: '45 min · Seated', img: img('photo-1575052814086-f385e2e2ad1b') },
      { name: 'Mobility Lab', meta: '50 min · Strength', img: img('photo-1552196563-55cd4e45efb3') },
      { name: 'Sunrise Hatha', meta: '60 min · 06:30', img: img('photo-1571019613454-1cb2f99b2d8b') },
    ],
    featuresTitle: 'A studio built to slow down in',
    features: [
      { i: '🌿', t: 'Two Heated Rooms', d: 'Infrared floor heating, humidity control and blackout blinds.' },
      { i: '🧘', t: 'All Props Provided', d: 'Mats, blocks, bolsters, straps and blankets — arrive with nothing.' },
      { i: '🍵', t: 'Tea Room', d: 'Herbal tea, filtered water and a quiet space to sit after class.' },
    ],
    coachesTitle: 'Your teachers',
    coachRole: 'Teaching Faculty',
    coaches: [
      { n: 'Ananya Iyer', r: 'Vinyasa & Hatha', img: img('photo-1544005313-94ddf0286df2', 500) },
      { n: 'Leo Fernandes', r: 'Yin & Restore', img: img('photo-1500648767791-00dcc994a43e', 500) },
      { n: 'Kavya Reddy', r: 'Breath & Meditation', img: img('photo-1594381898411-846e7d193883', 500) },
      { n: 'Ishaan Gupta', r: 'Mobility & Strength', img: img('photo-1567013127542-490d757e51fc', 500) },
    ],
    galleryTitle: 'Inside the studio',
    gallery: [
      'photo-1506126613408-eca07ce68773',
      'photo-1588286840104-8957b019727f',
      'photo-1575052814086-f385e2e2ad1b',
      'photo-1552196563-55cd4e45efb3',
      'photo-1571019613454-1cb2f99b2d8b',
      'photo-1540555700478-4be289fbecef',
    ].map((i) => img(i, 700)),
    stats: [
      { v: '16', l: 'Max Class Size' },
      { v: '38', l: 'Classes / Week' },
      { v: '9', l: 'Certified Teachers' },
      { v: '40°', l: 'Hot Room' },
    ],
    plans: [
      { name: 'Drop In', m: 899, y: 8990, feats: ['4 classes per month', 'All props included', 'Tea room access'] },
      { name: 'Unlimited', m: 2199, y: 21990, feats: ['Unlimited classes', 'Workshop discounts', 'Guest pass monthly', 'Mat storage'], pop: true },
      { name: 'Teacher Track', m: 3899, y: 38990, feats: ['Everything in Unlimited', 'Monthly mentoring', '200hr TT credit', 'Assist opportunities'] },
    ],
    reviews: [
      { n: 'Divya S.', r: 'Student · 3 years', q: 'The adjustments are actually hands-on and thoughtful. My practice changed within months.' },
      { n: 'Thomas Lang', r: 'Student · 1 year', q: 'Came for the back pain, stayed for the yin classes. Sixteen people means you get seen.' },
      { n: 'Nisha Verma', r: 'Student · 6 months', q: 'Booking is one tap and the studio is spotless every single time.' },
    ],
    ctaHeadline: 'Your first class is free',
    ctaSub: 'Bring nothing. We have mats, props, towels and tea waiting.',
    navLinks: ['Classes', 'Teachers', 'Timetable', 'Pricing'],
    portalNav: ['Overview', 'My Classes', 'Book a Class', 'Workshops', 'Progress', 'Membership'],
    prs: [
      { n: 'Classes Attended', v: '148', p: 92 },
      { n: 'Longest Streak', v: '31 days', p: 86 },
      { n: 'Hot Yoga Sessions', v: '54', p: 68 },
      { n: 'Workshops', v: '7', p: 58 },
    ],
  },

  /* 4 --------------------------------------------------- IRON FORGE */
  'gym-iron-forge': {
    eyebrow: 'Classic Bodybuilding',
    headline: 'Build the\nphysique the\nold way.',
    sub: 'Hammer Strength, dumbbells to 70kg, and coaches who understand hypertrophy is a long game. Chalk, grunting and posing room included.',
    primaryCta: 'Start Free Trial',
    secondaryCta: 'View Equipment',
    portalLabel: 'Member Portal',
    joinLabel: 'Join the Forge',
    heroImage: img('photo-1534438327276-14e5300c3a48', 1600),
    videoUrl: `${V}/ForBiggerFun.mp4`,
    videoTitle: 'The iron room',
    videoSub: 'Two floors of plate-loaded machines and free weights.',
    classesTitle: 'Training Splits',
    classesSub: 'Coached splits built around progressive overload.',
    classes: [
      { name: 'Push Day', meta: '75 min · Upper', img: img('photo-1526506118085-60ce8714f8c5') },
      { name: 'Pull Day', meta: '75 min · Back', img: img('photo-1517836357463-d25dfeac3438') },
      { name: 'Leg Day', meta: '90 min · Lower', img: img('photo-1581009146145-b5ef050c2e1e') },
      { name: 'Arms & Delts', meta: '60 min · Isolation', img: img('photo-1541534741688-6078c6bfb5c5') },
      { name: 'Contest Prep', meta: '1:1 · Coached', img: img('photo-1583454110551-21f2fa2afe61') },
      { name: 'Posing Practice', meta: '45 min · Studio', img: img('photo-1534258936925-c58bed479fcb') },
    ],
    featuresTitle: 'Kit that actually matters',
    features: [
      { i: '🔥', t: 'Full Hammer Strength Line', d: 'Every plate-loaded press, row and pulldown in the catalogue.' },
      { i: '💪', t: 'Dumbbells to 70 kg', d: 'In 2kg increments, with four adjustable benches per rack.' },
      { i: '🪞', t: 'Posing Room', d: 'Competition lighting and mirrors for stage prep.' },
    ],
    coachesTitle: 'Coaching team',
    coachRole: 'Coaching Team',
    coaches: [
      { n: 'Rajat Khanna', r: 'Contest Prep', img: img('photo-1567013127542-490d757e51fc', 500) },
      { n: 'Simran Kaur', r: 'Hypertrophy', img: img('photo-1594381898411-846e7d193883', 500) },
      { n: 'Andre Baptiste', r: 'Strength Base', img: img('photo-1500648767791-00dcc994a43e', 500) },
      { n: 'Neha Joshi', r: 'Nutrition', img: img('photo-1544005313-94ddf0286df2', 500) },
    ],
    galleryTitle: 'The iron room',
    gallery: [
      'photo-1534438327276-14e5300c3a48',
      'photo-1526506118085-60ce8714f8c5',
      'photo-1550345332-09e3ac987658',
      'photo-1546483875-ad9014c88eba',
      'photo-1517838476312-10d79c07750d',
      'photo-1584466977773-e625c37cdd50',
    ].map((i) => img(i, 700)),
    stats: [
      { v: '2', l: 'Training Floors' },
      { v: '70 kg', l: 'Heaviest Dumbbell' },
      { v: '22', l: 'Stage Competitors' },
      { v: '15', l: 'Years Open' },
    ],
    plans: [
      { name: 'Iron', m: 1699, y: 16990, feats: ['Both training floors', 'Locker + shower', 'Posing room access'] },
      { name: 'Forged', m: 3499, y: 34990, feats: ['Everything in Iron', 'Coached split programming', 'Monthly body composition', 'Nutrition targets'], pop: true },
      { name: 'Stage Ready', m: 6999, y: 69990, feats: ['Everything in Forged', 'Full contest prep', 'Weekly check-ins', 'Peak week protocol'] },
    ],
    reviews: [
      { n: 'Vishal M.', r: 'Member · 5 years', q: 'Full Hammer Strength line and nobody filming themselves. Exactly what I wanted.' },
      { n: 'Rekha D.', r: 'Competitor', q: 'Took second in my class first time out. The prep coaching left nothing to chance.' },
      { n: 'Ali Hassan', r: 'Member · 18 months', q: 'Gained 9kg lean in a year on their split. Coaches actually adjust when you plateau.' },
    ],
    ctaHeadline: 'Seven days, on the house',
    ctaSub: 'Full access to both floors. No card, no commitment.',
    navLinks: ['Splits', 'Coaches', 'Equipment', 'Membership'],
    portalNav: ['Overview', 'My Split', 'Progress Photos', 'Nutrition', 'Contest Prep', 'Membership'],
    prs: [
      { n: 'Bench Press', v: '140 kg', p: 96 },
      { n: 'Back Squat', v: '180 kg', p: 90 },
      { n: 'Barbell Row', v: '120 kg', p: 82 },
      { n: 'Lean Mass', v: '+9.2 kg', p: 88 },
    ],
  },

  /* 5 ------------------------------------------------ SUNSET ZUMBA */
  'gym-sunset-zumba': {
    eyebrow: 'Dance Cardio Studio',
    headline: 'Sweat like\nit is a night\nout.',
    sub: 'Latin rhythms, proper sound systems and instructors who bring the whole room up. Zero dance experience required.',
    primaryCta: 'Join a Class',
    secondaryCta: 'See Timetable',
    portalLabel: 'Member Login',
    joinLabel: 'Get Dancing',
    heroImage: img('photo-1518611012118-696072aa579a', 1600),
    videoUrl: `${V}/ForBiggerMeltdowns.mp4`,
    videoTitle: 'Friday night Zumba burn',
    videoSub: 'Sprung floors, club lighting and a very loud sound system.',
    classesTitle: 'Class Timetable',
    classesSub: 'Turn up, follow along, leave grinning.',
    classes: [
      { name: 'Zumba Burn', meta: '55 min · High energy', img: img('photo-1518611012118-696072aa579a') },
      { name: 'Hip-Hop Cardio', meta: '50 min · Beginner OK', img: img('photo-1504609773096-104ff2c73ba4') },
      { name: 'Latin Fusion', meta: '60 min · Salsa base', img: img('photo-1547153760-18fc86324498') },
      { name: 'Bollywood Beat', meta: '55 min · All levels', img: img('photo-1524594152303-9fd13543fe6e') },
      { name: 'Dance HIIT', meta: '45 min · Intervals', img: img('photo-1571019613914-85f342c6a11e') },
      { name: 'Freestyle Jam', meta: '60 min · Social', img: img('photo-1517649763962-0c623066013b') },
    ],
    featuresTitle: 'Why the room feels different',
    features: [
      { i: '🎶', t: 'Club-Grade Sound', d: 'Full-range system and DJ lighting rig in both studios.' },
      { i: '🪩', t: 'Sprung Dance Floors', d: 'Proper sprung timber floors — kinder on knees and ankles.' },
      { i: '💃', t: 'No Experience Needed', d: 'Every routine is taught in layers. Follow the feet in front.' },
    ],
    coachesTitle: 'Your instructors',
    coachRole: 'Instructors',
    coaches: [
      { n: 'Carla Mendez', r: 'Zumba · Head Coach', img: img('photo-1594381898411-846e7d193883', 500) },
      { n: 'Rohit Sharma', r: 'Hip-Hop Cardio', img: img('photo-1500648767791-00dcc994a43e', 500) },
      { n: 'Priyanka Das', r: 'Bollywood Beat', img: img('photo-1544005313-94ddf0286df2', 500) },
      { n: 'Miguel Torres', r: 'Latin Fusion', img: img('photo-1567013127542-490d757e51fc', 500) },
    ],
    galleryTitle: 'On the floor',
    gallery: [
      'photo-1518611012118-696072aa579a',
      'photo-1504609773096-104ff2c73ba4',
      'photo-1547153760-18fc86324498',
      'photo-1524594152303-9fd13543fe6e',
      'photo-1571019613914-85f342c6a11e',
      'photo-1517649763962-0c623066013b',
    ].map((i) => img(i, 700)),
    stats: [
      { v: '52', l: 'Classes / Week' },
      { v: '2', l: 'Sprung Studios' },
      { v: '600+', l: 'Kcal / Class' },
      { v: '11', l: 'Instructors' },
    ],
    plans: [
      { name: 'Casual', m: 999, y: 9990, feats: ['6 classes per month', 'Both studios', 'Free locker'] },
      { name: 'Unlimited', m: 1999, y: 19990, feats: ['Unlimited classes', 'Bring a friend Fridays', 'Priority booking', 'Workshop discounts'], pop: true },
      { name: 'Crew', m: 3299, y: 32990, feats: ['Everything in Unlimited', 'Performance crew spot', 'Choreography workshops', 'Showcase events'] },
    ],
    reviews: [
      { n: 'Shreya P.', r: 'Member · 2 years', q: 'I hate the gym and I have not missed a Tuesday in eighteen months. That says it all.' },
      { n: 'Jonah Reid', r: 'Member · 8 months', q: 'Turned up with two left feet. Nobody cared, and now I am in the freestyle jam.' },
      { n: 'Aarti Menon', r: 'Member · 1 year', q: 'Lost 11kg without once thinking of it as exercise. The instructors carry the room.' },
    ],
    ctaHeadline: 'First class is free',
    ctaSub: 'Bring trainers and water. We supply the noise.',
    navLinks: ['Classes', 'Instructors', 'Timetable', 'Pricing'],
    portalNav: ['Overview', 'My Classes', 'Book a Class', 'Crew', 'Progress', 'Membership'],
    prs: [
      { n: 'Classes This Year', v: '96', p: 90 },
      { n: 'Calories Burned', v: '58,400', p: 84 },
      { n: 'Longest Streak', v: '24 days', p: 72 },
      { n: 'Routines Learned', v: '31', p: 66 },
    ],
  },

  /* 6 ---------------------------------------------------- NEON GRID */
  'gym-cyberpunk': {
    eyebrow: 'Data-Driven Training',
    headline: 'Every rep.\nTracked.\nScored.',
    sub: 'Sensor-equipped rigs, live leaderboards and heart-rate zones on the wall. Training with a scoreboard attached.',
    primaryCta: 'Claim Free Scan',
    secondaryCta: 'View Leaderboard',
    portalLabel: 'Member Console',
    joinLabel: 'Get Connected',
    heroImage: img('photo-1517649763962-0c623066013b', 1600),
    videoUrl: `${V}/ElephantsDream.mp4`,
    videoTitle: 'The connected floor',
    videoSub: 'Velocity trackers, zone displays and a live class leaderboard.',
    classesTitle: 'Session Types',
    classesSub: 'Every session logged, scored and ranked.',
    classes: [
      { name: 'Zone Ride', meta: '45 min · HR zones', img: img('photo-1517649763962-0c623066013b') },
      { name: 'Velocity Strength', meta: '60 min · Tracked bar', img: img('photo-1517836357463-d25dfeac3438') },
      { name: 'Leaderboard HIIT', meta: '40 min · Scored', img: img('photo-1538805060514-97d9cc17730c') },
      { name: 'Row Sprints', meta: '35 min · Erg bay', img: img('photo-1552674605-db6ffd4facb5') },
      { name: 'Metabolic Circuit', meta: '50 min · Rig', img: img('photo-1534258936925-c58bed479fcb') },
      { name: 'Open Console', meta: '24/7 · Self-guided', img: img('photo-1518310383802-640c2de311b2') },
    ],
    featuresTitle: 'The tech stack',
    features: [
      { i: '📟', t: 'Velocity-Tracked Bars', d: 'Bar speed on screen so load auto-adjusts to the day you are having.' },
      { i: '📊', t: 'Live Leaderboards', d: 'Class-wide scoring on wall displays. Opt out any time.' },
      { i: '🧬', t: 'Monthly Body Scan', d: 'InBody composition scan with trend reporting in the app.' },
    ],
    coachesTitle: 'The console team',
    coachRole: 'Console Team',
    coaches: [
      { n: 'Kiran Rao', r: 'Head of Data', img: img('photo-1567013127542-490d757e51fc', 500) },
      { n: 'Zoe Lambert', r: 'Zone Conditioning', img: img('photo-1594381898411-846e7d193883', 500) },
      { n: 'Hardik Shah', r: 'Velocity Strength', img: img('photo-1500648767791-00dcc994a43e', 500) },
      { n: 'Naomi Chen', r: 'Metabolic', img: img('photo-1544005313-94ddf0286df2', 500) },
    ],
    galleryTitle: 'The grid',
    gallery: [
      'photo-1517649763962-0c623066013b',
      'photo-1518310383802-640c2de311b2',
      'photo-1552674605-db6ffd4facb5',
      'photo-1534258936925-c58bed479fcb',
      'photo-1538805060514-97d9cc17730c',
      'photo-1540497077202-7c8a3999166f',
    ].map((i) => img(i, 700)),
    stats: [
      { v: '100%', l: 'Sessions Tracked' },
      { v: '48', l: 'Connected Stations' },
      { v: '24/7', l: 'Console Access' },
      { v: '12k', l: 'Sessions Logged' },
    ],
    plans: [
      { name: 'Connect', m: 2299, y: 22990, feats: ['Full floor + console', 'Session tracking', 'Monthly body scan'] },
      { name: 'Ranked', m: 3999, y: 39990, feats: ['Everything in Connect', 'All scored classes', 'Velocity strength', 'Zone reporting'], pop: true },
      { name: 'Elite Data', m: 6499, y: 64990, feats: ['Everything in Ranked', 'Bi-weekly 1:1 review', 'Custom auto-regulated plan', 'Wearable integration'] },
    ],
    reviews: [
      { n: 'Tarun G.', r: 'Member · 1 year', q: 'Seeing bar velocity drop tells me to stop before I grind a bad rep. Genuinely changed my training.' },
      { n: 'Isabel Ortiz', r: 'Member · 7 months', q: 'The leaderboard is stupidly motivating. I have never worked this hard on a rower.' },
      { n: 'Manav Kapoor', r: 'Member · 2 years', q: 'Monthly scans plus session data means I can actually see what is working.' },
    ],
    ctaHeadline: 'Get your baseline scan free',
    ctaSub: 'Full body composition and a tracked first session, no charge.',
    navLinks: ['Sessions', 'Team', 'Technology', 'Membership'],
    portalNav: ['Overview', 'My Data', 'Leaderboard', 'Book Session', 'Body Scans', 'Membership'],
    prs: [
      { n: 'Peak Bar Velocity', v: '1.42 m/s', p: 93 },
      { n: '2K Row', v: '6:48.2', p: 87 },
      { n: 'Zone 4+ Minutes', v: '312', p: 79 },
      { n: 'Leaderboard Rank', v: '#14', p: 74 },
    ],
  },

  /* 7 --------------------------------------------- ROYAL CREST MMA */
  'gym-royal-martial': {
    eyebrow: 'Martial Arts Academy',
    headline: 'Discipline.\nTechnique.\nRespect.',
    sub: 'Traditional grading alongside modern MMA conditioning. Full mat space, cage, and coaches with competition records.',
    primaryCta: 'Book a Trial',
    secondaryCta: 'View Disciplines',
    portalLabel: 'Student Portal',
    joinLabel: 'Enrol Now',
    heroImage: img('photo-1549719386-74dfcbf7dbed', 1600),
    videoUrl: `${V}/Sintel.mp4`,
    videoTitle: 'Inside the academy',
    videoSub: '400 sq m of mats, a full cage, and a dedicated bag room.',
    classesTitle: 'Disciplines',
    classesSub: 'Graded curricula with formal belt progression.',
    classes: [
      { name: 'Brazilian Jiu-Jitsu', meta: '90 min · Gi & No-Gi', img: img('photo-1591117207239-788bf8de6c3b') },
      { name: 'Muay Thai', meta: '75 min · Pads & clinch', img: img('photo-1549719386-74dfcbf7dbed') },
      { name: 'Boxing', meta: '60 min · Technical', img: img('photo-1544717297-fa95b6ee9643') },
      { name: 'Wrestling', meta: '75 min · Takedowns', img: img('photo-1517438322307-e67111335449') },
      { name: 'MMA Sparring', meta: '90 min · Advanced', img: img('photo-1583473848882-f9a5bc7fd2ee') },
      { name: 'Kids Programme', meta: '45 min · Ages 6–14', img: img('photo-1571019614242-c5c5dee9f50b') },
    ],
    featuresTitle: 'The academy',
    features: [
      { i: '🥋', t: '400 sq m Mat Space', d: 'Competition-grade tatami across two dedicated mat rooms.' },
      { i: '🥊', t: 'Full Cage & Ring', d: 'Regulation cage and boxing ring for sparring and fight camps.' },
      { i: '🎖', t: 'Formal Grading', d: 'Recognised belt syllabus with quarterly grading days.' },
    ],
    coachesTitle: 'Academy instructors',
    coachRole: 'Instructors',
    coaches: [
      { n: 'Prof. Ricardo Lima', r: 'BJJ · 4th Degree', img: img('photo-1567013127542-490d757e51fc', 500) },
      { n: 'Kru Nadia Chai', r: 'Muay Thai', img: img('photo-1594381898411-846e7d193883', 500) },
      { n: 'Coach Dev Anand', r: 'Boxing & Wrestling', img: img('photo-1500648767791-00dcc994a43e', 500) },
      { n: 'Sensei Mira Osei', r: 'Kids Programme', img: img('photo-1544005313-94ddf0286df2', 500) },
    ],
    galleryTitle: 'The mats',
    gallery: [
      'photo-1549719386-74dfcbf7dbed',
      'photo-1544717297-fa95b6ee9643',
      'photo-1583473848882-f9a5bc7fd2ee',
      'photo-1591117207239-788bf8de6c3b',
      'photo-1517438322307-e67111335449',
      'photo-1534258936925-c58bed479fcb',
    ].map((i) => img(i, 700)),
    stats: [
      { v: '400m²', l: 'Mat Space' },
      { v: '6', l: 'Disciplines' },
      { v: '38', l: 'Black Belts Awarded' },
      { v: '4x', l: 'Grading / Year' },
    ],
    plans: [
      { name: 'Single Art', m: 2199, y: 21990, feats: ['One discipline', 'Open mat access', 'Grading eligible'] },
      { name: 'All Access', m: 3699, y: 36990, feats: ['Every discipline', 'Open mat + bag room', 'Quarterly grading', 'Kids sibling discount'], pop: true },
      { name: 'Fight Camp', m: 6499, y: 64990, feats: ['Everything in All Access', 'Cornering on fight night', 'Individual camp plan', 'Strength & conditioning'] },
    ],
    reviews: [
      { n: 'Yusuf Rahman', r: 'Blue belt · 3 years', q: 'Technical instruction is exceptional and the room polices ego properly. Safe place to learn.' },
      { n: 'Clara Beaumont', r: 'Muay Thai · 2 years', q: 'Started with zero contact experience. Now I spar weekly and love it.' },
      { n: 'Ravi & Aanya', r: 'Parents · Kids programme', q: 'Our daughter went from shy to confident in a term. The discipline carries into school.' },
    ],
    ctaHeadline: 'Two free trial classes',
    ctaSub: 'Any discipline, any level. Gi and gloves loaned for the trial.',
    navLinks: ['Disciplines', 'Instructors', 'Grading', 'Membership'],
    portalNav: ['Overview', 'My Classes', 'Grading Path', 'Book Mat Time', 'Fight Camp', 'Membership'],
    prs: [
      { n: 'Current Belt', v: 'Blue · 2 stripes', p: 55 },
      { n: 'Mat Hours', v: '412 h', p: 88 },
      { n: 'Competitions', v: '6', p: 62 },
      { n: 'Submissions', v: '23', p: 71 },
    ],
  },

  /* 8 --------------------------------------------------- AQUA WAVE */
  'gym-aqua-swim': {
    eyebrow: 'Swim Academy & Aquatics',
    headline: 'Find your\nstroke.\nDrop your times.',
    sub: 'Eight-lane heated pool, video stroke analysis and coaches who teach adults from genuinely zero.',
    primaryCta: 'Book Assessment',
    secondaryCta: 'See Lane Times',
    portalLabel: 'Swimmer Login',
    joinLabel: 'Start Swimming',
    heroImage: img('photo-1530549387789-4c1017266635', 1600),
    videoUrl: `${V}/TearsOfSteel.mp4`,
    videoTitle: 'A morning in the pool',
    videoSub: 'Eight lanes at 28°C, with underwater cameras on lanes one and two.',
    classesTitle: 'Programmes',
    classesSub: 'From first-ever width to masters squad.',
    classes: [
      { name: 'Adult Learn to Swim', meta: '45 min · Beginner', img: img('photo-1560090995-01632a28895b') },
      { name: 'Stroke Correction', meta: '60 min · Video', img: img('photo-1600965962361-9035dbfd1c50') },
      { name: 'Masters Squad', meta: '75 min · Timed sets', img: img('photo-1571902943202-507ec2618e8f') },
      { name: 'Triathlon Open Water', meta: '90 min · Race prep', img: img('photo-1519315901367-f34ff9154487') },
      { name: 'Aqua Fitness', meta: '45 min · Low impact', img: img('photo-1530549387789-4c1017266635') },
      { name: 'Kids Squad', meta: '60 min · Ages 7–15', img: img('photo-1576013551627-0cc20b96c2a7') },
    ],
    featuresTitle: 'The aquatic centre',
    features: [
      { i: '🌊', t: '8-Lane Heated Pool', d: '25m pool held at 28°C year-round with lane ropes and blocks.' },
      { i: '🎥', t: 'Underwater Video', d: 'Two camera lanes with same-session playback and coach markup.' },
      { i: '🧖', t: 'Poolside Sauna', d: 'Sauna, steam and family changing rooms directly off the deck.' },
    ],
    coachesTitle: 'Swim coaches',
    coachRole: 'Swim Coaches',
    coaches: [
      { n: 'Elena Petrova', r: 'Head Coach · Masters', img: img('photo-1594381898411-846e7d193883', 500) },
      { n: 'Arun Pillai', r: 'Stroke Correction', img: img('photo-1567013127542-490d757e51fc', 500) },
      { n: 'Grace Odhiambo', r: 'Learn to Swim', img: img('photo-1544005313-94ddf0286df2', 500) },
      { n: 'Marco Rossi', r: 'Open Water & Tri', img: img('photo-1500648767791-00dcc994a43e', 500) },
    ],
    galleryTitle: 'Poolside',
    gallery: [
      'photo-1530549387789-4c1017266635',
      'photo-1600965962361-9035dbfd1c50',
      'photo-1519315901367-f34ff9154487',
      'photo-1571902943202-507ec2618e8f',
      'photo-1560090995-01632a28895b',
      'photo-1576013551627-0cc20b96c2a7',
    ].map((i) => img(i, 700)),
    stats: [
      { v: '8', l: 'Lanes' },
      { v: '28°C', l: 'Pool Temperature' },
      { v: '340', l: 'Adults Taught' },
      { v: '2', l: 'Camera Lanes' },
    ],
    plans: [
      { name: 'Lane Access', m: 1499, y: 14990, feats: ['Open lane swimming', 'Sauna + steam', 'Towel service'] },
      { name: 'Coached', m: 2899, y: 28990, feats: ['Everything in Lane Access', '2 coached sessions weekly', 'Termly video analysis', 'Squad entry'], pop: true },
      { name: 'Performance', m: 4999, y: 49990, feats: ['Everything in Coached', 'Unlimited squad sessions', 'Monthly 1:1 stroke work', 'Race day support'] },
    ],
    reviews: [
      { n: 'Deepak N.', r: 'Adult beginner', q: 'Could not float at 38. Swam 750m open water this summer. The teaching is patient and structured.' },
      { n: 'Hannah Lowe', r: 'Masters squad', q: 'Took 9 seconds off my 100m free in one term. The video analysis is what did it.' },
      { n: 'Sunita R.', r: 'Parent · Kids squad', q: 'Both kids went from armbands to squad in eighteen months. Coaches are brilliant with children.' },
    ],
    ctaHeadline: 'Free stroke assessment',
    ctaSub: 'Thirty minutes in the water with a coach and video playback.',
    navLinks: ['Programmes', 'Coaches', 'Facilities', 'Membership'],
    portalNav: ['Overview', 'My Sessions', 'Lane Booking', 'Video Analysis', 'Race Times', 'Membership'],
    prs: [
      { n: '100m Freestyle', v: '1:04.8', p: 89 },
      { n: '400m Freestyle', v: '5:42.1', p: 81 },
      { n: '50m Butterfly', v: '34.6 s', p: 68 },
      { n: 'Weekly Distance', v: '11.2 km', p: 76 },
    ],
  },

  /* 9 -------------------------------------------- MINIMAL WELLNESS */
  'gym-minimal-wellness': {
    eyebrow: 'Premium Health Club',
    headline: 'Train well.\nRecover better.\nLive longer.',
    sub: 'A quiet, uncrowded club built around longevity — strength, cardiovascular health, recovery and clinical screening under one membership.',
    primaryCta: 'Book a Tour',
    secondaryCta: 'View Membership',
    portalLabel: 'Member Login',
    joinLabel: 'Request Invite',
    heroImage: img('photo-1540497077202-7c8a3999166f', 1600),
    videoUrl: `${V}/VolkswagenGTIReview.mp4`,
    videoTitle: 'A quieter kind of club',
    videoSub: 'Capped membership, so there is always a machine free.',
    classesTitle: 'Member Services',
    classesSub: 'Everything included in a single membership.',
    classes: [
      { name: 'Strength Foundations', meta: '60 min · Small group', img: img('photo-1534438327276-14e5300c3a48') },
      { name: 'Reformer Pilates', meta: '50 min · Max 8', img: img('photo-1552196563-55cd4e45efb3') },
      { name: 'VO₂ Max Testing', meta: '45 min · Lab', img: img('photo-1552674605-db6ffd4facb5') },
      { name: 'Sauna & Contrast', meta: 'Open · Recovery', img: img('photo-1540555700478-4be289fbecef') },
      { name: 'Mobility Clinic', meta: '45 min · Physio-led', img: img('photo-1571019614242-c5c5dee9f50b') },
      { name: 'Health Screening', meta: '90 min · Annual', img: img('photo-1600334129128-685c5582fd35') },
    ],
    featuresTitle: 'What membership includes',
    features: [
      { i: '💎', t: 'Capped Membership', d: 'We cap numbers so peak hours never feel like peak hours.' },
      { i: '🩺', t: 'Annual Health Screen', d: 'Bloods, VO₂ max, DEXA and a consultation with our clinician.' },
      { i: '🧖', t: 'Full Recovery Suite', d: 'Sauna, steam, contrast plunge and treatment rooms.' },
    ],
    coachesTitle: 'Your clinical team',
    coachRole: 'Clinical Team',
    coaches: [
      { n: 'Dr. Anita Sharma', r: 'Club Physician', img: img('photo-1544005313-94ddf0286df2', 500) },
      { n: 'James Whitfield', r: 'Head of Strength', img: img('photo-1567013127542-490d757e51fc', 500) },
      { n: 'Yuki Tanaka', r: 'Physiotherapy', img: img('photo-1594381898411-846e7d193883', 500) },
      { n: 'Omar Haddad', r: 'Longevity Coaching', img: img('photo-1500648767791-00dcc994a43e', 500) },
    ],
    galleryTitle: 'The club',
    gallery: [
      'photo-1540497077202-7c8a3999166f',
      'photo-1540555700478-4be289fbecef',
      'photo-1600334129128-685c5582fd35',
      'photo-1552196563-55cd4e45efb3',
      'photo-1546483875-ad9014c88eba',
      'photo-1584466977773-e625c37cdd50',
    ].map((i) => img(i, 700)),
    stats: [
      { v: '400', l: 'Members Capped' },
      { v: '1:1', l: 'Clinical Reviews' },
      { v: '7', l: 'Treatment Rooms' },
      { v: '6am', l: 'Doors Open' },
    ],
    plans: [
      { name: 'Club', m: 5999, y: 59990, feats: ['Full club access', 'Recovery suite', 'All group services'] },
      { name: 'Club Plus', m: 9999, y: 99990, feats: ['Everything in Club', 'Annual health screen', 'Quarterly clinician review', '4 physio sessions'], pop: true },
      { name: 'Private', m: 18999, y: 189990, feats: ['Everything in Club Plus', 'Weekly 1:1 coaching', 'Unlimited physio', 'Concierge scheduling'] },
    ],
    reviews: [
      { n: 'Rohit Malhotra', r: 'Member · 3 years', q: 'Never once waited for a squat rack. The annual screening caught something my GP had not.' },
      { n: 'Fiona Grant', r: 'Member · 18 months', q: 'The clinical side is what separates it. Training is planned around actual bloodwork.' },
      { n: 'Sanjay Iyer', r: 'Member · 2 years', q: 'Quiet, immaculate, and the physio team is genuinely excellent. Worth every rupee.' },
    ],
    ctaHeadline: 'Request a private tour',
    ctaSub: 'Membership is capped. We will show you the club and talk numbers honestly.',
    navLinks: ['Services', 'Clinical Team', 'Facilities', 'Membership'],
    portalNav: ['Overview', 'My Programme', 'Health Records', 'Book Services', 'Recovery', 'Membership'],
    prs: [
      { n: 'VO₂ Max', v: '48.2', p: 84 },
      { n: 'Resting HR', v: '54 bpm', p: 89 },
      { n: 'Grip Strength', v: '52 kg', p: 76 },
      { n: 'Body Fat', v: '17.4%', p: 72 },
    ],
  },

  /* 10 ------------------------------------------- DIGITAL COACH PRO */
  'gym-digital-coach': {
    eyebrow: 'Online Coaching Platform',
    headline: 'Your coach,\nin your\npocket.',
    sub: 'Video-guided programmes, weekly form reviews and a coach who answers messages. Train at home, in a hotel, or at any gym.',
    primaryCta: 'Start 14-Day Trial',
    secondaryCta: 'Browse Programmes',
    portalLabel: 'Client Login',
    joinLabel: 'Get Coached',
    heroImage: img('photo-1571019613454-1cb2f99b2d8b', 1600),
    videoUrl: `${V}/WeAreGoingOnBullrun.mp4`,
    videoTitle: 'How the coaching works',
    videoSub: 'Programme, film a set, get it reviewed. Repeat weekly.',
    classesTitle: 'Programme Library',
    classesSub: 'Follow-along video for every session, on any device.',
    classes: [
      { name: 'Home Strength', meta: '40 min · Dumbbells', img: img('photo-1584735935682-2f2b69dff9d2') },
      { name: 'Bodyweight Only', meta: '30 min · No kit', img: img('photo-1571019613454-1cb2f99b2d8b') },
      { name: 'Hotel Room Series', meta: '25 min · Travel', img: img('photo-1518310383802-640c2de311b2') },
      { name: 'Full Gym Hypertrophy', meta: '60 min · Machines', img: img('photo-1526506118085-60ce8714f8c5') },
      { name: 'Live Coached Sessions', meta: '45 min · Zoom', img: img('photo-1593079831268-3381b0db4a77') },
      { name: 'Mobility Resets', meta: '15 min · Daily', img: img('photo-1552196563-55cd4e45efb3') },
    ],
    featuresTitle: 'How coaching works',
    features: [
      { i: '📱', t: 'Follow-Along Video', d: 'Every exercise filmed from two angles with cueing and tempo.' },
      { i: '🎥', t: 'Weekly Form Review', d: 'Upload a set, get annotated video feedback within 48 hours.' },
      { i: '💬', t: 'Direct Coach Chat', d: 'Message your coach any weekday. Real replies, not a chatbot.' },
    ],
    coachesTitle: 'Meet the coaching team',
    coachRole: 'Online Coaches',
    coaches: [
      { n: 'Alex Rivera', r: 'Head Coach', img: img('photo-1567013127542-490d757e51fc', 500) },
      { n: 'Sneha Kulkarni', r: 'Home Training', img: img('photo-1594381898411-846e7d193883', 500) },
      { n: 'Tom Ellery', r: 'Hypertrophy', img: img('photo-1500648767791-00dcc994a43e', 500) },
      { n: 'Layla Haddad', r: 'Nutrition', img: img('photo-1544005313-94ddf0286df2', 500) },
    ],
    galleryTitle: 'Training anywhere',
    gallery: [
      'photo-1571019613454-1cb2f99b2d8b',
      'photo-1584735935682-2f2b69dff9d2',
      'photo-1518310383802-640c2de311b2',
      'photo-1593079831268-3381b0db4a77',
      'photo-1526506118085-60ce8714f8c5',
      'photo-1552196563-55cd4e45efb3',
    ].map((i) => img(i, 700)),
    stats: [
      { v: '2,400+', l: 'Clients Coached' },
      { v: '480', l: 'Video Sessions' },
      { v: '48 h', l: 'Feedback Turnaround' },
      { v: '92%', l: '6-Month Retention' },
    ],
    plans: [
      { name: 'Self-Guided', m: 799, y: 7990, feats: ['Full programme library', 'Follow-along video', 'Progress tracking app'] },
      { name: 'Coached', m: 2499, y: 24990, feats: ['Everything in Self-Guided', 'Custom programme', 'Weekly form review', 'Direct coach chat'], pop: true },
      { name: 'One-to-One', m: 5499, y: 54990, feats: ['Everything in Coached', '2 live video calls monthly', 'Full nutrition coaching', 'Same-day replies'] },
    ],
    reviews: [
      { n: 'Meghan Doyle', r: 'Client · 14 months', q: 'I travel constantly. The hotel series means I have not lost a training block in over a year.' },
      { n: 'Pranav Joshi', r: 'Client · 8 months', q: 'The form reviews fixed a deadlift issue no in-person trainer had spotted in three years.' },
      { n: 'Sara Lindqvist', r: 'Client · 2 years', q: 'Cheaper than a gym membership and I get more actual coaching. My coach replies same day.' },
    ],
    ctaHeadline: 'Fourteen days, free',
    ctaSub: 'Full programme library and one form review. Cancel in a tap.',
    navLinks: ['Programmes', 'Coaches', 'How It Works', 'Pricing'],
    portalNav: ['Overview', "Today's Session", 'Programme', 'Form Reviews', 'Coach Chat', 'Membership'],
    prs: [
      { n: 'Sessions Completed', v: '186', p: 91 },
      { n: 'Current Streak', v: '19 days', p: 78 },
      { n: 'Form Reviews', v: '42', p: 83 },
      { n: 'Goal Progress', v: '74%', p: 74 },
    ],
  },
};

/** Fallback used for any gym theme id not explicitly listed above. */
const FALLBACK = CONTENT['gym-volt-apex'];

/**
 * Returns the theme's content with any saved editor overrides merged on top.
 * Scalars override directly; arrays are merged item-by-item so the editor can
 * change one class name without having to re-supply the whole list.
 */
export function getGymThemeContent(themeId?: string, overrides?: any): GymThemeContent {
  const base = (themeId && CONTENT[themeId]) || FALLBACK;
  if (!overrides || typeof overrides !== 'object') return base;

  const out: any = { ...base };

  for (const key of Object.keys(overrides)) {
    const val = (overrides as any)[key];
    if (val === undefined || val === null || val === '') continue;

    const baseVal = (base as any)[key];

    if (Array.isArray(baseVal) && Array.isArray(val)) {
      out[key] = baseVal.map((item, i) => {
        const patch = val[i];
        if (patch === undefined || patch === null) return item;
        if (typeof item === 'object' && typeof patch === 'object') {
          const merged: any = { ...item };
          for (const f of Object.keys(patch)) {
            if (patch[f] !== undefined && patch[f] !== null && patch[f] !== '') merged[f] = patch[f];
          }
          return merged;
        }
        return patch;
      });
      // Allow the editor to append entirely new items too
      if (val.length > baseVal.length) {
        out[key] = [...out[key], ...val.slice(baseVal.length).filter(Boolean)];
      }
    } else {
      out[key] = val;
    }
  }

  return out as GymThemeContent;
}

function safeParse(raw: any) {
  if (!raw) return null;
  if (typeof raw === 'object') return raw;
  if (typeof raw !== 'string') return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Reads saved Theme Studio edits.
 *
 * The backend stores layoutContent as a JSON string, so it may arrive either
 * parsed or raw. If the gym profile has nothing (e.g. the backend has not been
 * rebuilt with the new column yet), fall back to the copy mirrored into the
 * project's blocksJson, which always persists.
 */
export function readGymLayout(gymInfo?: any, project?: any): any {
  const fromGym = safeParse(gymInfo?.layoutContent);
  if (fromGym) return fromGym;

  if (project?.blocksJson) {
    try {
      const parsed = JSON.parse(project.blocksJson);
      const blocks: any[] = Array.isArray(parsed)
        ? parsed
        : Object.values(parsed?.pages || {}).flat() as any[];
      const biz = blocks.find((b: any) => b?.type === 'business_config');
      const mirrored = safeParse(biz?.content?.gymLayoutContent);
      if (mirrored) return mirrored;
      if (!Array.isArray(parsed)) {
        const cfg = safeParse(parsed?.businessConfig?.gymLayoutContent);
        if (cfg) return cfg;
      }
    } catch {
      /* ignore */
    }
  }

  return {};
}

/** Section keys the layout editor can toggle / reorder on the landing page. */
export const GYM_LANDING_SECTIONS = [
  { key: 'hero', label: 'Hero Banner' },
  { key: 'stats', label: 'Stats Strip' },
  { key: 'classes', label: 'Classes / Programmes' },
  { key: 'video', label: 'Video Walkthrough' },
  { key: 'features', label: 'Facility Features' },
  { key: 'coaches', label: 'Coaches' },
  { key: 'membership', label: 'Membership Plans' },
  { key: 'reviews', label: 'Member Reviews' },
  { key: 'gallery', label: 'Gallery' },
  { key: 'cta', label: 'Closing CTA' },
  { key: 'footer', label: 'Footer' },
] as const;
