export interface Ad {
  _id: string;
  title: string;
  description?: string;
  imageUrl: string;
  targetUrl: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  clicks: number;
  views: number;
  targetUserType: 'Customer' | 'Provider' | 'Both';
  createdAt: string;
  updatedAt: string;
}
