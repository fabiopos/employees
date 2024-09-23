export interface IEmployee {
  name: string;
  age: number;
  phone: IPhone;
  privileges: "user" | "admin";
  favorites: IFavorite;
  finished: number[];
  badges: string[];
  points: IPoint[];
}

export interface IPoint {
  points: number;
  bonus: number;
}

export interface IFavorite {
  artist: string;
  food: string;
}

export interface IPhone {
  personal: string;
  work: string;
  ext: string;
}
