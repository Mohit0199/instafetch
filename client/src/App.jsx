import React, { useState, useEffect } from 'react';
import { 
  Download, Loader, AlertCircle, Video, Image as ImageIcon, 
  CheckCircle, Shield, Smartphone, Globe, Zap, Lock, Share2, 
  ChevronRight, ArrowRight, FileText, Terminal, AlertTriangle, 
  Layers, Star
} from 'lucide-react';

export default function App() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  // --- JSON-LD Schema: Software + FAQ ---
  useEffect(() => {
    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "SoftwareApplication",
          "name": "InstaFetch Pro",
          "applicationCategory": "MultimediaApplication",
          "operatingSystem": "Any",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "description": "InstaFetch Pro makes it simple to save public Instagram reels, photos, and videos for personal use. No login needed.",
          "featureList": "Download Reels, Save Photos, High Quality 1080p, No Login Required"
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "Is InstaFetch Pro free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. The tool is free for personal use and requires no login." } },
            { "@type": "Question", "name": "Can I download from private accounts?", "acceptedAnswer": { "@type": "Answer", "text": "No. Private content is blocked to respect user privacy." } },
            { "@type": "Question", "name": "Is downloading content legal?", "acceptedAnswer": { "@type": "Answer", "text": "Downloading for personal offline viewing is often allowed, but reusing or republishing content without permission may violate copyright." } },
            { "@type": "Question", "name": "Do you store my passwords or Instagram credentials?", "acceptedAnswer": { "@type": "Answer", "text": "Never. We do not ask for your credentials." } },
            { "@type": "Question", "name": "What file types are provided?", "acceptedAnswer": { "@type": "Answer", "text": "We provide direct links to the original media file type, usually MP4 for videos and JPG/PNG for images." } },
            { "@type": "Question", "name": "Why did the download fail?", "acceptedAnswer": { "@type": "Answer", "text": "Common reasons: post is private, geo-restricted, or recently removed by the creator." } },
            { "@type": "Question", "name": "Can I use this for bulk downloads?", "acceptedAnswer": { "@type": "Answer", "text": "Bulk or mass scraping is prohibited. If you need large scale access for research, contact the content owner or use official APIs with permission." } },
            { "@type": "Question", "name": "Do you support IGTV or stories?", "acceptedAnswer": { "@type": "Answer", "text": "Stories and some IGTV content may be unavailable after they expire or if they are private." } },
            { "@type": "Question", "name": "How long does the direct link stay active?", "acceptedAnswer": { "@type": "Answer", "text": "Typically short-lived. If a link expires, resolve the URL again." } },
            { "@type": "Question", "name": "Who can I contact for help?", "acceptedAnswer": { "@type": "Answer", "text": "Use the Contact page or email support@yourdomain.com." } }
          ]
        }
      ]
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
      const API_BASE = 'https://instafetch-api.onrender.com'; 
      const response = await fetch(`${API_BASE}/api/download?url=` + encodeURIComponent(url));
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
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-purple-100">
      
      {/* --- NAV BAR --- */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-tr from-pink-500 to-purple-600 p-1.5 rounded-lg text-white shadow-md">
              <Download size={20} />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">InstaFetch<span className="text-purple-600">Pro</span></span>
          </div>
          <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
            <a href="#how-it-works" className="hover:text-purple-600 transition">How it works</a>
            <a href="#features" className="hover:text-purple-600 transition">Features</a>
            <a href="#faq" className="hover:text-purple-600 transition">FAQ</a>
          </div>
        </div>
      </nav>

      {/* --- HERO / ABOVE THE FOLD --- */}
      <header className="bg-gradient-to-b from-purple-50 to-white border-b border-slate-100 pb-16 pt-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
            InstaFetch Pro - Download Instagram Reels, Videos & Photos
          </h1>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            InstaFetch Pro makes it simple to save public Instagram reels, photos, and videos for personal use. 
            No login needed. Paste a public post or reel link, click <strong>Get Download</strong>, and get a high-quality direct file for offline viewing. 
            Built for creators, researchers, and anyone who needs an easy archive workflow.
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
            <span>We do not store passwords and only process public content.</span>
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
              {/* FIXED LINE BELOW: replaced > with &gt; */}
              <p className="text-[11px] text-slate-400 mt-3">
                If it opens in new tab: Click ⋮ &gt; Download
              </p>
            </div>
          )}
        </div>
      </header>

      {/* --- MAIN CONTENT (SEO / BLOG / GUIDE) --- */}
      <main className="max-w-4xl mx-auto px-4 py-16 space-y-20 text-slate-700">

        {/* 2. QUICK USAGE STEPS */}
        <section aria-label="How to use">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-10">How to use InstaFetch Pro</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-4">
                <Share2 size={28} />
              </div>
              <h3 className="font-bold text-lg mb-2">1. Paste Link</h3>
              <p className="text-sm text-slate-600">Paste an Instagram post or reel link into the input.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
                <Zap size={28} />
              </div>
              <h3 className="font-bold text-lg mb-2">2. Click Get Download</h3>
              <p className="text-sm text-slate-600">Click the button to resolve a direct media link instantly.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-4">
                <Download size={28} />
              </div>
              <h3 className="font-bold text-lg mb-2">3. Save File</h3>
              <p className="text-sm text-slate-600">Download the file or preview it directly in your browser.</p>
            </div>
          </div>
        </section>

        {/* 3. FEATURES AND BENEFITS */}
        <section id="features" className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Features and benefits</h2>
          <p className="mb-6 text-slate-600">
            InstaFetch Pro focuses on speed, privacy, and reliability so you can archive or reference content without extra steps.
          </p>
          <ul className="grid md:grid-cols-2 gap-4">
            {[
              "Fast resolution of direct media links for public posts",
              "No account login or password required",
              "High quality downloads when available",
              "Simple UI and one-click download flow",
              "Privacy-conscious: we do not collect long-term credentials",
              "Lightweight: minimal client-side JS for speed"
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={16} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 pt-6 border-t border-slate-200 text-center md:text-left">
            <a href="#technical-overview" className="text-purple-600 font-medium text-sm hover:underline inline-flex items-center gap-1">
              See full technical overview <ArrowRight size={14} />
            </a>
          </div>
        </section>

        {/* 4. HOW IT WORKS (TECHNICAL) */}
        <article id="technical-overview" className="prose prose-slate max-w-none">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Terminal size={24} className="text-slate-400" /> How InstaFetch Pro works
          </h2>
          <p>
            When you paste a public Instagram URL, the site validates the link and sends it to the backend resolver. 
            The resolver requests the post metadata from Instagram endpoints and extracts the direct media file URL hosted on the CDN. 
            We return the best available resolution and a short-lived direct link for download.
          </p>
          <div className="my-6 pl-6 border-l-4 border-purple-500 bg-purple-50 p-4 rounded-r-lg">
            <h4 className="text-purple-900 font-bold mb-2 text-sm uppercase tracking-wide">Key Steps</h4>
            <ol className="list-decimal ml-4 space-y-1 text-sm text-purple-900">
              <li><strong>Validation:</strong> ensures URL is well formed and points to instagram.com.</li>
              <li><strong>Metadata fetch:</strong> resolver pulls post JSON and finds media entries.</li>
              <li><strong>Link selection:</strong> chooses the highest-quality media URL available.</li>
              <li><strong>Delivery:</strong> returns a short-lived direct link that the browser can download.</li>
            </ol>
          </div>
          <p className="text-sm text-slate-500">
            <strong>Important implementation notes:</strong> Do not attempt to fetch user credentials or use session cookies. Only public posts are supported. 
            We use short-lived signed URLs to avoid exposing long-lived CDN links and follow Instagram's terms of service by not performing mass scraping.
          </p>
        </article>

        {/* 5. SUPPORTED MEDIA & LIMITATIONS */}
        <section className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Supported Media</h2>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-lg shadow-sm">
                <Smartphone className="text-purple-500" />
                <span className="text-sm font-medium">Reels (single & multi-clip)</span>
              </li>
              <li className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-lg shadow-sm">
                <Video className="text-blue-500" />
                <span className="text-sm font-medium">Videos & IGTV</span>
              </li>
              <li className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-lg shadow-sm">
                <ImageIcon className="text-pink-500" />
                <span className="text-sm font-medium">Photos & Carousels</span>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Limitations</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-100 rounded-lg">
                <Lock className="text-amber-600 mt-0.5" size={18} />
                <span className="text-sm text-amber-900">Private accounts are not supported.</span>
              </li>
              <li className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-100 rounded-lg">
                <Globe className="text-amber-600 mt-0.5" size={18} />
                <span className="text-sm text-amber-900">Geo-restricted content may not be downloadable.</span>
              </li>
              <li className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-100 rounded-lg">
                <AlertTriangle className="text-amber-600 mt-0.5" size={18} />
                <span className="text-sm text-amber-900">Stories or live content may expire quickly.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* 6. LEGAL GUIDELINES */}
        <article className="bg-slate-900 text-slate-300 p-8 rounded-2xl">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Shield size={20}/> Legal and ethical guidelines
          </h2>
          <p className="mb-4 text-sm leading-relaxed">
            Creators own the content they post. This tool is intended only for personal archiving and research on content you are legally allowed to access. 
            Do not republish, redistribute, or monetize downloaded content without the creator's permission.
          </p>
          <ul className="list-disc ml-5 space-y-2 text-sm mb-6">
            <li>Only download public content you have permission to use.</li>
            <li>Do not rehost or resell downloaded media.</li>
            <li>Always credit creators when using their content in research or presentations.</li>
            <li>If you are building a dataset, obtain explicit permission.</li>
          </ul>
          <p className="text-xs text-slate-500 italic">
            This page does not offer legal advice. If you are unsure about reuse rights, consult a lawyer or the platform terms.
          </p>
        </article>

        {/* 7. STEP BY STEP TUTORIAL */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Step-by-step: Save a reel in 60 seconds</h2>
          
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1">
                <span className="text-purple-600 font-bold text-sm uppercase tracking-wider mb-2 block">Step 1</span>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Copy the Instagram post URL</h3>
                <p className="text-slate-600 mb-4">
                  Open Instagram in the browser or app, tap share, and choose <strong>Copy Link</strong>. 
                  You will see a URL that looks like <code>https://www.instagram.com/reel/Cabc123XYZ/</code>.
                </p>
              </div>
              <figure className="w-full md:w-1/2 bg-slate-100 aspect-video rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 flex-col gap-2">
                <Share2 size={32}/>
                <figcaption className="text-xs">Copy Instagram post URL from mobile app</figcaption>
              </figure>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1">
                <span className="text-purple-600 font-bold text-sm uppercase tracking-wider mb-2 block">Step 2</span>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Paste & Resolve</h3>
                <p className="text-slate-600 mb-4">
                  Paste the link into the InstaFetch Pro input box above and click <strong>Get Download</strong>. 
                  Our system will validate the link and fetch the best quality version.
                </p>
              </div>
              <figure className="w-full md:w-1/2 bg-slate-100 aspect-video rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 flex-col gap-2">
                <Terminal size={32}/>
                <figcaption className="text-xs">Paste URL and click Get Download</figcaption>
              </figure>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1">
                <span className="text-purple-600 font-bold text-sm uppercase tracking-wider mb-2 block">Step 3</span>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Download & Store</h3>
                <p className="text-slate-600 mb-4">
                  Click <strong>Download File</strong>. If the video plays in a new tab, click the three dots (⋮) and select "Download". 
                  Store responsibly and keep metadata if needed for research.
                </p>
              </div>
              <figure className="w-full md:w-1/2 bg-slate-100 aspect-video rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 flex-col gap-2">
                <Download size={32}/>
                <figcaption className="text-xs">Download preview and save media locally</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* 8. EXAMPLES & USE CASES */}
        <section className="bg-gradient-to-br from-slate-50 to-purple-50/50 p-8 rounded-3xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Who uses InstaFetch Pro?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm">
                <Star className="text-yellow-500 mt-0.5" size={16}/>
                <span><strong>Creators:</strong> Personal backups, repurpose drafts for other platforms.</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <Layers className="text-blue-500 mt-0.5" size={16}/>
                <span><strong>Designers:</strong> Building moodboards and saving visual references.</span>
              </li>
            </ul>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm">
                <FileText className="text-green-500 mt-0.5" size={16}/>
                <span><strong>Journalists:</strong> Archive posts for evidence, analysis, or reporting.</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <Globe className="text-purple-500 mt-0.5" size={16}/>
                <span><strong>Educators:</strong> Download tutorials for offline classroom use.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* 9. TROUBLESHOOTING */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Troubleshooting</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-red-400 pl-4 py-1">
              <h4 className="font-bold text-slate-800 text-sm">Preview not showing?</h4>
              <p className="text-sm text-slate-600">Ensure the post is public and not geo-restricted. Private posts cannot be accessed.</p>
            </div>
            <div className="border-l-4 border-yellow-400 pl-4 py-1">
              <h4 className="font-bold text-slate-800 text-sm">Download link expired?</h4>
              <p className="text-sm text-slate-600">Refresh the page and resolve the URL again. Links are short-lived for security.</p>
            </div>
            <div className="border-l-4 border-blue-400 pl-4 py-1">
              <h4 className="font-bold text-slate-800 text-sm">Slow resolution?</h4>
              <p className="text-sm text-slate-600">Try again in a few seconds. High load may cause temporary delays.</p>
            </div>
          </div>
        </section>

        {/* 10. FAQ (EXPANDED) */}
        <section id="faq">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Frequently asked questions</h2>
          <div className="space-y-3">
            {[
              { q: "Is InstaFetch Pro free?", a: "Yes. The tool is free for personal use and requires no login." },
              { q: "Can I download from private accounts?", a: "No. Private content is blocked to respect user privacy." },
              { q: "Is downloading content legal?", a: "Downloading for personal offline viewing is often allowed, but reusing or republishing content without permission may violate copyright." },
              { q: "Do you store my passwords or Instagram credentials?", a: "Never. We do not ask for your credentials." },
              { q: "What file types are provided?", a: "We provide direct links to the original media file type, usually MP4 for videos and JPG/PNG for images." },
              { q: "Why did the download fail?", a: "Common reasons: post is private, geo-restricted, or recently removed by the creator." },
              { q: "Can I use this for bulk downloads?", a: "Bulk or mass scraping is prohibited. If you need large scale access for research, contact the content owner or use official APIs with permission." },
              { q: "Do you support IGTV or stories?", a: "Stories and some IGTV content may be unavailable after they expire or if they are private." },
              { q: "How long does the direct link stay active?", a: "Typically short-lived. If a link expires, resolve the URL again." },
              { q: "Who can I contact for help?", a: "Use the Contact page or email support@yourdomain.com." }
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

        {/* 12. RELATED RESOURCES (INTERNAL LINKS) */}
        <section className="border-t border-slate-200 pt-12">
          <h3 className="font-bold text-slate-900 mb-6">Related Resources</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <a href="#" className="block p-4 border border-slate-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition group">
              <h4 className="font-bold text-slate-800 group-hover:text-purple-700">How to archive social media posts</h4>
              <p className="text-sm text-slate-500 mt-1">Best practices for research and personal archiving workflows.</p>
            </a>
            <a href="#" className="block p-4 border border-slate-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition group">
              <h4 className="font-bold text-slate-800 group-hover:text-purple-700">Collecting public datasets</h4>
              <p className="text-sm text-slate-500 mt-1">Ethical guidelines for building datasets from public information.</p>
            </a>
          </div>
        </section>

      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                 <span className="font-bold text-lg text-slate-900">InstaFetch<span className="text-purple-600">Pro</span></span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
                Fast, secure, and free Instagram downloader for creators and researchers. 
                We prioritize privacy and ease of use.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="/privacy" className="hover:text-purple-600">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-purple-600">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">Company</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="/about" className="hover:text-purple-600">About Us</a></li>
                <li><a href="#" className="hover:text-purple-600">Blog</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
            <p>&copy; 2025 Insightforge. All rights reserved.</p>
            <div className="flex gap-4">
              <span className="flex items-center gap-1"><Shield size={12}/> Secure</span>
              <span className="flex items-center gap-1"><Zap size={12}/> Fast</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}