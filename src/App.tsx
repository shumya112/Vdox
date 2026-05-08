import { ConfigProvider } from 'antd';
import { vydohTheme } from './theme';
import { HomePage } from './pages/HomePage';
import { FirstFlowerPage } from './pages/FirstFlowerPage';
import { MainScreenWithModules } from './pages/MainScreenWithModules';
import { TestPage } from './pages/TestPage';
import { ResultPage } from './pages/ResultPage';
import { DevaluationModulePage } from './pages/DevaluationModulePage';
import { useEffect, useState } from 'react';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'first-flower' | 'main-modules' | 'test' | 'result' | 'devaluation'>('home');

  useEffect(() => {
    const handleRouteChange = () => {
      const hash = window.location.hash;

      // 1. Сначала проверяем явные переходы по хэшам (меню)
      if (hash === '#first-flower') {
        setCurrentPage('first-flower');
        return;
      }
      if (hash === '#main-modules') {
        setCurrentPage('main-modules');
        return;
      }
      if (hash === '#test') {
        setCurrentPage('test');
        return;
      }
      if (hash === '#result') {
        setCurrentPage('result');
        return;
      }
      if (hash === '#devaluation') {
        setCurrentPage('devaluation');
        return;
      }

      // 2. Если хэш пустой (главная), проверяем ?type= для результата теста
      if (!hash || hash === '#') {
        const params = new URLSearchParams(window.location.search);
        if (params.get('type')) {
          setCurrentPage('result');
          return;
        }
      }

      // 3. Дефолт — главная
      setCurrentPage('home');
    };

    handleRouteChange();
    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return (
    <ConfigProvider theme={vydohTheme}>
      {currentPage === 'home' ? <HomePage /> : 
       currentPage === 'first-flower' ? <FirstFlowerPage /> : 
       currentPage === 'test' ? <TestPage /> : 
       currentPage === 'result' ? <ResultPage /> : 
       currentPage === 'devaluation' ? <DevaluationModulePage /> :
       <MainScreenWithModules />}
    </ConfigProvider>
  );
}

export default App;