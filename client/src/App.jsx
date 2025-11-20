import React, { useState, useEffect } from 'react';
import { Download, Loader, CheckCircle, AlertCircle, Instagram, Video, Image as ImageIcon, Smartphone, Shield, Zap, ExternalLink } from 'lucide-react';

// --- SEO & DATA CONSTANTS ---
const FEATURES = [
  {
    icon: <Zap className="w-6 h-6 text-purple-500" />,
    title: "Lightning Fast",
    desc: "Our optimized engine fetches media links in milliseconds. No waiting lines, no captchas."
  },
  {
    icon: <Shield className="w-6 h-6 text-green-500" />,
    title: "Safe & Secure",
    desc: "No login required. We never ask for your password or store your data. 100% anonymous."
  },
  {
    icon: <Smartphone className="w-6 h-6 text-blue-500" />,
    title: "Mobile Optimized",
    desc: "Designed for iPhone, Android, and Desktop. Experience a seamless UI on any device."
  },
  {
    icon: <Video className="w-6 h-6 text-pink-500" />,
    title: "All Formats",
    desc: "Download Reels, IGTV, Photos, Videos, and Carousels in their original high quality."
  }
];

const FAQ_ITEMS = [
  {
    q: "Is this Instagram Downloader free?",
    a: "Yes, this tool is 100% free to use. You can download as many public reels, photos, and videos as you like without any subscription."
  },
  {
    q: "Do I need to log in with my Instagram account?",
    a: "Absolutely not. We prioritize your privacy. You only need the link to the public post. We never ask for your credentials."
  },
  {
    q: "Can I download from private accounts?",
    a: "No. This tool respects Instagram's privacy policies. We only support downloading media from accounts that are set to Public."
  },
  {
    q: "Why does the video open in a new tab?",
    a: "Browsers play videos by default. Once the video opens in a new tab, simply tap the three dots (...) and select 'Download' to save it."
  }
];

