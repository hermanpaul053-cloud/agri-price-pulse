import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Users, 
  Store, 
  Leaf, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Activity,
  MessageSquare
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';
import { mockDataService } from '@/services/mockData';

const Overview = () => {
  const users = mockDataService.getUsers();
  const markets = mockDataService.getMarkets();
  const crops = mockDataService.getCrops();
  const prices = mockDataService.getPrices();
  const logs = mockDataService.getLogs();
  const suggestions = mockDataService.getSuggestions();

  // Process data for charts
  const latestPrices = prices.slice(0, 10).map(p => ({
    date: p.date,
    price: p.price,
    name: crops.find(c => c.id === p.cropId)?.name
  }));

  const stats = [
    { label: 'Total Users', value: users.length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Active Markets', value: markets.length, icon: Store, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Crops Tracked', value: crops.length, icon: Leaf, color: 'text-amber-600', bg: 'bg-amber-100' },
    { label: 'Recent Logs', value: logs.length, icon: Activity, color: 'text-purple-600', bg: 'bg-purple-100' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                </div>
                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Price Trends (Global)</CardTitle>
            <CardDescription>Aggregate price movements across all markets.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={latestPrices}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="price" 
                  stroke="var(--primary)" 
                  fillOpacity={1} 
                  fill="url(#colorPrice)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest system changes and audits.</CardDescription>
              </div>
              <Activity className="w-5 h-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {logs.length > 0 ? logs.slice(0, 5).map((log) => (
                <div key={log.id} className="flex items-start gap-4 border-b pb-4 last:border-0 last:pb-0">
                  <div className="p-2 bg-muted rounded-full">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{log.action}</p>
                    <p className="text-xs text-muted-foreground">{log.details}</p>
                    <p className="text-[10px] text-muted-foreground mt-1">{new Date(log.timestamp).toLocaleString()}</p>
                  </div>
                </div>
              )) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Activity className="w-12 h-12 mx-auto mb-2 opacity-20" />
                  <p>No recent activity logs.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Crop Market Presence</CardTitle>
            <CardDescription>Distribution of crops across different markets.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {markets.map(market => (
                <div key={market.id} className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Store className="w-4 h-4 text-primary" />
                    <span className="font-semibold">{market.name}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {market.crops.map(cropName => (
                      <span key={cropName} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        {cropName}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>User Feedback</CardTitle>
              <MessageSquare className="w-5 h-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {suggestions.length > 0 ? suggestions.slice(0, 3).map((sub) => (
                <div key={sub.id} className="p-3 bg-muted rounded-lg">
                  <p className="text-sm italic">"{sub.message}"</p>
                  <p className="text-[10px] text-muted-foreground mt-2">— User ID: {sub.userId}</p>
                </div>
              )) : (
                <div className="text-center py-8 text-muted-foreground">
                  <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-20" />
                  <p>No user comments yet.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Overview;
