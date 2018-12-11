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

