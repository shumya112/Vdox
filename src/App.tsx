import { ConfigProvider } from 'antd';
import { vydohTheme } from './theme';
import { HomePage } from './pages/HomePage';
import { FirstFlowerPage } from './pages/FirstFlowerPage';
import { useEffect, useState } from 'react';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'first-flower'>('home');

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#first-flower') {
        setCurrentPage('first-flower');
      } else {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <ConfigProvider theme={vydohTheme}>
      {currentPage === 'home' ? <HomePage /> : <FirstFlowerPage />}
    </ConfigProvider>
  );
}


export default App;

