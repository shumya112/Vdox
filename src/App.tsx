import { ConfigProvider } from 'antd';
import { vydohTheme } from './theme';
import { HomePage } from './pages/HomePage';
import { FirstFlowerPage } from './pages/FirstFlowerPage';
import { MainScreenWithModules } from './pages/MainScreenWithModules';
import { TestPage } from './pages/TestPage';
import { useEffect, useState } from 'react';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'first-flower' | 'main-modules' | 'test'>('home');

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#first-flower') {
        setCurrentPage('first-flower');
      } else if (window.location.hash === '#main-modules') {
        setCurrentPage('main-modules');
      } else if (window.location.hash === '#test') {
        setCurrentPage('test');
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
      {currentPage === 'home' ? <HomePage /> : currentPage === 'first-flower' ? <FirstFlowerPage /> : currentPage === 'test' ? <TestPage /> : <MainScreenWithModules />}
    </ConfigProvider>
  );
}


export default App;

