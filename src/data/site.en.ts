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
  community: 'Ke Mien Di San',
  positioning: 'The platform for digitizing and connecting travel businesses',
  tagline: 'Digitize destinations – Connect experiences – Add value',
  description:
    'Nam Kinh Digital, the travel technology brand of NAM KINH GROUP, brings destinations, travel products and services from the real world into the digital one: so travellers can discover and book experiences, and destination owners can run their business on one platform.',
  address: '158 Chua Lang, Ba Dinh District, Hanoi, Vietnam',
  hours: 'Mon – Sat, 8:30 AM – 5:30 PM',
  mapEmbed: vi.company.mapEmbed.replaceAll('!1svi!2s', '!1sen!2s'), // bản đồ hiển thị tiếng Anh
};

export const nav: typeof vi.nav = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/gioi-thieu' },
  { label: 'Solutions', href: '/dich-vu' },
  { label: 'Projects', href: '/du-an' },
  { label: 'News', href: '/tin-tuc' },
  { label: 'Contact', href: '/lien-he' },
];

export const services: Service[] = [
  {
    slug: 'diem-den-so',
    name: 'Digital Destination',
    title: 'Nam Kinh Digital Destination – destination digitization',
    short:
      'We bring a destination’s information, imagery, spaces and stories online, so travellers can explore and experience it remotely or on site.',
    intro:
      'Every heritage site, museum and craft village has a story worth telling. We digitize a destination’s spaces, archives and experiences into digital products travellers can explore in their own language, from anywhere.',
    icon: 'scan',
    tone: 'lagoon',
    features: [
      { title: '360° imagery & virtual tours', text: '360° photography and virtual tours of the whole site, ready to embed on websites, Google Maps and social media.' },
      { title: 'Destination website & digital map', text: 'A dedicated website with an interactive map: routes, points of interest, amenities and practical information.' },
      { title: 'Multilingual guides via QR/NFC', text: 'Visitors scan a code at each point to hear or read the story in their own language, with images, video and audio.' },
      { title: 'Archive digitization & 3D models', text: 'Digitize information, documents and artefacts, and build 3D models on request to preserve and present heritage.' },
    ],
    outcomes: [
      'Travellers explore the destination remotely or on site',
      'History and culture told in full, in many languages',
      'Managers update content themselves and see engagement reports',
    ],
    forWho: ['Historic sites, museums, heritage houses', 'Craft villages, cultural spaces, tourist areas', 'Site management boards and local tourism authorities'],
  },
  {
    slug: 'ket-noi-du-lich',
    name: 'Travel Connect',
    title: 'Nam Kinh Travel Connect – the destination business platform',
    short:
      'Subscription software that lets travellers view, choose and book services online, and lets destination owners manage services, schedules, orders and revenue in one place.',
    intro:
      'Digitizing is only the first step. Travel Connect turns travellers’ interest into bookings: they book experiences right on the destination’s page, and each order is routed to the owner to confirm, serve and track revenue.',
    icon: 'ticket',
    tone: 'jade',
    features: [
      { title: 'Booking page for travellers', text: 'Photos, video and 360°; a catalogue of experiences with prices and schedules; choose party size, request a booking, get confirmation and visit instructions.' },
      { title: 'Admin account for providers', text: 'Manage services, prices, schedules and capacity; receive, confirm or decline booking requests.' },
      { title: 'Payments, arrivals & revenue', text: 'Payments through a suitable payment provider, guest check-in, revenue tracking and sales performance reports.' },
      { title: 'Works with existing systems', text: 'For hotels and restaurants we integrate with the booking software, POS or management system already in use, with no forced replacement.' },
    ],
    outcomes: [
      'Take bookings, sell tickets and experiences online around the clock',
      'Booking requests reach the owner automatically',
      'Customers, orders and revenue on a single screen',
    ],
    forWho: ['Craft workshops, educational farms', 'Eco-tourism sites, attractions, ticketed venues', 'Homestays, villas, restaurants serving travellers'],
  },
  {
    slug: 'trai-nghiem-so',
    name: 'Smart Experiences',
    title: 'Smart travel experiences',
    short:
      'AI travel assistants, interactive guides, AR/VR, discovery games and smart journey maps for destinations ready to go further with technology.',
    intro:
      'Our advanced line helps travellers interact with a destination, not just look at it. Each project is designed individually; in-depth 3D work is delivered with specialist technology partners.',
    icon: 'spark',
    tone: 'lantern',
    features: [
      { title: 'AI travel assistant', text: 'Answers questions, suggests routes and gives interactive commentary tailored to each visitor’s language and interests.' },
      { title: 'AR/VR & advanced 360° tours', text: 'Bring spaces, artefacts and historical stories to life with augmented and virtual reality.' },
      { title: 'Discovery games via QR/NFC', text: 'Quests, checkpoints and badges that keep visitors exploring for longer.' },
      { title: 'Journey maps, 3D models & digital twins', text: 'Smart journey maps, 3D models and digital twins of the destination once suitable operating data exists.' },
    ],
    outcomes: [
      'Visitors engage more and stay longer',
      'A distinctive experience product for the destination',
      'Delivered project by project, scaled to fit',
    ],
    forWho: ['Large tourist areas', 'Museums and heritage sites with high visitor numbers', 'Tourism, culture and retail complexes'],
  },
];

