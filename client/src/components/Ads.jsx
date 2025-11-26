import React, { useEffect, useRef } from 'react';

// ===========================================================================
// HELPER: Generic Iframe Component to Isolate Ads
// ===========================================================================
const AdIframe = ({ width, height, content, styleClass }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const doc = iframe.contentWindow.document;
    
    // Only write if empty to prevent loops
    if (doc.body.innerHTML === "") {
      doc.open();
      doc.write(content);
      doc.close();
    }
  }, [content]);

  return (
    <div className={`flex justify-center items-center overflow-hidden ${styleClass || ''}`} style={{ width: width || '100%', height: height }}>
      <iframe
        ref={iframeRef}
        width={width || '100%'}
        height={height}
        scrolling="no"
        frameBorder="0"
        title="ad-frame"
        style={{ border: 'none', overflow: 'hidden', width: width || '100%', height: height }}
      />
    </div>
  );
};

// ===========================================================================
// 1. Center Banner (300x250)
// ===========================================================================
export const AdsterraBanner = ({ width = 300, height = 250, divStyle }) => {
  const htmlContent = `
    <html>
      <body style="margin:0;padding:0;overflow:hidden;display:flex;justify-content:center;align-items:center;">
        <script type="text/javascript">
          atOptions = {
            'key' : 'ae3e8c01fff6c433b6ace23f4790d32f',
            'format' : 'iframe',
            'height' : ${height},
            'width' : ${width},
            'params' : {}
          };
        </script>
        <script type="text/javascript" src="//www.highperformanceformat.com/ae3e8c01fff6c433b6ace23f4790d32f/invoke.js"></script>
      </body>
    </html>
  `;
  
  return (
    <AdIframe 
      width={width} 
      height={height} 
      content={htmlContent} 
      styleClass={divStyle}
    />
  );
};

// ===========================================================================
// 2. Skyscraper Banner (160x600)
// ===========================================================================
export const SkyscraperAd = () => {
  const htmlContent = `
    <html>
      <body style="margin:0;padding:0;overflow:hidden;display:flex;justify-content:center;align-items:center;">
        <script type="text/javascript">
          atOptions = {
            'key' : 'd1b62b9c5d0953b5423c4bedf9dac88a',
            'format' : 'iframe',
            'height' : 600,
            'width' : 160,
            'params' : {}
          };
        </script>
        <script type="text/javascript" src="//www.highperformanceformat.com/d1b62b9c5d0953b5423c4bedf9dac88a/invoke.js"></script>
      </body>
    </html>
  `;

  return (
    <AdIframe 
      width={160} 
      height={600} 
      content={htmlContent}
    />
  );
};

// ===========================================================================
// 3. Native Banner Ad (Fixed with Iframe)
// ===========================================================================
export const NativeBannerAd = () => {
  // We wrap this in an HTML structure so it runs fresh every time
  const htmlContent = `
    <html>
      <head>
        <style>body { margin: 0; padding: 0; display: flex; justify-content: center; }</style>
      </head>
      <body>
        <div id="container-6b4991aa05e4ef96f9c3d9a97f8e4d0c"></div>
        <script async="async" data-cfasync="false" src="//pl28137116.effectivegatecpm.com/6b4991aa05e4ef96f9c3d9a97f8e4d0c/invoke.js"></script>
      </body>
    </html>
  `;

  return (
    <AdIframe 
      height={300} // Approximate height for Native banner
      content={htmlContent}
      styleClass="my-10 w-full"
    />
  );
};