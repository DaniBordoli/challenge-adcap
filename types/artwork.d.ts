export interface Artwork {
  id: number;
  title: string;
  image_id: string;
  artist_title?: string;
  artwork_type_title?: string;
  category_titles?: string[];
  description?: string;
  date_display?: string;
  place_of_origin?: string;
  dimensions?: string;
}

export interface Category {
  title: string;
}
