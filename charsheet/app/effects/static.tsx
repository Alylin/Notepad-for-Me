import { useState, useEffect } from "react";

export default function NoiseOverlay() {
   const [seed, setSeed] = useState(1);
   useEffect(() => {
      const interval = setInterval(() => {
         setSeed(Math.random()*10);
      }, 1);
      return () => {
         clearInterval(interval);
      }
   }, []);
   return (
      <div 
         className="blur-[0.5px] pointer-events-none z-20 h-screen w-screen absolute left-0 top-0 bg-[url('http://api.thumbr.it/whitenoise-361x370.png?')]" 
      >
         <div className="invisible">
            {seed}
         </div>
         <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 700 700" width="700" height="700" opacity="1">
            <defs>
               <filter id="nnnoise-filter" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="linearRGB">
                  <feTurbulence type="fractalNoise" baseFrequency="0.191" numOctaves="4" seed={`${seed}`} stitchTiles="stitch" x="0%" y="0%" width="100%" height="100%" result="turbulence" />
                  <feSpecularLighting surfaceScale="37" specularConstant="2.4" specularExponent="20" lighting-color="#0e00ff" x="0%" y="0%" width="100%" height="100%" in="turbulence" result="specularLighting">
                     <feDistantLight azimuth="3" elevation="133" />
                  </feSpecularLighting>
                  <feColorMatrix type="saturate" values="0" x="0%" y="0%" width="100%" height="100%" in="specularLighting" result="colormatrix" />
               </filter>
            </defs>
            <rect width="700" height="700" fill="#00000000" />
            <rect width="700" height="700" fill="#ffffff" filter="url(#nnnoise-filter)" />
         </svg>
      </div>
   );
}