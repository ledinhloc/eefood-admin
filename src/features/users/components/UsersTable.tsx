import React from 'react';
import { Mail, Calendar, Globe, Shield, ChevronUp, ChevronDown, RefreshCw, Pencil, Trash2 } from 'lucide-react';
import type { UserResponse } from '../types/user.types';

interface UsersTableProps {
    users: UserResponse[];
    setSelectedUser: (user: UserResponse) => void;
    sortBy: string;
    direction: 'asc' | 'desc';
    handleSort: (field: 'username' | 'email' | 'createdAt') => void;
    handleOpenEdit: (user: UserResponse) => void;
    handleDeleteUser: (id: number) => void;
    updateRoleUser: (user: { id: number; role: 'USER' | 'ADMIN' }) => void;
}

export const UsersTable: React.FC<UsersTableProps> = ({
    users,
    setSelectedUser,
    sortBy,
    direction,
    handleSort,
    handleOpenEdit,
    handleDeleteUser,
    updateRoleUser
}) => {
    const SortIcon = ({ field }: { field: string }) => {
        if (sortBy !== field) return null;
        return direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
    };

    return (
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
                                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                                            }`}
                                    >
                                        <Shield className="w-3 h-3" />
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${user.provider === 'GOOGLE' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'
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
                                    <div className="flex items-center gap-2">
                                        {/* Edit Button - Màu cam nhẹ nhàng như món ăn */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleOpenEdit(user);
                                            }}
                                            className="group relative px-4 py-2 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2"
                                            title="Edit user"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            <span className="text-sm">Edit</span>
                                        </button>

                                        {/* Toggle Role Button - Màu tím/xanh lam sang trọng */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                updateRoleUser({ id: user.id, role: user.role === 'USER' ? 'ADMIN' : 'USER' });
                                            }}
                                            className="group relative px-4 py-2 bg-gradient-to-r from-indigo-400 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 text-white rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2"
                                            title={`Change to ${user.role === 'USER' ? 'Admin' : 'User'}`}
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                            </svg>
                                            <span className="text-sm">Role</span>
                                        </button>

                                        {/* Delete Button - Màu đỏ cảnh báo */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteUser(user.id);
                                            }}
                                            className="group relative px-4 py-2 bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2"
                                            title="Delete user"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            <span className="text-sm">Delete</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
