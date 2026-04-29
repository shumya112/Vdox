import { useEffect, useState } from 'react';
import { DesktopHomePage } from './desktop/DesktopHomePage';
import { MobileHomePage } from './mobile/MobileHomePage';

export const HomePage = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile ? <MobileHomePage /> : <DesktopHomePage />;
};