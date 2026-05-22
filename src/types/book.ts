type RawBook = {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
};

export type OpenLibraryResponse = {
  docs: RawBook[];
  numFound: number;
};

export type Book = {
  key: string;
  title: string;
  authors?: string[];
  coverId?: number;
  publishYear?: number;
};
