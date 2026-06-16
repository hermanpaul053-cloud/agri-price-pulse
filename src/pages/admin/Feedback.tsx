import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  MessageSquare, 
  Trash2, 
  CheckCircle2, 
  Reply, 
  Search,
  User,
  Clock
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { mockDataService, Suggestion } from '@/services/mockData';
import { toast } from 'sonner';

const FeedbackPage = () => {
  const [suggestions, setSuggestions] = React.useState<Suggestion[]>([]);
  const [searchTerm, setSearchTerm] = React.useState('');

  React.useEffect(() => {
    setSuggestions(mockDataService.getSuggestions());
  }, []);

  const handleDelete = (id: string) => {
    const updated = suggestions.filter(s => s.id !== id);
    setSuggestions(updated);
    toast.success("Feedback removed.");
  };

  const filtered = suggestions.filter(s => 
    s.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.userId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Farmer Feedback</h1>
        <p className="text-muted-foreground">Review suggestions and comments submitted by farmers.</p>
      </div>

      <div className="relative max-w-sm mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input 
          placeholder="Filter feedback..." 
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {filtered.length > 0 && filtered.map((item) => (
          <Card key={item.id} className="group overflow-hidden">
            <CardContent className="p-0 flex flex-col md:flex-row">
              <div className="p-6 flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Farmer ID: {item.userId}</h4>
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {new Date(item.date).toLocaleString()}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed italic">
                  "{item.message}"
                </p>
              </div>
              <div className="bg-muted/50 p-4 md:w-48 flex md:flex-col gap-2 justify-center items-center">
                <Button variant="outline" size="sm" className="w-full justify-start md:justify-center gap-2">
                  <Reply className="w-4 h-4" />
                  Reply
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start md:justify-center gap-2 hover:bg-green-50 hover:text-green-600">
                  <CheckCircle2 className="w-4 h-4" />
                  Resolved
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-start md:justify-center gap-2 text-destructive hover:bg-destructive/10"
                  onClick={() => handleDelete(item.id)}
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-20 bg-muted/30 rounded-2xl border-2 border-dashed">
            <MessageSquare className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-20" />
            <h3 className="text-lg font-semibold text-muted-foreground">No feedback yet</h3>
            <p className="text-sm text-muted-foreground">Suggestions from the Farmer Dashboard will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackPage;
