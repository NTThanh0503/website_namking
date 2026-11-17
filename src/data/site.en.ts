// =============================================================
//  NỘI DUNG TIẾNG ANH – bản dịch của src/data/site.ts
//  Khi sửa nội dung tiếng Việt ở site.ts, nhớ sửa phần tương ứng ở đây.
//  Thông tin không cần dịch (điện thoại, email, mạng xã hội...) được lấy
//  thẳng từ site.ts nên chỉ cần sửa một nơi.
// =============================================================
import * as vi from './site';
import type { Service, Project } from './site';

export const company: typeof vi.company = {
  ...vi.company,
  legalName: 'Hanh Trinh So Technology & Travel Co., Ltd.',
  tagline: 'Digitizing destinations, elevating hospitality and travel experiences',
  description:
    'Hành Trình Số helps hotels, homestays, resorts and destinations go digital: from 360° virtual tours and booking systems to designing and running end-to-end tours.',
  address: '158 Chua Lang, Ba Dinh District, Hanoi, Vietnam',
  hours: 'Mon – Sat, 8:30 AM – 5:30 PM',
};

export const nav: typeof vi.nav = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/gioi-thieu' },
  { label: 'Services', href: '/dich-vu' },
  { label: 'Projects', href: '/du-an' },
  { label: 'News', href: '/tin-tuc' },
  { label: 'Contact', href: '/lien-he' },
];

export const services: Service[] = [
  {
    slug: 'so-hoa',
    name: 'Digital',
    title: 'Digital transformation for destinations & travel businesses',
    short:
      '360° virtual tours, booking websites, digital maps and management systems that help guests find and trust you right from their screen.',
    intro:
      'Today’s travellers decide where to stay and where to go on their phones. We bring your property online fully and authentically, so guests can see it, feel it and book without having to call and ask.',
    icon: 'scan',
    tone: 'lagoon',
    features: [
      { title: '360° virtual tours', text: 'We shoot and build 360° tours of rooms, restaurants and heritage sites, ready to embed on your website, Google Maps and social media.' },
      { title: 'Website & online booking', text: 'Bilingual, mobile-first websites connected to payment gateways and synced with your OTA room calendars.' },
      { title: 'Digital maps & audio guides', text: 'QR codes at every point of interest, multilingual audio guides and interactive maps for tourist sites.' },
      { title: 'Archive & heritage digitization', text: '3D scanning of artefacts, digitized photos and archives, and fully online museums.' },
    ],
    outcomes: ['More direct bookings and less reliance on OTA commissions', 'Guests know your property before they arrive, so fewer cancellations', 'Centralized guest data that makes re-marketing easy'],
    forWho: ['Hotels, resorts and homestays', 'Tourist sites and attractions', 'Museums, heritage sites and tourism departments'],
  },
  {
    slug: 'luu-tru',
    name: 'Hospitality',
    title: 'Hospitality consulting & operations',
    short:
      'Setting up, managing and optimizing revenue for hotels, homestays and serviced apartments, from opening day until every room is filled.',
    intro:
      'We work alongside owners as a second operations team: standardizing processes, managing rates and sales channels, and training staff so your property runs smoothly and profitably.',
    icon: 'bed',
    tone: 'jade',
    features: [
      { title: 'Channel & rate management', text: 'List your rooms on Booking, Agoda, Airbnb and Traveloka; adjust rates by season and real demand.' },
      { title: 'Full-service operations', text: 'Front desk, housekeeping, guest care and transparent monthly revenue reports for owners.' },
      { title: 'Property management system (PMS)', text: 'Room management software, smart locks and contactless check-in.' },
      { title: 'Staff training', text: 'Service standards training, handling online reviews and raising your review scores.' },
    ],
    outcomes: ['Stable occupancy all year round', 'Better review scores on OTAs', 'Owners track revenue in real time'],
    forWho: ['Owners of new hotels and homestays', 'Serviced apartments and rental villas', 'Properties looking to raise occupancy'],
  },
  {
    slug: 'du-lich',
    name: 'Travel',
    title: 'Tour design & travel experiences',
    short:
      'Domestic and international tours, corporate travel, events and experiential journeys tailored to every group.',
    intro:
      'Every journey is designed around the people and the story of the destination. We take care of everything from itineraries, transport and accommodation to tour guides, so all you have to do is enjoy.',
    icon: 'compass',
    tone: 'lantern',
    features: [
      { title: 'Domestic package tours', text: 'Ha Giang, Hoi An, Phu Quoc, the Central Highlands… flexible itineraries for families and groups of friends.' },
      { title: 'Corporate travel (MICE)', text: 'Team building, conferences and incentive trips for groups of 20 to 1,000 guests.' },
      { title: 'International tours', text: 'Japan, Korea, Europe and Southeast Asia, with visa and travel insurance support.' },
      { title: 'Local experiences', text: 'Pottery, cooking with locals, village homestays: activities you rarely find on mass-market tours.' },
    ],
    outcomes: ['One point of contact for the whole journey', 'Clear pricing with no hidden costs', '24/7 support throughout your trip'],
    forWho: ['Families and groups of friends', 'Companies, organizations and schools', 'International visitors to Vietnam'],
  },
];

export const stats: typeof vi.stats = [
  { value: 8, suffix: '+', label: 'years in business' },
  { value: 120, suffix: '+', label: 'properties partnered with' },
  { value: 350, suffix: '', label: '360° tours delivered' },
  { value: 25, suffix: 'k', label: 'travellers every year' },
];

export const process: typeof vi.process = [
  { title: 'Listen', text: 'We meet, survey on site and get a clear picture of your goals.' },
  { title: 'Propose', text: 'A detailed plan, roadmap and quote within 3 working days.' },
  { title: 'Deliver', text: 'A dedicated team carries out the work and reports progress weekly.' },
  { title: 'Support', text: 'Handover, training and long-term operational support after the project.' },
];