export const tiers: typeof vi.tiers = [
  { icon: 'scan', title: 'Digitize', text: 'Give destinations imagery, information, products and experiences online.' },
  { icon: 'ticket', title: 'Commercial connection', text: 'Help travellers research, choose and book; help providers manage orders and their business.' },
  { icon: 'chart', title: 'Data & ecosystem', text: 'Build a network of destinations, standardize information and develop data products we are lawfully entitled to use.' },
];

export const ecosystem: typeof vi.ecosystem = [
  { icon: 'scan', name: 'Nam Kinh Digital Destination', text: '360° imagery, virtual tours, websites and digital maps, multilingual guides, QR/NFC, 3D models.', status: 'Available now', href: '/dich-vu/diem-den-so' },
  { icon: 'ticket', name: 'Nam Kinh Travel Connect', text: 'Subscription platform: travellers book services, owners manage schedules, orders and revenue.', status: 'Core product', href: '/dich-vu/ket-noi-du-lich' },
  { icon: 'spark', name: 'Smart travel experiences', text: 'AI assistants, interactive guides, AR/VR, discovery games, smart journey maps.', status: 'Project-based', href: '/dich-vu/trai-nghiem-so' },
  { icon: 'temple', name: 'Ke Mien Di San', text: 'A community platform for discovering heritage sites, craft villages and local stories. Awakening heritage with technology.', status: 'Community', href: '/gioi-thieu#hai-thuong-hieu' },
  { icon: 'map', name: 'Travel & night-economy data', text: 'Destination data, tourism maps, night-economy maps and trend reports, built only from data we are permitted to use.', status: 'Long-term direction', href: '/gioi-thieu#chang-duong' },
];

export const audiences: typeof vi.audiences = [
  { icon: 'temple', title: 'Cultural & heritage destinations', text: 'Historic sites, museums, craft villages, heritage houses and site boards that need digitized resources, multilingual guides and virtual tours.', product: 'Digital Destination' },
  { icon: 'ticket', title: 'Experience providers', text: 'Craft workshops, eco-tourism sites, educational farms and attractions that need bookings, ticketing and order management.', product: 'Travel Connect' },
  { icon: 'bed', title: 'Hospitality & local services', text: 'Homestays, small hotels, villas and restaurants that need 360° showcases, booking connections and cross-selling.', product: 'Digital Destination + Connect' },
  { icon: 'map', title: 'Destination authorities', text: 'Local governments, tourism authorities and heritage boards that need digital maps, destination information systems and data reports.', product: 'Project-based solutions' },
];

