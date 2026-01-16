import React from 'react';
import { District, NavItem, Notice, ServiceRecord, TranslationDictionary, GalleryImage } from './types';

// --- BRANDING COMPONENT ---
export const CircularCrossLogo = ({ size = 40, color = '#1e1b5e', thickness = 4 }: { size?: number, color?: string, thickness?: number }) => {
  const containerStyle = {
    width: `${size}px`,
    height: `${size}px`,
    borderColor: color,
    borderWidth: `${thickness}px`,
  };

  const dividerStyle = {
    backgroundColor: color,
  };

  // Scaling factors based on the design (relative to size)
  // We use relative units to ensure it scales correctly at small sizes
  const fontSize = size * 0.17; 
  const padding = size * 0.05;

  const textStyle = {
    color: color,
    fontSize: `${fontSize}px`,
    fontWeight: 900,
    fontFamily: 'Inter, sans-serif',
    lineHeight: 1,
  };

  return (
    <div style={containerStyle} className="relative rounded-full bg-white overflow-hidden flex flex-wrap border-solid shadow-sm shrink-0 box-border z-0">
      {/* Vertical Divider */}
      <div style={{ ...dividerStyle, width: `${thickness}px`, left: `calc(50% - ${thickness / 2}px)` }} className="absolute top-0 bottom-0 z-10" />
      
      {/* Horizontal Divider */}
      <div style={{ ...dividerStyle, height: `${thickness}px`, top: `calc(50% - ${thickness / 2}px)` }} className="absolute left-0 right-0 z-10" />

      {/* Quadrants with Transforms */}
      <div className="w-1/2 h-1/2 flex items-center justify-center overflow-hidden">
        <span style={{...textStyle, transform: 'scale(0.9, 1.35)', paddingTop: `${padding}px`}} className="tracking-tighter">WB</span>
      </div>
      <div className="w-1/2 h-1/2 flex items-center justify-center overflow-hidden">
        <span style={{...textStyle, transform: 'scale(1.1, 1.35)', paddingTop: `${padding}px`}}>V</span>
      </div>
      <div className="w-1/2 h-1/2 flex items-center justify-center overflow-hidden">
        <span style={{...textStyle, transform: 'scale(1.1, 1.35)', paddingBottom: `${padding}px`}}>A</span>
      </div>
      <div className="w-1/2 h-1/2 flex items-center justify-center overflow-hidden">
        <span style={{...textStyle, transform: 'scale(1.1, 1.35)', paddingBottom: `${padding}px`}}>A</span>
      </div>
    </div>
  );
};

// --- DATA ---

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', labelEn: 'Home & News', labelBn: 'হোম ও খবর', icon: 'Home' },
  { id: 'professional', labelEn: 'Professional Portal', labelBn: 'পেশাগত পোর্টাল', icon: 'Briefcase' },
  { id: 'academic', labelEn: 'Academic & Exams', labelBn: 'শিক্ষা ও পরীক্ষা', icon: 'GraduationCap' },
  { id: 'districts', labelEn: 'Districts', labelBn: 'জেলাসমূহ', icon: 'Map' },
  { id: 'knowledge', labelEn: 'Knowledge Base', labelBn: 'জ্ঞান ভান্ডার', icon: 'BookOpen' },
  { id: 'member', labelEn: 'Member Area', labelBn: 'সদস্য এলাকা', icon: 'User' },
];

export const DISTRICTS: District[] = [
  {
    id: 'kolkata',
    name: 'Kolkata',
    memberCount: 450,
    officers: [
      { role: 'President', name: 'Dr. S. Roy' },
      { role: 'Secretary', name: 'Dr. A. Das', phone: '+91 98765 43210' },
    ]
  },
  {
    id: 'jalpaiguri',
    name: 'Jalpaiguri',
    memberCount: 120,
    officers: [
      { role: 'President', name: 'Dr. P. Ghoshal' },
      { role: 'Secretary', name: 'Dr. R. Bannerjee' },
    ]
  },
  {
    id: 'bankura',
    name: 'Bankura',
    memberCount: 95,
    officers: [
      { role: 'President', name: 'Dr. K. Mandal' },
      { role: 'Secretary', name: 'Dr. S. Patra' },
    ]
  },
  {
    id: 'darjeeling',
    name: 'Darjeeling',
    memberCount: 60,
    officers: [
      { role: 'President', name: 'Dr. T. Sherpa' },
      { role: 'Secretary', name: 'Dr. N. Pradhan' },
    ]
  },
];

