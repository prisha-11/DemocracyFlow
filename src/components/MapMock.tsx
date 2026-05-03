
export default function MapMock() {
  return (
    <div className="map-mock-container" aria-label="Interactive Map Display">
      <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" style={{ borderRadius: '8px' }}>
        <rect width="400" height="200" fill="var(--surface-color)" />
        {/* Simple stylized map paths to represent roads */}
        <path d="M50,100 Q150,50 250,120 T350,80" fill="none" stroke="var(--border-color)" strokeWidth="4" />
        <path d="M100,180 Q200,150 300,190" fill="none" stroke="var(--border-color)" strokeWidth="4" />
        <path d="M200,0 L200,200" fill="none" stroke="var(--border-color)" strokeWidth="4" strokeDasharray="10, 10" />
        
        {/* Destination marker */}
        <circle cx="200" cy="100" r="8" fill="var(--accent-color)" />
        <circle cx="200" cy="100" r="16" fill="var(--accent-color)" opacity="0.3" />
        
        {/* Label block */}
        <rect x="210" y="85" width="130" height="30" rx="4" fill="var(--bg-color)" stroke="var(--border-color)" />
        <text x="220" y="105" fill="var(--text-primary)" fontSize="14" fontFamily="sans-serif">Your Polling Place</text>
      </svg>
    </div>
  );
}
