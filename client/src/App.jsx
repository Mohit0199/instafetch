import React, { useState, useEffect } from 'react';
import { 
  Download, Loader, AlertCircle, Video, Image as ImageIcon, 
  CheckCircle, Shield, Smartphone, Globe, Zap, Lock, Share2, 
  ChevronRight, ArrowRight, FileText, Terminal, AlertTriangle, 
  Layers, Star, Mail, Info, X
} from 'lucide-react';

// --- ADSTERRA BANNER COMPONENT (NEW) ---
const ADSTERRA_AD_SCRIPT = `
<script type="text/javascript">
	atOptions = {
		'key' : 'ae3e8c01fff6c433b6ace23f4790d32f',
		'format' : 'iframe',
		'height' : 250,
		'width' : 300,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/ae3e8c01fff6c433b6ace23f4790d32f/invoke.js"></script>
`;

const AdsterraBanner = () => (
  // Use a flex container to center the ad block and apply margin for spacing
  <div 
    className="flex justify-center my-10 w-full" 
    style={{ minHeight: '250px' }} // Reserve space to prevent layout shift
    dangerouslySetInnerHTML={{ __html: ADSTERRA_AD_SCRIPT }} 
  />
);
// ----------------------------------------


// --- COMPONENTS FOR PAGES ---

const PrivacyPolicy = () => (
  <div className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
    <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
    <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
    <p>At InstaFetch Pro, accessible from our website, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by InstaFetch Pro and how we use it.</p>
    
    <h3 className="text-xl font-bold mt-6 mb-2">Log Files</h3>
    <p>InstaFetch Pro follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, and referring/exit pages.</p>
    
    <h3 className="text-xl font-bold mt-6 mb-2">Cookies and Web Beacons</h3>
    <p>Like any other website, InstaFetch Pro uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</p>
    
    <h3 className="text-xl font-bold mt-6 mb-2">Google DoubleClick DART Cookie</h3>
    <p>Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to other sites on the internet.</p>
  </div>
);

const TermsOfService = () => (
  <div className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
    <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
    <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use InstaFetch Pro if you do not agree to take all of the terms and conditions stated on this page.</p>
    
    <h3 className="text-xl font-bold mt-6 mb-2">License</h3>
    <p>Unless otherwise stated, InstaFetch Pro and/or its licensors own the intellectual property rights for all material on InstaFetch Pro. All intellectual property rights are reserved. You may access this from InstaFetch Pro for your own personal use subjected to restrictions set in these terms and conditions.</p>
    
    <h3 className="text-xl font-bold mt-6 mb-2">User Responsibilities</h3>
    <p>You agree to use this tool only for personal archiving purposes. You agree not to use this tool to download content that violates copyright laws in your jurisdiction. InstaFetch Pro does not host any content; we only facilitate the downloading of content available publicly.</p>
    
    <h3 className="text-xl font-bold mt-6 mb-2">Disclaimer</h3>
    <p>This tool is not affiliated with, endorsed by, or sponsored by Instagram or Meta. All trademarks belong to their respective owners.</p>
  </div>
);

const CookieConsent = ({ onAccept }) => (
  <div className="fixed bottom-0 left-0 right-0 bg-slate-900 text-white p-4 z-50 flex flex-col md:flex-row justify-between items-center gap-4 shadow-lg animate-in slide-in-from-bottom">
    <div className="text-sm">
      We use cookies to enhance your experience and analyze our traffic. By clicking "Accept", you consent to our use of cookies.
    </div>
    <div className="flex gap-2">
      <button onClick={onAccept} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition">
        Accept
      </button>
    </div>
  </div>
);

// --- MAIN APP COMPONENT ---