export const NOTICES: Notice[] = [
  { id: '1', title: 'GS Communiqué: Annual Convention 2024', date: '2023-10-25', type: 'General', isNew: true },
  { id: '2', title: 'World Veterinary Day Celebration Plan', date: '2023-10-20', type: 'Event' },
  { id: '3', title: 'Departmental Exam Schedule 2024', date: '2023-10-15', type: 'Exam' },
];

export const SERVICE_RECORDS: ServiceRecord[] = [
  { id: 'SR001', title: 'Final Gradation List of VO 2023', date: '2023-09-01', category: 'Order' },
  { id: 'SR002', title: 'Transfer Order: South Bengal Zone', date: '2023-08-20', category: 'Transfer' },
  { id: 'SR003', title: 'Promotion to Assistant Director', date: '2023-08-15', category: 'Promotion' },
  { id: 'SR004', title: 'WBHS Enrolment Guideline Revised', date: '2023-07-10', category: 'Order' },
];

export const HERO_SLIDER_IMAGES = [
  "https://ik.imagekit.io/1dyprphd4/457059603_908765151286180_2675290478514999866_n.webp?updatedAt=1768548584210",
  "https://ik.imagekit.io/1dyprphd4/430023042_798912592271437_6276045469615509955_n.webp?updatedAt=1768548584454",
  "https://ik.imagekit.io/1dyprphd4/431644675_798912128938150_7084093102099202623_n.webp?updatedAt=1768548584386",
  "https://ik.imagekit.io/1dyprphd4/WhatsApp%20Image%202025-12-31%20at%2015.24.00.webp?updatedAt=1768548585078",
  "https://ik.imagekit.io/1dyprphd4/430074344_798912202271476_4613084758873387876_n.webp?updatedAt=1768548584191"
];

// --- GALLERY IMAGES ---
// INSTRUCTIONS FOR USER:
// 1. Get the Share Link from Google Drive.
// 2. Extract the ID part (between /d/ and /view).
// 3. Paste it as the 'driveId' below.
export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: '1',
    driveId: '1g83itJN6CHETAFeyvgno3hv2OoK1c5qr', // REPLACE THIS with your second photo ID
    caption: 'Annual General Meeting 2023',
    date: 'Oct 2023'
  },
  {
    id: '2',
    driveId: '1g83itJN6CHETAFeyvgno3hv2OoK1c5qr', // REPLACE THIS with your second photo ID
    caption: 'District Tour: Bankura',
    date: 'Sept 2023'
  },
  {
    id: '3',
    driveId: '1g83itJN6CHETAFeyvgno3hv2OoK1c5qr', // REPLACE THIS with your third photo ID
    caption: 'Veterinary Day Celebration',
    date: 'Apr 2023'
  }
];

export const DICTIONARY: TranslationDictionary = {
  heroTitle: {
    en: 'Advancing the Veterinary Profession',
    bn: 'ভেটেরিনারি পেশার অগ্রগতি'
  },
  heroSubtitle: {
    en: 'The official digital home of the West Bengal Veterinary Alumni Association. Since 1979.',
    bn: 'পশ্চিমবঙ্গ ভেটেরিনারি অ্যালামনাই অ্যাসোসিয়েশনের অফিসিয়াল ডিজিটাল হোম। ১৯৭৯ সাল থেকে।'
  },
  searchPlaceholder: {
    en: 'Find members, districts, or service rules...',
    bn: 'সদস্য, জেলা বা পরিষেবা বিধি খুঁজুন...'
  },
  latestUpdates: {
    en: 'Latest Updates',
    bn: 'সর্বশেষ আপডেট'
  },
  quickResources: {
    en: 'Quick Resources',
    bn: 'দ্রুত সম্পদ'
  },
  districtExplorer: {
    en: 'District Explorer',
    bn: 'জেলা অনুসন্ধান'
  },
  galleryTitle: {
    en: 'Activity Gallery',
    bn: 'কার্যকলাপ গ্যালারি'
  },
  login: {
    en: 'Member Login',
    bn: 'সদস্য লগইন'
  },
  loading: {
    en: 'Loading data...',
    bn: 'তথ্য লোড হচ্ছে...'
  }
};