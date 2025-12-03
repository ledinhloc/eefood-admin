import React from 'react';

interface AdvancedFiltersProps {
  roleFilter: '' | 'USER' | 'ADMIN';
  setRoleFilter: React.Dispatch<React.SetStateAction<'' | 'USER' | 'ADMIN'>>;
  providerFilter: '' | 'GOOGLE' | 'NORMAL';
  setProviderFilter: React.Dispatch<React.SetStateAction<'' | 'GOOGLE' | 'NORMAL'>>;
}

export const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  roleFilter,
  setRoleFilter,
  providerFilter,
  setProviderFilter,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-200">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Role</label>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value as '' | 'USER' | 'ADMIN')}
          className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Roles</option>
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Provider</label>
        <select
          value={providerFilter}
          onChange={(e) => setProviderFilter(e.target.value as '' | 'GOOGLE' | 'NORMAL')}
          className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Providers</option>
          <option value="GOOGLE">Google</option>
          <option value="NORMAL">Normal</option>
        </select>
      </div>
    </div>
  );
};
