import { Pagination } from '@/features/users/components/Pagination';
import { SearchFilterCard } from '@/features/users/components/SearchFilterCard';
import { UserDetailModal } from '@/features/users/components/UserDetailModal';
import UserFormModal from '@/features/users/components/UserFormModal';
import { UsersTable } from '@/features/users/components/UsersTable';
import {
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateRoleUserMutation,
  useUpdateUserMutation,
} from '@/features/users/services/userApi';
import type { UserResponse } from '@/features/users/types/user.types';
import { UserPlus, Users } from 'lucide-react';
import { useState } from 'react';

export default function UserPage() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<'USER' | 'ADMIN' | ''>('');
  const [providerFilter, setProviderFilter] = useState<
    'GOOGLE' | 'NORMAL' | ''
  >('');
  const [sortBy, setSortBy] = useState<'username' | 'email' | 'createdAt'>(
    'username'
  );
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
  };

  const handleOpenEdit = (user: UserResponse) => {
    setEditingUser(user);
    setIsFormOpen(true);
  };

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
  };

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Modern Header with gradient */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 shadow-2xl">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-3xl font-bold text-white mb-1">
                  User Management
                </h1>
                <p className="text-blue-100 text-sm sm:text-base">
                  Manage your food social network users
                </p>
              </div>
            </div>

            {/* Create User Button in Header */}
            <button
              onClick={handleOpenCreate}
              className="hidden sm:flex items-center gap-2 px-5 py-3 bg-white text-indigo-700 rounded-xl hover:bg-indigo-50 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl hover:scale-105"
            >
              <UserPlus className="w-5 h-5" />
              Create User
            </button>
          </div>
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
        </div>

        {/* Mobile Create Button */}
        <div className="sm:hidden flex justify-end">
          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg"
          >
            <UserPlus className="w-5 h-5" />
            Create User
          </button>
        </div>

        {/* Search and Filters */}
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

        {/* Users Table */}
        <UsersTable
          users={users}
          setSelectedUser={setSelectedUser}
          sortBy={sortBy}
          direction={direction}
          handleSort={handleSort}
          handleDeleteUser={handleDeleteUser}
          handleOpenEdit={handleOpenEdit}
          updateRoleUser={updateRoleUser}
        />

        {/* Pagination */}
        <Pagination
          page={page}
          totalPages={totalPages}
          setPage={setPage}
          usersCount={users.length}
        />

        {/* Modals */}
        {isFormOpen && (
          <UserFormModal
            isOpen={isFormOpen}
            user={editingUser ?? undefined}
            onClose={() => setIsFormOpen(false)}
            onSubmit={handleSubmitForm}
          />
        )}

        {selectedUser && (
          <UserDetailModal
            user={selectedUser}
            closeModal={() => setSelectedUser(null)}
          />
        )}
      </div>
    </div>
  );
}
