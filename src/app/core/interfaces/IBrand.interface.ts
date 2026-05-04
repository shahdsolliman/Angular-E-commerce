export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface BrandResponse {
  results: number;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage: number;
  };
  data: Brand[];
}

export interface SingleBrandResponse {
  data: Brand;
}
 