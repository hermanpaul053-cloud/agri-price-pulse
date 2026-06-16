import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Leaf, 
  Search, 
  ArrowUpRight, 
  ArrowDownRight, 
  TrendingUp, 
  Store,
  MapPin,
  Calendar,
  AlertCircle,
  ChevronRight,
  Info
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { mockDataService, CropPrice, Crop, Market } from '@/services/mockData';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const FarmerPricesPage = () => {
  const user = mockDataService.getCurrentUser();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [prices, setPrices] = React.useState<CropPrice[]>([]);
  const [crops, setCrops] = React.useState<Crop[]>([]);
  const [markets, setMarkets] = React.useState<Market[]>([]);
  const [selectedCrop, setSelectedCrop] = React.useState<Crop | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = React.useState(false);

  React.useEffect(() => {
    setPrices(mockDataService.getPrices());
    setCrops(mockDataService.getCrops());
    setMarkets(mockDataService.getMarkets());
  }, []);

  const getMarket = (id: string) => markets.find(m => m.id === id);

  // Get most recent price for each crop across all markets
  const latestByCrop = crops.map(crop => {
    const cropPrices = prices
      .filter(p => p.cropId === crop.id)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    // Group by market to get latest in each market
    const byMarket: Record<string, CropPrice[]> = {};
    cropPrices.forEach(p => {
      if (!byMarket[p.marketId]) byMarket[p.marketId] = [];
      byMarket[p.marketId].push(p);
    });

    const marketPrices = Object.values(byMarket).map(ps => ({
      latest: ps[0],
      previous: ps[1]
    }));

    // Find the one with the lowest price as the "Main" display for the farmer
    const sortedByPrice = marketPrices.sort((a, b) => a.latest.price - b.latest.price);

    return {
      crop,
      displayPrice: sortedByPrice[0],
      allMarketPrices: marketPrices
    };
  }).filter(item => item.displayPrice);

  const filtered = latestByCrop.filter(item => 
    item.crop.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardClick = (crop: Crop) => {
    setSelectedCrop(crop);
    setIsDetailsOpen(true);
  };

  const getCropDetails = () => {
    if (!selectedCrop) return null;
    
    const cropPrices = prices
      .filter(p => p.cropId === selectedCrop.id)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Get latest price for each market
    const marketMap = new Map<string, { latest: CropPrice; previous?: CropPrice }>();
    cropPrices.forEach(p => {
      if (!marketMap.has(p.marketId)) {
        marketMap.set(p.marketId, { latest: p });
      } else {
        const existing = marketMap.get(p.marketId)!;
        if (!existing.previous) {
          existing.previous = p;
        }
      }
    });

    return Array.from(marketMap.entries()).map(([marketId, data]) => ({
      market: getMarket(marketId),
      ...data
    }));
  };

  const cropDetails = getCropDetails();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-primary/5 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 border border-primary/10">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Welcome back, {user?.name}! 👋</h1>
          <p className="text-muted-foreground text-lg">
            Stay informed with the latest market prices for your crops.
          </p>
        </div>
        <div className="flex flex-col items-center md:items-end">
          <div className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Last Market Refresh
          </div>
          <div className="text-2xl font-black">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input 
            placeholder="Search for crops (Maize, Beans, Rice...)" 
            className="pl-12 h-12 text-lg rounded-2xl shadow-sm border-2 focus-visible:ring-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="h-12 px-6 rounded-2xl w-full md:w-auto">
          <TrendingUp className="w-5 h-5 mr-2" />
          Market Trends
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => {
          const { displayPrice } = item;
          const priceChange = displayPrice.previous ? displayPrice.latest.price - displayPrice.previous.price : 0;
          const isUp = priceChange >= 0;
          
          return (
            <Card 
              key={item.crop.id} 
              className="overflow-hidden hover:shadow-xl transition-all border-2 hover:border-primary group cursor-pointer"
              onClick={() => handleCardClick(item.crop)}
            >
              <CardHeader className="pb-2 flex flex-row justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Leaf className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{item.crop.name}</CardTitle>
                  </div>
                  <Badge variant="secondary">{item.crop.category}</Badge>
                </div>
                <div className="text-right">
                  <div className={`flex items-center justify-end gap-1 text-sm font-bold ${isUp ? 'text-green-600' : 'text-red-600'}`}>
                    {isUp ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                    {Math.abs(priceChange).toFixed(2)}
                  </div>
                  <p className="text-[10px] text-muted-foreground uppercase">last trend</p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium uppercase tracking-tight">Best Market Price</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black">${displayPrice.latest.price.toFixed(2)}</span>
                      <span className="text-sm text-muted-foreground">/ {displayPrice.latest.unit}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground mb-1 flex items-center justify-end gap-1">
                      <Store className="w-3 h-3" />
                      {getMarket(displayPrice.latest.marketId)?.name}
                    </p>
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      {getMarket(displayPrice.latest.marketId)?.location}
                    </div>
                  </div>
                </div>
                <Button className="w-full mt-6 bg-primary group-hover:scale-[1.02] transition-transform flex items-center justify-center gap-2">
                  <Info className="w-4 h-4" />
                  View All Market Prices
                </Button>
              </CardContent>
            </Card>
          );
        })}

        {filtered.length === 0 && (
          <div className="col-span-full py-20 text-center space-y-4">
            <AlertCircle className="w-16 h-16 mx-auto text-muted-foreground opacity-20" />
            <h3 className="text-xl font-bold text-muted-foreground">No crops found matching "{searchTerm}"</h3>
            <p className="text-muted-foreground">Try a different crop name or browse all markets.</p>
            <Button onClick={() => setSearchTerm('')}>Clear Search</Button>
          </div>
        )}
      </div>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-3xl rounded-3xl">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary/10 rounded-xl">
                <Leaf className="w-6 h-6 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold">{selectedCrop?.name}</DialogTitle>
                <DialogDescription>
                  Detailed price comparison across different markets
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="mt-6">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-b-2">
                  <TableHead className="font-bold">Market</TableHead>
                  <TableHead className="font-bold">Location</TableHead>
                  <TableHead className="font-bold text-right">Current Price</TableHead>
                  <TableHead className="font-bold text-right">Trend</TableHead>
                  <TableHead className="text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cropDetails?.map((item, index) => {
                  const change = item.previous ? item.latest.price - item.previous.price : 0;
                  const isUp = change >= 0;
                  
                  return (
                    <TableRow key={index} className="group transition-colors">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Store className="w-4 h-4 text-muted-foreground" />
                          {item.market?.name}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {item.market?.location}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="font-bold text-lg">${item.latest.price.toFixed(2)}</span>
                        <span className="text-xs text-muted-foreground ml-1">/{item.latest.unit}</span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className={`inline-flex items-center gap-1 font-bold ${isUp ? 'text-green-600' : 'text-red-600'}`}>
                          {isUp ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" /> }
                          {Math.abs(change).toFixed(2)}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          <div className="mt-8 p-6 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800">
            <h4 className="font-bold mb-2 flex items-center gap-2 text-primary">
              <TrendingUp className="w-4 h-4" />
              Market Insight
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Based on current data, the best market to sell {selectedCrop?.name?.toLowerCase()} is <span className="font-bold text-foreground">{cropDetails?.sort((a,b) => b.latest.price - a.latest.price)[0]?.market?.name}</span> where prices are highest. 
              Always consider transportation costs and distance when choosing your selling point.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FarmerPricesPage;