export default function App() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  // Inject JSON-LD Schema for SEO
  useEffect(() => {
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "InstaFetch Pro",
      "applicationCategory": "MultimediaApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "Download Instagram Reels, Videos, and Photos securely without login."
    };
    const script = document.createElement('script');
    script.type = "application/ld+json";
    script.text = JSON.stringify(schemaData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
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
      // Make sure this matches your local or deployed backend URL
      const response = await fetch('https://instafetch-pqqw.onrender.com/api/download?url=' + encodeURIComponent(url));
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error || 'Failed to fetch');
      
      setResult(data); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-pink-100">
      
      {/* HEADER */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 p-1.5 rounded-lg text-white">
              <Download size={20} />
            </div>
            <span className="font-bold text-xl tracking-tight">InstaFetch<span className="text-purple-600">Pro</span></span>
          </div>
          <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-purple-600 transition">Features</a>
            <a href="#how-it-works" className="hover:text-purple-600 transition">How to Use</a>
            <a href="#faq" className="hover:text-purple-600 transition">FAQ</a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-16 pb-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-100 via-transparent to-transparent opacity-70"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            Download Instagram <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              Reels, Stories & Photos
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            The fastest, safest way to save content from public Instagram accounts. 
            No login required. High quality guaranteed.
          </p>

          {/* INPUT CARD */}
          <div className="bg-white p-2 rounded-2xl shadow-xl border border-slate-100 max-w-xl mx-auto transform transition-all hover:scale-[1.01]">
            <form onSubmit={handleDownload} className="flex flex-col md:flex-row gap-2">
              <input
                type="text"
                placeholder="Paste Instagram URL (e.g., https://www.instagram.com/reel/...)"
                className="flex-1 px-4 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-700"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <button 
                disabled={loading}
                type="submit" 
                className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loading ? <Loader className="animate-spin" size={20} /> : 'Download'}
              </button>
            </form>
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="mt-4 max-w-xl mx-auto bg-red-50 text-red-600 p-3 rounded-lg flex items-center gap-2 justify-center text-sm">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          {/* RESULT PREVIEW - FIXED FOR BROKEN IMAGES */}
          {result && (
            <div className="mt-8 bg-white p-6 rounded-2xl shadow-lg max-w-md mx-auto border border-slate-100 animate-in fade-in slide-in-from-bottom-4">
              <div className="aspect-[4/5] bg-slate-100 rounded-lg overflow-hidden relative group mb-4">
                
                {/* --- THE FIX: referrerPolicy="no-referrer" --- */}
                <img 
                    src={result.thumbnail} 
                    referrerPolicy="no-referrer" 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.src = "https://placehold.co/600x400?text=No+Preview+Available"; // Fallback if it still fails
                    }}
                />
                
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-center justify-center">
                  {result.type === 'video' ? <Video className="text-white opacity-90" size={48} /> : <ImageIcon className="text-white opacity-90" size={48} />}
                </div>
              </div>
              <div className="text-left mb-4">
                <p className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-1">Ready to Download</p>
                <p className="text-sm text-slate-500 truncate">@{result.author}</p>
              </div>
              
              <a 
                href={result.downloadUrl} 
                target="_blank" 
                rel="noreferrer"
                className="block w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl text-center transition shadow-lg shadow-green-200 flex items-center justify-center gap-2"
              >
                <ExternalLink size={18} /> View & Save Media
              </a>
              <p className="text-xs text-slate-400 mt-3 text-center">
                Note: If video opens in new tab, tap the three dots (⋮) and select "Download".
              </p>
            </div>
          )}
        </div>
      </section>

      {/* FEATURES GRID */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose InstaFetch?</h2>
            <p className="text-slate-600">We built the most reliable tool for content creators and archivists.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((f, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-md transition-shadow">
                <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center shadow-sm mb-4">
                  {f.icon}
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">{f.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">How to Download</h2>
          <div className="space-y-4">
            {[
              "Open Instagram and find the Reel, Photo, or Video you want to save.",
              "Tap on the three dots (...) or the Share arrow and select 'Copy Link'.",
              "Paste the URL into the box above and hit the Download button.",
              "Preview your content and click 'Save to Device' to finish."
            ].map((step, i) => (
              <div key={i} className="flex items-center bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">
                  {i + 1}
                </div>
                <p className="text-slate-700 font-medium">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO CONTENT */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 prose prose-slate lg:prose-lg">
          <h2 className="text-3xl font-bold text-slate-900 not-prose mb-8">The Ultimate Guide to Instagram Downloader Tools</h2>
          
          <h3>Unlock the Power of Content Archiving</h3>
          <p>
            In the digital age, Instagram has become the primary source of inspiration, entertainment, and education. 
            However, the platform lacks a native feature to save media directly to your device. This is where 
            <strong> InstaFetch Pro</strong> serves as an essential utility. Whether you are a content creator looking to 
            analyze trends, a student saving educational reels, or simply archiving memories, our tool bridges the gap 
            between streaming and ownership.
          </p>

          <h3>How Does an Instagram Downloader Work?</h3>
          <p>
            Our technology utilizes a secure retrieval method that interacts with Instagram's public content delivery network (CDN). 
            When you paste a link, our backend parses the metadata associated with that URL. It identifies the highest resolution 
            video file (MP4) or image file (JPG) available on the server. It then extracts the direct link and presents it to you. 
            Crucially, this entire process happens without your account credentials, ensuring 100% anonymity and safety.
          </p>

          <h3>Why Use a Web-Based Downloader?</h3>
          <ul>
            <li><strong>No Storage Waste:</strong> Unlike installing heavy apps, our web tool requires zero space on your phone.</li>
            <li><strong>Cross-Platform Compatibility:</strong> Works seamlessly on iOS, Android, Windows, and macOS.</li>
            <li><strong>Privacy Protection:</strong> Third-party apps often request invasive permissions (contacts, gallery access). We ask for none.</li>
          </ul>

          <h3>Legal & Ethical Usage</h3>
          <p>
            While downloading content is technically possible, it is vital to respect intellectual property rights. 
            Content on Instagram belongs to the original creators. This tool is designed strictly for 
            <strong> personal use</strong> (offline viewing, archiving). Do not repost, distribute, or use downloaded 
            content for commercial purposes without explicit permission from the copyright holder.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="font-bold text-lg text-slate-900 mb-2">{item.q}</h3>
                <p className="text-slate-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 text-white font-bold text-xl mb-4">
                <Download size={20} /> InstaFetch Pro
              </div>
              <p className="text-sm leading-relaxed max-w-xs">
                The most reliable tool to download Instagram videos, reels, and photos. Fast, free, and secure.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Home</a></li>
                <li><a href="#features" className="hover:text-white transition">Features</a></li>
                <li><a href="#faq" className="hover:text-white transition">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition">Disclaimer</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-xs">
            <p>&copy; 2025 InstaFetch Pro. All rights reserved.</p>
            <p className="mt-2 text-slate-500">
              We are not affiliated with, associated with, or endorsed by Instagram or Meta. 
              This is an independent educational tool.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}