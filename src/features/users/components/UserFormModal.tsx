import React, { useState, useEffect } from 'react';
import type { UserResponse } from '../types/user.types';
import type { UserCreateRequest, UserUpdateRequest } from '../types/user.types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UserCreateRequest | UserUpdateRequest) => void;
  user?: UserResponse; // nếu update thì truyền user vào
}

export default function UserFormModal({ isOpen, onClose, onSubmit, user }: Props) {
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [role, setRole] = useState<'USER' | 'ADMIN'>(user?.role || 'USER');
  const [dob, setDob] = useState(user?.dob || '');
  const [gender, setGender] = useState<'MALE' | 'FEMALE' | 'OTHER'>(user?.gender || 'MALE');
  const [city, setCity] = useState(user?.address?.city || '');
  const [street, setStreet] = useState(user?.address?.street || '');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || '');
  const [allergies, setAllergies] = useState(user?.allergies?.join(',') || '');
  const [eatingPreferences, setEatingPreferences] = useState(user?.eatingPreferences?.join(',') || '');
  const [password, setPassword] = useState('');

  // Đồng bộ khi user thay đổi
  useEffect(() => {
    setUsername(user?.username || '');
    setEmail(user?.email || '');
    setRole(user?.role || 'USER');
    setDob(user?.dob || '');
    setGender(user?.gender || 'MALE');
    setCity(user?.address?.city || '');
    setStreet(user?.address?.street || '');
    setAvatarUrl(user?.avatarUrl || '');
    setAllergies(user?.allergies?.join(',') || '');
    setEatingPreferences(user?.eatingPreferences?.join(',') || '');
  }, [user]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    const payload = user
      ? {
          id: user.id,
          username,
          email,
          role,
          dob,
          gender,
          address: { city, street },
          avatarUrl,
          allergies: allergies.split(',').map((s) => s.trim()),
          eatingPreferences: eatingPreferences.split(',').map((s) => s.trim()),
        } as UserUpdateRequest
      : {
          username,
          email,
          role,
          dob,
          gender,
          address: { city, street },
          provider: 'NORMAL', // mặc định LOCAL
          avatarUrl,
          password,
          allergies: allergies.split(',').map((s) => s.trim()),
          eatingPreferences: eatingPreferences.split(',').map((s) => s.trim()),
        } as UserCreateRequest;

    onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-bold mb-4">{user ? 'Update User' : 'Create User'}</h2>

        <input
          className="w-full mb-3 px-3 py-2 border rounded-lg"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="w-full mb-3 px-3 py-2 border rounded-lg"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {!user && (
          <input
            className="w-full mb-3 px-3 py-2 border rounded-lg bg-gray-100"
            value="NORMAL"
            disabled
          />
        )}

        {user && (
          <input
            className="w-full mb-3 px-3 py-2 border rounded-lg bg-gray-100"
            value={user.provider}
            disabled
          />
        )}

        {!user && (
          <select
            className="w-full mb-3 px-3 py-2 border rounded-lg"
            value={role}
            onChange={(e) => setRole(e.target.value as 'USER' | 'ADMIN')}
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
        )}

        <input
          className="w-full mb-3 px-3 py-2 border rounded-lg"
          type="date"
          placeholder="Date of Birth"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />

        <select
          className="w-full mb-3 px-3 py-2 border rounded-lg"
          value={gender}
          onChange={(e) => setGender(e.target.value as 'MALE' | 'FEMALE' | 'OTHER')}
        >
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="OTHER">Other</option>
        </select>

        {/* Address */}
        <input
          className="w-full mb-3 px-3 py-2 border rounded-lg"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          className="w-full mb-3 px-3 py-2 border rounded-lg"
          placeholder="Street"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />

        <input
          className="w-full mb-3 px-3 py-2 border rounded-lg"
          placeholder="Avatar URL"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
        />

        {!user && (
          <input
            className="w-full mb-3 px-3 py-2 border rounded-lg"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        )}

        <input
          className="w-full mb-3 px-3 py-2 border rounded-lg"
          placeholder="Allergies (comma separated)"
          value={allergies}
          onChange={(e) => setAllergies(e.target.value)}
        />

        <input
          className="w-full mb-3 px-3 py-2 border rounded-lg"
          placeholder="Eating Preferences (comma separated)"
          value={eatingPreferences}
          onChange={(e) => setEatingPreferences(e.target.value)}
        />

        <div className="flex justify-end gap-3 mt-4">
          <button className="px-4 py-2 bg-gray-200 rounded-lg" onClick={onClose}>
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={handleSubmit}>
            {user ? 'Update' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  );
}
