import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Store, 
  MapPin, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Leaf 
} from 'lucide-react';
import { mockDataService, Market } from '@/services/mockData';
import { toast } from 'sonner';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';

const MarketsPage = () => {
  const [markets, setMarkets] = React.useState<Market[]>([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [newMarket, setNewMarket] = React.useState({ name: '', location: '', crops: '' });

  React.useEffect(() => {
    setMarkets(mockDataService.getMarkets());
  }, []);

  const handleAddMarket = (e: React.FormEvent) => {
    e.preventDefault();
    const market: Market = {
      id: Math.random().toString(36).substr(2, 9),
      name: newMarket.name,
      location: newMarket.location,
      crops: newMarket.crops.split(',').map(c => c.trim()).filter(Boolean),
    };
    mockDataService.addMarket(market);
    setMarkets(mockDataService.getMarkets());
    setIsDialogOpen(false);
    setNewMarket({ name: '', location: '', crops: '' });
    toast.success("Market added successfully!");
  };

  const filteredMarkets = markets.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Market Management</h1>
          <p className="text-muted-foreground">Add and manage physical market locations.</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Market
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Market</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddMarket} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Market Name</Label>
                <Input 
                  id="name" 
                  value={newMarket.name} 
                  onChange={e => setNewMarket({...newMarket, name: e.target.value})}
                  placeholder="e.g. Central City Market" 
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location" 
                  value={newMarket.location}
                  onChange={e => setNewMarket({...newMarket, location: e.target.value})}
                  placeholder="e.g. Downtown District" 
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="crops">Crops Available (comma separated)</Label>
                <Input 
                  id="crops" 
                  value={newMarket.crops}
                  onChange={e => setNewMarket({...newMarket, crops: e.target.value})}
                  placeholder="Maize, Rice, Beans" 
                />
              </div>
              <DialogFooter>
                <Button type="submit">Create Market</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input 
          placeholder="Search markets..." 
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMarkets.map((market) => (
          <Card key={market.id} className="overflow-hidden">
            <CardHeader className="bg-primary/5 pb-4">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Store className="w-5 h-5 text-primary" />
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <CardTitle className="mt-4">{market.name}</CardTitle>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="w-3 h-3" />
                {market.location}
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <Leaf className="w-3 h-3" />
                  Crops in Market
                </div>
                <div className="flex flex-wrap gap-2">
                  {market.crops.map((crop) => (
                    <span key={crop} className="px-2 py-1 bg-muted rounded text-xs font-medium">
                      {crop}
                    </span>
                  ))}
                  {market.crops.length === 0 && (
                    <span className="text-xs text-muted-foreground italic">No crops listed</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MarketsPage;
