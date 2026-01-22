// Types for Analytics API responses

export interface AppStats {
  customers: number;
  providers: number;
  ads: number;
  services: number;
  requests: number;
  categories: number;
}

export interface AppStatisticsResponse {
  success: boolean;
  stats: AppStats;
  error?: string;
}

export interface CustomerStats {
  total: number;
  active: number;
  inactive: number;
  deleted: number;
  blacklisted: number;
}

export interface CustomerStatisticsResponse {
  success: boolean;
  customerStats: CustomerStats;
  dateRange?: {
    startDate: string;
    endDate: string;
  };
  error?: string;
}

export interface ProviderStats {
  total: number;
  active: number;
  inactive: number;
  deleted: number;
  blacklisted: number;
}

export interface ProviderStatisticsResponse {
  success: boolean;
  providerStats: ProviderStats;
  dateRange?: {
    startDate: string;
    endDate: string;
  };
  error?: string;
}

export interface AdStats {
  total: number;
  active: number;
  inactive: number;
  totalClicks: number;
  totalViews: number;
  averageClicks: number;
  averageViews: number;
}

export interface AdStatisticsResponse {
  success: boolean;
  adStats: AdStats;
  dateRange?: {
    startDate: string;
    endDate: string;
  };
  error?: string;
}

export interface ServiceStats {
  total: number;
  available: number;
  unavailable: number;
  availabilityRate: number;
}

export interface ServiceStatisticsResponse {
  success: boolean;
  serviceStats: ServiceStats;
  dateRange?: {
    startDate: string;
    endDate: string;
  };
  error?: string;
}

export interface RequestStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  completed: number;
  averageRating: number;
  completionRate: number;
}

export interface RequestStatisticsResponse {
  success: boolean;
  requestStats: RequestStats;
  dateRange?: {
    startDate: string;
    endDate: string;
  };
  error?: string;
}

export interface CategoryStats {
  total: number;
  averageServicesPerCategory: number;
  maxServicesInCategory: number;
  minServicesInCategory: number;
}

export interface CategoryStatisticsResponse {
  success: boolean;
  categoryStats: CategoryStats;
  dateRange?: {
    startDate: string;
    endDate: string;
  };
  error?: string;
}

export interface DateRange {
  startDate?: string;
  endDate?: string;
}
