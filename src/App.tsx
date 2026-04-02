import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import SetupPage from './pages/SetupPage';
import ActivitiesPage from './pages/ActivitiesPage';
import PrintPage from './pages/PrintPage';
import { PlannerProvider } from './context/PlannerContext';

export default function App() {
  return (
    <PlannerProvider>
      <BrowserRouter basename="/planner">
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<SetupPage />} />
            <Route path="activities" element={<ActivitiesPage />} />
            <Route path="print" element={<PrintPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PlannerProvider>
  );
}
