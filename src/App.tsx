import { ConfigProvider } from 'antd';
import { vydohTheme } from './theme';
import { HomePage } from './pages/HomePage';
import { FirstFlowerPage } from './pages/FirstFlowerPage';
import { MainScreenWithModules } from './pages/MainScreenWithModules';
import { TestPage } from './pages/TestPage';
import { ResultPage } from './pages/ResultPage';
import { DevaluationModulePage } from './pages/DevaluationModulePage';
import { ModuleTemplatePage } from './pages/ModuleTemplatePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { TaskPage } from './pages/TaskPage';  // ← Добавь это

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'first-flower' | 'main-modules' | 'test' | 'result' | 'devaluation'>('home');

  // 🔹 СБРОС СКРОЛЛА — ОТДЕЛЬНЫЙ useEffect
  useEffect(() => {
    // 1. Запрещаем браузеру восстанавливать скролл
    window.history.scrollRestoration = 'manual';
    
    // 2. Скроллим вверх ПОСЛЕ того, как браузер отрисует кадр
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
      });
    });
  }, [currentPage]); // 👈 Срабатывает при каждой смене страницы

  // 🔹 Роутинг по хэшам
  useEffect(() => {
    const handleRouteChange = () => {
      const hash = window.location.hash;

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

      if (!hash || hash === '#') {
        const params = new URLSearchParams(window.location.search);
        if (params.get('type')) {
          setCurrentPage('result');
          return;
        }
      }

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
      <BrowserRouter>
        <Routes>
          {/* Динамический роут для модулей */}
          <Route path="/module/:slug" element={<ModuleTemplatePage />} />
          <Route path="/module/:slug/task/:taskId" element={<TaskPage />} />
          
          {/* Остальные роуты через хэш-навигацию */}
          <Route path="*" element={
            <>
              {currentPage === 'home' ? <HomePage /> : 
               currentPage === 'first-flower' ? <FirstFlowerPage /> : 
               currentPage === 'test' ? <TestPage /> : 
               currentPage === 'result' ? <ResultPage /> : 
               currentPage === 'devaluation' ? <DevaluationModulePage /> :
               <MainScreenWithModules />}
            </>
          } />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;