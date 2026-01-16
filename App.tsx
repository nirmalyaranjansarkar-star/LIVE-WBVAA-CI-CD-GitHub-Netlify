import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, Sun, Moon, Globe, Menu, X, 
  ChevronRight, FileText, Users, MapPin, 
  GraduationCap, BookOpen, Briefcase, Home,
  Download, ArrowRight, Image as ImageIcon
} from 'lucide-react';
import { CircularCrossLogo, NAV_ITEMS, DISTRICTS, NOTICES, SERVICE_RECORDS, DICTIONARY, GALLERY_IMAGES, HERO_SLIDER_IMAGES } from './constants';
import { Language, District } from './types';

// --- UI COMPONENTS ---

const SkeletonRow = () => (
  <div className="animate-pulse flex space-x-4 p-4 border-b border-gray-100 dark:border-slate-800">
    <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-3/4"></div>
    <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-1/4"></div>
  </div>
);

const Badge = ({ children, type }: { children: React.ReactNode, type?: 'new' | 'general' }) => {
  const colors = type === 'new' 
    ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' 
    : 'bg-brand-light/10 text-brand-light dark:bg-slate-700 dark:text-slate-300';
  
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${colors}`}>
      {children}
    </span>
  );
};

// --- SAFE IMAGE COMPONENT ---
// This component handles the specific requirements for Google Drive hosting
const SafeImage = ({ driveId, alt, className }: { driveId: string, alt: string, className?: string }) => {
  const [hasError, setHasError] = useState(false);
  
  // Construct the Google Drive "Export" URL
  const src = `https://drive.google.com/uc?export=view&id=${driveId}`;

  // Fallback image in case the Google Drive link fails or is private
  const fallbackSrc = "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2674&auto=format&fit=crop";

  if (hasError) {
    return (
      <div className={`flex items-center justify-center bg-gray-200 dark:bg-slate-800 text-gray-400 ${className}`}>
        <ImageIcon className="w-8 h-8 opacity-50" />
      </div>
    );
  }

  return (
    <img 
      src={src}
      alt={alt}
      className={className}
      // CRITICAL: prevents Google from checking the referrer and blocking the request
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      loading="lazy"
    />
  );
};

// --- MAIN APP ---

