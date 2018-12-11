export interface ForsquareData {
  response: Response;
}
export interface Response {
  venues: Venue[];
}
export interface Venue {
  location : Location
}
export interface Location {
  city : string
}

export interface WikiResponse {
  query: Query
}
export interface Query {
  searchInfo: SearchInfo
  search: Search[]
}
export interface SearchInfo {
  totalhits: number
}
export interface Search {
  title: string,
  snippet; string
}

export interface Marker {
  lat: number;
  lng: number;
  title?: string;
  img?: string;
  draggable: boolean;
}

export interface Circle {
  lat: number;
  lng: number;
}

export interface GenomicAnalysis {
  url: string;
  fullGenome: any;
  topics?: (string)[] | null;
  strongestGenes?: (string)[] | null;
  languageFullName: string;
  languageCode: string;
  pornography: boolean;
  offensiveLanguage: boolean;
}

