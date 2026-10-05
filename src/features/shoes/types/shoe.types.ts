export type ShoeBrand =
  | 'Nike'
  | 'Jordan'
  | 'Adidas'
  | 'New Balance'
  | 'Yeezy'
  | 'Asics';

export type StockStatus = 'In Stock' | 'Low Stock' | 'Sold Out';

export interface Sneaker {
  id: string;
  name: string;
  brand: ShoeBrand;
  sku: string;
  colorway: string;
  retailPrice: number;
  marketPrice: number;
  stockCount: number;
  sizes: string[];
  status: StockStatus;
  imageUrl: string;
  releaseDate: string;
  salesCount: number;
  category: 'Retro' | 'Collaboration' | 'Lifestyle' | 'Basketball' | 'Running';
}

export interface ShoeFilterState {
  searchQuery: string;
  selectedBrand: ShoeBrand | 'All';
  selectedStatus: StockStatus | 'All';
  sortBy: 'price-desc' | 'price-asc' | 'stock-desc' | 'sales-desc';
}
