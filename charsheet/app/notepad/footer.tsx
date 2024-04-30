import { useEffect, useState } from 'react';

function useMousePosition() {
   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
 
   const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
   };
 
   useEffect(() => {
      window.addEventListener('mousemove', handleMouseMove);
   
      return () => {
         window.removeEventListener('mousemove', handleMouseMove);
      };
   }, []);
 
   return mousePosition;
}

function useBrowserZoomLevel() {
   const [zoomLevel, setZoomLevel] = useState(100);
 
   const handleZoom = () => {
      setZoomLevel(window.devicePixelRatio * 100);
   };
 
   useEffect(() => {
      handleZoom();
      var oldresize = window.onresize;
      window.onresize = handleZoom;

   
      return () => {
         window.onresize = oldresize
      };
   }, []);
 
   return zoomLevel;
}

export function Footer() {
   const { x, y } = useMousePosition();
   const zoomLevel = useBrowserZoomLevel();

   return (
      <div className="h-6 flex text-sm bg-[#F0F0F0] border-t-2 border-gray-300 absolute bottom-0 w-full">
         <div className="flex-1" />
         <div className="border-l-2 border-gray-300 px-1 w-40">
            {`Ln ${y}, Col ${x}`}
         </div>
         <div className="border-l-2 border-gray-300 px-1 w-12">
            {Math.round(zoomLevel)+'%'}
         </div>
         <div className="border-l-2 border-gray-300 px-1 w-36">
            Windows (CRLF)
         </div>
         <div className="border-l-2 border-gray-300 px-1 w-36">
            UTF-8
         </div>
      </div>
   );
}