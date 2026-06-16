import React from 'react';
import { Smartphone, Send, ArrowRight, Phone, MessageSquare, ChevronRight, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const MobileSimulation = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      <Button 
        size="lg" 
        className="rounded-full h-16 w-16 shadow-2xl hover:scale-110 transition-all bg-black hover:bg-zinc-800"
      >
        <Smartphone className="w-8 h-8" />
      </Button>
      
      <div className="absolute bottom-20 right-0 w-80 scale-0 group-hover:scale-100 transition-all origin-bottom-right duration-300">
        <Card className="shadow-2xl border-2 overflow-hidden bg-zinc-950 text-white border-zinc-800">
          <CardHeader className="bg-zinc-900 pb-4 border-b border-zinc-800">
            <CardTitle className="text-sm flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Mobile Access Simulation
            </CardTitle>
            <CardDescription className="text-zinc-400 text-xs">Conceptual SMS & USSD Interfaces</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="ussd">
              <TabsList className="w-full bg-zinc-900 rounded-none border-b border-zinc-800">
                <TabsTrigger value="ussd" className="flex-1 data-[state=active]:bg-zinc-800">USSD (*880#)</TabsTrigger>
                <TabsTrigger value="sms" className="flex-1 data-[state=active]:bg-zinc-800">SMS (8800)</TabsTrigger>
              </TabsList>
              
              <TabsContent value="ussd" className="p-4 m-0 space-y-4">
                <div className="bg-zinc-800 p-4 rounded-xl font-mono text-sm border border-zinc-700">
                  <p className="text-zinc-400 mb-2">USSD MENU</p>
                  <p className="mb-1">1. Check Crop Prices</p>
                  <p className="mb-1">2. Market Locations</p>
                  <p className="mb-1">3. Trend Reports</p>
                  <p className="mb-1">4. Feedback</p>
                  <div className="mt-4 pt-4 border-t border-zinc-700">
                    <p className="text-zinc-500">Reply with option:</p>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="w-6 h-6 bg-zinc-700 rounded flex items-center justify-center">1</div>
                      <ArrowRight className="w-4 h-4 text-zinc-600" />
                    </div>
                  </div>
                </div>
                <div className="bg-primary/20 p-3 rounded-lg border border-primary/30">
                  <p className="text-xs font-bold text-primary-foreground mb-1 flex items-center gap-1">
                    <Hash className="w-3 h-3" /> USSD Result
                  </p>
                  <p className="text-[10px] text-zinc-300">MAIZE PRICES:<br/>Central: $42.50<br/>Riverside: $40.80<br/>0. Back</p>
                </div>
              </TabsContent>

              <TabsContent value="sms" className="p-4 m-0 space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-start">
                    <div className="bg-zinc-800 px-3 py-2 rounded-2xl rounded-tl-none text-xs max-w-[80%]">
                      Send "PRICE [CROP]" to 8800 to get latest market rates.
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-primary px-3 py-2 rounded-2xl rounded-tr-none text-xs max-w-[80%] font-bold">
                      PRICE MAIZE
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-zinc-800 px-3 py-2 rounded-2xl rounded-tl-none text-xs max-w-[80%]">
                      Maize avg price: $41.65. Trend: 📈 2% up since last week. Reply 1 for Market locations.
                    </div>
                  </div>
                </div>
                <div className="relative mt-4">
                  <div className="h-10 bg-zinc-900 border border-zinc-700 rounded-full px-4 flex items-center text-xs text-zinc-500">
                    Type message...
                  </div>
                  <Button size="icon" className="absolute right-1 top-1 h-8 w-8 rounded-full bg-primary">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