const App: React.FC = () => {
  // State
  const [lang, setLang] = useState<Language>('en');
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  
  // Simulated Async Loading State
  const [loading, setLoading] = useState(false);

  // Initialize Theme
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Hero Slider Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % HERO_SLIDER_IMAGES.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const toggleLang = () => setLang(l => l === 'en' ? 'bn' : 'en');
  const t = (key: string) => DICTIONARY[key][lang];

  // Logic: Navigation Handler
  const handleNavClick = (id: string) => {
    setLoading(true);
    setActiveTab(id);
    setMobileMenuOpen(false);
    // Simulate network fetch for "feel"
    setTimeout(() => setLoading(false), 600);
  };

  // Logic: Filter Service Records
  const filteredServiceRecords = useMemo(() => {
    if (!searchQuery) return SERVICE_RECORDS;
    return SERVICE_RECORDS.filter(r => 
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // --- SUB-VIEWS ---

  const renderHome = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl shadow-2xl text-white min-h-[500px] flex items-center">
        {/* Background Slider */}
        {HERO_SLIDER_IMAGES.map((img, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentHeroIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={img} 
              alt={`Hero slide ${index + 1}`} 
              className="w-full h-full object-cover"
            />
            {/* Overlay for each image to ensure text contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand/95 via-brand/80 to-brand/30"></div>
          </div>
        ))}
        
        <div className="relative z-10 p-8 md:p-12 max-w-3xl w-full">
          <div className="flex items-center space-x-2 mb-4 text-brand-200 uppercase tracking-widest text-xs font-bold opacity-0 animate-fade-in-up">
            <span className="w-8 h-0.5 bg-yellow-400"></span>
            <span>Since 1979</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight font-serif opacity-0 animate-fade-in-up delay-100 drop-shadow-lg">
            {t('heroTitle')}
          </h1>
          <p className="text-brand-100 text-lg mb-8 max-w-xl opacity-0 animate-fade-in-up delay-200 drop-shadow-md">
            {t('heroSubtitle')}
          </p>

          {/* Psychological Search Bar */}
          <div className="relative max-w-xl group opacity-0 animate-fade-in-up delay-300">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-brand-300 group-focus-within:text-brand" />
            </div>
            <input
              type="text"
              className="block w-full pl-11 pr-4 py-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-brand-200 focus:bg-white focus:text-brand focus:outline-none focus:ring-4 focus:ring-yellow-400/30 transition-all shadow-lg"
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Bento Grid Resources */}
      <div className="opacity-0 animate-fade-in delay-500">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <Users className="w-5 h-5 mr-2 text-brand dark:text-brand-light" />
          {t('quickResources')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg group-hover:text-brand dark:group-hover:text-blue-400 transition-colors">GS Communiqué</h3>
                <p className="text-gray-500 text-sm mt-1">Access the latest General Secretary notices and circulars.</p>
              </div>
              <div className="p-2 bg-blue-50 dark:bg-slate-800 rounded-lg group-hover:bg-brand group-hover:text-white transition-colors">
                <FileText className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-6 space-y-2">
              {NOTICES.slice(0, 2).map(notice => (
                <div key={notice.id} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <ArrowRight className="w-3 h-3 mr-2" />
                  <span className="truncate">{notice.title}</span>
                  {notice.isNew && <span className="ml-2 text-xs text-red-500 font-bold">NEW</span>}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white p-6 rounded-xl shadow-lg cursor-pointer transform hover:-translate-y-1 transition-transform">
            <div className="flex flex-col h-full justify-between">
              <div>
                <Briefcase className="w-8 h-8 text-yellow-400 mb-4" />
                <h3 className="font-bold text-lg">Service Matters</h3>
                <p className="text-slate-400 text-sm mt-1">Promotions, Transfers, & Gradation Lists.</p>
              </div>
              <button 
                onClick={() => handleNavClick('professional')}
                className="mt-4 w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors"
              >
                Access Portal
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* NEW: Photo Gallery Section */}
      <div className="opacity-0 animate-fade-in delay-600">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <ImageIcon className="w-5 h-5 mr-2 text-brand dark:text-brand-light" />
          {t('galleryTitle')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {GALLERY_IMAGES.map((image) => (
            <div key={image.id} className="group relative aspect-video overflow-hidden rounded-xl bg-gray-100 dark:bg-slate-800 shadow-sm border border-gray-100 dark:border-slate-800">
              <SafeImage 
                driveId={image.driveId}
                alt={image.caption}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <p className="text-white font-medium text-sm translate-y-2 group-hover:translate-y-0 transition-transform duration-300">{image.caption}</p>
                {image.date && <p className="text-gray-300 text-xs translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">{image.date}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* District Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-0 animate-fade-in delay-700">
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-100 dark:border-slate-800 shadow-sm">
          <h3 className="font-bold mb-4 flex items-center">
            <MapPin className="w-4 h-4 mr-2 text-brand" />
            District Activity
          </h3>
          <div className="space-y-3">
             {DISTRICTS.slice(0, 3).map(dist => (
               <div key={dist.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors cursor-pointer" onClick={() => { setSelectedDistrict(dist); setActiveTab('districts'); }}>
                 <div className="flex items-center">
                   <div className="w-8 h-8 rounded-full bg-brand/10 text-brand flex items-center justify-center font-bold text-xs mr-3">
                     {dist.name.substring(0, 2).toUpperCase()}
                   </div>
                   <span className="font-medium">{dist.name}</span>
                 </div>
                 <span className="text-xs text-gray-500">{dist.memberCount} Members</span>
               </div>
             ))}
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-gray-100 dark:border-slate-800 shadow-sm">
          <h3 className="font-bold mb-4 flex items-center">
            <BookOpen className="w-4 h-4 mr-2 text-brand" />
            Latest Publications
          </h3>
          <div className="space-y-4">
            <div className="flex items-start">
               <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded text-green-700 dark:text-green-400 mr-3">
                 <BookOpen className="w-5 h-5" />
               </div>
               <div>
                 <h4 className="text-sm font-semibold">EAMR Journal Vol. 4</h4>
                 <p className="text-xs text-gray-500 mt-1">Published Oct 2023</p>
               </div>
            </div>
            <div className="flex items-start">
               <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded text-purple-700 dark:text-purple-400 mr-3">
                 <FileText className="w-5 h-5" />
               </div>
               <div>
                 <h4 className="text-sm font-semibold">Pashu Palan Nirdeshika</h4>
                 <p className="text-xs text-gray-500 mt-1">Updated Guidelines</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderServicePortal = () => (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-200 dark:border-slate-800 overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-slate-800 flex justify-between items-center">
        <h2 className="text-xl font-bold">Service Matters Repository</h2>
        <div className="flex space-x-2">
          <span className="px-3 py-1 bg-gray-100 dark:bg-slate-800 rounded-full text-xs font-medium">All</span>
          <span className="px-3 py-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full text-xs font-medium cursor-pointer transition-colors">Promotions</span>
          <span className="px-3 py-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full text-xs font-medium cursor-pointer transition-colors">Transfers</span>
        </div>
      </div>
      
      <div className="p-0">
        {loading ? (
          <>
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
          </>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-slate-800 text-gray-500 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-4 font-medium">Reference ID</th>
                  <th className="px-6 py-4 font-medium">Subject</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Category</th>
                  <th className="px-6 py-4 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                {filteredServiceRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors group">
                    <td className="px-6 py-4 font-mono text-xs text-gray-400">{record.id}</td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{record.title}</td>
                    <td className="px-6 py-4 text-gray-500">{record.date}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-md text-xs font-medium 
                        ${record.category === 'Promotion' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' : 
                          record.category === 'Transfer' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' :
                          'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'}`}>
                        {record.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-brand hover:text-brand-light dark:text-blue-400 dark:hover:text-blue-300 font-medium flex items-center justify-end ml-auto group-hover:underline">
                        <Download className="w-4 h-4 mr-1" />
                        PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredServiceRecords.length === 0 && (
              <div className="p-12 text-center text-gray-400">
                <FileText className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>No records found matching your search.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  const renderDistricts = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar List */}
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-200 dark:border-slate-800 overflow-hidden md:col-span-1 h-fit">
          <div className="p-4 border-b border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-800/50">
            <h3 className="font-bold">Select District</h3>
          </div>
          <div className="max-h-[500px] overflow-y-auto">
            {DISTRICTS.map(dist => (
              <div 
                key={dist.id}
                onClick={() => setSelectedDistrict(dist)}
                className={`p-4 border-b border-gray-100 dark:border-slate-800 cursor-pointer flex justify-between items-center hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors
                  ${selectedDistrict?.id === dist.id ? 'bg-brand/5 dark:bg-blue-900/20 border-l-4 border-l-brand' : 'border-l-4 border-l-transparent'}
                `}
              >
                <span className="font-medium">{dist.name}</span>
                <ChevronRight className={`w-4 h-4 text-gray-400 ${selectedDistrict?.id === dist.id ? 'text-brand' : ''}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Detail View */}
        <div className="md:col-span-2">
          {selectedDistrict ? (
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-gray-200 dark:border-slate-800 overflow-hidden animate-in slide-in-from-right duration-300">
              <div className="h-32 bg-brand relative">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h2 className="text-3xl font-bold">{selectedDistrict.name} District</h2>
                  <p className="text-brand-200 text-sm">WBVAA Unit</p>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-lg">
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Total Members</p>
                    <p className="text-2xl font-bold text-brand dark:text-white">{selectedDistrict.memberCount}</p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-lg">
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Status</p>
                    <p className="text-xl font-bold text-green-600 flex items-center">
                      <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                      Active
                    </p>
                  </div>
                </div>

                <h3 className="font-bold text-lg mb-4 border-b border-gray-100 dark:border-slate-700 pb-2">Committee Members</h3>
                <div className="space-y-4">
                  {selectedDistrict.officers.map((officer, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-slate-700 hover:border-brand/30 transition-colors">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-brand text-white flex items-center justify-center font-bold mr-4">
                          {officer.name.charAt(4)}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 dark:text-white">{officer.name}</p>
                          <p className="text-sm text-brand dark:text-brand-200">{officer.role}</p>
                        </div>
                      </div>
                      {officer.phone && (
                        <button className="text-sm px-3 py-1 bg-green-50 text-green-700 rounded-full hover:bg-green-100 transition-colors">
                          Contact
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 bg-gray-50/50 dark:bg-slate-900/50 rounded-xl border-2 border-dashed border-gray-200 dark:border-slate-800 p-12">
              <MapPin className="w-16 h-16 mb-4 opacity-20" />
              <p className="text-lg font-medium">Select a district to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home': return <Home className="w-5 h-5" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5" />;
      case 'Map': return <MapPin className="w-5 h-5" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5" />;
      case 'User': return <Users className="w-5 h-5" />;
      default: return <Home className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-brand selection:text-white relative">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/95 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 transition-colors duration-300">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <CircularCrossLogo size={48} />
            
            <div className="hidden md:block">
              <h1 className="font-black text-xl leading-none tracking-tight text-brand dark:text-white">WBVAA</h1>
              <p className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">Alumni Association</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-1">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2
                  ${activeTab === item.id 
                    ? 'bg-brand/5 text-brand dark:bg-white/10 dark:text-white' 
                    : 'text-gray-600 hover:text-brand dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5'
                  }`}
              >
                {getIcon(item.icon)}
                <span>{lang === 'en' ? item.labelEn : item.labelBn}</span>
              </button>
            ))}
          </nav>

          {/* Utilities */}
          <div className="flex items-center space-x-2">
            <button 
              onClick={toggleLang}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors text-gray-600 dark:text-gray-300 flex items-center"
              aria-label="Toggle Language"
            >
              <Globe className="w-5 h-5" />
              <span className="ml-1 text-xs font-bold">{lang.toUpperCase()}</span>
            </button>
            
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors text-gray-600 dark:text-gray-300"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors text-gray-600 dark:text-gray-300"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 w-full bg-white dark:bg-slate-950 border-b border-gray-200 dark:border-slate-800 shadow-xl p-4 animate-in slide-in-from-top-5">
            <div className="grid grid-cols-2 gap-4">
              {NAV_ITEMS.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`p-4 rounded-xl flex flex-col items-center justify-center space-y-2 transition-colors
                    ${activeTab === item.id 
                      ? 'bg-brand text-white' 
                      : 'bg-gray-50 dark:bg-slate-900 text-gray-700 dark:text-gray-300'
                    }`}
                >
                  {getIcon(item.icon)}
                  <span className="text-xs font-bold text-center">{lang === 'en' ? item.labelEn : item.labelBn}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-grow container mx-auto px-4 py-8">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'professional' && renderServicePortal()}
        {activeTab === 'districts' && renderDistricts()}
        
        {/* Placeholders for other tabs */}
        {(activeTab === 'academic' || activeTab === 'knowledge' || activeTab === 'member') && (
          <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in">
             <div className="w-20 h-20 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
                <Briefcase className="w-10 h-10 text-gray-400" />
             </div>
             <h2 className="text-2xl font-bold mb-2">Section Under Construction</h2>
             <p className="text-gray-500 max-w-md">The {activeTab} module is currently being updated with the latest 2024 data.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-950 border-t border-gray-200 dark:border-slate-800 py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
               <CircularCrossLogo size={40} />
               <span className="font-bold text-gray-600 dark:text-gray-400">West Bengal Veterinary Alumni Association</span>
            </div>
            <div className="flex space-x-6 text-sm text-gray-500">
               <a href="#" className="hover:text-brand transition-colors">Privacy Policy</a>
               <a href="#" className="hover:text-brand transition-colors">Contact Us</a>
               <a href="#" className="hover:text-brand transition-colors">Member Login</a>
            </div>
          </div>
          <div className="text-center md:text-left text-xs text-gray-400 border-t border-gray-100 dark:border-slate-800 pt-8">
            &copy; {new Date().getFullYear()} WBVAA. All rights reserved. Designed for the profession.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;