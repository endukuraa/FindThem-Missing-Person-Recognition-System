import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import Index from './pages/Index';
import Registration from './pages/Registration';
import AllCases from './pages/AllCases';
import Match from './pages/Match';
import Help from './pages/Help';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <div className="min-h-screen bg-slate-900">
          <Navigation />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/all-cases" element={<AllCases />} />
            <Route path="/match" element={<Match />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;