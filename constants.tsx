import React from 'react';
import { District, NavItem, Notice, ServiceRecord, TranslationDictionary } from './types';

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
  login: {
    en: 'Member Login',
    bn: 'সদস্য লগইন'
  },
  loading: {
    en: 'Loading data...',
    bn: 'তথ্য লোড হচ্ছে...'
  }
};