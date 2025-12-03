import { Pagination } from '@/features/users/components/Pagination';
import { SearchFilterCard } from '@/features/users/components/SearchFilterCard';
import { UserDetailModal } from '@/features/users/components/UserDetailModal';
import UserFormModal from '@/features/users/components/UserFormModal';
import { UsersTable } from '@/features/users/components/UsersTable';
import { useCreateUserMutation, useDeleteUserMutation, useGetUsersQuery, useUpdateRoleUserMutation, useUpdateUserMutation } from '@/features/users/services/userApi';
import type { UserResponse } from '@/features/users/types/user.types';
import { tr } from 'date-fns/locale';
import React, { useState } from 'react';

export default function UserPage() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<'USER' | 'ADMIN' | ''>('');
  const [providerFilter, setProviderFilter] = useState<'GOOGLE' | 'NORMAL' | ''>('');
  const [sortBy, setSortBy] = useState<'username' | 'email' | 'createdAt'>('username');
  const [direction, setDirection] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserResponse | null>(null);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserResponse | null>(null);

  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [updateRoleUser] = useUpdateRoleUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const handleOpenCreate = () => {
    setEditingUser(null);
    setIsFormOpen(true);
  }

  const handleOpenEdit = (user: UserResponse) => {
    setEditingUser(user);
    setIsFormOpen(true);
  }

  const handleSubmitForm = async (data: any) => {
    try {
      if (editingUser) {
        await updateUser(data).unwrap();
      } else {
        await createUser(data).unwrap();
      }
      setIsFormOpen(false);
    } catch (err) {
      console.error(err);
    }
  }

  const handleDeleteUser = async (id: number) => {
    if (window.confirm('Are you sure to delete this user?')) {
      await deleteUser(id);
    }
  };

  const { data } = useGetUsersQuery({
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">User Management</h1>
          <p className="text-slate-600">Manage your food social network users</p>
        </div>

        <SearchFilterCard
          search={search}
          setSearch={setSearch}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
          providerFilter={providerFilter}
          setProviderFilter={setProviderFilter}
        />

        {/* Button Create User */}
        <div className="flex justify-end mb-4">
          <button
            onClick={handleOpenCreate}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Create User
          </button>
        </div>

        <UsersTable
          users={users}
          setSelectedUser={setSelectedUser}
          sortBy={sortBy}
          direction={direction}
          handleSort={handleSort}
          handleDeleteUser={handleDeleteUser}
          handleOpenEdit={handleOpenEdit}
          updateRoleUser={(user) =>
            updateRoleUser({ id: user.id, role: user.role === 'USER' ? 'ADMIN' : 'USER' })
          }
        />

        <Pagination page={page} totalPages={totalPages} setPage={setPage} usersCount={users.length} />
        {isFormOpen && (
          <UserFormModal
            isOpen={isFormOpen}
            user={editingUser ?? undefined}
            onClose={() => setIsFormOpen(false)}
            onSubmit={handleSubmitForm}
          />
        )}

        {selectedUser && <UserDetailModal user={selectedUser} closeModal={() => setSelectedUser(null)} />}
      </div>

    </div>
  );
}
