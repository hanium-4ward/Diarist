import React, {useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';
import GlobalStyle from './GlobalStyle';
import AlbumListPage from './pages/AlbumListPage';
import AlbumThumbnailPage from './pages/AlbumThumbnailPage';
import Calendar from './pages/Calendar';
import DrawCompletedPage from './pages/DrawCompletedPage';
import DrawerListPage from './pages/DrawerListPage';
import SelectDrawerPage from './pages/SelectDrawerPage';
import SelectEmotionPage from './pages/SelectEmotionPage';
import WritingDiaryPage from './pages/WritingDiaryPage';

function App() {
  const [widthRatio, setWidthRatio] = useState(1);
  const FIGMA_WIDTH = 640;

  useEffect(() => {
    const updateWidthRatio = () => {
      const newWidthRatio = window.innerWidth / FIGMA_WIDTH;
      setWidthRatio(newWidthRatio);
    };

    updateWidthRatio();
    window.addEventListener('resize', updateWidthRatio);

    // Cleanup function을 제거했습니다.
    // return () => {
    //   window.removeEventListener('resize', updateWidthRatio);
    // };
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
      </Routes>
    </ThemeProvider>
  );
}

export default App;
