'use client';

import { forwardRef, useEffect, useRef, useImperativeHandle, useState } from 'react';

declare global {
    interface Window {
        google: any;
    }
}

const Globe = forwardRef((props, ref) => {
    const globeContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<any>(null);
    const markerRef = useRef<any>(null);
    const [isInitialized, setIsInitialized] = useState(false);

    const initializeGlobe = async () => {
        try {
            console.log("Initializing globe...");
            const { Map3DElement, MapMode } = await window.google.maps.importLibrary("maps3d");
            await window.google.maps.importLibrary('marker');

            if (globeContainerRef.current) {
                console.log("Creating Map3DElement...");
                const map = new Map3DElement({
                    mode: MapMode.HYBRID,
                    mapId: "globe_view"
                });

                // Wait for the map to be ready
                await new Promise<void>((resolve) => {
                    map.addEventListener('load', () => {
                        console.log("Map loaded successfully");
                        resolve();
                    });

                    setTimeout(() => {
                        console.log("Map load timeout - proceeding anyway");
                        resolve();
                    }, 2000);
                });

                globeContainerRef.current.appendChild(map);
                mapRef.current = map;
                setIsInitialized(true);
                console.log("Globe initialization complete");
            }
        } catch (error) {
            console.error("Error initializing globe:", error);
        }
    };

    const panToLocation = async (lat: number, lng: number, name: string) => {
        console.log("panToLocation called with:", { lat, lng, name });

        if (!mapRef.current) {
            console.error("Map not initialized");
            return;
        }

        try {
            // Remove previous marker if exists
            if (markerRef.current && markerRef.current.parentElement) {
                markerRef.current.parentElement.removeChild(markerRef.current);
                markerRef.current = null;
            }

            // Move to the location using viewport method
            console.log("Moving to location...");

            // First zoom out for a smoother transition
            if (mapRef.current.viewport) {
                const viewport = mapRef.current.viewport;
                viewport.center = { lat: 0, lng: 0 };
                viewport.zoom = 0;
            }

            // Wait a bit for the zoom out to complete
            await new Promise(resolve => setTimeout(resolve, 500));

            // Move to target location
            if (mapRef.current.viewport) {
                const viewport = mapRef.current.viewport;
                viewport.center = { lat, lng };
                viewport.zoom = 5;
            }

            // Wait for the movement to complete
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Create a marker container
            const markerContainer = document.createElement('div');
            markerContainer.style.cssText = `
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
      `;

            // Create the marker element
            const pin = document.createElement('div');
            pin.className = 'map-marker';
            pin.style.cssText = `
        position: absolute;
        left: 50%;
        top: 50%;
        width: 24px;
        height: 24px;
        background: red;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        cursor: pointer;
        transform: translate(-50%, -50%);
        pointer-events: auto;
        z-index: 1000;
      `;
            pin.setAttribute('title', name);

            // Add the pin to the container and the container to the map
            markerContainer.appendChild(pin);
            mapRef.current.appendChild(markerContainer);
            markerRef.current = markerContainer;

            console.log("Marker added successfully");

        } catch (error) {
            console.error("Error in panToLocation:", error);
        }
    };

    useImperativeHandle(ref, () => ({
        panToLocation,
        isInitialized: () => isInitialized
    }));

    useEffect(() => {
        // Load Google Maps API
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDK7BXtZz4ypjq0yr-7FrrAcl3oCoPpxK8&v=alpha&libraries=maps3d,marker`;
        script.async = true;
        script.defer = true;
        script.onload = initializeGlobe;
        document.head.appendChild(script);

        return () => {
            // Cleanup
            document.head.removeChild(script);
        };
    }, []);

    return (
        <div className="w-full h-screen">
            <div id="globe-container" ref={globeContainerRef} className="w-full h-full" />
        </div>
    );
});

Globe.displayName = 'Globe';

export default Globe;
