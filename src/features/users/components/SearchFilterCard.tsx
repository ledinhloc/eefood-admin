import React from 'react';
import { Search, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { AdvancedFilters } from './AdvancedFilters';

interface SearchFilterCardProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  showFilters: boolean;
  setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
  roleFilter: '' | 'USER' | 'ADMIN';
  setRoleFilter: React.Dispatch<React.SetStateAction<'' | 'USER' | 'ADMIN'>>;
  providerFilter: '' | 'GOOGLE' | 'NORMAL';
  setProviderFilter: React.Dispatch<React.SetStateAction<'' | 'GOOGLE' | 'NORMAL'>>;
}


export const SearchFilterCard: React.FC<SearchFilterCardProps> = ({
  search,
  setSearch,
  showFilters,
  setShowFilters,
  roleFilter,
  setRoleFilter,
  providerFilter,
  setProviderFilter,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-slate-200">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by username or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors font-medium text-slate-700"
        >
          <Filter className="w-5 h-5" />
          Filters
          {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {showFilters && (
        <AdvancedFilters
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
          providerFilter={providerFilter}
          setProviderFilter={setProviderFilter}
        />
      )}
    </div>
  );
};
