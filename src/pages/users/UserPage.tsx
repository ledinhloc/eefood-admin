import React, { useState } from 'react';
import { Search, Filter, ChevronDown, ChevronUp, Mail, Calendar, Globe, Shield } from 'lucide-react';
import { useGetUsersQuery } from '@/features/users/services/userApi';
import type { UserResponse } from '@/features/users/types/user.types';

export default function UserPage() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<'USER' | 'ADMIN' | ''>('');
  const [providerFilter, setProviderFilter] = useState<'GOOGLE' | 'NORMAL' | ''>('');
  const [sortBy, setSortBy] = useState<'username' | 'email' | 'createdAt'>('username');
  const [direction, setDirection] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserResponse | null>(null);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">User Management</h1>
          <p className="text-slate-600">Manage your food social network users</p>
        </div>

        {/* Search and Filters Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-slate-200">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
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

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors font-medium text-slate-700"
            >
              <Filter className="w-5 h-5" />
              Filters
              {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-200">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Role</label>
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value as any)}
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
                  onChange={(e) => setProviderFilter(e.target.value as any)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Providers</option>
                  <option value="GOOGLE">Google</option>
                  <option value="NORMAL">Normal</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort('username')}
                      className="flex items-center gap-2 font-semibold text-slate-700 hover:text-blue-600 transition-colors"
                    >
                      User
                      <SortIcon field="username" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort('email')}
                      className="flex items-center gap-2 font-semibold text-slate-700 hover:text-blue-600 transition-colors"
                    >
                      Email
                      <SortIcon field="email" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <span className="font-semibold text-slate-700">Role</span>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <span className="font-semibold text-slate-700">Provider</span>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort('createdAt')}
                      className="flex items-center gap-2 font-semibold text-slate-700 hover:text-blue-600 transition-colors"
                    >
                      Created At
                      <SortIcon field="createdAt" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <span className="font-semibold text-slate-700">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-slate-50 transition-colors cursor-pointer"
                    onClick={() => setSelectedUser(user)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatarUrl || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
                          alt={user.username}
                          className="w-10 h-10 rounded-full border-2 border-slate-200"
                        />
                        <div>
                          <div className="font-semibold text-slate-800">{user.username}</div>
                          <div className="text-sm text-slate-500">ID: {user.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-700">
                        <Mail className="w-4 h-4 text-slate-400" />
                        {user.email}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${user.role === 'ADMIN'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-blue-100 text-blue-700'
                          }`}
                      >
                        <Shield className="w-3 h-3" />
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${user.provider === 'GOOGLE'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-slate-100 text-slate-700'
                          }`}
                      >
                        <Globe className="w-3 h-3" />
                        {user.provider}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span className="text-sm">
                          {user.createdAt
                            ? new Date(user.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })
                            : 'N/A'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm font-medium">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-slate-200 bg-slate-50">
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-600">
                Showing <span className="font-semibold">{users.length}</span> users
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage(Math.max(0, page - 1))}
                  disabled={page === 0}
                  className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>

                <span className="px-4 py-2 text-slate-700">
                  Page {page + 1} of {totalPages}
                </span>

                <button
                  onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
                  disabled={page >= totalPages - 1}
                  className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* User Detail Modal */}
        {selectedUser && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedUser(null)}
          >
            <div
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedUser.avatarUrl || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
                    alt={selectedUser.username}
                    className="w-20 h-20 rounded-full border-4 border-slate-200"
                  />
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">{selectedUser.username}</h2>
                    <p className="text-slate-600">{selectedUser.email}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-slate-500">Role</label>
                    <p className="text-slate-800 mt-1">{selectedUser.role}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-500">Provider</label>
                    <p className="text-slate-800 mt-1">{selectedUser.provider}</p>
                  </div>
                </div>

                {selectedUser.allergies && selectedUser.allergies.length > 0 && (
                  <div>
                    <label className="text-sm font-semibold text-slate-500">Allergies</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedUser.allergies.map((allergy, i) => (
                        <span key={i} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                          {allergy}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedUser.eatingPreferences && selectedUser.eatingPreferences.length > 0 && (
                  <div>
                    <label className="text-sm font-semibold text-slate-500">Eating Preferences</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedUser.eatingPreferences.map((pref, i) => (
                        <span key={i} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                          {pref}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedUser.dietaryPreferences && selectedUser.dietaryPreferences.length > 0 && (
                  <div>
                    <label className="text-sm font-semibold text-slate-500">Dietary Preferences</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedUser.dietaryPreferences.map((pref, i) => (
                        <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                          {pref}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-slate-200 flex justify-end">
                <button
                  onClick={() => setSelectedUser(null)}
                  className="px-6 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
