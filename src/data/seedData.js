export const INITIAL_PROVIDERS = [
  {
    id: 'prov-1',
    name: 'Rajesh Kumar',
    phone: '+91 98450 12345',
    email: 'rajesh.electrician@coserve.org',
    role: 'provider',
    avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80',
    trade: 'Master Electrician',
    categoryId: 'electrical',
    location: {
      address: 'Indiranagar 12th Main',
      area: 'Indiranagar',
      city: 'Bengaluru',
      lat: 12.9784,
      lng: 77.6408,
      distanceKm: 1.2
    },
    skills: [
      'Ceiling Fan Repair & Installation',
      'Switchboard & MCB Repair',
      'Short Circuit Troubleshooting',
      'Inverter & UPS Setup',
      'Full House Rewiring'
    ],
    experienceYears: 9,
    rating: 4.9,
    reviewCount: 142,
    trustScore: 96, // 0 - 100
    verified: true,
    verificationDetails: {
      idProof: 'Aadhaar (Verified)',
      skillCertificate: 'National Skill Development Corp (NSDC Electrician Level 4)',
      verifiedOn: '2025-04-10',
      badge: 'Cooperative Master Craftsman'
    },
    availability: {
      status: 'AVAILABLE_NOW', // AVAILABLE_NOW, BUSY, OFFLINE
      workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      slots: ['09:00 - 12:00', '14:00 - 17:00', '17:00 - 20:00']
    },
    pricing: {
      hourlyRate: 350,
      inspectionFee: 150
    },
    completedJobs: 318,
    coopFundContribution: 9540, // ₹ contributed to community fund
    bio: 'Government NSDC Certified Electrician with 9+ years of hands-on experience in residential and commercial electrical systems. Proud member of CoServe East Bangalore Chapter.',
    badges: ['Top Match', 'Cooperative Veteran', 'Zero Dispute Record', 'Lightning Fast']
  },
  {
    id: 'prov-2',
    name: 'Anita Devi',
    phone: '+91 97312 34567',
    email: 'anita.cleaning@coserve.org',
    role: 'provider',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    trade: 'Deep Sanitation & Cleaning Expert',
    categoryId: 'cleaning',
    location: {
      address: 'Koramangala 5th Block',
      area: 'Koramangala',
      city: 'Bengaluru',
      lat: 12.9352,
      lng: 77.6245,
      distanceKm: 2.4
    },
    skills: [
      'Full Home Deep Cleaning',
      'Kitchen Deep Scrub & Degreasing',
      'Bathroom Acid & Stain Cleaning',
      'Sofa & Mattress Shampooing'
    ],
    experienceYears: 6,
    rating: 4.8,
    reviewCount: 98,
    trustScore: 92,
    verified: true,
    verificationDetails: {
      idProof: 'Voter ID (Verified)',
      skillCertificate: 'Urban Hygiene & Bio-Sanitation Certificate',
      verifiedOn: '2025-06-15',
      badge: 'Certified Hygiene Lead'
    },
    availability: {
      status: 'AVAILABLE_NOW',
      workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      slots: ['08:00 - 12:00', '13:00 - 17:00']
    },
    pricing: {
      hourlyRate: 400,
      inspectionFee: 100
    },
    completedJobs: 215,
    coopFundContribution: 6450,
    bio: 'Specialized in organic, non-toxic deep residential cleaning. Leading a 3-member women micro-cooperative group under the CoServe umbrella.',
    badges: ['Hygiene Master', 'Punctual Star', 'Eco-Friendly Equipment']
  },
  {
    id: 'prov-3',
    name: 'Suresh Rao',
    phone: '+91 94481 98765',
    email: 'suresh.plumbing@coserve.org',
    role: 'provider',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    trade: 'Senior Hydro & Pipeline Specialist',
    categoryId: 'plumbing',
    location: {
      address: 'HSR Layout Sector 2',
      area: 'HSR Layout',
      city: 'Bengaluru',
      lat: 12.9121,
      lng: 77.6446,
      distanceKm: 3.8
    },
    skills: [
      'Pipe Leakage & Burst Repair',
      'Drainage & Toilet Unclogging',
      'Water Tank Cleaning & Motor Fix',
      'Faucet, Tap & Shower Fitting'
    ],
    experienceYears: 12,
    rating: 4.95,
    reviewCount: 220,
    trustScore: 98,
    verified: true,
    verificationDetails: {
      idProof: 'Aadhaar (Verified)',
      skillCertificate: 'ITI Plumbing Trade Certificate 2012',
      verifiedOn: '2025-01-20',
      badge: 'Cooperative Master Craftsman'
    },
    availability: {
      status: 'AVAILABLE_NOW',
      workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      slots: ['07:00 - 11:00', '12:00 - 16:00', '16:30 - 20:30']
    },
    pricing: {
      hourlyRate: 380,
      inspectionFee: 150
    },
    completedJobs: 480,
    coopFundContribution: 14400,
    bio: '12+ years of plumbing expertise handling complex hidden leakages, pressure pumps, and bathroom remodeling. Cooperative Council Representative for Sector 2.',
    badges: ['12+ Yrs Exp', 'Master Craftsman', 'Top Rated Plumber']
  },
  {
    id: 'prov-4',
    name: 'Mohammad Tariq',
    phone: '+91 99005 67890',
    email: 'tariq.appliances@coserve.org',
    role: 'provider',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    trade: 'Appliance Electronics Technician',
    categoryId: 'appliances',
    location: {
      address: 'BTM Layout 2nd Stage',
      area: 'BTM Layout',
      city: 'Bengaluru',
      lat: 12.9166,
      lng: 77.6101,
      distanceKm: 4.5
    },
    skills: [
      'Washing Machine Drum & Motor Repair',
      'Refrigerator Gas Refill & Cooling Fix',
      'Microwave Magnetron Replacement',
      'RO Water Purifier Filter & Membrane Change'
    ],
    experienceYears: 7,
    rating: 4.75,
    reviewCount: 84,
    trustScore: 89,
    verified: true,
    verificationDetails: {
      idProof: 'Aadhaar (Verified)',
      skillCertificate: 'Advanced Consumer Electronics Diploma',
      verifiedOn: '2025-07-02',
      badge: 'Verified Technician'
    },
    availability: {
      status: 'AVAILABLE_NOW',
      workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sun'],
      slots: ['10:00 - 14:00', '15:00 - 19:00']
    },
    pricing: {
      hourlyRate: 450,
      inspectionFee: 200
    },
    completedJobs: 160,
    coopFundContribution: 4800,
    bio: 'Former service engineer for LG and Whirlpool, now providing independent certified repairs through CoServe with genuine spare parts warranty.',
    badges: ['OEM Certified', 'Quick Diagnostics', 'Transparent Spares']
  },
  {
    id: 'prov-5',
    name: 'Kavita Menon',
    phone: '+91 98860 11223',
    email: 'kavita.tutor@coserve.org',
    role: 'provider',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    trade: 'STEM Educator & Academic Coach',
    categoryId: 'tutoring',
    location: {
      address: 'Jayanagar 4th Block',
      area: 'Jayanagar',
      city: 'Bengaluru',
      lat: 12.9299,
      lng: 77.5824,
      distanceKm: 5.1
    },
    skills: [
      'Class 8-10 Math & Science Coaching',
      'Class 11-12 Physics & Chemistry',
      'Coding & Python for Beginners'
    ],
    experienceYears: 8,
    rating: 4.9,
    reviewCount: 65,
    trustScore: 95,
    verified: true,
    verificationDetails: {
      idProof: 'Aadhaar (Verified)',
      skillCertificate: 'M.Sc Physics (Gold Medalist), B.Ed',
      verifiedOn: '2025-02-14',
      badge: 'Academic Fellow'
    },
    availability: {
      status: 'AVAILABLE_NOW',
      workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      slots: ['16:00 - 18:00', '18:30 - 20:30']
    },
    pricing: {
      hourlyRate: 400,
      inspectionFee: 0
    },
    completedJobs: 130,
    coopFundContribution: 3900,
    bio: 'Passionate math & physics educator dedicated to conceptual clarity. Directs part of tuition fees to sponsor textbooks for underprivileged students.',
    badges: ['Top STEM Educator', 'High Concept Clarity', 'Patient Teacher']
  },
  {
    id: 'prov-6',
    name: 'Vikram Singh',
    phone: '+91 96111 88776',
    email: 'vikram.carpenter@coserve.org',
    role: 'provider',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    trade: 'Artisan Woodworker & Locksmith',
    categoryId: 'carpentry',
    location: {
      address: 'Whitefield Main Road',
      area: 'Whitefield',
      city: 'Bengaluru',
      lat: 12.9698,
      lng: 77.7499,
      distanceKm: 8.5
    },
    skills: [
      'Door Lock & Latch Replacement',
      'Furniture Assembly & Disassembly',
      'Modular Kitchen Hinge Repair',
      'Custom Wooden Shelves & Drilling'
    ],
    experienceYears: 10,
    rating: 4.7,
    reviewCount: 110,
    trustScore: 88,
    verified: true,
    verificationDetails: {
      idProof: 'Aadhaar (Verified)',
      skillCertificate: 'National Apprenticeship Certificate (Woodworking)',
      verifiedOn: '2025-03-18',
      badge: 'Verified Craftsman'
    },
    availability: {
      status: 'AVAILABLE_NOW',
      workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      slots: ['09:00 - 13:00', '14:00 - 18:00']
    },
    pricing: {
      hourlyRate: 400,
      inspectionFee: 150
    },
    completedJobs: 195,
    coopFundContribution: 5850,
    bio: 'Precision woodcrafting, quick lock repairs, and modular kitchen hardware adjustments using laser levelers and heavy-duty dustless drills.',
    badges: ['Precision Drill', 'Hardware Expert', 'Dustless Work']
  },
  {
    id: 'prov-7',
    name: 'Deepak Verma',
    phone: '+91 91480 23456',
    email: 'deepak.ac@coserve.org',
    role: 'provider',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    trade: 'HVAC & Jet Cleaning Specialist',
    categoryId: 'ac_hvac',
    location: {
      address: 'Domlur Layout',
      area: 'Domlur',
      city: 'Bengaluru',
      lat: 12.9609,
      lng: 77.6387,
      distanceKm: 1.8
    },
    skills: [
      'Split / Window AC Jet Service',
      'Freon Gas Leakage Detection & Refill',
      'AC PCB Board Repair',
      'Compressor Capacitor Fix'
    ],
    experienceYears: 8,
    rating: 4.85,
    reviewCount: 175,
    trustScore: 94,
    verified: true,
    verificationDetails: {
      idProof: 'Aadhaar (Verified)',
      skillCertificate: 'Daikin & Voltas Authorized Service Certified',
      verifiedOn: '2025-05-22',
      badge: 'HVAC Specialist'
    },
    availability: {
      status: 'AVAILABLE_NOW',
      workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      slots: ['08:00 - 12:00', '13:00 - 17:00', '17:00 - 20:00']
    },
    pricing: {
      hourlyRate: 500,
      inspectionFee: 199
    },
    completedJobs: 340,
    coopFundContribution: 10200,
    bio: 'High-pressure foam jet cleaning for AC indoor & outdoor units. Accurate digital gas pressure diagnostics and genuine R32/R410A refills.',
    badges: ['Jet Clean Pro', 'Gas Leak Specialist', '90-Day Warranty']
  },
  {
    id: 'prov-8',
    name: 'Ramesh Shenoy',
    phone: '+91 98455 77889',
    email: 'ramesh.paint@coserve.org',
    role: 'provider',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    trade: 'Master Painter & Wall Treatment',
    categoryId: 'painting',
    location: {
      address: 'Ulsoor Lake Road',
      area: 'Ulsoor',
      city: 'Bengaluru',
      lat: 12.9817,
      lng: 77.6284,
      distanceKm: 2.1
    },
    skills: [
      'Damp Wall Waterproofing & Putty Fix',
      'Single Room Accent Wall Paint',
      'Full House Interior Painting'
    ],
    experienceYears: 14,
    rating: 4.9,
    reviewCount: 160,
    trustScore: 97,
    verified: true,
    verificationDetails: {
      idProof: 'Aadhaar (Verified)',
      skillCertificate: 'Asian Paints Master Applicator Certified',
      verifiedOn: '2024-11-05',
      badge: 'Cooperative Master Craftsman'
    },
    availability: {
      status: 'AVAILABLE_NOW',
      workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      slots: ['09:00 - 13:00', '14:00 - 18:00']
    },
    pricing: {
      hourlyRate: 450,
      inspectionFee: 0
    },
    completedJobs: 280,
    coopFundContribution: 8400,
    bio: 'Asian Paints certified master applicator with zero dust automated sanding and moisture meter diagnostics for permanent anti-dampness treatment.',
    badges: ['14 Yrs Veteran', 'Dust-Free Sanding', 'Moisture Proofing']
  },
  {
    id: 'prov-9',
    name: 'Sunil Gowda',
    phone: '+91 97410 44556',
    email: 'sunil.electric@coserve.org',
    role: 'provider',
    avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&auto=format&fit=crop&q=80',
    trade: 'Junior Electrical Technician',
    categoryId: 'electrical',
    location: {
      address: 'Koramangala 8th Block',
      area: 'Koramangala',
      city: 'Bengaluru',
      lat: 12.9410,
      lng: 77.6180,
      distanceKm: 3.1
    },
    skills: [
      'Ceiling Fan Repair & Installation',
      'Switchboard & MCB Repair'
    ],
    experienceYears: 3,
    rating: 4.5,
    reviewCount: 32,
    trustScore: 82,
    verified: true,
    verificationDetails: {
      idProof: 'Aadhaar (Verified)',
      skillCertificate: 'Govt ITI Electrician Certificate',
      verifiedOn: '2025-08-01',
      badge: 'Rising Apprentice'
    },
    availability: {
      status: 'AVAILABLE_NOW',
      workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      slots: ['10:00 - 14:00', '16:00 - 20:00']
    },
    pricing: {
      hourlyRate: 280,
      inspectionFee: 100
    },
    completedJobs: 45,
    coopFundContribution: 1350,
    bio: 'Energetic junior electrician mentored under Rajesh Kumar through the CoServe Apprenticeship program. Focused on quick fixture and switchboard repairs.',
    badges: ['Co-op Apprentice', 'Affordable Rate', 'Fast Turnaround']
  },
  {
    id: 'prov-10',
    name: 'Pooja Hegde',
    phone: '+91 99800 77112',
    email: 'pooja.clean@coserve.org',
    role: 'provider',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    trade: 'Eco-Friendly Kitchen & Sanitization Pro',
    categoryId: 'cleaning',
    location: {
      address: 'Indiranagar 100 Feet Road',
      area: 'Indiranagar',
      city: 'Bengaluru',
      lat: 12.9719,
      lng: 77.6412,
      distanceKm: 0.9
    },
    skills: [
      'Kitchen Deep Scrub & Degreasing',
      'Bathroom Acid & Stain Cleaning'
    ],
    experienceYears: 4,
    rating: 4.7,
    reviewCount: 52,
    trustScore: 88,
    verified: false, // In Verification Queue for admin review demo
    verificationDetails: {
      idProof: 'Aadhaar (Submitted - Pending)',
      skillCertificate: 'Cooperative Safety Training (Pending Final Sign-off)',
      verifiedOn: null,
      badge: 'Verification In Review'
    },
    availability: {
      status: 'AVAILABLE_NOW',
      workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      slots: ['09:00 - 13:00', '14:00 - 18:00']
    },
    pricing: {
      hourlyRate: 350,
      inspectionFee: 100
    },
    completedJobs: 60,
    coopFundContribution: 1800,
    bio: 'Dedicated cleaning technician specializing in kitchen chimney degreasing and hard-water bathroom stain removal using eco-certified materials.',
    badges: ['Eco Friendly', 'Kitchen Specialist', 'Near You']
  }
];

