import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import JobsListingPage from './pages/jobs';
import './App.css'
import { JobsProvider } from './job.context';
function App() {
  return (
    <JobsProvider>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<JobsListingPage />} />
      <Route path="/job-listing" element={<JobsListingPage />} >
      <Route path=":id" element={<Outlet />} />
      </Route>
      </Routes>
    </BrowserRouter>
    </JobsProvider>
  );
}

export default App