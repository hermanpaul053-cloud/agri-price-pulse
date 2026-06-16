import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { AdminLayout } from './layouts/AdminLayout';
import { FarmerLayout } from './layouts/FarmerLayout';
import { mockDataService } from './services/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Leaf, UserCircle2, ShieldCheck, Phone, Smartphone, TrendingUp, MapPin, Search, ChevronRight } from 'lucide-react';
import { Toaster } from '@/components/ui/sonner';
import { MobileSimulation } from './components/MobileSimulation';

// Admin Pages
const AdminOverview = React.lazy(() => import('./pages/admin/Overview'));
const AdminUsers = React.lazy(() => import('./pages/admin/Users'));
const AdminMarkets = React.lazy(() => import('./pages/admin/Markets'));
const AdminCrops = React.lazy(() => import('./pages/admin/Crops'));
const AdminPrices = React.lazy(() => import('./pages/admin/Prices'));
const AdminReports = React.lazy(() => import('./pages/admin/Reports'));
const AdminLogs = React.lazy(() => import('./pages/admin/Logs'));
const AdminFeedback = React.lazy(() => import('./pages/admin/Feedback'));

// Farmer Pages
const FarmerPrices = React.lazy(() => import('./pages/farmer/Prices'));
const FarmerMarkets = React.lazy(() => import('./pages/farmer/Markets'));
const FarmerTrends = React.lazy(() => import('./pages/farmer/Trends'));
const FarmerLocations = React.lazy(() => import('./pages/farmer/Locations'));
const FarmerSuggestions = React.lazy(() => import('./pages/farmer/Suggestions'));

const LandingPage = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role: 'admin' | 'farmer') => {
    const users = mockDataService.getUsers();
    const user = users.find(u => u.role === role);
    if (user) {
      mockDataService.setCurrentUser(user);
      navigate(role === 'admin' ? '/admin' : '/farmer');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/ce217487-1a91-4a92-b65a-0079bdb91cf2/hero-bg-0f939b02-1781643058558.webp" 
            alt="Hero Background" 
            className="w-full h-full object-cover brightness-[0.4]"
          />
        </div>
        
        <div className="container relative z-10 px-4 md:px-6">
          <div className="max-w-3xl space-y-6 animate-in fade-in slide-in-from-left-8 duration-1000">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary-foreground text-sm font-medium backdrop-blur-md">
              <Leaf className="w-4 h-4" />
              <span>Real-time Crop Intelligence</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.1]">
              Empowering <span className="text-primary italic">Farmers</span> with Better Prices
            </h1>
            <p className="text-xl text-zinc-300 max-w-xl">
              Access real-time market data, trend analysis, and expert suggestions to maximize your farm's profitability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full" onClick={() => handleRoleSelect('farmer')}>
                Enter Farmer Portal
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full bg-white/10 text-white border-white/20 hover:bg-white/20" onClick={() => handleRoleSelect('admin')}>
                Admin Access
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-zinc-50 dark:bg-zinc-950">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4 text-center md:text-left">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto md:mx-0">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold">Real-time Search</h3>
              <p className="text-muted-foreground">Instantly find prices for hundreds of crops across multiple markets in your region.</p>
            </div>
            <div className="space-y-4 text-center md:text-left">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto md:mx-0">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold">Price Trends</h3>
              <p className="text-muted-foreground">Historical data analysis helps you predict the best time to sell your harvest.</p>
            </div>
            <div className="space-y-4 text-center md:text-left">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto md:mx-0">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold">Market Locations</h3>
              <p className="text-muted-foreground">Integrated mapping and location services to find the closest market with the best prices.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-24 overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Everything you need to <span className="text-primary underline underline-offset-8">thrive</span>.</h2>
              <div className="space-y-6">
                {[
                  { title: "SMS & USSD Support", desc: "No internet? No problem. Access all price information via simple SMS or USSD commands.", icon: Smartphone },
                  { title: "Expert Suggestions", desc: "Receive personalized crop suggestions based on market demand and environmental factors.", icon: Leaf },
                  { title: "Multi-Market Comparison", desc: "Compare prices between local and regional markets to find the best deal for your produce.", icon: ShieldCheck }
                ].map((feature, i) => (
                  <div key={i} className="flex gap-4 p-6 rounded-3xl border-2 border-transparent hover:border-primary/20 hover:bg-primary/5 transition-all">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-primary-foreground">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-1">{feature.title}</h4>
                      <p className="text-muted-foreground">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/20 rounded-[3rem] blur-2xl z-0 rotate-3"></div>
              <img 
                src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/ce217487-1a91-4a92-b65a-0079bdb91cf2/farmer-tech-5c42cf59-1781643058717.webp" 
                alt="Technology in farming" 
                className="relative z-10 rounded-[2.5rem] shadow-2xl border-8 border-white dark:border-zinc-900 object-cover aspect-[4/5] w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-center space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
            
            <h2 className="text-4xl md:text-6xl font-black text-primary-foreground max-w-4xl mx-auto leading-tight">Ready to boost your farming income?</h2>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Join thousands of farmers already using the Crop Price Information System to make smarter selling decisions.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Button size="lg" variant="secondary" className="h-16 px-10 text-xl font-bold rounded-full shadow-xl hover:scale-105 transition-transform" onClick={() => handleRoleSelect('farmer')}>
                Join as Farmer
              </Button>
              <Button size="lg" variant="outline" className="h-16 px-10 text-xl font-bold rounded-full border-primary-foreground/20 text-primary-foreground hover:bg-white/10" onClick={() => navigate('/admin')}>
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container px-4 md:px-6 text-center text-muted-foreground">
          <p>© 2024 Crop Price Information System. Empowering farmers globally.</p>
        </div>
      </footer>
    </div>
  );
};

const Loading = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <MobileSimulation />
      <Toaster position="top-right" richColors />
      <React.Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout><AdminOverview /></AdminLayout>} />
          <Route path="/admin/users" element={<AdminLayout><AdminUsers /></AdminLayout>} />
          <Route path="/admin/markets" element={<AdminLayout><AdminMarkets /></AdminLayout>} />
          <Route path="/admin/crops" element={<AdminLayout><AdminCrops /></AdminLayout>} />
          <Route path="/admin/prices" element={<AdminLayout><AdminPrices /></AdminLayout>} />
          <Route path="/admin/reports" element={<AdminLayout><AdminReports /></AdminLayout>} />
          <Route path="/admin/logs" element={<AdminLayout><AdminLogs /></AdminLayout>} />
          <Route path="/admin/feedback" element={<AdminLayout><AdminFeedback /></AdminLayout>} />

          {/* Farmer Routes */}
          <Route path="/farmer" element={<FarmerLayout><FarmerPrices /></FarmerLayout>} />
          <Route path="/farmer/markets" element={<FarmerLayout><FarmerMarkets /></FarmerLayout>} />
          <Route path="/farmer/trends" element={<FarmerLayout><FarmerTrends /></FarmerLayout>} />
          <Route path="/farmer/locations" element={<FarmerLayout><FarmerLocations /></FarmerLayout>} />
          <Route path="/farmer/suggestions" element={<FarmerLayout><FarmerSuggestions /></FarmerLayout>} />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
}

export default App;