export default function App() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'privacy', 'terms', 'contact'
  const [cookiesAccepted, setCookiesAccepted] = useState(false);

  // Check cookie consent on load
  useEffect(() => {
    const consented = localStorage.getItem('cookieConsent');
    if (consented) setCookiesAccepted(true);
  }, []);

  const handleCookieAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setCookiesAccepted(true);
  };

  const navigateTo = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  // --- JSON-LD Schema ---
  useEffect(() => {
    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "SoftwareApplication",
          "name": "InstaFetch Pro",
          "applicationCategory": "MultimediaApplication",
          "operatingSystem": "Web",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "description": "InstaFetch Pro makes it simple to save public Instagram reels, photos, and videos for personal use. No login needed."
        }
      ]
    };
    const script = document.createElement('script');
    script.type = "application/ld+json";
    script.text = JSON.stringify(schemaData);
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  const handleDownload = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!url.includes('instagram.com')) {
      setError('Please enter a valid Instagram URL.');
      return;
    }

    setLoading(true);

    try {
      // SMART URL SELECTION:
      // If running locally (Vite dev server), use localhost:5000
      // If running in production, use the Render URL
      const API_BASE = import.meta.env.DEV 
        ? 'http://localhost:5000' 
        : 'https://instafetch-pqqw.onrender.com';
        
      console.log("Attempting to fetch from:", API_BASE); // Debug log

      const response = await fetch(`${API_BASE}/api/download?url=` + encodeURIComponent(url));
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error || 'Failed to fetch');
      setResult(data); 
    } catch (err) {
      console.error("Download Error:", err);
      setError(err.message || "Failed to connect to server. Ensure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-purple-100 flex flex-col">
      
      {/* --- NAV BAR --- */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => navigateTo('home')}
          >
            <div className="bg-gradient-to-tr from-pink-500 to-purple-600 p-1.5 rounded-lg text-white shadow-md">
              <Download size={20} />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">InstaFetch<span className="text-purple-600">Pro</span></span>
          </div>
          <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
            <button onClick={() => navigateTo('home')} className="hover:text-purple-600 transition">Home</button>
          </div>
        </div>
      </nav>

      <div className="flex-grow">
        {/* --- PAGE ROUTING LOGIC --- */}
        
        {currentPage === 'privacy' && <PrivacyPolicy />}
        {currentPage === 'terms' && <TermsOfService />}

        {currentPage === 'home' && (
          <>
            {/* --- HERO / ABOVE THE FOLD --- */}
            <header className="bg-gradient-to-b from-purple-50 to-white border-b border-slate-100 pb-16 pt-12">
              <div className="max-w-3xl mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
                  Download Instagram Reels, Videos & Photos
                </h1>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  InstaFetch Pro makes it simple to save public Instagram content for personal archiving. 
                  No login needed. Paste a link, click <strong>Get Download</strong>, and save offline.
                </p>

                {/* TOOL INTERFACE */}
                <div className="bg-white p-2 rounded-full shadow-xl shadow-purple-100/50 border border-slate-200 max-w-2xl mx-auto mb-4 flex flex-col md:flex-row">
                  <form onSubmit={handleDownload} className="flex w-full gap-2">
                    <input
                      type="text"
                      placeholder="Paste Instagram post link here..."
                      className="flex-1 px-6 py-4 rounded-full bg-transparent outline-none text-slate-900 placeholder:text-slate-400 w-full"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      aria-label="Instagram URL input"
                    />
                    <button 
                      disabled={loading}
                      type="submit" 
                      className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-3 rounded-full transition-all flex items-center justify-center gap-2 disabled:opacity-70 whitespace-nowrap m-1"
                    >
                      {loading ? <Loader className="animate-spin" size={20} /> : 'Get Download'}
                    </button>
                  </form>
                </div>
                
                <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mb-8">
                  <Lock size={12} />
                  <span>We do not store passwords. Public content only.</span>
                </div>

                {/* ERROR MESSAGE */}
                {error && (
                  <div className="mb-8 bg-red-50 text-red-600 px-4 py-3 rounded-lg flex items-center gap-2 justify-center border border-red-100 text-sm font-medium inline-flex">
                    <AlertCircle size={16} /> {error}
                  </div>
                )}

                {/* RESULT CARD */}
                {result && (
                  <div className="bg-white p-6 rounded-2xl shadow-2xl shadow-slate-200/50 max-w-sm mx-auto border border-slate-100 animate-in fade-in zoom-in-95 duration-300">
                    <div className="aspect-[4/5] bg-slate-100 rounded-xl overflow-hidden relative group mb-5 shadow-inner">
                      <img 
                          src={result.thumbnail} 
                          referrerPolicy="no-referrer" 
                          alt="Media Preview" 
                          className="w-full h-full object-cover"
                          onError={(e) => { e.target.src = "https://placehold.co/600x400?text=Preview+Unavailable"; }}
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center backdrop-blur-[2px]">
                        {result.type === 'video' ? <Video className="text-white drop-shadow-md" size={40} /> : <ImageIcon className="text-white drop-shadow-md" size={40} />}
                      </div>
                    </div>
                    
                    <div className="text-left mb-5">
                       <p className="text-sm font-medium text-slate-700 truncate">@{result.author || 'Instagram User'}</p>
                       <p className="text-xs text-green-600 font-bold flex items-center gap-1 mt-1"><CheckCircle size={12}/> Ready to Download</p>
                    </div>

                    <a 
                      href={result.downloadUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="block w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl text-center transition-all shadow-lg shadow-green-600/20 flex items-center justify-center gap-2"
                    >
                      <Download size={18} /> Download File
                    </a>
                    <p className="text-[11px] text-slate-400 mt-3">
                      If it opens in new tab: Click ⋮ &gt; Download
                    </p>
                  </div>
                )}
              </div>
            </header>

            {/* --- ADSTERRA BANNER INSERTION POINT --- */}
            <AdsterraBanner />
            {/* -------------------------------------- */}

            {/* --- MAIN CONTENT (SEO / BLOG / GUIDE) --- */}
            <main className="max-w-4xl mx-auto px-4 py-16 space-y-20 text-slate-700">

              {/* FEATURES */}
              <section id="features" className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Features and benefits</h2>
                <ul className="grid md:grid-cols-2 gap-4">
                  {[
                    "Fast resolution of direct media links",
                    "No account login required",
                    "High quality 1080p downloads",
                    "Simple one-click workflow",
                    "Privacy-conscious: no logs kept",
                    "Works on Mobile and Desktop"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={16} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* TECHNICAL OVERVIEW */}
              <article className="prose prose-slate max-w-none">
                <h2 className="text-2xl font-bold text-slate-900">How to use this tool</h2>
                <p>
                  1. <strong>Copy Link:</strong> Go to Instagram, find the reel or photo you want to save. Tap the three dots and select "Link" or "Copy Link".<br/>
                  2. <strong>Paste:</strong> Bring that link here and paste it into the search bar.<br/>
                  3. <strong>Download:</strong> Click the button. We will extract the direct video (MP4) or image (JPG) link for you to save to your device.
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
                  <p className="text-sm text-blue-900 font-medium m-0">
                    <strong>Note for Researchers:</strong> This tool is excellent for archiving social media content for dataset creation or analysis. Always respect copyright and obtain permission for commercial use.
                  </p>
                </div>
              </article>

              {/* FAQ */}
              <section id="faq">
                <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
                <div className="space-y-3">
                  {[
                    { q: "Is InstaFetch Pro free?", a: "Yes. The tool is free for personal use and requires no login." },
                    { q: "Can I download from private accounts?", a: "No. We respect user privacy. Only public content is accessible." },
                    { q: "Is downloading content legal?", a: "Downloading for personal offline viewing (time-shifting) is generally accepted, but reusing content without permission violates copyright laws." },
                    { q: "Do you store my data?", a: "We do not store your personal data, passwords, or search history." },
                  ].map((item, i) => (
                    <details key={i} className="group bg-white border border-slate-200 rounded-lg overflow-hidden">
                      <summary className="flex items-center justify-between p-4 font-bold text-slate-800 cursor-pointer list-none hover:bg-slate-50 select-none">
                        {item.q}
                        <ChevronRight className="w-5 h-5 text-slate-400 transition-transform group-open:rotate-90" />
                      </summary>
                      <div className="px-4 pb-4 pt-2 text-slate-600 text-sm leading-relaxed border-t border-slate-100 bg-slate-50/50">
                        {item.a}
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            </main>
          </>
        )}
      </div>

      {/* --- COOKIE BANNER --- */}
      {!cookiesAccepted && <CookieConsent onAccept={handleCookieAccept} />}

      {/* --- FOOTER --- */}
      <footer className="bg-white border-t border-slate-200 py-12 mt-auto">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="col-span-1">
              <span className="font-bold text-lg text-slate-900">InstaFetch<span className="text-purple-600">Pro</span></span>
              <p className="text-sm text-slate-500 mt-2">
                Fast, secure, and free Instagram downloader for creators and researchers.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><button onClick={() => navigateTo('privacy')} className="hover:text-purple-600">Privacy Policy</button></li>
                <li><button onClick={() => navigateTo('terms')} className="hover:text-purple-600">Terms of Service</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">Resources</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><button onClick={() => navigateTo('home')} className="hover:text-purple-600">How to Download</button></li>
                <li><button onClick={() => navigateTo('home')} className="hover:text-purple-600">Supported Media</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-100 pt-8 text-center text-xs text-slate-400">
            <p>&copy; {new Date().getFullYear()} InstaFetch Pro. All rights reserved. Not affiliated with Instagram.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}