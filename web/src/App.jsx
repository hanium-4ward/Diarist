import React, {useState, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';
import Calendar from './pages/Calendar';
import WritingDiaryPage from './pages/WritingDiaryPage';
import DrawCompletedPage from './pages/DrawCompletedPage';
import SelectDrawerPage from './pages/SelectDrawerPage';
import DrawerListPage from './pages/DrawerListPage';
import AlbumThumbnailPage from './pages/AlbumThumbnailPage';
import AlbumListPage from './pages/AlbumListPage';
import SelectEmotionPage from './pages/SelectEmotionPage';
import DrawDetailPage from './pages/DrawDetailPage';
import GlobalStyle from './GlobalStyle';

function App() {
  const [widthRatio, setWidthRatio] = useState(0);
  const FIGMA_WIDTH = 640;

  useEffect(() => {
    const updateWidthRatio = () => {
      const newWidthRatio = window.innerWidth / FIGMA_WIDTH;
      setWidthRatio(newWidthRatio);
    };

    updateWidthRatio();
    window.addEventListener('resize', updateWidthRatio);

    return () => {
      window.removeEventListener('resize', updateWidthRatio);
    };
  }, []);

  const theme = {
    widthRatio,
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Routes>
        <Route path='/' element={<Calendar />} />
        <Route path='/write' element={<WritingDiaryPage />} />
        <Route path='/complete' element={<DrawCompletedPage />} />
        <Route path='/selectdrawer' element={<SelectDrawerPage />} />
        <Route path='/drawerlist' element={<DrawerListPage />} />
        <Route path='write' element={<WritingDiaryPage />} />
        <Route path='thumbnail' element={<AlbumThumbnailPage />} />
        <Route path='list' element={<AlbumListPage />} />
        <Route path='emotion' element={<SelectEmotionPage />} />
        <Route path='detail' element={<DrawDetailPage />} />
      </Routes>
    </ThemeProvider>
  );
}
export default App;
