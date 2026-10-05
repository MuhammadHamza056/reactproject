import { create } from 'zustand';
import { Sneaker, ShoeBrand, StockStatus, ShoeFilterState } from '../types/shoe.types';
import { MOCK_SNEAKERS } from '../data/mockSneakers';

interface ShoeStoreState {
  sneakers: Sneaker[];
  filters: ShoeFilterState;

  // Actions
  setSearchQuery: (query: string) => void;
  setSelectedBrand: (brand: ShoeBrand | 'All') => void;
  setSelectedStatus: (status: StockStatus | 'All') => void;
  setSortBy: (sortBy: ShoeFilterState['sortBy']) => void;
  updateStock: (id: string, newStock: number) => void;
  addSneaker: (sneaker: Omit<Sneaker, 'id'>) => void;

  // Selectors
  getFilteredSneakers: () => Sneaker[];
  getTotalInventoryValue: () => number;
  getTotalStockPairs: () => number;
  getLowStockCount: () => number;
}

export const useShoeStore = create<ShoeStoreState>((set, get) => ({
  sneakers: MOCK_SNEAKERS,
  filters: {
    searchQuery: '',
    selectedBrand: 'All',
    selectedStatus: 'All',
    sortBy: 'price-desc',
  },

  setSearchQuery: (searchQuery) => {
    set((state) => ({ filters: { ...state.filters, searchQuery } }));
  },

  setSelectedBrand: (selectedBrand) => {
    set((state) => ({ filters: { ...state.filters, selectedBrand } }));
  },

  setSelectedStatus: (selectedStatus) => {
    set((state) => ({ filters: { ...state.filters, selectedStatus } }));
  },

  setSortBy: (sortBy) => {
    set((state) => ({ filters: { ...state.filters, sortBy } }));
  },

  updateStock: (id, newStock) => {
    set((state) => ({
      sneakers: state.sneakers.map((s) => {
        if (s.id !== id) return s;
        const status: StockStatus =
          newStock <= 0 ? 'Sold Out' : newStock <= 5 ? 'Low Stock' : 'In Stock';
        return { ...s, stockCount: newStock, status };
      }),
    }));
  },

  addSneaker: (newSneakerData) => {
    const newSneaker: Sneaker = {
      ...newSneakerData,
      id: `snk_${Date.now()}`,
    };
    set((state) => ({
      sneakers: [newSneaker, ...state.sneakers],
    }));
  },

  getFilteredSneakers: () => {
    const { sneakers, filters } = get();
    const query = filters.searchQuery.toLowerCase().trim();

    return sneakers
      .filter((s) => {
        const matchesQuery =
          !query ||
          s.name.toLowerCase().includes(query) ||
          s.brand.toLowerCase().includes(query) ||
          s.sku.toLowerCase().includes(query) ||
          s.colorway.toLowerCase().includes(query);

        const matchesBrand =
          filters.selectedBrand === 'All' || s.brand === filters.selectedBrand;

        const matchesStatus =
          filters.selectedStatus === 'All' || s.status === filters.selectedStatus;

        return matchesQuery && matchesBrand && matchesStatus;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'price-desc') return b.marketPrice - a.marketPrice;
        if (filters.sortBy === 'price-asc') return a.marketPrice - b.marketPrice;
        if (filters.sortBy === 'stock-desc') return b.stockCount - a.stockCount;
        if (filters.sortBy === 'sales-desc') return b.salesCount - a.salesCount;
        return 0;
      });
  },

  getTotalInventoryValue: () => {
    return get().sneakers.reduce(
      (sum, s) => sum + s.marketPrice * s.stockCount,
      0
    );
  },

  getTotalStockPairs: () => {
    return get().sneakers.reduce((sum, s) => sum + s.stockCount, 0);
  },

  getLowStockCount: () => {
    return get().sneakers.filter((s) => s.status === 'Low Stock').length;
  },
}));
