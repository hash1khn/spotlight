export type Database = {
  public: {
    Tables: {
      shows: {
        Row: {
          id: number;
          title: string;
          date: string;
          time: string;
          location: string;
          address: string;
          ticketlink: string;
          // Remove created_at - it's not in your schema
        };
        Insert: {
          id?: number;
          title: string;
          date: string;
          time: string;
          location: string;
          address: string;
          ticketlink: string;
          // Remove created_at
        };
        Update: {
          id?: number;
          title?: string;
          date?: string;
          time?: string;
          location?: string;
          address?: string;
          ticketlink?: string;
          // Remove created_at
        };
      };
    };
  };
};