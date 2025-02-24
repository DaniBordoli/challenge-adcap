export type LoadingProps = {
  color?: string;
  size?: "small" | "large" | number;
  overlay?: boolean;
  message?: string;
};

export type SearchBarProps = {
  darkMode: boolean;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  placeholder?: string;
  debounceTime?: number;
};

export type Theme = {
  darkMode: boolean;
  colors: {
    primary: string;
    background: string;
    text: string;
    card: string;
    border: string;
  };
};
