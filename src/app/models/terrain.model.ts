export interface Terrain {
    idTerrain?: number;
    capacity: number;
    status?: string;
    price?: number;
    name: string;
    description?: string;
    type?: string;
    reservations?: Reservation[];
    courtTimeList?: CourtTimeAvailability[];
    closedCourtList?: ClosedCourt[];
  }
  export interface Reservation {
    // Define the properties of the Reservation entity if not available
  }
  
  export interface CourtTimeAvailability {
    // Define the properties of the CourtTimeAvailability entity if not available
  }
  
  export interface ClosedCourt {
    // Define the properties of the ClosedCourt entity if not available
  }