export interface Service {
  _id: string;
  providerID: string | {
    _id: string;
    businessName?: string;
    [key: string]: unknown;
  };
  categoryID: string | {
    _id: string;
    categoryName?: string;
    categoryNameEnglish?: string;
    [key: string]: unknown;
  };
  title: string;
  description?: string;
  priceRange: {
    from: number;
    to: number;
  };
  availability: boolean;
  serviceImage?: string[];
  serviceVideo?: string;
  createdAt?: string;
  updatedAt?: string;
}
