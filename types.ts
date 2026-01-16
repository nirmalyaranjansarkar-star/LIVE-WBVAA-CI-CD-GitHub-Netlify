export type Language = 'en' | 'bn';

export interface NavItem {
  id: string;
  labelEn: string;
  labelBn: string;
  icon: string;
}

export interface Notice {
  id: string;
  title: string;
  date: string;
  type: 'General' | 'Exam' | 'Event';
  isNew?: boolean;
}

export interface DistrictOfficer {
  role: string;
  name: string;
  phone?: string;
}

export interface District {
  id: string;
  name: string;
  officers: DistrictOfficer[];
  memberCount: number;
}

export interface ServiceRecord {
  id: string;
  title: string;
  date: string;
  category: 'Promotion' | 'Transfer' | 'Order';
}

export interface GalleryImage {
  id: string;
  driveId: string; // The Google Drive File ID
  caption: string;
  date?: string;
}

export interface TranslationDictionary {
  [key: string]: {
    en: string;
    bn: string;
  };
}