export const differences: typeof vi.differences = {
  chain: ['Showcase', 'Digital experience', 'Booking', 'Management', 'Data analysis'],
  items: [
    { vs: 'Not just a web agency', text: 'We do not simply hand over a website to spec; we provide one integrated system from showcase to data analysis.' },
    { vs: 'Not just a booking platform', text: 'We first give technology to the providers themselves, so they can digitize and run their own business.' },
    { vs: 'Not just a heritage digitizer', text: 'We do not stop at project handover; we stay alongside through management, content, booking and reporting.' },
  ],
};

export const stats: typeof vi.stats = [
  { value: 3, suffix: '', label: 'value tiers: digitize, connect, data' },
  { value: 5, suffix: '', label: 'solution groups in the ecosystem' },
  { value: 4, suffix: '', label: 'business customer groups' },
  { value: 2, suffix: '', label: 'brands: Nam Kinh Digital & Ke Mien Di San' },
];

export const process: typeof vi.process = [
  { title: 'Digitize the destination', text: 'Survey, 360° capture, and digitize the destination’s information, stories and services.' },
  { title: 'Go live on the platform', text: 'The destination gets its own website, booking page and admin account.' },
  { title: 'Travellers book', text: 'Travellers find it via Facebook, Google, the website or partners and book; orders go straight to the owner.' },
  { title: 'Manage & report', text: 'The owner confirms, serves and tracks revenue; Nam Kinh Digital supports operations.' },
];

export const projects: Project[] = [
  { slug: 'di-tich-360', title: 'Virtual tour & guide for a heritage site', client: 'Pilot model – Historic site', location: 'Hanoi', category: 'diem-den-so', year: 2027, summary: 'A 360° tour of the whole site, a digital map and multilingual QR commentary at every structure.', result: 'Goal: visitors explore remotely and on site in their own language', image: '/images/du-an/tour-360-pho-co.jpg' },
  { slug: 'lang-nghe-dat-lich', title: 'Craft village experience booking', client: 'Pilot model – Pottery workshop', location: 'Bat Trang', category: 'ket-noi-du-lich', year: 2027, summary: 'A booking page for pottery sessions by time slot and capacity; the owner receives and confirms orders by phone.', result: 'Goal: take bookings and sell experiences online every day', image: '/images/du-an/ha-giang-trai-nghiem.jpg' },
  { slug: 'bao-tang-3d', title: 'Digital museum and 3D artefacts', client: 'Pilot model – Museum', location: 'Hue', category: 'trai-nghiem-so', year: 2027, summary: 'Artefacts digitized as 3D models, paired with an AI assistant for interactive commentary.', result: 'Goal: an exhibition space open online to visitors everywhere', image: '/images/du-an/bao-tang-so.jpg' },
  { slug: 'homestay-360-dat-phong', title: '360° homestay with connected booking', client: 'Pilot model – Homestay', location: 'Da Lat', category: 'ket-noi-du-lich', year: 2027, summary: 'A 360° showcase integrated with the booking software already in use, plus cross-selling of local experiences.', result: 'Goal: more direct bookings and cross-sold services', image: '/images/du-an/website-homestay-da-lat.jpg' },
  { slug: 'khu-sinh-thai-kham-pha', title: 'Eco-site discovery journey', client: 'Pilot model – Eco-tourism site', location: 'Ninh Binh', category: 'trai-nghiem-so', year: 2028, summary: 'A QR/NFC discovery game and smart journey map guiding visitors through each experience point.', result: 'Goal: visitors engage more and stay longer', image: '/images/du-an/resort-bien-phu-quoc.jpg' },
  { slug: 'ban-do-so-dia-phuong', title: 'Local digital tourism map', client: 'Pilot model – Tourism authority', location: 'Provincial', category: 'diem-den-so', year: 2028, summary: 'An information system and digital map of local destinations, with engagement reports to support management.', result: 'Goal: promote destinations and support data-driven management', image: '/images/du-an/can-ho-dich-vu-q1.jpg' },
];

