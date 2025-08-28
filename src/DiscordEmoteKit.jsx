import React, { useRef, useState, useEffect } from "react";

/**
 * DiscordEmoteKit – Complete version with inline styles
 * Includes ZIP functionality and payment integration
 */

// Simple inline SVG icons
const Icons = {
  Upload: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  ),
  Download: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  Image: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  ),
  Zap: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Check: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  X: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  AlertCircle: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  Loader: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-spin">
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  ),
  Sparkles: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  ),
  Package: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  ),
  Twitter: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  Discord: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
    </svg>
  ),
  Mail: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="m22 7-10 5L2 7"/>
    </svg>
  )
};

const PRESETS = {
  emote: { label: "Emote 128×128 (<256KB)", w: 128, h: 128, maxKB: 256 },
  sticker: { label: "Sticker 320×320 (<512KB)", w: 320, h: 320, maxKB: 512 },
  banner: { label: "Server Banner 960×540", w: 960, h: 540, maxKB: null }
};

// Styles object
const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f0f23 0%, #1a0f2e 50%, #0f0f23 100%)',
    color: 'white',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  header: {
    textAlign: 'center',
    marginBottom: '48px'
  },
  title: {
    fontSize: '48px',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #ec4899 0%, #a855f7 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    color: 'transparent',
    marginBottom: '16px',
    display: 'inline-block',
    lineHeight: '1.2'
  },
  button: {
    padding: '12px 24px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '16px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.2s'
  },
  primaryButton: {
    background: 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)',
    color: 'white'
  },
  secondaryButton: {
    background: '#1e293b',
    color: 'white'
  },
  proButton: {
    background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
    color: 'white',
    fontSize: '12px',
    padding: '4px 12px'
  },
  card: {
    background: 'rgba(30, 41, 59, 0.5)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(148, 163, 184, 0.2)',
    padding: '32px'
  },
  dropZone: {
    borderWidth: '2px',
    borderStyle: 'dashed',
    borderColor: '#475569',
    borderRadius: '12px',
    padding: '48px',
    textAlign: 'center',
    background: 'rgba(15, 23, 42, 0.5)',
    marginBottom: '24px',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  dropZoneHover: {
    borderColor: '#818cf8'
  },
  modal: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(5px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    zIndex: 50
  },
  modalContent: {
    background: '#0f172a',
    borderRadius: '16px',
    padding: '32px',
    maxWidth: '448px',
    width: '100%',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(148, 163, 184, 0.2)'
  }
};

// Simple ZIP implementation (you'll need to install JSZip for production)
async function createZipBlob(files) {
  // This is a mock implementation. In production, use JSZip:
  // const zip = new JSZip();
  // files.forEach(file => zip.file(file.name, file.blob));
  // return await zip.generateAsync({type: "blob"});
  
  console.log('ZIP functionality requires JSZip library. Install with: npm install jszip');
  return null;
}

function bytesToKB(bytes) {
  return Math.round(bytes / 1024);
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// Usage tracking
function checkUsageLimit() {
  const today = new Date().toDateString();
  const usage = JSON.parse(localStorage.getItem('discordEmoteUsage') || '{}');
  
  if (usage.date !== today) {
    usage.date = today;
    usage.count = 0;
  }
  
  localStorage.setItem('discordEmoteUsage', JSON.stringify(usage));
  return usage;
}

function incrementUsage() {
  const usage = checkUsageLimit();
  usage.count += 1;
  localStorage.setItem('discordEmoteUsage', JSON.stringify(usage));
  return usage.count;
}

function isPro() {
  return localStorage.getItem('discordEmotePro') === 'true';
}

// Image processing functions
async function createCanvasFromFile(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      resolve(canvas);
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };
    
    img.src = url;
  });
}

function hasTransparency(canvas) {
  const ctx = canvas.getContext("2d");
  const { width, height } = canvas;
  const data = ctx.getImageData(0, 0, width, height).data;
  for (let i = 3; i < data.length; i += 4) {
    if (data[i] < 255) return true;
  }
  return false;
}

function resizeCanvas(sourceCanvas, targetWidth, targetHeight) {
  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext('2d');
  
  const srcRatio = sourceCanvas.width / sourceCanvas.height;
  const dstRatio = targetWidth / targetHeight;
  
  let drawWidth, drawHeight;
  if (srcRatio > dstRatio) {
    drawWidth = targetWidth;
    drawHeight = Math.round(targetWidth / srcRatio);
  } else {
    drawHeight = targetHeight;
    drawWidth = Math.round(targetHeight * srcRatio);
  }
  
  const dx = Math.floor((targetWidth - drawWidth) / 2);
  const dy = Math.floor((targetHeight - drawHeight) / 2);
  
  ctx.clearRect(0, 0, targetWidth, targetHeight);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(sourceCanvas, dx, dy, drawWidth, drawHeight);
  
  return canvas;
}

