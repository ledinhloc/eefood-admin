import React, { useState } from 'react';
import { Search, Filter, ChevronDown, ChevronUp, Mail, Calendar, Globe, Shield } from 'lucide-react';
import { useGetUsersQuery } from '@/features/users/services/userApi';

export default function UserPage() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<'USER' | 'ADMIN' | ''>('');
  const [providerFilter, setProviderFilter] = useState<'GOOGLE' | 'NORMAL' | ''>('');
  const [sortBy, setSortBy] = useState<'username' | 'email' | 'createdAt'>('username');
  const [direction, setDirection] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const { data, isLoading } = useGetUsersQuery({
    page,
    size: 10,
    search,
    role: roleFilter || undefined,
    provider: providerFilter || undefined,
    sortBy,
    direction,
  });

  const users = data?.data?.content || [];
  const totalPages = data?.data?.totalPages || 0;

  const handleSort = (field: 'username' | 'email' | 'createdAt') => {
    if (sortBy === field) {
      setDirection(direction === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setDirection('asc');
    }
  };

  const SortIcon = ({ field }: { field: string }) => {
    if (sortBy !== field) return null;
    return direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>

      {/* Search & Filters */}
      <div className="bg-white p-4 rounded-xl shadow mb-6 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search username or email..."
            className="w-full border rounded-lg pl-10 py-2"
          />
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-4 py-2 bg-gray-100 rounded-lg"
        >
          Filters
        </button>
      </div>

      {showFilters && (
        <div className="grid grid-cols-2 gap-4 mb-6">
          <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value as any)} className="border p-2 rounded">
            <option value="">All Roles</option>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>

          <select value={providerFilter} onChange={(e) => setProviderFilter(e.target.value as any)} className="border p-2 rounded">
            <option value="">All Providers</option>
            <option value="GOOGLE">Google</option>
            <option value="NORMAL">Normal</option>
          </select>
        </div>
      )}

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th onClick={() => handleSort('username')} className="p-4 cursor-pointer">
                User <SortIcon field="username" />
              </th>
              <th onClick={() => handleSort('email')} className="p-4 cursor-pointer">
                Email <SortIcon field="email" />
              </th>
              <th className="p-4">Role</th>
              <th className="p-4">Provider</th>
              <th onClick={() => handleSort('createdAt')} className="p-4 cursor-pointer">
                Created <SortIcon field="createdAt" />
              </th>
            </tr>
          </thead>

          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={5} className="p-4 text-center">Loading...</td>
              </tr>
            )}

            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="p-4">{user.username}</td>
                <td className="p-4 flex items-center gap-2">
                  <Mail size={14} /> {user.email}
                </td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded text-xs ${
                    user.role === 'ADMIN' ? 'bg-purple-200' : 'bg-blue-200'
                  }`}>
                    <Shield size={12} /> {user.role}
                  </span>
                </td>
                <td className="p-4">
                  <span className="px-3 py-1 rounded bg-gray-200 text-xs">
                    <Globe size={12} /> {user.provider}
                  </span>
                </td>
                <td className="p-4">
                  <Calendar size={14} /> {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="flex justify-between p-4 border-t">
          <span>Page {page + 1} / {totalPages}</span>
          <div className="flex gap-2">
            <button disabled={page === 0} onClick={() => setPage(page - 1)}>Previous</button>
            <button disabled={page >= totalPages - 1} onClick={() => setPage(page + 1)}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
