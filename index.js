import { useState, useRef } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [src, setSrc] = useState('');
  const iframeRef = useRef(null);

  const proxyUrl = (input) => {
    let normalized = input.startsWith('http') ? input : `https://${input}`;
    return `/api/proxy?url=${encodeURIComponent(normalized)}`;
  };

  const handleProxy = () => {
    setSrc(proxyUrl(url));
  };

  const enterFullscreen = () => {
    const iframe = iframeRef.current;
    if (iframe.requestFullscreen) iframe.requestFullscreen();
  };

  return (
    <div className="min-h-screen p-6 bg-gray-900 text-white">
      <h1 className="text-3xl mb-4">Instant Web Proxy</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="flex-1 p-2 rounded bg-gray-800 border border-gray-700"
          placeholder="Enter a URL (e.g., youtube.com)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button onClick={handleProxy} className="bg-blue-600 px-4 py-2 rounded">Proxy</button>
        <button onClick={enterFullscreen} className="bg-green-600 px-4 py-2 rounded">Fullscreen</button>
      </div>
      {src && (
        <iframe
          ref={iframeRef}
          src={src}
          className="w-full h-[80vh] rounded-xl border border-gray-700"
          sandbox="allow-scripts allow-forms allow-same-origin"
        ></iframe>
      )}
    </div>
  );
}
