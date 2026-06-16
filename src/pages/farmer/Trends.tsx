import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Filter,
  Calendar,
  LineChart as LineIcon
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area
} from 'recharts';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { mockDataService } from '@/services/mockData';

const FarmerTrendsPage = () => {
  const [selectedCrop, setSelectedCrop] = React.useState('c1');
  const [timeRange, setTimeRange] = React.useState('week');
  
  const crops = mockDataService.getCrops();
  const prices = mockDataService.getPrices();

  // Filter and format data for chart
  const chartData = prices
    .filter(p => p.cropId === selectedCrop)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-14) // Last 14 entries
    .map(p => ({
      date: new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      price: p.price
    }));

  const cropName = crops.find(c => c.id === selectedCrop)?.name || 'Crop';

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Price Trends</h1>
          <p className="text-muted-foreground">Analyze how crop prices have changed over time.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={selectedCrop} onValueChange={setSelectedCrop}>
            <SelectTrigger className="w-[180px] bg-background">
              <SelectValue placeholder="Select Crop" />
            </SelectTrigger>
            <SelectContent>
              {crops.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <div className="flex bg-muted p-1 rounded-lg">
            <Button 
              variant={timeRange === 'week' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setTimeRange('week')}
            >
              Weekly
            </Button>
            <Button 
              variant={timeRange === 'month' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setTimeRange('month')}
            >
              Monthly
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <Card className="p-2">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{cropName} Price Trend</CardTitle>
                  <CardDescription>Price movement for {timeRange === 'week' ? 'last 7 days' : 'last 30 days'}</CardDescription>
                </div>
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <LineIcon className="w-5 h-5" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="h-[400px] pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#64748b' }} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#64748b' }} 
                    tickFormatter={(val) => `$${val}`}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="price" 
                    stroke="var(--primary)" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorPrice)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-green-50/50 border-green-100">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="p-4 bg-green-100 text-green-700 rounded-2xl">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-green-800 uppercase tracking-wider">Recommendation</h4>
                  <p className="text-green-900 font-bold text-lg leading-snug">
                    Price is trending up. Consider holding for better margins next week.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-blue-50/50 border-blue-100">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="p-4 bg-blue-100 text-blue-700 rounded-2xl">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-blue-800 uppercase tracking-wider">Market Cycle</h4>
                  <p className="text-blue-900 font-bold text-lg leading-snug">
                    Peak harvest season approaching. Prices expected to stabilize.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase text-muted-foreground">Market Comparison</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: 'Central Market', price: '$42.50', trend: '+1.2%' },
                { name: 'Riverside', price: '$40.80', trend: '-0.5%' },
                { name: 'East Gate', price: '$43.20', trend: '+2.4%' },
              ].map((m, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-muted/50 rounded-xl">
                  <div>
                    <p className="text-xs font-bold">{m.name}</p>
                    <p className="text-lg font-black">{m.price}</p>
                  </div>
                  <div className={`text-xs font-bold px-2 py-1 rounded-full ${m.trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {m.trend}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-6 space-y-4 text-center">
              <TrendingUp className="w-12 h-12 mx-auto opacity-50" />
              <h4 className="font-bold text-lg">Market Forecast</h4>
              <p className="text-sm opacity-90">
                Our AI models predict a 5% increase in legume prices due to upcoming export demand.
              </p>
              <Button variant="secondary" className="w-full">Get Full Analysis</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FarmerTrendsPage;
