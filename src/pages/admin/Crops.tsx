import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Leaf, 
  Plus, 
  Search, 
  Tag,
  ChevronRight
} from 'lucide-react';
import { mockDataService, Crop } from '@/services/mockData';
import { toast } from 'sonner';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';

const CropsPage = () => {
  const [crops, setCrops] = React.useState<Crop[]>([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [newCrop, setNewCrop] = React.useState({ name: '', category: '' });

  React.useEffect(() => {
    setCrops(mockDataService.getCrops());
  }, []);

  const handleAddCrop = (e: React.FormEvent) => {
    e.preventDefault();
    const crop: Crop = {
      id: Math.random().toString(36).substr(2, 9),
      name: newCrop.name,
      category: newCrop.category,
    };
    mockDataService.addCrop(crop);
    setCrops(mockDataService.getCrops());
    setIsDialogOpen(false);
    setNewCrop({ name: '', category: '' });
    toast.success("Crop added successfully!");
  };

  const filteredCrops = crops.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = Array.from(new Set(crops.map(c => c.category)));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Crop Catalog</h1>
          <p className="text-muted-foreground">Manage the list of crops tracked in the system.</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Crop
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Crop</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddCrop} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Crop Name</Label>
                <Input 
                  id="name" 
                  value={newCrop.name} 
                  onChange={e => setNewCrop({...newCrop, name: e.target.value})}
                  placeholder="e.g. Soybeans" 
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input 
                  id="category" 
                  value={newCrop.category}
                  onChange={e => setNewCrop({...newCrop, category: e.target.value})}
                  placeholder="e.g. Legume" 
                  required
                />
              </div>
              <DialogFooter>
                <Button type="submit">Add to Catalog</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Categories</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <Button variant="secondary" className="w-full justify-start text-sm">All Categories</Button>
            {categories.map(cat => (
              <Button key={cat} variant="ghost" className="w-full justify-start text-sm font-normal">
                {cat}
              </Button>
            ))}
          </CardContent>
        </Card>

        <div className="lg:col-span-3 space-y-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search crops..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredCrops.map((crop) => (
              <Card key={crop.id} className="group hover:border-primary transition-colors cursor-pointer">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 text-primary rounded-xl group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Leaf className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{crop.name}</h3>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Tag className="w-3 h-3" />
                        {crop.category}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropsPage;
