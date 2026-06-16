export interface User {
  id: string;
  name: string;
  role: 'admin' | 'farmer';
  email: string;
}

export interface Market {
  id: string;
  name: string;
  location: string;
  crops: string[];
}

export interface Crop {
  id: string;
  name: string;
  category: string;
}

export interface CropPrice {
  id: string;
  cropId: string;
  marketId: string;
  price: number;
  unit: string;
  date: string;
}

export interface Suggestion {
  id: string;
  userId: string;
  message: string;
  date: string;
}

export interface AuditLog {
  id: string;
  action: string;
  userId: string;
  details: string;
  timestamp: string;
}

const STORAGE_KEYS = {
  USERS: 'crop_system_users',
  MARKETS: 'crop_system_markets',
  CROPS: 'crop_system_crops',
  PRICES: 'crop_system_prices',
  SUGGESTIONS: 'crop_system_suggestions',
  LOGS: 'crop_system_logs',
  CURRENT_USER: 'crop_system_current_user',
};

const initialUsers: User[] = [
  { id: '1', name: 'Admin User', role: 'admin', email: 'admin@example.com' },
  { id: '2', name: 'John Farmer', role: 'farmer', email: 'john@example.com' },
];

const initialMarkets: Market[] = [
  { id: 'm1', name: 'Central Market', location: 'City Center', crops: ['Maize', 'Rice', 'Beans'] },
  { id: 'm2', name: 'Riverside Market', location: 'North District', crops: ['Tomatoes', 'Onions', 'Potatoes'] },
];

const initialCrops: Crop[] = [
  { id: 'c1', name: 'Maize', category: 'Cereal' },
  { id: 'c2', name: 'Rice', category: 'Cereal' },
  { id: 'c3', name: 'Beans', category: 'Legume' },
  { id: 'c4', name: 'Tomatoes', category: 'Vegetable' },
  { id: 'c5', name: 'Onions', category: 'Vegetable' },
  { id: 'c6', name: 'Potatoes', category: 'Tuber' },
];

const generatePrices = () => {
  const prices: CropPrice[] = [];
  const crops = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];
  const markets = ['m1', 'm2'];
  const units = ['kg', 'bag', 'crate'];

  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];

    markets.forEach(mId => {
      crops.forEach(cId => {
        prices.push({
          id: `${mId}-${cId}-${dateStr}`,
          cropId: cId,
          marketId: mId,
          price: Math.floor(Math.random() * 100) + 50,
          unit: units[Math.floor(Math.random() * units.length)],
          date: dateStr,
        });
      });
    });
  }
  return prices;
};

const getFromStorage = <T>(key: string, initial: T): T => {
  const stored = localStorage.getItem(key);
  if (!stored) {
    localStorage.setItem(key, JSON.stringify(initial));
    return initial;
  }
  return JSON.parse(stored);
};

const saveToStorage = <T>(key: string, data: T) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const mockDataService = {
  getUsers: () => getFromStorage<User[]>(STORAGE_KEYS.USERS, initialUsers),
  getMarkets: () => getFromStorage<Market[]>(STORAGE_KEYS.MARKETS, initialMarkets),
  getCrops: () => getFromStorage<Crop[]>(STORAGE_KEYS.CROPS, initialCrops),
  getPrices: () => getFromStorage<CropPrice[]>(STORAGE_KEYS.PRICES, generatePrices()),
  getSuggestions: () => getFromStorage<Suggestion[]>(STORAGE_KEYS.SUGGESTIONS, []),
  getLogs: () => getFromStorage<AuditLog[]>(STORAGE_KEYS.LOGS, []),
  
  getCurrentUser: () => getFromStorage<User | null>(STORAGE_KEYS.CURRENT_USER, initialUsers[1]),
  setCurrentUser: (user: User | null) => saveToStorage(STORAGE_KEYS.CURRENT_USER, user),

  addMarket: (market: Market) => {
    const markets = mockDataService.getMarkets();
    saveToStorage(STORAGE_KEYS.MARKETS, [...markets, market]);
    mockDataService.addLog('Added Market', `Market ${market.name} added.`);
  },

  addCrop: (crop: Crop) => {
    const crops = mockDataService.getCrops();
    saveToStorage(STORAGE_KEYS.CROPS, [...crops, crop]);
    mockDataService.addLog('Added Crop', `Crop ${crop.name} added.`);
  },

  updatePrice: (price: CropPrice) => {
    const prices = mockDataService.getPrices();
    const index = prices.findIndex(p => p.id === price.id);
    if (index > -1) {
      prices[index] = price;
    } else {
      prices.push(price);
    }
    saveToStorage(STORAGE_KEYS.PRICES, prices);
    mockDataService.addLog('Updated Price', `Price for crop ${price.cropId} in market ${price.marketId} updated.`);
  },

  addSuggestion: (suggestion: Suggestion) => {
    const suggestions = mockDataService.getSuggestions();
    saveToStorage(STORAGE_KEYS.SUGGESTIONS, [...suggestions, suggestion]);
  },

  addLog: (action: string, details: string) => {
    const logs = mockDataService.getLogs();
    const user = mockDataService.getCurrentUser();
    const newLog: AuditLog = {
      id: Math.random().toString(36).substr(2, 9),
      action,
      userId: user?.id || 'system',
      details,
      timestamp: new Date().toISOString(),
    };
    saveToStorage(STORAGE_KEYS.LOGS, [newLog, ...logs]);
  }
};
