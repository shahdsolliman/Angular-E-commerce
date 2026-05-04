export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface Product {
  id: string | number;
  _id?: string;
  title?: string;
  name?: string;
  description?: string;
  price: number;
  discountPrice?: number;
  imageCover?: string;
  image?: string;
  images?: string[];
  sold?: number;
  category: string | Category;
  ratingsAverage?: number;
  ratingsQuantity?: number;
  rating?: {
    rate: number;
    count: number;
  } | number;
  isNew?: boolean;
}

export interface ApiResponse<T> {
  results?: number;
  metadata?: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage?: number;
    prevPage?: number;
  };
  data: T;
  message?: string;
  statusMsg?: string;
}
