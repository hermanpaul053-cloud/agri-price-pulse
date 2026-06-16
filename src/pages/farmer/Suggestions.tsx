import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  HelpCircle,
  Lightbulb,
  AlertTriangle
} from 'lucide-react';
import { mockDataService } from '@/services/mockData';
import { toast } from 'sonner';

const FarmerSuggestionsPage = () => {
  const [message, setMessage] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      mockDataService.addSuggestion({
        id: Math.random().toString(36).substr(2, 9),
        userId: mockDataService.getCurrentUser()?.id || 'unknown',
        message,
        date: new Date().toISOString(),
      });
      
      setIsSubmitting(false);
      setIsSuccess(true);
      setMessage('');
      toast.success("Suggestion sent! Thank you for your feedback.");
      
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">How can we help?</h1>
        <p className="text-muted-foreground text-lg">
          Your feedback helps us improve the market price information system for everyone.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Submit a Suggestion</CardTitle>
              <CardDescription>
                Report a price discrepancy, suggest a new market, or share your ideas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Textarea 
                    placeholder="Describe your suggestion or issue here..." 
                    className="min-h-[200px] text-lg p-4 resize-none focus-visible:ring-primary border-2"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Please provide as much detail as possible. Administrators will review your submission shortly.
                  </p>
                </div>
                
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full h-14 text-lg font-bold shadow-lg transition-all"
                  disabled={isSubmitting || !message.trim()}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </div>
                  ) : isSuccess ? (
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-6 h-6" />
                      Submitted!
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="w-5 h-5" />
                      Send Suggestion
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-primary/5 border-primary/10">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 text-primary">
                <Lightbulb className="w-5 h-5" />
                <h4 className="font-bold">Pro-tip</h4>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Include the market name and specific crop variety if you're reporting a price error. This helps our team verify it faster!
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 text-amber-600">
                <AlertTriangle className="w-5 h-5" />
                <h4 className="font-bold text-amber-700">Urgent Issue?</h4>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                If you need immediate assistance with your account, please contact our support hotline:
              </p>
              <p className="font-black text-xl">+251 900 123 456</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 text-blue-600">
                <HelpCircle className="w-5 h-5" />
                <h4 className="font-bold text-blue-700">FAQs</h4>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li><Button variant="link" className="p-0 h-auto text-xs justify-start">How are prices verified?</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-xs justify-start">How to update my location?</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-xs justify-start">SMS notification setup</Button></li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FarmerSuggestionsPage;
