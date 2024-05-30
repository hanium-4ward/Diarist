import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Calendar from './pages/Calendar';
import WritingDiaryPage from './pages/WritingDiaryPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Calendar />} />
      <Route path='write' element={<WritingDiaryPage />} />
    </Routes>
  );
}

export default App;
