/**
 * Single source of truth for Wedding/Event niche theming.
 *
 * The selector preview, the live storefront landing, and the login page all
 * resolve their colors / hero image / copy from HERE, so the generated site
 * matches exactly what the user previewed (no separate hardcoded designs).
 */

export type WeddingLayout = 'centered' | 'split' | 'overlay' | 'left' | 'minimal';

export interface WeddingProfile {
  key: string;
  primary: string;
  secondary: string;
  layout: WeddingLayout;
  hero: string;
  badge: string;
  headline: string;
  subtitle: string;
  packages: { name: string; price: string; img: string }[];
  gallery: string[];
  loginTag: string;
}

const U = (id: string, w = 800) => `https://images.unsplash.com/${id}?w=${w}&auto=format&fit=crop&q=80`;

export const WEDDING_PROFILES: Record<string, WeddingProfile> = {
  wedding: {
    key: 'wedding', primary: '#be185d', secondary: '#7c3aed', layout: 'centered',
    hero: U('photo-1519741497674-611481863552', 1600),
    badge: 'Wedding Planner', headline: 'Your Dream Wedding, Perfectly Planned',
    subtitle: 'Timeless design, flawless timelines and bridal coordination.',
    packages: [
      { name: 'Classic Wedding', price: '₹2.5L', img: U('photo-1465495976277-4387d4b0b4c6') },
      { name: 'Grand Celebration', price: '₹6.0L', img: U('photo-1519225421980-715cb0215aed') },
      { name: 'Destination Wedding', price: '₹12L', img: U('photo-1520854221256-17451cc331bf') },
    ],
    gallery: [U('photo-1478146896981-b80fe463b330', 600), U('photo-1522673607200-164d1b6ce486', 600), U('photo-1583939003579-730e3918a45a', 600), U('photo-1460978812857-470ed1c77af0', 600)],
    loginTag: 'Access your wedding portal, guest lists & RSVPs.',
  },
  event: {
    key: 'event', primary: '#7c3aed', secondary: '#4f46e5', layout: 'split',
    hero: U('photo-1511795409834-ef04bbd61622', 1600),
    badge: 'Event Planner', headline: 'Events That Leave a Mark',
    subtitle: 'Social soirées, private dining and corporate gatherings.',
    packages: [
      { name: 'Social Soirée', price: '₹1.5L', img: U('photo-1530103862676-de8c9debad1d') },
      { name: 'Private Party', price: '₹3.0L', img: U('photo-1533174072545-7a4b6ad7a6c3') },
      { name: 'Gala Night', price: '₹8.0L', img: U('photo-1540575467063-178a50c2df87') },
    ],
    gallery: [U('photo-1470229722913-7c0e2dbbafd3', 600), U('photo-1492684223066-81342ee5ff30', 600), U('photo-1514525253161-7a46d19cd819', 600), U('photo-1519671482749-fd09be7ccebf', 600)],
    loginTag: 'Manage your events, vendors and guest check-ins.',
  },
  birthday: {
    key: 'birthday', primary: '#f59e0b', secondary: '#ec4899', layout: 'overlay',
    hero: U('photo-1530103862676-de8c9debad1d', 1600),
    badge: 'Birthday Planner', headline: 'Birthdays Worth Celebrating',
    subtitle: 'Themes, décor, cakes and kids activities — done right.',
    packages: [
      { name: 'Kids Party', price: '₹40K', img: U('photo-1464349095431-e9a21285b5f3') },
      { name: 'Milestone Bash', price: '₹1.2L', img: U('photo-1533294455009-a77b7557d979') },
      { name: 'Theme Party', price: '₹2.0L', img: U('photo-1513151233558-d860c5398176') },
    ],
    gallery: [U('photo-1527529482837-4698179dc6ce', 600), U('photo-1464349095431-e9a21285b5f3', 600), U('photo-1516450360452-9312f5e86fc7', 600), U('photo-1481349518771-20055b2a7b24', 600)],
    loginTag: 'Track bookings, themes and party checklists.',
  },
  corporate: {
    key: 'corporate', primary: '#0ea5e9', secondary: '#1e3a8a', layout: 'left',
    hero: U('photo-1540575467063-178a50c2df87', 1600),
    badge: 'Corporate Events', headline: 'Corporate Events, Flawlessly Executed',
    subtitle: 'Seminars, board dinners, launches and business galas.',
    packages: [
      { name: 'Seminar', price: '₹2.0L', img: U('photo-1517048676732-d65bc937f952') },
      { name: 'Board Dinner', price: '₹3.5L', img: U('photo-1519389950473-47ba0277781c') },
      { name: 'Product Launch', price: '₹9.0L', img: U('photo-1505373877841-8d25f7d46678') },
    ],
    gallery: [U('photo-1531058020387-3be344556be6', 600), U('photo-1511578314322-379afb476865', 600), U('photo-1475721027785-f74eccf877e2', 600), U('photo-1515187029135-18ee286d815b', 600)],
    loginTag: 'Manage delegates, agendas and invoices.',
  },
  conference: {
    key: 'conference', primary: '#0d9488', secondary: '#0f766e', layout: 'minimal',
    hero: U('photo-1505373877841-8d25f7d46678', 1600),
    badge: 'Conference Organizer', headline: 'Conferences, at Scale',
    subtitle: 'Summits, expos and workshops with seamless logistics.',
    packages: [
      { name: 'Summit', price: '₹5.0L', img: U('photo-1540304453527-62f979142a17') },
      { name: 'Expo', price: '₹10L', img: U('photo-1492684223066-81342ee5ff30') },
      { name: 'Workshop', price: '₹1.5L', img: U('photo-1524178232363-1fb2b075b655') },
    ],
    gallery: [U('photo-1587825140708-dfaf72ae4b04', 600), U('photo-1560523159-4a9692d222f9', 600), U('photo-1591115765373-5207764f72e7', 600), U('photo-1475721027785-f74eccf877e2', 600)],
    loginTag: 'Manage speakers, sessions and attendee passes.',
  },
};

export function resolveWeddingProfile(category?: string): WeddingProfile {
  const c = (category || '').toLowerCase();
  if (c.includes('wedding') || c.includes('bridal') || c.includes('marriage') || c.includes('anniversary')) return { ...WEDDING_PROFILES.wedding, badge: category || WEDDING_PROFILES.wedding.badge };
  if (c.includes('birthday') || c.includes('kids') || c.includes('baby')) return { ...WEDDING_PROFILES.birthday, badge: category || WEDDING_PROFILES.birthday.badge };
  if (c.includes('conference') || c.includes('summit') || c.includes('expo') || c.includes('seminar')) return { ...WEDDING_PROFILES.conference, badge: category || WEDDING_PROFILES.conference.badge };
  if (c.includes('corporate') || c.includes('business') || c.includes('gala') || c.includes('launch')) return { ...WEDDING_PROFILES.corporate, badge: category || WEDDING_PROFILES.corporate.badge };
  return { ...WEDDING_PROFILES.event, badge: category || WEDDING_PROFILES.event.badge };
}
