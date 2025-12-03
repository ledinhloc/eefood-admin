import React from 'react';
import { Mail, Calendar, Globe, Shield, ChevronUp, ChevronDown } from 'lucide-react';
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
                                <td className="px-6 py-4 flex gap-2">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleOpenEdit(user); }}
                                        className="px-2 py-1 bg-yellow-400 text-white rounded"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleDeleteUser(user.id); }}
                                        className="px-2 py-1 bg-red-500 text-white rounded"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); updateRoleUser({ id: user.id, role: user.role === 'USER' ? 'ADMIN' : 'USER' }); }}
                                        className="px-2 py-1 bg-purple-500 text-white rounded"
                                    >
                                        Toggle Role
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
