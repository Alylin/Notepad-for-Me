import ReactDOM from 'react-dom';
import { useEffect, useRef, ReactNode, RefObject } from 'react';

export default function Dropdown({ 
   isOpen,
   onClose,
   targetElement,
   children 
}: { 
   isOpen: boolean, 
   onClose: () => void, 
   targetElement: RefObject<Element>, 
   children: ReactNode 
}) {
   const dropdownRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const handleClickOutside = function(event: MouseEvent) {
         if (!isOpen) {
            return;
         }
         const target = event.target;
         if (target instanceof Element && !dropdownRef.current?.contains(target) && !targetElement.current?.contains(target) ) {
            onClose();
         }
      };
      document.addEventListener('mousedown', handleClickOutside);

      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, [isOpen, onClose, targetElement]);

   if (!isOpen) {
      return null;
   }

  return ReactDOM.createPortal(
      <div
         className="dropdown z-10"
         ref={dropdownRef}
         style={{
            position: 'absolute',
            top: targetElement.current?.getBoundingClientRect().bottom || 'auto',
            left: targetElement.current?.getBoundingClientRect().left || 'auto',
         }}
      >
         {children}
      </div>,
      document.body
  );
};