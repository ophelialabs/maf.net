'use client';

import React, { useEffect, useRef, useState } from 'react';
import type { JSX } from 'react';

interface QuantumNode {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  status: string;
  capacity: number;
  region: string;
}

const NETWORK_NODES: QuantumNode[] = [
  // North America
  {
    id: 1,
    name: 'Chattanooga Hub',
    latitude: 35.0456,
    longitude: -85.2672,
    status: '🟢 Active',
    capacity: 250,
    region: 'North America'
  },
  {
    id: 2,
    name: 'Oak Ridge Node',
    latitude: 35.9181,
    longitude: -84.2679,
    status: '🟢 Active',
    capacity: 180,
    region: 'North America'
  },
  {
    id: 3,
    name: 'Atlanta Center',
    latitude: 33.7490,
    longitude: -84.3880,
    status: '🟢 Active',
    capacity: 300,
    region: 'North America'
  },
  {
    id: 4,
    name: 'Washington Node',
    latitude: 38.9072,
    longitude: -77.0369,
    status: '🟡 Connecting',
    capacity: 120,
    region: 'North America'
  },
  {
    id: 5,
    name: 'Boston Labs',
    latitude: 42.3601,
    longitude: -71.0589,
    status: '🟢 Active',
    capacity: 220,
    region: 'North America'
  },
  {
    id: 6,
    name: 'Toronto Quantum Center',
    latitude: 43.6629,
    longitude: -79.3957,
    status: '🟢 Active',
    capacity: 190,
    region: 'North America'
  },
  {
    id: 7,
    name: 'San Francisco Node',
    latitude: 37.7749,
    longitude: -122.4194,
    status: '🟢 Active',
    capacity: 280,
    region: 'North America'
  },
  {
    id: 8,
    name: 'Los Angeles Terminal',
    latitude: 34.0522,
    longitude: -118.2437,
    status: '🟢 Active',
    capacity: 260,
    region: 'North America'
  },
  // Europe
  {
    id: 9,
    name: 'London Hub',
    latitude: 51.5074,
    longitude: -0.1278,
    status: '🟢 Active',
    capacity: 310,
    region: 'Europe'
  },
  {
    id: 10,
    name: 'Berlin Facility',
    latitude: 52.5200,
    longitude: 13.4050,
    status: '🟢 Active',
    capacity: 240,
    region: 'Europe'
  },
  {
    id: 11,
    name: 'Paris Research Lab',
    latitude: 48.8566,
    longitude: 2.3522,
    status: '🟢 Active',
    capacity: 270,
    region: 'Europe'
  },
  {
    id: 12,
    name: 'Amsterdam Center',
    latitude: 52.3676,
    longitude: 4.9041,
    status: '🟡 Connecting',
    capacity: 150,
    region: 'Europe'
  },
  {
    id: 13,
    name: 'Stockholm Node',
    latitude: 59.3293,
    longitude: 18.0686,
    status: '🟢 Active',
    capacity: 200,
    region: 'Europe'
  },
  {
    id: 14,
    name: 'Geneva Hub',
    latitude: 46.2044,
    longitude: 6.1432,
    status: '🟢 Active',
    capacity: 230,
    region: 'Europe'
  },
  // Asia
  {
    id: 15,
    name: 'Tokyo Quantum Center',
    latitude: 35.6762,
    longitude: 139.6503,
    status: '🟢 Active',
    capacity: 320,
    region: 'Asia'
  },
  {
    id: 16,
    name: 'Singapore Node',
    latitude: 1.3521,
    longitude: 103.8198,
    status: '🟢 Active',
    capacity: 290,
    region: 'Asia'
  },
  {
    id: 17,
    name: 'Shanghai Facility',
    latitude: 31.2304,
    longitude: 121.4737,
    status: '🟢 Active',
    capacity: 300,
    region: 'Asia'
  },
  {
    id: 18,
    name: 'Hong Kong Hub',
    latitude: 22.3193,
    longitude: 114.1694,
    status: '🟡 Connecting',
    capacity: 170,
    region: 'Asia'
  },
  {
    id: 19,
    name: 'Mumbai Terminal',
    latitude: 19.0760,
    longitude: 72.8777,
    status: '🟢 Active',
    capacity: 210,
    region: 'Asia'
  },
  {
    id: 20,
    name: 'Seoul Research Institute',
    latitude: 37.5665,
    longitude: 126.9780,
    status: '🟢 Active',
    capacity: 250,
    region: 'Asia'
  },
  // Australia
  {
    id: 21,
    name: 'Sydney Center',
    latitude: -33.8688,
    longitude: 151.2093,
    status: '🟢 Active',
    capacity: 220,
    region: 'Australia'
  },
  {
    id: 22,
    name: 'Melbourne Node',
    latitude: -37.8136,
    longitude: 144.9631,
    status: '🟡 Connecting',
    capacity: 160,
    region: 'Australia'
  },
  // South America
  {
    id: 23,
    name: 'São Paulo Hub',
    latitude: -23.5505,
    longitude: -46.6333,
    status: '🟢 Active',
    capacity: 200,
    region: 'South America'
  },
  {
    id: 24,
    name: 'Buenos Aires Node',
    latitude: -34.6037,
    longitude: -58.3816,
    status: '🟡 Connecting',
    capacity: 140,
    region: 'South America'
  },
];

