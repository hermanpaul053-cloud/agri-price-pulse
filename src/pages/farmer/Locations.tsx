import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  MapPin, 
  Navigation, 
  Phone, 
  Clock, 
  ExternalLink,
  Store
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockDataService } from '@/services/mockData';

const FarmerLocationsPage = () => {
  const markets = mockDataService.getMarkets();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Market Locations</h1>
        <p className="text-muted-foreground">Find the nearest markets and get directions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          {markets.map((market) => (
            <Card key={market.id} className="group hover:border-primary transition-all overflow-hidden">
              <div className="h-2 bg-primary/10 group-hover:bg-primary transition-colors" />
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold">{market.name}</h3>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span className="text-sm">{market.location}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Navigation className="w-4 h-4" />
                  </Button>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="p-2 bg-muted rounded-lg">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-semibold">Hours</p>
                      <p className="text-xs text-muted-foreground">6 AM - 6 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="p-2 bg-muted rounded-lg">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-semibold">Contact</p>
                      <p className="text-xs text-muted-foreground">+251 912 3456</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t flex gap-3">
                  <Button className="flex-1 gap-2">
                    <Navigation className="w-4 h-4" />
                    Get Directions
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Website
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="hidden lg:block">
          <Card className="h-[600px] sticky top-24 bg-muted flex items-center justify-center overflow-hidden border-2 border-dashed border-muted-foreground/20">
            <div className="absolute inset-0 opacity-20 grayscale pointer-events-none">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
            <div className="relative text-center space-y-4">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto animate-pulse">
                <MapPin className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Interactive Map Simulation</h3>
              <p className="text-muted-foreground max-w-xs mx-auto">
                In the production version, this area would integrate with Google Maps or Mapbox for real-time navigation.
              </p>
              <div className="flex justify-center gap-2">
                {markets.map(m => (
                  <div key={m.id} className="px-3 py-1 bg-background border rounded-full text-xs font-medium shadow-sm flex items-center gap-1">
                    <Store className="w-3 h-3 text-primary" />
                    {m.name}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FarmerLocationsPage;