export const testimonials: typeof vi.testimonials = [
  { quote: 'Nam Kinh Digital helps you bring your destination and the services you already run into the digital world, so travellers can discover and book experiences, and you can manage your business more easily.', name: 'For destination owners', role: 'Digitize and sell on one platform' },
  { quote: 'Nam Kinh Digital provides solutions to digitize, promote and manage destinations, improving the visitor experience, unlocking the value of local resources and supporting management with data.', name: 'For authorities', role: 'Data-driven destination management' },
  { quote: 'Nam Kinh Digital is building a technology platform that connects destinations, service providers and travellers, towards a scalable digital travel ecosystem.', name: 'For partners', role: 'Building a digital travel ecosystem together' },
  { quote: 'Nam Kinh Digital combines digitization project revenue with a subscription software model to grow a destination network, raise business performance and build long-term technology assets.', name: 'For investors', role: 'Recurring revenue, long-term technology assets' },
];

export const faqs: typeof vi.faqs = [
  { q: 'How is Nam Kinh Digital different from a web agency?', a: 'A web agency usually hands over a site and moves on. We provide an integrated system: destination showcase, digital experience, booking, management and data analysis, and we stay with you through the platform.' },
  { q: 'I already use booking software or a POS. Do I have to replace it?', a: 'No. For hotels, homestays and restaurants we integrate with the booking software, POS or management system you already use rather than rebuilding those specialist tools.' },
  { q: 'How is pricing structured?', a: 'Destination digitization is priced as an implementation package plus maintenance; Travel Connect has a setup fee and a monthly subscription; advanced solutions are quoted per project. Send us your details and we will quote for your scale.' },
  { q: 'How do travellers pay?', a: 'Through a suitable payment provider integrated into the booking page. Owners track payments and revenue in their own admin account.' },
  { q: 'How is destination and traveller data used?', a: 'We only collect, analyse and use data within permitted scope, with a clear legal basis and usage rights. Each brand’s and each destination’s data is access-controlled separately.' },
  { q: 'What is Ke Mien Di San?', a: 'Ke Mien Di San is a community brand developed and run by Nam Kinh Digital, where people explore heritage sites, craft villages and local stories and contribute material. Contributions are reviewed and their usage rights managed before publication.' },
];

export const values: typeof vi.values = [
  { title: 'Authentic', text: 'The digital image must match the real experience. We tell each destination’s story respectfully and accurately.' },
  { title: 'In it for the long run', text: 'Handover is not the end. Management, content and reporting keep us beside each destination season after season.' },
  { title: 'Transparent data', text: 'We only use data with a legal basis and usage rights, and access is clearly separated.' },
];

export const milestones: typeof vi.milestones = [
  { year: 2027, text: 'Build the products and first revenue: complete the Digital Destination package, launch the first version of the destination business platform, deploy pilot sites and start the Ke Mien Di San community.' },
  { year: 2028, text: 'Grow the commercial platform: expand the software customer network, complete booking and integrations, multi-site management and partner distribution channels.' },
  { year: 2029, text: 'Grow the ecosystem: expand the destination network, connect service providers, develop rights-cleared data products and pilot night-economy maps and analytics.' },
];

export const team: typeof vi.team = [
  { name: 'Nguyen Van A', role: 'Chief Executive Officer', bio: 'Leads strategy and partnerships for Nam Kinh Digital.' },
  { name: 'Tran Thi B', role: 'Chief Technology Officer', bio: 'Leads the Travel Connect platform and system integrations.' },
  { name: 'Le Van C', role: 'Head of Destination Digitization', bio: 'Leads 360° capture, virtual tours, digital maps and multilingual guides.' },
  { name: 'Pham Thi D', role: 'Head of Community', bio: 'Grows the Ke Mien Di San community and its content.' },
];

export const partners = ['Historic sites', 'Museums', 'Craft villages', 'Heritage houses', 'Eco-tourism sites', 'Educational farms', 'Experience attractions', 'Homestays', 'Villas & resorts', 'Restaurants', 'Destination boards'];
