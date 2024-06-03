import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Calendar from './pages/Calendar';
import WritingDiaryPage from './pages/WritingDiaryPage';
import DrawCompletedPage from './pages/DrawCompletedPage';
import SelectDrawerPage from './pages/SelectDrawerPage';
import DrawerListPage from './pages/DrawerListPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Calendar />} />
      <Route path='/write' element={<WritingDiaryPage />} />
      <Route path='/complete' element={<DrawCompletedPage />} />
      <Route path='/selectdrawer' element={<SelectDrawerPage />} />
      <Route path='/drawerlist' element={<DrawerListPage />} />
    </Routes>
  );
}

export default App;
