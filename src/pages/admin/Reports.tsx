import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  Download, 
  FileText, 
  Calendar,
  Filter,
  PieChart,
  LineChart as LineChartIcon
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  Cell
} from 'recharts';
import { mockDataService } from '@/services/mockData';
import { toast } from 'sonner';

const ReportsPage = () => {
  const [reportType, setReportType] = React.useState<'weekly' | 'monthly'>('weekly');
  const markets = mockDataService.getMarkets();
  const prices = mockDataService.getPrices();
  const crops = mockDataService.getCrops();

  // Mock data for report visualization
  const marketDistribution = markets.map((m, i) => ({
    name: m.name,
    count: m.crops.length,
    fill: [`var(--primary)`, `oklch(0.6 0.15 150)`, `oklch(0.5 0.15 200)`][i % 3]
  }));

  const handleDownload = () => {
    toast.success(`${reportType.charAt(0).toUpperCase() + reportType.slice(1)} report downloaded successfully!`);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Analytics & Reports</h1>
          <p className="text-muted-foreground">Generate and export system performance reports.</p>
        </div>
        <div className="flex gap-2 bg-muted p-1 rounded-lg">
          <Button 
            variant={reportType === 'weekly' ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => setReportType('weekly')}
          >
            Weekly
          </Button>
          <Button 
            variant={reportType === 'monthly' ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => setReportType('monthly')}
          >
            Monthly
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Crop Price Variation</CardTitle>
                <CardDescription>Average price per crop category over the {reportType}.</CardDescription>
              </div>
              <BarChart3 className="w-5 h-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={crops.slice(0, 5).map(c => ({ name: c.name, avg: Math.floor(Math.random() * 50) + 40 }))}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="avg" name="Avg Price ($)" fill="var(--primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Market Presence</CardTitle>
                <CardDescription>Crop variety by market.</CardDescription>
              </div>
              <PieChart className="w-5 h-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={marketDistribution} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="count" name="Crops Count" radius={[0, 4, 4, 0]}>
                  {marketDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'User Growth', icon: LineChartIcon, value: '+12%', color: 'text-green-600' },
          { title: 'Price Updates', icon: Calendar, value: '842', color: 'text-blue-600' },
          { title: 'Farmer Feedback', icon: FileText, value: '15 New', color: 'text-purple-600' },
          { title: 'System Uptime', icon: BarChart3, value: '99.9%', color: 'text-amber-600' },
        ].map((item, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-muted rounded-xl">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">{item.title}</p>
                  <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center pt-4">
        <Button size="lg" className="px-8 shadow-lg hover:shadow-xl transition-all" onClick={handleDownload}>
          <Download className="w-5 h-5 mr-2" />
          Export Detailed {reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report (PDF/Excel)
        </Button>
      </div>
    </div>
  );
};

export default ReportsPage;