async function compressCanvasToBlob(canvas, maxKB = null, format = 'auto') {
  const hasAlpha = hasTransparency(canvas);
  
  if (hasAlpha || format === 'png') {
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
    if (!maxKB || bytesToKB(blob.size) <= maxKB) {
      return blob;
    }
    return blob;
  }
  
  let quality = 0.92;
  let blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', quality));
  
  while (maxKB && bytesToKB(blob.size) > maxKB && quality > 0.1) {
    quality -= 0.1;
    blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', quality));
  }
  
  return blob;
}

async function processGIF(file, targetWidth, targetHeight, maxKB) {
  const canvas = await createCanvasFromFile(file);
  const resizedCanvas = resizeCanvas(canvas, targetWidth, targetHeight);
  return await compressCanvasToBlob(resizedCanvas, maxKB, 'png');
}

async function resizeForDiscord(file, type) {
  const spec = PRESETS[type];
  if (!spec) throw new Error("Unknown output type");
  
  let blob;
  const targetWidth = spec.w;
  const targetHeight = spec.h || spec.w;
  
  try {
    if (file.type === 'image/gif') {
      blob = await processGIF(file, targetWidth, targetHeight, spec.maxKB);
    } else {
      const canvas = await createCanvasFromFile(file);
      const resizedCanvas = resizeCanvas(canvas, targetWidth, targetHeight);
      blob = await compressCanvasToBlob(resizedCanvas, spec.maxKB);
    }
    
    const nameBase = file.name.replace(/\.[^.]+$/, "");
    const ext = type === 'banner' ? 'jpg' : 'png';
    const outName = `${nameBase}_${type}.${ext}`;
    
    return {
      blob,
      name: outName,
      width: targetWidth,
      height: targetHeight,
      sizeKB: bytesToKB(blob.size),
      originalKB: bytesToKB(file.size),
      originalName: file.name,
      wasGif: file.type === 'image/gif'
    };
  } catch (error) {
    console.error('Error processing image:', error);
    throw error;
  }
}

