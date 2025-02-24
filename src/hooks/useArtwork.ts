import { useState, useEffect, useCallback, useMemo } from "react";
import { Artwork, ArtworkResponse } from "../types/artwork";

const API_BASE = "https://api.artic.edu/api/v1/artworks";
const RESULTS_PER_PAGE = 12;

interface UseArtworkReturn {
  artworks: Artwork[];
  categories: string[];
  isLoading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
  searchArtworks: (query: string) => Promise<void>;
  filterByCategory: (category: string) => void;
  refreshData: () => Promise<void>;
}

export const useArtwork = (): UseArtworkReturn => {
  const [rawArtworks, setRawArtworks] = useState<Artwork[]>([]);
  const [filteredArtworks, setFilteredArtworks] = useState<Artwork[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mapArtworkData = useCallback((data: any[]): Artwork[] => {
    return data.map((artwork) => ({
      id: artwork.id,
      title: artwork.title,
      artist_title: artwork.artist_title,
      image_id: artwork.image_id,
      artwork_type_title: artwork.artwork_type_title,
      description: artwork.thumbnail?.alt_text || "",
      date_display: artwork.date_display,
      place_of_origin: artwork.place_of_origin,
      dimensions: artwork.dimensions,
      category_titles: artwork.category_titles || [],
    }));
  }, []);

  const fetchArtworks = useCallback(
    async (pageNumber: number) => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${API_BASE}?page=${pageNumber}&limit=${RESULTS_PER_PAGE}`
        );

        if (!response.ok) throw new Error("API Error");

        const data: ArtworkResponse = await response.json();
        const mapped = mapArtworkData(data.data);

        setRawArtworks((prev) => [...prev, ...mapped]);
        setFilteredArtworks((prev) => [...prev, ...mapped]);
        setTotalPages(data.pagination.total_pages);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error loading artworks");
      } finally {
        setIsLoading(false);
      }
    },
    [mapArtworkData]
  );

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api.artic.edu/api/v1/artwork-types`
      );
      const data = await response.json();
      setCategories(data.data.map((type: any) => type.title));
    } catch (err) {
      setError("Error loading categories");
    }
  }, []);

  const searchArtworks = useCallback(
    async (query: string) => {
      if (query.trim().length < 3) {
        setFilteredArtworks(rawArtworks);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(
          `${API_BASE}/search?q=${encodeURIComponent(
            query
          )}&fields=id,title,artist_title,image_id`
        );

        if (!response.ok) throw new Error("Search failed");

        const data: ArtworkResponse = await response.json();
        const mapped = mapArtworkData(data.data);

        setFilteredArtworks(mapped);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Search error");
      } finally {
        setIsLoading(false);
      }
    },
    [mapArtworkData, rawArtworks]
  );

  const filterByCategory = useCallback(
    (category: string) => {
      const lowerCategory = category.toLowerCase();
      const filtered = rawArtworks.filter((artwork) => {
        const typeMatch = artwork.artwork_type_title
          ?.toLowerCase()
          .includes(lowerCategory);
        const categoryMatch = artwork.category_titles?.some((ct) =>
          ct.toLowerCase().includes(lowerCategory)
        );
        return typeMatch || categoryMatch;
      });
      setFilteredArtworks(category ? filtered : rawArtworks);
    },
    [rawArtworks]
  );

  const refreshData = useCallback(async () => {
    setRawArtworks([]);
    setFilteredArtworks([]);
    await fetchArtworks(1);
    setPage(1);
  }, [fetchArtworks]);

  useEffect(() => {
    fetchArtworks(page);
  }, [page, fetchArtworks]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return useMemo(
    () => ({
      artworks: filteredArtworks,
      categories,
      isLoading,
      error,
      page,
      totalPages,
      setPage,
      searchArtworks,
      filterByCategory,
      refreshData,
    }),
    [
      filteredArtworks,
      categories,
      isLoading,
      error,
      page,
      totalPages,
      searchArtworks,
      filterByCategory,
      refreshData,
    ]
  );
};
