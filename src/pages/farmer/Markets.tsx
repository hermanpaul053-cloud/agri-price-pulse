import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Store, 
  MapPin, 
  Search, 
  Leaf,
  ChevronRight,
  Info
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockDataService, Market, CropPrice, Crop } from '@/services/mockData';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

const FarmerMarketsPage = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedMarket, setSelectedMarket] = React.useState<Market | null>(null);
  
  const markets = mockDataService.getMarkets();
  const prices = mockDataService.getPrices();
  const crops = mockDataService.getCrops();

  const filteredMarkets = markets.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getMarketPrices = (marketId: string) => {
    return prices
      .filter(p => p.marketId === marketId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      // Get only unique crops for this market (latest price)
      .reduce((acc: CropPrice[], current) => {
        const x = acc.find(item => item.cropId === current.cropId);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);
  };

  const getCropName = (id: string) => crops.find(c => c.id === id)?.name || id;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Markets & Prices</h1>
          <p className="text-muted-foreground">Browse available crops and their prices by market location.</p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search markets..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground px-2">Market List</h3>
          {filteredMarkets.map((market) => (
            <Card 
              key={market.id} 
              className={`cursor-pointer transition-all border-2 ${selectedMarket?.id === market.id ? 'border-primary bg-primary/5' : 'hover:border-primary/50'}`}
              onClick={() => setSelectedMarket(market)}
            >
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${selectedMarket?.id === market.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                    <Store className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{market.name}</h4>
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      {market.location}
                    </div>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 ${selectedMarket?.id === market.id ? 'text-primary' : 'text-muted-foreground'}`} />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-2">
          {selectedMarket ? (
            <Card className="animate-in fade-in slide-in-from-right-4 duration-300">
              <CardHeader className="border-b">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{selectedMarket.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {selectedMarket.location}
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Open</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Crop</TableHead>
                      <TableHead>Current Price</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getMarketPrices(selectedMarket.id).map((price) => (
                      <TableRow key={price.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Leaf className="w-4 h-4 text-primary" />
                            <span className="font-medium">{getCropName(price.cropId)}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-bold text-lg text-primary">${price.price.toFixed(2)}</TableCell>
                        <TableCell className="text-muted-foreground">per {price.unit}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">Details</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {getMarketPrices(selectedMarket.id).length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} className="h-24 text-center text-muted-foreground italic">
                          No pricing data available for this market.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>

                <div className="mt-8 p-4 bg-muted rounded-xl flex gap-3">
                  <Info className="w-5 h-5 text-primary shrink-0" />
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Prices are updated daily by market administrators. If you notice a discrepancy, please use the suggestion box in your dashboard.
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 bg-muted/20 rounded-2xl border-2 border-dashed">
              <Store className="w-16 h-16 text-muted-foreground opacity-20 mb-4" />
              <h3 className="text-xl font-bold text-muted-foreground">Select a market</h3>
              <p className="text-muted-foreground max-w-xs">
                Click on a market from the list on the left to view real-time crop pricing.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmerMarketsPage;
