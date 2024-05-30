import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Calendar from './pages/Calendar';
import WritingDiaryPage from './pages/WritingDiaryPage';
import DrawCompletedPage from './pages/DrawCompletedPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Calendar />} />
      <Route path='/write' element={<WritingDiaryPage />} />
      <Route path='/complete' element={<DrawCompletedPage />} />
    </Routes>
  );
}

export default App;
