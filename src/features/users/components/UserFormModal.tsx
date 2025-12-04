import React, { useState, useEffect } from 'react';
import type { UserResponse } from '../types/user.types';
import type { UserCreateRequest, UserUpdateRequest } from '../types/user.types';
import { uploadToCloudinary } from '@/utils/uploadMedia';

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
  const [avatarFile, setAvatarFile] = useState<File | null>(null); // file mới
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
    setAvatarFile(null);
  }, [user]);

  if (!isOpen) return null;

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarUrl(URL.createObjectURL(file)); // preview ảnh
    }
  };

  const handleSubmit = async () => {
    let finalAvatarUrl = avatarUrl;
    if (avatarFile) {
      try {
        finalAvatarUrl = await uploadToCloudinary(avatarFile, 'image');
      } catch (err) {
        console.error('Upload avatar failed:', err);
        alert('Failed to upload avatar');
        return;
      }
    }

    const payload = user
      ? {
          id: user.id,
          username,
          email,
          role,
          dob,
          gender,
          address: { city, street },
          avatarUrl: finalAvatarUrl,
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
          avatarUrl: finalAvatarUrl,
          password,
          allergies: allergies.split(',').map((s) => s.trim()),
          eatingPreferences: eatingPreferences.split(',').map((s) => s.trim()),
        } as UserCreateRequest;

        // console.log("------payload:     "+payload.username);
    // console.log({ username, email, role, dob, gender, city, street, password, allergies, eatingPreferences, avatarUrl });

    onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-bold mb-4">{user ? 'Update User' : 'Create User'}</h2>

        {/* Avatar */}
        <div className="mb-3 flex items-center gap-4">
          <img
            src={avatarUrl || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
            alt="Avatar"
            className="w-16 h-16 rounded-full border"
          />
          <input type="file" accept="image/*" onChange={handleAvatarChange} />
        </div>

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

        {/* Provider */}
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