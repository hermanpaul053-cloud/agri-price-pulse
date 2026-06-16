import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  BarChart3, 
  Plus, 
  Search, 
  History,
  TrendingUp,
  TrendingDown,
  ArrowRight
} from 'lucide-react';
import { mockDataService, CropPrice, Market, Crop } from '@/services/mockData';
import { toast } from 'sonner';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';

const PricesPage = () => {
  const [prices, setPrices] = React.useState<CropPrice[]>([]);
  const [markets, setMarkets] = React.useState<Market[]>([]);
  const [crops, setCrops] = React.useState<Crop[]>([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [newPrice, setNewPrice] = React.useState({ 
    cropId: '', 
    marketId: '', 
    price: '', 
    unit: 'kg' 
  });

  React.useEffect(() => {
    setPrices(mockDataService.getPrices());
    setMarkets(mockDataService.getMarkets());
    setCrops(mockDataService.getCrops());
  }, []);

  const handleUpdatePrice = (e: React.FormEvent) => {
    e.preventDefault();
    const price: CropPrice = {
      id: `${newPrice.marketId}-${newPrice.cropId}-${new Date().toISOString().split('T')[0]}`,
      cropId: newPrice.cropId,
      marketId: newPrice.marketId,
      price: parseFloat(newPrice.price),
      unit: newPrice.unit,
      date: new Date().toISOString().split('T')[0],
    };
    mockDataService.updatePrice(price);
    setPrices(mockDataService.getPrices());
    setIsDialogOpen(false);
    setNewPrice({ cropId: '', marketId: '', price: '', unit: 'kg' });
    toast.success("Price updated successfully!");
  };

  const getCropName = (id: string) => crops.find(c => c.id === id)?.name || id;
  const getMarketName = (id: string) => markets.find(m => m.id === id)?.name || id;

  const latestPrices = prices
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 50);

  const filteredPrices = latestPrices.filter(p => 
    getCropName(p.cropId).toLowerCase().includes(searchTerm.toLowerCase()) ||
    getMarketName(p.marketId).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Crop Price Management</h1>
          <p className="text-muted-foreground">Monitor and update real-time market prices.</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Update Price
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Crop Price</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleUpdatePrice} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Select Market</Label>
                <Select onValueChange={(val) => setNewPrice({...newPrice, marketId: val})} value={newPrice.marketId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select market" />
                  </SelectTrigger>
                  <SelectContent>
                    {markets.map(m => <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Select Crop</Label>
                <Select onValueChange={(val) => setNewPrice({...newPrice, cropId: val})} value={newPrice.cropId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select crop" />
                  </SelectTrigger>
                  <SelectContent>
                    {crops.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input 
                    id="price" 
                    type="number"
                    value={newPrice.price} 
                    onChange={e => setNewPrice({...newPrice, price: e.target.value})}
                    placeholder="0.00" 
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit</Label>
                  <Select onValueChange={(val) => setNewPrice({...newPrice, unit: val})} value={newPrice.unit}>
                    <SelectTrigger>
                      <SelectValue placeholder="kg" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">Per kg</SelectItem>
                      <SelectItem value="bag">Per Bag</SelectItem>
                      <SelectItem value="crate">Per Crate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="w-full">Save Price Update</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-primary/10 text-primary rounded-lg">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-bold">Highest Increase</p>
              <h4 className="font-bold">Maize (+12%)</h4>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-destructive/5 border-destructive/20">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-destructive/10 text-destructive rounded-lg">
              <TrendingDown className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-bold">Sharpest Drop</p>
              <h4 className="font-bold">Tomatoes (-8%)</h4>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-muted rounded-lg">
              <History className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-bold">Last Update</p>
              <h4 className="font-bold">2 minutes ago</h4>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Filter by crop or market..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">Export CSV</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Crop</TableHead>
                <TableHead>Market</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPrices.map((price) => (
                <TableRow key={price.id}>
                  <TableCell className="font-medium">{getCropName(price.cropId)}</TableCell>
                  <TableCell>{getMarketName(price.marketId)}</TableCell>
                  <TableCell className="font-bold">${price.price.toFixed(2)}</TableCell>
                  <TableCell>per {price.unit}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{price.date}</TableCell>
                  <TableCell className="text-right">
                    <div className="inline-flex items-center gap-1 text-xs text-green-600 font-medium">
                      <TrendingUp className="w-3 h-3" />
                      2.4%
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PricesPage;
