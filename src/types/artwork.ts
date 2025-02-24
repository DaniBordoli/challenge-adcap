export interface Artwork {
  id: number;
  title: string;
  artist_title?: string;
  image_id: string;
  artwork_type_title?: string;
  description?: string;
  date_display?: string;
  place_of_origin?: string;
  dimensions?: string;
  category_titles?: string[];
  last_updated?: string;
  thumbnail?: {
    alt_text?: string;
    width?: number;
    height?: number;
  };
}

export interface Category {
  id: string;
  title: string;
  description?: string;
}

export type ArtworkFilter = {
  category?: string;
  searchQuery?: string;
  page?: number;
};

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