const pick = (slug: string) => vi.projects.find((p) => p.slug === slug)!;
const tr = (slug: string, t: Pick<Project, 'title' | 'client' | 'location' | 'summary' | 'result'>): Project => ({ ...pick(slug), ...t });

export const projects: Project[] = [
  tr('tour-360-pho-co', { title: 'Old Town virtual tour', client: 'Cultural Center (sample)', location: 'Hoi An', summary: '48 points of interest in 360° with audio guides in 4 languages via QR codes.', result: '210,000 views in the first year' }),
  tr('resort-bien-phu-quoc', { title: 'Beachfront resort operations', client: '4-star resort (sample)', location: 'Phu Quoc', summary: 'Took over operations of 86 rooms, restructured sales channels and seasonal pricing.', result: 'Occupancy up from 52% to 81%' }),
  tr('mice-ngan-hang', { title: 'Client conference for 600 guests', client: 'Bank (sample)', location: 'Da Nang', summary: 'A conference, gala dinner and 3-day, 2-night sightseeing tour.', result: 'Satisfaction score 4.8/5' }),
  tr('website-homestay-da-lat', { title: 'Booking website for a homestay chain', client: 'Homestay chain (sample)', location: 'Da Lat', summary: 'Bilingual website synced with 4 OTA calendars, with online payment.', result: '38% of bookings now come direct' }),
  tr('can-ho-dich-vu-q1', { title: 'Downtown serviced apartment chain', client: 'Private investor (sample)', location: 'Ho Chi Minh City', summary: 'Set up 3 buildings from scratch: processes, staffing, software and automated check-in.', result: 'Operational break-even after 5 months' }),
  tr('ha-giang-trai-nghiem', { title: 'Ha Giang village journey', client: 'In-house product', location: 'Ha Giang', summary: 'A 4-day tour staying in local homestays, run with a local cooperative.', result: '1,200 guests during buckwheat flower season' }),
  tr('bao-tang-so', { title: 'Online museum', client: 'Provincial museum (sample)', location: 'Hue', summary: '3D scans of 120 artefacts and a virtual exhibition space on the web.', result: 'Open 24/7 to visitors worldwide' }),
  tr('team-building-cong-nghe', { title: 'Team building for a tech company', client: 'Company (sample)', location: 'Ho Tram', summary: 'A 2-day programme for 250 staff with custom-designed games.', result: 'Contract renewed 3 years in a row' }),
];

export const testimonials: typeof vi.testimonials = [
  { quote: 'Since we added the 360° tour to our website, guests ask fewer questions but book more. They have seen everything before they arrive.', name: 'Ms. Lan Anh', role: 'Homestay chain owner, Da Lat' },
  { quote: 'The operations team works like family. Clear revenue reports every month, and I have nothing else to worry about.', name: 'Mr. Minh Quan', role: 'Resort owner, Phu Quoc' },
  { quote: 'A group of 600 and everything ran on time, from airport pickups to the gala dinner. Our staff still talk about that trip.', name: 'Ms. Thu Ha', role: 'Head of HR, banking sector' },
  { quote: 'The artefact digitization was handled with great care and respect for our heritage. International visitors love it.', name: 'Mr. Tran Van Hung', role: 'Museum director' },
];

export const faqs: typeof vi.faqs = [
  { q: 'How much does a 360° virtual tour cost?', a: 'It depends on the number of shooting points and audio guide requirements. A small homestay usually needs 8–15 points. Send us your details via the contact form and we will send a detailed quote within 24 hours.' },
  { q: 'Can I hire you only for channel management, without full operations?', a: 'Yes. Our hospitality services can be taken separately: channel and rate management, PMS software, or staff training.' },
  { q: 'Do you design tours for small groups?', a: 'Yes. We design private tours from 2 guests upwards, with itineraries adjusted to your interests and budget.' },
  { q: 'How long does it take to build a booking website?', a: 'Usually 3–5 weeks, including design, content entry, payment gateway integration and OTA syncing.' },
  { q: 'Who provides technical support after handover?', a: 'Every project has a dedicated account manager. You get a 12-month warranty and can renew an annual support plan.' },
];

export const values: typeof vi.values = [
  { title: 'Authentic', text: 'Digital imagery must match the real experience. We never over-polish only for guests to be disappointed on arrival.' },
  { title: 'Sustainable', text: 'We prioritize working with local communities and solutions that help destinations grow for the long term.' },
  { title: 'Dedicated', text: 'One point of contact, fast responses, and support that continues after the project ends.' },
];

export const milestones: typeof vi.milestones = [
  { year: 2018, text: 'Founded in Ho Chi Minh City by a team of 5, starting with 360° photography for hotels.' },
  { year: 2020, text: 'Launched hospitality operations, helping homestays through a difficult period.' },
  { year: 2022, text: 'Received a tour operator licence and expanded into tour design and corporate travel.' },
  { year: 2024, text: 'Opened our Da Nang office and delivered our first heritage digitization projects.' },
  { year: 2026, text: 'Trusted by more than 120 properties and many destinations across the country.' },
];

export const team: typeof vi.team = [
  { name: 'Nguyen Van A', role: 'Chief Executive Officer', bio: '15 years in the hotel and travel industry.' },
  { name: 'Tran Thi B', role: 'Chief Technology Officer', bio: 'Leads our digital solutions and booking platforms.' },
  { name: 'Le Van C', role: 'Head of Hospitality', bio: 'Former operations manager at several 4–5 star resorts.' },
  { name: 'Pham Thi D', role: 'Head of Travel', bio: 'Has designed more than 200 domestic and international journeys.' },
];

export const partners = vi.partners;
