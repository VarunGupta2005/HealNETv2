export interface Emergency {
  id: string;
  type: string;
  severity: string;
  location: {
    lat: number;
    lng: number;
  };
  assignedResponders: number;
  estimatedArrival: string;
  status: string;
  timestamp: number;
}

export interface Hospital {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  distance: string;
  waitTime: string;
  erCapacity: string;
  specialty: string[];
  phone: string;
  address: string;
}

export interface Responder {
  id: string;
  unit: string;
  status: string;
  location: string;
  lastUpdated: string;
  equipment: string[];
  eta: string | null;
}

export interface Route {
  id: string;
  from: string;
  to: string;
  distance: string;
  eta: string;
  trafficStatus: string;
  alternate: boolean;
}