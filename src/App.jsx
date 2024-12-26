import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './Components/ThemeContext';
import { NotificationProvider } from './Components/NotificationContext';
import MainLayout from './Components/MainLayout';

// Importación de componentes de páginas
import Dashboard from './Components/Dashboard';
import DevicesPage from './Components/DevicesPage';
import HistoryPage from './Components/HistoryPage';
import CalculatorPage from './Components/CalculatorPage';
import ReportsPage from './Components/ReportsPage';
import AlertsPage from './Components/AlertsPage';
import SettingsPage from './Components/SettingsPage';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <NotificationProvider>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="devices" element={<DevicesPage />} />
              <Route path="history" element={<HistoryPage />} />
              <Route path="calculator" element={<CalculatorPage />} />
              <Route path="reports" element={<ReportsPage />} />
              <Route path="alerts" element={<AlertsPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
          </Routes>
        </NotificationProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;