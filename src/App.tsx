/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { DashboardLayout } from './pages/DashboardLayout';
import { DashboardHome } from './pages/DashboardHome';
import { ResourcesView } from './pages/ResourcesView';
import { AssignmentsView } from './pages/AssignmentsView';
import { IaPapersView } from './pages/IaPapersView';
import { TrackRecordView } from './pages/TrackRecordView';
import { AiAssistantView } from './pages/AiAssistantView';
import { InternshipsView } from './pages/InternshipsView';
import { AnnouncementsView } from './pages/AnnouncementsView';
import { SettingsView } from './pages/SettingsView';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1. Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* 2. Login & Registration Page */}
        <Route path="/auth" element={<AuthPage />} />

        {/* 3. Student Home Dashboard and sub-views */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="resources" element={<ResourcesView />} />
          <Route path="assignments" element={<AssignmentsView />} />
          <Route path="ia-papers" element={<IaPapersView />} />
          <Route path="track-record" element={<TrackRecordView />} />
          <Route path="ai-assistant" element={<AiAssistantView />} />
          <Route path="internships" element={<InternshipsView />} />
          <Route path="announcements" element={<AnnouncementsView />} />
          <Route path="settings" element={<SettingsView />} />
        </Route>

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
