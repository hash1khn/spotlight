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
            ticketLink: string;
          };
          Insert: {
            title: string;
            date: string;
            time: string;
            location: string;
            address: string;
            ticketLink: string;
          };
          Update: {
            title?: string;
            date?: string;
            time?: string;
            location?: string;
            address?: string;
            ticketLink?: string;
          };
        };
      };
      Views: {};
      Functions: {};
    };
  };
  