export type BookSearchResult = {
  id: string;
  title: string;
  author?: string;
  year?: number;
  coverUrl?: string;
};

export type SavedBook = {
  id: string;
  sourceId?: string;
  title: string;
  author?: string;
  year?: number;
  coverUrl?: string;
  notes?: string;
  tags: string[];
  createdAt: string;
};

export type Recommendation = {
  title: string;
  author: string;
  reason: string;
};

export type TasteProfileResponse = {
  summary: string;
  recommendations: Recommendation[];
};
