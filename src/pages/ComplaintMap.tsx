import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
// @ts-ignore - CommonJS export in provided folder
import { sampleComplaints } from '../../complaint_map-main/src/utils/complaintData.js';

const ComplaintMap = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    const ensureLeaflet = async () => {
      const hasLeaflet = typeof window !== 'undefined' && (window as any).L;
      if (!hasLeaflet) {
        // Inject Leaflet CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
        link.crossOrigin = '';
        document.head.appendChild(link);

        // Inject Leaflet JS
        await new Promise<void>((resolve) => {
          const script = document.createElement('script');
          script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
          script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
          script.crossOrigin = '';
          script.onload = () => resolve();
          document.body.appendChild(script);
        });
      }
    };

    const initMap = async () => {
      await ensureLeaflet();
      const L = (window as any).L as any;

      const containerId = 'complaints-leaflet-map';
      // Clean up existing map instance if any
      const existing = document.getElementById(containerId);
      if (existing) {
        existing.innerHTML = '';
      }

      const map = L.map(containerId, {
        center: [22.5, 79],
        zoom: 5,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      const storedRaw = localStorage.getItem('complaints');
      const stored: any[] = storedRaw ? JSON.parse(storedRaw) : [];
      const all: any[] = [...sampleComplaints, ...stored];

      const group = L.featureGroup();

      all.forEach((c: any) => {
        const coords = c?.location?.coordinates;
        if (!Array.isArray(coords) || coords.length < 2) return;
        const [lng, lat] = coords; // GeoJSON order

        const status = (c.status || '').toLowerCase();
        const color = status === 'resolved' ? '#16a34a' : '#ef4444';

        const marker = L.circleMarker([lat, lng], {
          radius: 8,
          color,
          weight: 2,
          fillColor: color,
          fillOpacity: 0.8,
        });

        const popupHtml = `
          <div style="min-width:200px">
            <div style="font-weight:700;margin-bottom:4px;">${c.title || 'Complaint'}</div>
            <div style="font-size:12px;color:#666;margin-bottom:6px;">${c.location?.address || ''}</div>
            <div style="font-size:12px;">Status: <b>${c.status || 'Pending'}</b></div>
            ${c.description ? `<div style=\"font-size:12px;margin-top:6px;\">${c.description}</div>` : ''}
          </div>
        `;
        marker.bindPopup(popupHtml);
        marker.addTo(group);
      });

      group.addTo(map);
      try {
        map.fitBounds(group.getBounds(), { padding: [20, 20] });
      } catch {}

      return () => {
        map.remove();
      };
    };

    let cleanup: any;
    initMap().then((c) => (cleanup = c));
    return () => {
      if (typeof cleanup === 'function') cleanup();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-foreground">Complaints Map</h1>
          <Button variant="outline" onClick={() => navigate(-1)}>Back</Button>
        </div>
        <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-md">
          <CardHeader>
            <CardTitle>Map</CardTitle>
            <CardDescription>Interactive map displaying complaints by location</CardDescription>
          </CardHeader>
          <CardContent>
            <div id="complaints-leaflet-map" className="w-full h-[70vh] rounded-md overflow-hidden border" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ComplaintMap;