export default function DiscordEmoteKit() {
  const [files, setFiles] = useState([]);
  const [outputType, setOutputType] = useState("emote");
  const [results, setResults] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [showProModal, setShowProModal] = useState(false);
  const [usageCount, setUsageCount] = useState(0);
  const [errors, setErrors] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [maxUsage] = useState(10);
  const inputRef = useRef(null);
  
  const isProUser = isPro();

  useEffect(() => {
    const usage = checkUsageLimit();
    setUsageCount(usage.count);
    
    // Load Gumroad script
    const script = document.createElement('script');
    script.src = 'https://gumroad.com/js/gumroad.js';
    document.body.appendChild(script);
    
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const onPick = (e) => {
    const f = Array.from(e.target.files || []).filter((x) => x.type.startsWith("image/"));
    setFiles(f);
    setErrors([]);
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const f = Array.from(e.dataTransfer.files || []).filter((x) => x.type.startsWith("image/"));
    setFiles(f);
    setErrors([]);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const onProcess = async () => {
    if (!files.length) return;
    
    if (!isProUser && usageCount >= maxUsage) {
      setShowProModal(true);
      return;
    }
    
    setProcessing(true);
    setErrors([]);
    const outs = [];
    const errs = [];
    
    for (const f of files) {
      try {
        const out = await resizeForDiscord(f, outputType);
        outs.push(out);
        
        if (!isProUser) {
          const newCount = incrementUsage();
          setUsageCount(newCount);
        }
      } catch (err) {
        console.error("Failed to process", f.name, err);
        errs.push({ file: f.name, error: err.message });
      }
    }
    
    setResults(outs);
    setErrors(errs);
    setProcessing(false);
  };

  const downloadAll = async () => {
    if (results.length === 1) {
      downloadBlob(results[0].blob, results[0].name);
      return;
    }
    
    // Check if JSZip is available
    if (window.JSZip) {
      const zip = new window.JSZip();
      results.forEach((r) => {
        zip.file(r.name, r.blob);
      });
      const content = await zip.generateAsync({ type: 'blob' });
      downloadBlob(content, `discord-emotes-${Date.now()}.zip`);
    } else {
      // Fallback: download individually
      results.forEach(r => {
        downloadBlob(r.blob, r.name);
      });
      alert('Install JSZip for ZIP downloads. Files downloaded individually.');
    }
  };

  const clearAll = () => {
    setFiles([]);
    setResults([]);
    setErrors([]);
  };

  const unlockPro = () => {
    // Simulate Pro unlock for demo
    localStorage.setItem('discordEmotePro', 'true');
    setShowProModal(false);
    window.location.reload();
  };

  return (
    <>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin { animation: spin 1s linear infinite; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root {
          height: 100%;
          width: 100%;
          margin: 0;
          padding: 0;
        }
      `}</style>
      
      <div style={styles.container}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '48px 24px',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Header */}
          <header style={styles.header}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <img 
                src="/logo.png" 
                alt="Discord Emote Pro Logo" 
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '12px'
                }}
              />
              <h1 style={styles.title}>Discord Emote Pro</h1>
            </div>
            <p style={{ fontSize: '20px', color: '#cbd5e1', marginBottom: '8px' }}>
              Perfect Discord Emotes in Seconds
            </p>
            <p style={{ color: '#94a3b8' }}>
              Stop fighting Discord's file size limits. Instantly optimize emotes, stickers & banners.
            </p>
          </header>

          {/* Usage Counter */}
          {!isProUser && (
            <div style={{ marginBottom: '24px', textAlign: 'center' }}>
              <div style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '8px', 
                padding: '8px 16px',
                background: 'rgba(15, 23, 42, 0.5)',
                borderRadius: '9999px',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: '#334155'
              }}>
                <span style={{ fontSize: '14px', color: '#94a3b8' }}>Free Usage Today:</span>
                <span style={{ 
                  fontWeight: 'bold',
                  color: usageCount >= maxUsage ? '#ef4444' : '#22c55e'
                }}>
                  {usageCount} / {maxUsage}
                </span>
                <button
                  onClick={() => setShowProModal(true)}
                  style={{ ...styles.button, ...styles.proButton }}
                >
                  ✨ Go Pro
                </button>
              </div>
            </div>
          )}

          {/* Main Tool */}
          <div style={styles.card}>
            {/* Settings */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '12px' }}>
                Output Type
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                {Object.entries(PRESETS).map(([key, preset]) => (
                  <button
                    key={key}
                    onClick={() => setOutputType(key)}
                    style={{
                      padding: '16px',
                      borderRadius: '12px',
                      borderWidth: '2px',
                      borderStyle: 'solid',
                      borderColor: outputType === key ? '#4f46e5' : '#334155',
                      background: outputType === key ? 'rgba(79, 70, 229, 0.1)' : 'transparent',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      textAlign: 'left',
                      color: 'white'
                    }}
                  >
                    <div style={{ fontWeight: '600', color: 'white', marginBottom: '4px' }}>
                      {preset.label.split(' ')[0]}
                    </div>
                    <div style={{ fontSize: '14px', color: '#94a3b8' }}>
                      {preset.label.split(' ').slice(1).join(' ')}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Drop Zone */}
            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={() => inputRef.current?.click()}
              style={{
                ...styles.dropZone,
                ...(isDragging ? styles.dropZoneHover : {})
              }}
            >
              <Icons.Upload />
              <p style={{ fontSize: '18px', marginTop: '16px', marginBottom: '16px' }}>
                Drag & drop images here
              </p>
              <p style={{ color: '#94a3b8', marginBottom: '24px' }}>
                PNG, JPG, WebP, and GIF supported
              </p>
              <button
                type="button"
                style={{ ...styles.button, ...styles.primaryButton }}
              >
                Choose Files
              </button>
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={onPick}
                style={{ display: 'none' }}
              />
              {files.length > 0 && (
                <div style={{ marginTop: '24px', fontSize: '14px', color: '#94a3b8' }}>
                  <p style={{ fontWeight: '600', marginBottom: '8px' }}>
                    Selected {files.length} file{files.length > 1 ? 's' : ''}:
                  </p>
                  <div style={{ maxHeight: '80px', overflow: 'auto' }}>
                    {files.map((f, i) => (
                      <div key={i}>{f.name}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* GIF Warning */}
            {files.some(f => f.type === 'image/gif') && (
              <div style={{
                marginBottom: '16px',
                padding: '16px',
                background: 'rgba(245, 158, 11, 0.1)',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: 'rgba(245, 158, 11, 0.3)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px'
              }}>
                <div style={{ color: '#f59e0b' }}>
                  <Icons.AlertCircle />
                </div>
                <div style={{ fontSize: '14px' }}>
                  <p style={{ fontWeight: '600', color: '#fbbf24', marginBottom: '4px' }}>
                    GIF Processing Note
                  </p>
                  <p style={{ color: 'rgba(251, 191, 36, 0.8)' }}>
                    Currently extracts the first frame only. Full animated GIF support coming in Pro version!
                  </p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                disabled={processing || !files.length}
                onClick={onProcess}
                style={{
                  ...styles.button,
                  ...styles.primaryButton,
                  flex: 1,
                  opacity: processing || !files.length ? 0.5 : 1,
                  cursor: processing || !files.length ? 'not-allowed' : 'pointer'
                }}
              >
                {processing ? (
                  <>
                    <Icons.Loader />
                    Processing...
                  </>
                ) : (
                  <>
                    <Icons.Zap />
                    Optimize {files.length > 1 ? `${files.length} Images` : 'Image'}
                  </>
                )}
              </button>
              {files.length > 0 && (
                <button
                  onClick={clearAll}
                  style={{ ...styles.button, ...styles.secondaryButton }}
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Errors */}
          {errors.length > 0 && (
            <div style={{ marginTop: '16px' }}>
              {errors.map((err, i) => (
                <div key={i} style={{
                  padding: '16px',
                  background: 'rgba(239, 68, 68, 0.1)',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: 'rgba(239, 68, 68, 0.3)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '8px'
                }}>
                  <div style={{ color: '#ef4444' }}>
                    <Icons.X />
                  </div>
                  <div style={{ fontSize: '14px' }}>
                    <span style={{ fontWeight: '600' }}>{err.file}:</span> {err.error}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Results */}
          {results.length > 0 && (
            <div style={{ marginTop: '32px' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '24px' 
              }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Optimized Results</h2>
                <button
                  onClick={downloadAll}
                  style={{ 
                    ...styles.button,
                    background: '#7c3aed',
                    color: 'white'
                  }}
                >
                  <Icons.Download />
                  Download {results.length > 1 ? 'All (ZIP)' : ''}
                </button>
              </div>
              
              <div style={{ display: 'grid', gap: '16px' }}>
                {results.map((r, i) => {
                  const url = URL.createObjectURL(r.blob);
                  const spec = PRESETS[outputType];
                  const overCap = spec.maxKB && r.sizeKB > spec.maxKB;
                  
                  return (
                    <div key={i} style={{
                      ...styles.card,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '24px',
                      padding: '24px'
                    }}>
                      <div style={{ position: 'relative' }}>
                        <img 
                          src={url} 
                          alt={r.name} 
                          style={{
                            width: '96px',
                            height: '96px',
                            objectFit: 'contain',
                            background: 'rgba(30, 41, 59, 0.5)',
                            borderRadius: '8px'
                          }}
                        />
                        {!overCap && (
                          <div style={{
                            position: 'absolute',
                            top: '-8px',
                            right: '-8px',
                            width: '24px',
                            height: '24px',
                            background: '#22c55e',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <Icons.Check />
                          </div>
                        )}
                        {r.wasGif && (
                          <div style={{
                            position: 'absolute',
                            bottom: '-8px',
                            right: '-8px',
                            padding: '2px 8px',
                            background: '#f59e0b',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: 'bold'
                          }}>
                            GIF→PNG
                          </div>
                        )}
                      </div>
                      
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: '600', fontSize: '18px', marginBottom: '4px' }}>
                          {r.name}
                        </div>
                        <div style={{ fontSize: '14px', color: '#94a3b8' }}>
                          {r.width}×{r.height} • {r.sizeKB} KB
                          <span style={{ color: '#64748b' }}> (was {r.originalKB} KB)</span>
                        </div>
                        {overCap && (
                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '8px', 
                            marginTop: '8px',
                            color: '#fbbf24',
                            fontSize: '14px'
                          }}>
                            <Icons.AlertCircle />
                            May exceed Discord's limit
                          </div>
                        )}
                      </div>
                      
                      <button
                        onClick={() => downloadBlob(r.blob, r.name)}
                        style={{ ...styles.button, ...styles.primaryButton }}
                      >
                        <Icons.Download />
                        Download
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Features Section */}
          <div style={{ 
            marginTop: '64px', 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            <div style={styles.card}>
              <div style={{
                width: '48px',
                height: '48px',
                background: '#4f46e5',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                <Icons.Zap />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>
                Instant Optimization
              </h3>
              <p style={{ color: '#94a3b8' }}>
                Automatically resize and compress to Discord's exact specifications
              </p>
            </div>
            
            <div style={styles.card}>
              <div style={{
                width: '48px',
                height: '48px',
                background: '#7c3aed',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                <Icons.Image />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>
                Preserve Quality
              </h3>
              <p style={{ color: '#94a3b8' }}>
                Smart compression maintains transparency and visual quality
              </p>
            </div>
            
            <div style={styles.card}>
              <div style={{
                width: '48px',
                height: '48px',
                background: '#22c55e',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                <Icons.Package />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>
                Batch Processing
              </h3>
              <p style={{ color: '#94a3b8' }}>
                Process multiple images at once and download as a ZIP bundle
              </p>
            </div>
          </div>

          {/* Footer */}
          <footer style={{
            marginTop: '80px',
            paddingTop: '48px',
            borderTop: '1px solid rgba(148, 163, 184, 0.2)',
            textAlign: 'center'
          }}>
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>
                Discord Emote Pro
              </h3>
              <p style={{ color: '#94a3b8', marginBottom: '24px', maxWidth: '400px', margin: '0 auto' }}>
                The fastest way to optimize images for Discord. Made with ❤️ for the Discord community.
              </p>
            </div>

            {/* Social Links */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '24px',
              marginBottom: '24px'
            }}>
              <a
                href="https://twitter.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#94a3b8',
                  transition: 'color 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#1DA1F2'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
              >
                <Icons.Twitter />
                <span style={{ fontSize: '14px' }}>Twitter</span>
              </a>
              
              <a
                href="https://discord.gg/yourinvite"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#94a3b8',
                  transition: 'color 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#5865F2'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
              >
                <Icons.Discord />
                <span style={{ fontSize: '14px' }}>Discord</span>
              </a>
              
              <a
                href="mailto:support@discordemotepro.com"
                style={{
                  color: '#94a3b8',
                  transition: 'color 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#ec4899'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
              >
                <Icons.Mail />
                <span style={{ fontSize: '14px' }}>Contact</span>
              </a>
            </div>

            {/* Copyright */}
            <div style={{ 
              color: '#64748b', 
              fontSize: '14px',
              paddingBottom: '48px'
            }}>
              <p style={{ marginBottom: '8px' }}>
                © 2024 Discord Emote Pro. Not affiliated with Discord Inc.
              </p>
              <p style={{ fontSize: '12px' }}>
                Made by <a 
                  href="https://twitter.com/yourusername" 
                  style={{ color: '#a855f7', textDecoration: 'none' }}
                  onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                  onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                >
                  Your Name
                </a>
              </p>
            </div>
          </footer>
        </div>

        {/* Pro Modal */}
        {showProModal && (
          <div style={styles.modal}>
            <div style={styles.modalContent}>
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px'
                }}>
                  <Icons.Sparkles />
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
                  Upgrade to Pro
                </h3>
                <p style={{ color: '#94a3b8' }}>
                  Unlock unlimited processing and premium features
                </p>
              </div>
              
              <div style={{ marginBottom: '24px' }}>
                {[
                  'Unlimited image processing',
                  'No watermarks',
                  'Full animated GIF support',
                  'Advanced compression options',
                  'Priority support'
                ].map((feature, i) => (
                  <div key={i} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px',
                    marginBottom: '16px'
                  }}>
                    <div style={{ color: '#22c55e' }}>
                      <Icons.Check />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold' }}>$9.99</div>
                <div style={{ color: '#94a3b8' }}>One-time payment • Lifetime access</div>
              </div>
              
              <div style={{ display: 'flex', gap: '12px' }}>
                <a
                  href="https://gum.co/discord-emote-pro"
                  className="gumroad-button"
                  style={{
                    ...styles.button,
                    ...styles.proButton,
                    flex: 1,
                    textAlign: 'center',
                    textDecoration: 'none',
                    display: 'block',
                    fontSize: '16px',
                    padding: '12px'
                  }}
                  data-gumroad-single-product="true"
                >
                  Get Pro Now (Gumroad)
                </a>
                <button
                  onClick={() => setShowProModal(false)}
                  style={{ ...styles.button, ...styles.secondaryButton }}
                >
                  Maybe Later
                </button>
              </div>
              
              <div style={{ marginTop: '16px', textAlign: 'center' }}>
                <button
                  onClick={unlockPro}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    color: '#64748b',
                    cursor: 'pointer',
                    fontSize: '12px',
                    textDecoration: 'underline'
                  }}
                >
                  Demo: Unlock Pro Locally
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}