export const INITIAL_BOOKINGS = [
  {
    id: 'CS-8491',
    customerId: 'cust-1',
    customerName: 'Priya Sharma',
    customerPhone: '+91 98765 43210',
    customerAddress: 'Flat 402, Green Glen Layout, Bellandur, Bengaluru',
    providerId: 'prov-1',
    providerName: 'Rajesh Kumar',
    serviceId: 'electrical',
    serviceTitle: 'Ceiling Fan Repair & MCB Spark Fix',
    scheduledDate: '2026-09-09',
    scheduledSlot: '17:00 - 19:00',
    description: 'Ceiling fan makes loud rattling noise and the bedroom switchboard sparks when turned on.',
    status: 'IN_PROGRESS', // REQUESTED, ACCEPTED, IN_PROGRESS, COMPLETED, RATED
    createdAt: '2026-09-08T18:30:00Z',
    matchScore: 96,
    matchBreakdown: {
      skillScore: 40, // 40 max
      availScore: 20, // 20 max
      distScore: 18,  // 20 max
      ratingScore: 9.8, // 10 max
      trustScore: 9.6  // 10 max
    },
    pricing: {
      baseAmount: 600,
      providerTakeHome: 510, // 85%
      coopWelfareFund: 60,   // 10%
      platformUpkeep: 30     // 5%
    },
    rating: null,
    review: null
  },
  {
    id: 'CS-8210',
    customerId: 'cust-1',
    customerName: 'Priya Sharma',
    customerPhone: '+91 98765 43210',
    customerAddress: 'Flat 402, Green Glen Layout, Bellandur, Bengaluru',
    providerId: 'prov-3',
    providerName: 'Suresh Rao',
    serviceId: 'plumbing',
    serviceTitle: 'Kitchen Sink Drainage Pipe Clog Removal',
    scheduledDate: '2026-09-06',
    scheduledSlot: '12:00 - 14:00',
    description: 'Kitchen drain is completely blocked with water backflow.',
    status: 'RATED',
    createdAt: '2026-09-06T10:00:00Z',
    matchScore: 98,
    matchBreakdown: {
      skillScore: 40,
      availScore: 20,
      distScore: 19,
      ratingScore: 9.9,
      trustScore: 9.8
    },
    pricing: {
      baseAmount: 500,
      providerTakeHome: 425,
      coopWelfareFund: 50,
      platformUpkeep: 25
    },
    rating: 5,
    review: 'Suresh arrived right on time, diagnosed the blocked pipeline in 10 mins, and cleared it cleanly without any mess. Truly exceptional service!',
    ratedAt: '2026-09-06T15:30:00Z'
  }
];

export const INITIAL_COMMUNITY_FUND = {
  totalPoolBalance: 248750, // ₹ in pooled bank escrow
  monthlyCollection: 42600,
  disbursedToDate: 115000,
  beneficiaryWorkers: 38,
  activeGrants: [
    {
      id: 'g-1',
      recipientName: 'Manoj Kumar (Mason / Plumber)',
      purpose: 'Tool Upgrade Grant — Automated Rotary Pipe Inspector',
      amount: 15000,
      date: '2026-08-28',
      status: 'DISBURSED',
      category: 'Equipment Upgrade'
    },
    {
      id: 'g-2',
      recipientName: 'Sunita Bai (Cleaning)',
      purpose: 'Emergency Family Health Welfare Support',
      amount: 25000,
      date: '2026-08-15',
      status: 'DISBURSED',
      category: 'Health Welfare'
    },
    {
      id: 'g-3',
      recipientName: 'Rajesh Kumar (Electrician)',
      purpose: 'Advanced Solar PV Installation Certification Subsidy',
      amount: 8000,
      date: '2026-07-20',
      status: 'DISBURSED',
      category: 'Skill Certification'
    }
  ]
};
