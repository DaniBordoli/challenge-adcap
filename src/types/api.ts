import { Artwork } from "./artwork";

export interface ArtworkResponse {
  data: Artwork[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    total_pages: number;
    current_page: number;
  };
}

export interface CategoryResponse {
  data: Array<{
    id: string;
    title: string;
    description?: string;
  }>;
}

export interface BaseApiResponse {
  success: boolean;
  error?: string;
  message?: string;
}
