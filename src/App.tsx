import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Phone, 
  Calendar, 
  Clock, 
  User, 
  Settings, 
  Upload, 
  Check, 
  Trash2, 
  Plus, 
  Layers, 
  Sliders, 
  Activity, 
  ShieldCheck, 
  HeartHandshake,
  CheckCircle2,
  Lock,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Stethoscope
} from 'lucide-react';

export default function App() {
  // Theme state based on treatment tabs
  const [activeTab, setActiveTab] = useState('skin'); // 'skin', 'hair', 'panchkarma'
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hero Slider Index
  const [currentSlide, setCurrentSlide] = useState(0);

  // Appointment Modal & Form
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [appointmentForm, setAppointmentForm] = useState({
    name: '',
    phone: '',
    email: '',
    treatment: 'Skin Treatment',
    date: '',
    time: ''
  });

  // Dynamic Content (Editable by Admin)
  const [appointments, setAppointments] = useState([
    { id: 1, name: 'Priya Sharma', phone: '9876543210', treatment: 'Skin Treatment (Acne)', date: '2026-09-10', time: '10:30 AM', status: 'Pending' },
    { id: 2, name: 'Rajesh Verma', phone: '9123456789', treatment: 'Panchkarma (Abhyanga)', date: '2026-09-11', time: '02:00 PM', status: 'Confirmed' }
  ]);

  const [heroSlides, setHeroSlides] = useState([
    {
      id: 1,
      title: 'Ayurvedic Skin Treatments',
      subtitle: 'Natural Radiance & Radiant Health with Herbal Formulations',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 2,
      title: 'Advanced Hair Restoration',
      subtitle: 'Strengthen Hair Roots naturally with Scalp Panchkarma Therapies',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 3,
      title: 'Authentic Panchkarma Center',
      subtitle: 'Detoxify Body & Mind through Classical Ayurvedic Panchkarma',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 4,
      title: 'Cupping & Leech Therapy (Raktamokshana)',
      subtitle: 'Traditional Blood Purification for Chronic Skin & Pain Disorders',
      image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1200&q=80'
    }
  ]);

  // Treatments Detailed Content
  const [treatmentsData, setTreatmentsData] = useState({
    skin: {
      title: 'Skin Care Treatments',
      themeClass: 'from-amber-50 to-orange-100 text-orange-950 border-orange-200',
      accentColor: 'bg-orange-500',
      badgeColor: 'bg-orange-100 text-orange-800',
      pointers: [
        'Pure Herbal & Ayurvedic Skin Formulations without side effects',
        'Holistic treatment for Chronic Acne, Psoriasis, Eczema, & Melasma',
        'Raktamokshana (Leech Therapy) for blood purification & glow',
        'Customized Mukhalepam (Ayurvedic Facial Packs) for anti-aging'
      ],
      treatmentsList: [
        { name: 'Acne & Pigmentation Care', desc: 'Herbal paste application & internal blood purifiers.' },
        { name: 'Psoriasis & Eczema Relief', desc: 'Ayurvedic detox to balance Pitta & Kapha doshas.' },
        { name: 'Anti-Aging Herbal Facials', desc: 'Mukhalepam using Saffron, Chandan, & Neem extracts.' },
        { name: 'Leech Therapy (Raktamokshana)', desc: 'Painless detoxification for stubborn skin spots.' }
      ]
    },
    hair: {
      title: 'Hair Care Treatments',
      themeClass: 'from-emerald-50 to-teal-100 text-teal-950 border-teal-200',
      accentColor: 'bg-teal-600',
      badgeColor: 'bg-teal-100 text-teal-800',
      pointers: [
        'Nasyam therapy for nourishing hair roots from within',
        'Treatment for Premature Graying, Hairfall, & Alopecia',
        'Sirodhara with medicated oils for stress-relief & scalp nourishment',
        'Specialized Herbal Scalp Cleansing & Conditioning'
      ],
      treatmentsList: [
        { name: 'Anti-Hairfall Treatment', desc: 'Nutritional & oil treatments to stop root weakening.' },
        { name: 'Dandruff & Scalp Care', desc: 'Antifungal herbal pastes and oil massage.' },
        { name: 'Sirodhara Therapy', desc: 'Continuous oil pouring over head for stress & hair loss.' },
        { name: 'Alopecia Management', desc: 'Stimulating hair follicles with herbal formulations.' }
      ]
    },
    panchkarma: {
      title: 'Panchkarma & Specialty Therapies',
      themeClass: 'from-purple-50 to-indigo-100 text-purple-950 border-purple-200',
      accentColor: 'bg-purple-600',
      badgeColor: 'bg-purple-100 text-purple-800',
      pointers: [
        'Complete Body Detoxification with classical Panchkarma',
        'Vamana, Virechana, Basti, Nasyam, & Raktamokshana',
        'Pain Management for Joint Pain, Arthritis, & Cervical Spondylosis',
        'Cupping Therapy (Hijama) for cellular rejuvenation'
      ],
      treatmentsList: [
        { name: 'Abhyanga & Swedana', desc: 'Full body medicated oil massage & herbal steam bath.' },
        { name: 'Cupping Therapy (Hijama)', desc: 'Improves blood flow & eliminates systemic toxins.' },
        { name: 'Basti Therapy', desc: 'Medicated enema for digestive detox & vata disorders.' },
        { name: 'Leech Therapy (Jalaukavacharana)', desc: 'Targeted removal of stagnant blood & toxins.' }
      ]
    }
  });

  // 12 Flip Matrix Tiles State
  const [tiles, setTiles] = useState([
    { id: 1, title: 'Acne & Scars', category: 'Skin', frontImg: 'https://images.unsplash.com/photo-1512290900676-26c27f60fa67?auto=format&fit=crop&w=400&q=80', backDesc: 'Natural herbal remedies to clear stubborn acne and heal post-acne scars smoothly.' },
    { id: 2, title: 'Hair Fall Control', category: 'Hair', frontImg: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=400&q=80', backDesc: 'Ayurvedic head oils & Nasyam to strengthen hair roots and boost healthy growth.' },
    { id: 3, title: 'Abhyanga Massage', category: 'Panchkarma', frontImg: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=400&q=80', backDesc: 'Synchronized medicated oil massage to tone muscles, calm nerves, and rejuvenate.' },
    { id: 4, title: 'Cupping Therapy', category: 'Special', frontImg: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=400&q=80', backDesc: 'Vacuum cupping to enhance micro-circulation, relieve pain, and release toxins.' },
    { id: 5, title: 'Sirodhara', category: 'Panchkarma', frontImg: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=400&q=80', backDesc: 'Continuous warm medicated oil stream on forehead for deep relaxation & sleep.' },
    { id: 6, title: 'Leech Therapy', category: 'Special', frontImg: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=400&q=80', backDesc: 'Authentic Raktamokshana using medical leeches to cleanse blood naturally.' },
    { id: 7, title: 'Psoriasis Care', category: 'Skin', frontImg: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=400&q=80', backDesc: 'Balancing Pitta-Kapha doshas for long-term management of skin scaling and itching.' },
    { id: 8, title: 'Dandruff Cure', category: 'Hair', frontImg: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=400&q=80', backDesc: 'Herbal scalping treatments and anti-fungal pastes for clean and healthy scalp.' },
    { id: 9, title: 'Kati Basti', category: 'Panchkarma', frontImg: 'https://images.unsplash.com/photo-1512290900676-26c27f60fa67?auto=format&fit=crop&w=400&q=80', backDesc: 'Warm oil pooling treatment specially formulated for lower back pain and stiffness.' },
    { id: 10, title: 'Pigmentation Glow', category: 'Skin', frontImg: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=400&q=80', backDesc: 'Herbal facials (Mukhalepam) with Chandan & Kesar for skin tone lightening.' },
    { id: 11, title: 'Nasyam Therapy', category: 'Panchkarma', frontImg: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80', backDesc: 'Nasal administration of medicated drops for sinusitis, hair fall, and mental clarity.' },
    { id: 12, title: 'Weight & Detox', category: 'Panchkarma', frontImg: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=400&q=80', backDesc: 'Udvartana herbal powder massages for fat metabolism and overall body detox.' }
  ]);

  // Admin New Image Upload State
  const [newImage, setNewImage] = useState({
    title: '',
    url: '',
    isGallery: true,
    isTile: false,
    isHero: false
  });

  // Auto Slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [heroSlides]);

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPassword === 'admin123') {
      setIsAdmin(true);
      setAdminModalOpen(false);
      setAdminPassword('');
    } else {
      alert('Invalid Password! Try: admin123');
    }
  };

  const handleAppointmentSubmit = (e) => {
    e.preventDefault();
    const newApt = {
      id: Date.now(),
      ...appointmentForm,
      status: 'Pending'
    };
    setAppointments([newApt, ...appointments]);
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setBookingModalOpen(false);
      setAppointmentForm({ name: '', phone: '', email: '', treatment: 'Skin Treatment', date: '', time: '' });
    }, 2000);
  };

  const handleAddImage = (e) => {
    e.preventDefault();
    if (!newImage.url || !newImage.title) return;

    if (newImage.isHero) {
      setHeroSlides([
        ...heroSlides,
        { id: Date.now(), title: newImage.title, subtitle: 'Uploaded via Admin Panel', image: newImage.url }
      ]);
    }

    if (newImage.isTile) {
      setTiles([
        ...tiles.slice(0, 11),
        {
          id: Date.now(),
          title: newImage.title,
          category: 'Admin Addition',
          frontImg: newImage.url,
          backDesc: 'Newly added treatment or therapy in Atharv Clinic.'
        }
      ]);
    }

    alert('Image and location mapped successfully!');
    setNewImage({ title: '', url: '', isGallery: true, isTile: false, isHero: false });
  };

  const handleDeleteAppointment = (id) => {
    setAppointments(appointments.filter(a => a.id !== id));
  };

  const handleStatusChange = (id, newStatus) => {
    setAppointments(appointments.map(a => a.id === id ? { ...a, status: newStatus } : a));
  };

  return (
    <div className="min-h-screen bg-[#F5F3FF] text-gray-800 font-sans selection:bg-purple-200 selection:text-purple-900">
      
      {/* TOP HEADER / BAR */}
      <div className="bg-purple-900 text-purple-100 text-xs md:text-sm py-2 px-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <span className="flex items-center gap-1"><MapPin size={14} className="text-orange-400" /> Bilaspur, Chhattisgarh</span>
            <span className="flex items-center gap-1"><Phone size={14} className="text-orange-400" /> +91 98765 43210</span>
            <span className="flex items-center gap-1"><Clock size={14} className="text-orange-400" /> Mon - Sat: 10:00 AM - 7:00 PM</span>
          </div>
          <div className="flex items-center gap-3">
            {isAdmin ? (
              <span className="bg-emerald-600 text-white px-2 py-0.5 rounded text-xs flex items-center gap-1">
                <ShieldCheck size={12} /> Admin Logged In
                <button onClick={() => setIsAdmin(false)} className="ml-2 hover:underline text-purple-200">Logout</button>
              </span>
            ) : (
              <button 
                onClick={() => setAdminModalOpen(true)}
                className="text-xs text-purple-200 hover:text-white flex items-center gap-1 bg-purple-800/60 px-2 py-1 rounded transition"
              >
                <Lock size={12} /> Admin Login
              </button>
            )}
          </div>
        </div>
      </div>

      {/* MAIN NAVIGATION & BRANDING HEADER */}
      <header className="bg-purple-50/90 backdrop-blur-md sticky top-0 z-40 border-b border-purple-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          
          {/* Main Titles specified in prompt */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center gap-1 justify-center shadow-md border-2 border-orange-300">
              <Stethoscope size={26} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wide text-orange-500 uppercase drop-shadow-sm">
                ATHARV CLINIC
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-purple-900 tracking-tight">
                Skin & Hair Treatment And Panchkarma Center
              </p>
              <p className="text-[11px] sm:text-xs text-purple-700 italic font-medium">
                Lead by Dr. Suman Kesharwani
              </p>
            </div>
          </div>

          {/* Desktop Nav Actions */}
          <div className="hidden md:flex items-center gap-4">
            <a href="#treatments" className="text-purple-900 font-medium hover:text-orange-600 transition">Treatments</a>
            <a href="#matrix" className="text-purple-900 font-medium hover:text-orange-600 transition">Therapy Matrix</a>
            <a href="#contact" className="text-purple-900 font-medium hover:text-orange-600 transition">Location</a>
            
            <button 
              onClick={() => setBookingModalOpen(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition flex items-center gap-2 transform hover:-translate-y-0.5"
            >
              <Calendar size={18} /> Book Appointment
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-purple-900 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Bar */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-purple-100 border-b border-purple-200 px-4 py-3 flex flex-col gap-3">
            <a href="#treatments" onClick={() => setMobileMenuOpen(false)} className="text-purple-900 font-medium py-1">Treatments</a>
            <a href="#matrix" onClick={() => setMobileMenuOpen(false)} className="text-purple-900 font-medium py-1">Therapy Matrix</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-purple-900 font-medium py-1">Location</a>
            <button 
              onClick={() => { setBookingModalOpen(true); setMobileMenuOpen(false); }}
              className="bg-orange-500 text-white font-semibold py-2 rounded-lg text-center flex justify-center items-center gap-2"
            >
              <Calendar size={18} /> Book Appointment
            </button>
          </div>
        )}
      </header>

      {/* HERO SLIDER SECTION */}
      <section className="relative h-[380px] sm:h-[480px] md:h-[520px] overflow-hidden bg-purple-950">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img 
              src={slide.image} 
              alt={slide.title}
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-950/90 via-purple-950/50 to-transparent flex items-center">
              <div className="max-w-4xl mx-auto px-6 sm:px-12 text-white">
                <span className="bg-orange-500/90 text-white text-xs sm:text-sm font-semibold uppercase px-3 py-1 rounded-full tracking-wider mb-3 inline-block">
                  Ayurvedic Healthcare Excellence
                </span>
                <h2 className="text-3xl sm:text-5xl font-bold mb-3 text-orange-400 drop-shadow">
                  {slide.title}
                </h2>
                <p className="text-sm sm:text-xl text-purple-100 mb-6 max-w-xl font-light">
                  {slide.subtitle}
                </p>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setBookingModalOpen(true)}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg font-medium shadow-lg transition flex items-center gap-2"
                  >
                    Consult Dr. Suman
                  </button>
                  <a 
                    href="#treatments"
                    className="bg-white/20 hover:bg-white/30 backdrop-blur text-white px-5 py-2.5 rounded-lg font-medium transition"
                  >
                    Explore Treatments
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slider Controls */}
        <button 
          onClick={() => setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white p-2.5 rounded-full transition"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white p-2.5 rounded-full transition"
        >
          <ChevronRight size={24} />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                i === currentSlide ? 'bg-orange-500 w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* DYNAMIC TREATMENT TABS & THEMES */}
      <section id="treatments" className="py-12 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-purple-700 font-semibold text-sm uppercase tracking-widest">Specialized Healing</span>
          <h2 className="text-3xl font-bold text-purple-950 mt-1">Our Core Ayurvedic Specialties</h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">Select a tab below to experience our personalized treatment themes, clinical pointers, and available procedures.</p>
        </div>

        {/* Buttons in-between as requested */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mb-8">
          <button
            onClick={() => setActiveTab('skin')}
            className={`px-6 py-3 rounded-xl font-bold text-base transition-all transform duration-200 flex items-center gap-2 shadow-md ${
              activeTab === 'skin'
                ? 'bg-orange-500 text-white ring-4 ring-orange-200 scale-105'
                : 'bg-white text-orange-900 hover:bg-orange-50 border border-orange-200'
            }`}
          >
            <Sparkles size={18} /> Skin Treatment
          </button>

          <button
            onClick={() => setActiveTab('hair')}
            className={`px-6 py-3 rounded-xl font-bold text-base transition-all transform duration-200 flex items-center gap-2 shadow-md ${
              activeTab === 'hair'
                ? 'bg-teal-600 text-white ring-4 ring-teal-200 scale-105'
                : 'bg-white text-teal-900 hover:bg-teal-50 border border-teal-200'
            }`}
          >
            <Layers size={18} /> Hair Treatment
          </button>

          <button
            onClick={() => setActiveTab('panchkarma')}
            className={`px-6 py-3 rounded-xl font-bold text-base transition-all transform duration-200 flex items-center gap-2 shadow-md ${
              activeTab === 'panchkarma'
                ? 'bg-purple-700 text-white ring-4 ring-purple-200 scale-105'
                : 'bg-white text-purple-900 hover:bg-purple-50 border border-purple-200'
            }`}
          >
            <Activity size={18} /> Panchkarma Center
          </button>
        </div>

        {/* Dynamic Tab Content Box (Applies dynamic themes for skin, hair, panchkarma) */}
        <div className={`p-6 sm:p-10 rounded-2xl border-2 bg-gradient-to-br shadow-xl transition-all duration-300 ${treatmentsData[activeTab].themeClass}`}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-4 border-b border-black/10 gap-4">
            <div>
              <span className={`text-xs font-bold uppercase px-3 py-1 rounded-full ${treatmentsData[activeTab].badgeColor}`}>
                {activeTab.toUpperCase()} SPECIALTY THEME
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold mt-2">
                {treatmentsData[activeTab].title}
              </h3>
            </div>
            <button
              onClick={() => {
                setAppointmentForm({ ...appointmentForm, treatment: treatmentsData[activeTab].title });
                setBookingModalOpen(true);
              }}
              className={`${treatmentsData[activeTab].accentColor} text-white px-5 py-2.5 rounded-lg font-semibold shadow hover:opacity-90 transition`}
            >
              Book for {treatmentsData[activeTab].title.split(' ')[0]}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column: Pointers */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-black/5 shadow-sm">
              <h4 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-900">
                <CheckCircle2 className="text-emerald-600" size={20} /> Key Medical Highlights
              </h4>
              <ul className="space-y-3">
                {treatmentsData[activeTab].pointers.map((pointer, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm sm:text-base font-medium">
                    <span className="w-2 h-2 rounded-full bg-orange-500 mt-2 shrink-0"></span>
                    <span>{pointer}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column: Treatments List */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-black/5 shadow-sm">
              <h4 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-900">
                <HeartHandshake className="text-orange-500" size={20} /> Special Therapies Offered
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {treatmentsData[activeTab].treatmentsList.map((item, i) => (
                  <div key={i} className="p-3 rounded-lg bg-white/90 border border-gray-100 shadow-xs hover:border-orange-300 transition">
                    <p className="font-bold text-sm text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-600 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12 TILES MEDIUM MATRIX (MOVE & FLIP ON HOVER) */}
      <section id="matrix" className="py-12 bg-purple-100/50 border-y border-purple-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-orange-600 font-semibold text-sm uppercase tracking-widest">Interactive Portfolio</span>
            <h2 className="text-3xl font-bold text-purple-950 mt-1">12 Specialty Treatment Matrix</h2>
            <p className="text-gray-600 mt-2">Hover over any tile to flip and explore the details of Dr. Suman Kesharwani's Ayurvedic procedures.</p>
          </div>

          {/* 12 Matrix Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {tiles.map((tile) => (
              <div 
                key={tile.id} 
                className="group h-56 sm:h-64 [perspective:1000px] cursor-pointer"
              >
                {/* Flipping Container */}
                <div className="relative h-full w-full rounded-2xl shadow-md transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-hover:shadow-xl">
                  
                  {/* FRONT SIDE */}
                  <div className="absolute inset-0 h-full w-full rounded-2xl overflow-hidden [backface-visibility:hidden]">
                    <img 
                      src={tile.frontImg} 
                      alt={tile.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-950/90 via-purple-950/30 to-transparent flex flex-col justify-end p-4 text-white">
                      <span className="text-[10px] bg-orange-500/90 text-white px-2 py-0.5 rounded uppercase font-bold w-max mb-1">
                        {tile.category}
                      </span>
                      <h3 className="font-bold text-base sm:text-lg text-white leading-tight">{tile.title}</h3>
                      <p className="text-[11px] text-purple-200 mt-0.5">Hover to reveal therapy</p>
                    </div>
                  </div>

                  {/* BACK SIDE (FLIPPED) */}
                  <div className="absolute inset-0 h-full w-full rounded-2xl bg-purple-900 text-white p-5 flex flex-col justify-between [transform:rotateY(180deg)] [backface-visibility:hidden] border-2 border-orange-400">
                    <div>
                      <span className="text-xs text-orange-400 font-bold uppercase tracking-wider">{tile.category} Details</span>
                      <h4 className="text-lg font-bold text-white mt-1 mb-2">{tile.title}</h4>
                      <p className="text-xs sm:text-sm text-purple-100 leading-relaxed">{tile.backDesc}</p>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setAppointmentForm({ ...appointmentForm, treatment: tile.title });
                        setBookingModalOpen(true);
                      }}
                      className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold py-2 px-3 rounded-lg transition text-center w-full"
                    >
                      Book This Therapy
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOCTOR PROFILE / ABOUT CLINIC */}
      <section className="py-14 max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-r from-purple-900 to-purple-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-1/3 text-center">
            <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden border-4 border-orange-400 shadow-xl mx-auto mb-4 bg-purple-800 flex items-center justify-center">
              <User size={100} className="text-purple-300" />
            </div>
            <h3 className="text-2xl font-bold text-orange-400">Dr. Suman Kesharwani</h3>
            <p className="text-purple-200 text-sm font-medium">B.A.M.S. | Ayurvedic Physician & Panchkarma Specialist</p>
          </div>

          <div className="w-full md:w-2/3 space-y-4">
            <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">Leadership & Care</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Welcome to Atharv Clinic</h2>
            <p className="text-purple-100 leading-relaxed text-sm sm:text-base">
              At Atharv Clinic under the expert guidance of <strong>Dr. Suman Kesharwani</strong>, we combine authentic classical Ayurvedic wisdom with modern clinical diagnostic principles. Located at RG Empire, Bilaspur, our center is equipped with clean Panchkarma rooms, genuine herbal oils, and sterile cupping & leech therapy protocols.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 text-xs sm:text-sm">
              <div className="p-3 bg-white/10 rounded-xl border border-white/10">
                <p className="text-orange-400 font-bold text-lg">100%</p>
                <p className="text-purple-200">Natural & Herbal</p>
              </div>
              <div className="p-3 bg-white/10 rounded-xl border border-white/10">
                <p className="text-orange-400 font-bold text-lg">Panchkarma</p>
                <p className="text-purple-200">Classical Procedures</p>
              </div>
              <div className="p-3 bg-white/10 rounded-xl border border-white/10">
                <p className="text-orange-400 font-bold text-lg">Personalized</p>
                <p className="text-purple-200">Dosha Diagnosis</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ADMIN CONTROL PANEL SECTION (ROLE BASED ACCESS) */}
      {isAdmin && (
        <section className="py-10 bg-purple-950 text-white border-y-4 border-orange-500">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center mb-8 border-b border-purple-800 pb-4">
              <div>
                <span className="bg-emerald-500 text-white text-xs px-2 py-0.5 rounded uppercase font-bold">Admin Workspace</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-orange-400 mt-1">Atharv Clinic Administration</h2>
              </div>
              <button 
                onClick={() => setIsAdmin(false)}
                className="bg-red-600 hover:bg-red-700 text-white text-xs px-4 py-2 rounded-lg transition flex items-center gap-1"
              >
                <LogOut size={14} /> Exit Admin Role
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* 1. Appointments Table */}
              <div className="bg-purple-900/80 p-6 rounded-2xl border border-purple-700">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Calendar className="text-orange-400" size={20} /> Patient Appointments ({appointments.length})
                </h3>
                
                {appointments.length === 0 ? (
                  <p className="text-purple-300 text-sm">No appointment bookings logged yet.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-purple-950 text-purple-200 uppercase text-[11px]">
                        <tr>
                          <th className="p-2">Patient</th>
                          <th className="p-2">Treatment</th>
                          <th className="p-2">Date & Time</th>
                          <th className="p-2">Status</th>
                          <th className="p-2">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-purple-800">
                        {appointments.map((apt) => (
                          <tr key={apt.id} className="hover:bg-purple-800/50">
                            <td className="p-2 font-medium">
                              {apt.name}
                              <div className="text-[11px] text-purple-300">{apt.phone}</div>
                            </td>
                            <td className="p-2 text-purple-200">{apt.treatment}</td>
                            <td className="p-2 text-purple-200">{apt.date} <br/> <span className="text-[11px] text-orange-300">{apt.time}</span></td>
                            <td className="p-2">
                              <select 
                                value={apt.status} 
                                onChange={(e) => handleStatusChange(apt.id, e.target.value)}
                                className={`text-xs px-2 py-1 rounded font-semibold bg-purple-950 border border-purple-700 ${
                                  apt.status === 'Confirmed' ? 'text-emerald-400' : 'text-amber-400'
                                }`}
                              >
                                <option value="Pending">Pending</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Completed">Completed</option>
                              </select>
                            </td>
                            <td className="p-2">
                              <button 
                                onClick={() => handleDeleteAppointment(apt.id)}
                                className="text-red-400 hover:text-red-300 p-1"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* 2. Image Upload & Destination Checkbox */}
              <div className="bg-purple-900/80 p-6 rounded-2xl border border-purple-700">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Upload className="text-orange-400" size={20} /> Upload Image & Map Locations
                </h3>
                <form onSubmit={handleAddImage} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-purple-200 mb-1">Image Title / Description</label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. Panchkarma Therapy Room"
                      value={newImage.title}
                      onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
                      className="w-full bg-purple-950 border border-purple-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-purple-200 mb-1">Image URL (Google/Unsplash Link)</label>
                    <input 
                      type="url"
                      required
                      placeholder="https://images.unsplash.com/..."
                      value={newImage.url}
                      onChange={(e) => setNewImage({ ...newImage, url: e.target.value })}
                      className="w-full bg-purple-950 border border-purple-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  {/* Applied Checkbox Options as specified in user prompt */}
                  <div className="bg-purple-950 p-3 rounded-lg border border-purple-800">
                    <p className="text-xs font-bold text-orange-400 mb-2">Select Display Destinations:</p>
                    <div className="flex flex-wrap gap-4 text-xs">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox"
                          checked={newImage.isGallery}
                          onChange={(e) => setNewImage({ ...newImage, isGallery: e.target.checked })}
                          className="rounded text-orange-500 focus:ring-0"
                        />
                        <span>Gallery View</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox"
                          checked={newImage.isTile}
                          onChange={(e) => setNewImage({ ...newImage, isTile: e.target.checked })}
                          className="rounded text-orange-500 focus:ring-0"
                        />
                        <span>12 Flip Tiles Matrix</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox"
                          checked={newImage.isHero}
                          onChange={(e) => setNewImage({ ...newImage, isHero: e.target.checked })}
                          className="rounded text-orange-500 focus:ring-0"
                        />
                        <span>Hero Slider</span>
                      </label>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-lg transition flex justify-center items-center gap-2"
                  >
                    <Plus size={18} /> Upload Image To Selected Locations
                  </button>
                </form>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* CONTACT & MAP SECTION */}
      <section id="contact" className="py-14 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-3xl shadow-xl overflow-hidden border border-purple-200">
          
          {/* Contact Details */}
          <div className="p-8 sm:p-10 flex flex-col justify-between bg-purple-50">
            <div>
              <span className="text-orange-600 font-semibold text-xs uppercase tracking-wider">Visit Us</span>
              <h2 className="text-3xl font-bold text-purple-950 mt-1 mb-6">Atharv Clinic Address</h2>

              <div className="space-y-6 text-sm">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-orange-100 text-orange-600 rounded-xl shrink-0">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <p className="font-bold text-purple-950 text-base">Clinic Location</p>
                    <p className="text-gray-700 leading-relaxed mt-1">
                      Atharv Clinic, Ground floor, RG Empire, Below Bodyline fitness, Manu Chowk, Tikrapara, Bilaspur, Chhattisgarh 495004
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-100 text-purple-700 rounded-xl shrink-0">
                    <User size={22} />
                  </div>
                  <div>
                    <p className="font-bold text-purple-950 text-base">Chief Physician</p>
                    <p className="text-gray-700 mt-1">Dr. Suman Kesharwani</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-100 text-emerald-700 rounded-xl shrink-0">
                    <Phone size={22} />
                  </div>
                  <div>
                    <p className="font-bold text-purple-950 text-base">Contact Phone</p>
                    <p className="text-gray-700 mt-1">+91 98765 43210 / +91 7752 123456</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-purple-200">
              <button
                onClick={() => setBookingModalOpen(true)}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition shadow text-center"
              >
                Schedule Consultation Now
              </button>
            </div>
          </div>

          {/* Interactive Google Map Embedding for specified Lat/Lng (22.0721529, 82.1661586) */}
          <div className="h-80 md:h-full min-h-[350px] relative">
            <iframe
              title="Atharv Clinic Map Location"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src="https://maps.google.com/maps?q=22.072152921974496,82.1661586453846&z=16&output=embed"
            ></iframe>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-purple-950 text-purple-200 py-8 px-4 border-t border-purple-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <div>
            <h3 className="text-lg font-bold text-orange-400">ATHARV CLINIC</h3>
            <p className="text-xs text-purple-300">Skin & Hair Treatment And Panchkarma Center | Bilaspur</p>
          </div>
          <p className="text-xs text-purple-400">
            &copy; {new Date().getFullYear()} Atharv Clinic. Lead by Dr. Suman Kesharwani. All rights reserved.
          </p>
        </div>
      </footer>

      {/* BOOKING APPOINTMENT MODAL */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setBookingModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>

            {bookingSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Appointment Booked!</h3>
                <p className="text-sm text-gray-600 mt-2">Dr. Suman Kesharwani's desk will confirm your schedule shortly.</p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-purple-950 mb-1">Book Appointment</h3>
                <p className="text-xs text-gray-500 mb-4">Atharv Clinic - Skin, Hair & Panchkarma Center</p>

                <form onSubmit={handleAppointmentSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Patient Full Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={appointmentForm.name}
                      onChange={(e) => setAppointmentForm({ ...appointmentForm, name: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Phone Number</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="e.g. 9876543210"
                      value={appointmentForm.phone}
                      onChange={(e) => setAppointmentForm({ ...appointmentForm, phone: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Treatment Requested</label>
                    <select 
                      value={appointmentForm.treatment}
                      onChange={(e) => setAppointmentForm({ ...appointmentForm, treatment: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    >
                      <option value="Skin Treatment">Skin Treatment</option>
                      <option value="Hair Treatment">Hair Treatment</option>
                      <option value="Panchkarma Center">Panchkarma Detox</option>
                      <option value="Cupping Therapy">Cupping Therapy</option>
                      <option value="Leech Therapy">Leech Therapy (Raktamokshana)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Preferred Date</label>
                      <input 
                        type="date" 
                        required
                        value={appointmentForm.date}
                        onChange={(e) => setAppointmentForm({ ...appointmentForm, date: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Preferred Time</label>
                      <input 
                        type="time" 
                        required
                        value={appointmentForm.time}
                        onChange={(e) => setAppointmentForm({ ...appointmentForm, time: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-lg transition shadow mt-2"
                  >
                    Confirm Booking Request
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* ADMIN LOGIN MODAL */}
      {adminModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl relative">
            <button 
              onClick={() => setAdminModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-bold text-purple-950 mb-1 flex items-center gap-2">
              <Lock className="text-orange-500" size={20} /> Admin Authentication
            </h3>
            <p className="text-xs text-gray-500 mb-4">Enter passcode to manage appointments and dynamic content.</p>

            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Admin Password</label>
                <input 
                  type="password"
                  placeholder="Enter admin123"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-purple-900 hover:bg-purple-950 text-white font-semibold py-2.5 rounded-lg transition"
              >
                Access Admin Workspace
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}