export function QuantumNetworks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showLabels, setShowLabels] = useState(true);
  const [isRotating, setIsRotating] = useState(true);
  const [focusedNode, setFocusedNode] = useState<QuantumNode | null>(null);
  const rotationRef = useRef(0);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Animation loop
    const animate = () => {
      if (!ctx) return;

      // Clear canvas
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY) - 40;

      if (isRotating) {
        rotationRef.current += 0.2;
      }

      // Draw globe outline
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Draw grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + Math.cos(angle) * radius,
          centerY + Math.sin(angle) * radius
        );
        ctx.stroke();
      }

      // Draw equator
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.8, 0, Math.PI * 2);
      ctx.stroke();

      // Draw nodes
      NETWORK_NODES.forEach((node) => {
        const angle =
          ((node.longitude + 180) / 360) * Math.PI * 2 +
          (isRotating ? rotationRef.current : 0);
        const distance =
          ((90 - node.latitude) / 180) * (radius * 0.9);

        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;

        // Draw node
        const isActive = node.status.includes('Active');
        ctx.fillStyle = isActive ? '#10b981' : '#f59e0b';
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();

        // Draw glow effect
        ctx.fillStyle = isActive ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)';
        ctx.beginPath();
        ctx.arc(x, y, 12, 0, Math.PI * 2);
        ctx.fill();

        // Draw label if enabled
        if (showLabels) {
          ctx.fillStyle = '#e2e8f0';
          ctx.font = '11px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(node.name, x, y + 20);
        }
      });

      // Draw focused node highlight
      if (focusedNode) {
        const angle =
          ((focusedNode.longitude + 180) / 360) * Math.PI * 2 +
          (isRotating ? rotationRef.current : 0);
        const distance =
          ((90 - focusedNode.latitude) / 180) * (radius * 0.9);

        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;

        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(x, y, 15, 0, Math.PI * 2);
        ctx.stroke();
      }

      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [showLabels, isRotating, focusedNode]);

  const handleNodeClick = (node: QuantumNode) => {
    setFocusedNode(focusedNode?.id === node.id ? null : node);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-slate-950 rounded-lg">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">
          🌍 Quantum Networks - 3D Globe View
        </h1>
        <p className="text-gray-400">
          Interactive 3D globe showing quantum network nodes and connectivity
        </p>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={() => setIsRotating(!isRotating)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
        >
          {isRotating ? '⏸️ Stop Rotation' : '▶️ Start Rotation'}
        </button>
        <button
          onClick={() => setFocusedNode(null)}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition"
        >
          ⟲ Reset View
        </button>
        <button
          onClick={() => setShowLabels(!showLabels)}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition"
        >
          {showLabels ? '🏷️ Hide Labels' : '🏷️ Show Labels'}
        </button>
      </div>

      <div className="bg-slate-900 rounded-lg overflow-hidden mb-6 border border-slate-700">
        <canvas
          ref={canvasRef}
          className="w-full bg-slate-900"
          style={{ height: '500px' }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-slate-900 rounded-lg p-6 border border-slate-700">
            <h3 className="text-xl font-bold text-white mb-4">Active Nodes</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {NETWORK_NODES.map((node) => (
                <button
                  key={node.id}
                  onClick={() => handleNodeClick(node)}
                  className={`w-full text-left px-4 py-3 rounded transition ${
                    focusedNode?.id === node.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-800 hover:bg-slate-700 text-gray-200'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-semibold">{node.name}</span>
                      <span className="text-xs ml-2 text-gray-400">{node.region}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span>{node.status}</span>
                      <span className="text-xs text-gray-400">{node.capacity} Q</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-slate-900 rounded-lg p-6 border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-4">Network Stats</h3>
          <div className="space-y-4">
            <div>
              <p className="text-gray-400 text-sm">Total Nodes</p>
              <p className="text-3xl font-bold text-green-400">{NETWORK_NODES.length}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Active</p>
              <p className="text-2xl font-bold text-green-400">
                {NETWORK_NODES.filter((n) => n.status.includes('Active')).length}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Connecting</p>
              <p className="text-2xl font-bold text-yellow-400">
                {NETWORK_NODES.filter((n) => n.status.includes('Connecting')).length}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Capacity</p>
              <p className="text-2xl font-bold text-blue-400">
                {NETWORK_NODES.reduce((sum, n) => sum + n.capacity, 0)} Q
              </p>
            </div>
          </div>

          {focusedNode && (
            <div className="mt-6 pt-6 border-t border-slate-700">
              <h4 className="font-semibold text-white mb-3">Node Details</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <p>
                  <span className="text-gray-400">Name:</span> {focusedNode.name}
                </p>
                <p>
                  <span className="text-gray-400">Status:</span> {focusedNode.status}
                </p>
                <p>
                  <span className="text-gray-400">Region:</span> {focusedNode.region}
                </p>
                <p>
                  <span className="text-gray-400">Capacity:</span> {focusedNode.capacity} Q
                </p>
                <p>
                  <span className="text-gray-400">Lat/Lon:</span>{' '}
                  {focusedNode.latitude.toFixed(4)}, {focusedNode.longitude.toFixed(4)}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
