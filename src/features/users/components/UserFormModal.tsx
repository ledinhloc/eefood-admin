import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Upload, User, Mail, Calendar, MapPin, Lock } from 'lucide-react';
import type { UserCreateRequest, UserResponse, UserUpdateRequest } from '../types/user.types';



interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UserCreateRequest | UserUpdateRequest) => void;
  user?: UserResponse;
}

// Mock upload function
const uploadToCloudinary = async (file: File, type: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(URL.createObjectURL(file));
    }, 1000);
  });
};

export default function UserFormModal({ isOpen, onClose, onSubmit, user }: Props) {
  // Basic Info
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [role, setRole] = useState<'USER' | 'ADMIN'>(user?.role || 'USER');
  const [dob, setDob] = useState(user?.dob || '');
  const [gender, setGender] = useState<'MALE' | 'FEMALE' | 'OTHER'>(user?.gender || 'MALE');
  const [password, setPassword] = useState('');
  
  // Address
  const [city, setCity] = useState(user?.address?.city || '');
  const [street, setStreet] = useState(user?.address?.street || '');
  
  // Avatar
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || '');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  
  // Lists - now as arrays
  const [allergies, setAllergies] = useState<string[]>(user?.allergies || []);
  const [eatingPreferences, setEatingPreferences] = useState<string[]>(user?.eatingPreferences || []);
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>(user?.dietaryPreferences || []);
  
  // Temporary input for new items
  const [newAllergy, setNewAllergy] = useState('');
  const [newEatingPref, setNewEatingPref] = useState('');
  const [newDietaryPref, setNewDietaryPref] = useState('');

  useEffect(() => {
    if (user) {
      setUsername(user.username || '');
      setEmail(user.email || '');
      setRole(user.role || 'USER');
      setDob(user.dob || '');
      setGender(user.gender || 'MALE');
      setCity(user.address?.city || '');
      setStreet(user.address?.street || '');
      setAvatarUrl(user.avatarUrl || '');
      setAllergies(user.allergies || []);
      setEatingPreferences(user.eatingPreferences || []);
      setDietaryPreferences(user.dietaryPreferences || []);
      setAvatarFile(null);
    }
  }, [user]);

  if (!isOpen) return null;

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarUrl(URL.createObjectURL(file));
    }
  };

  // List handlers
  const addAllergy = () => {
    if (newAllergy.trim()) {
      setAllergies([...allergies, newAllergy.trim()]);
      setNewAllergy('');
    }
  };

  const removeAllergy = (index: number) => {
    setAllergies(allergies.filter((_, i) => i !== index));
  };

  const addEatingPref = () => {
    if (newEatingPref.trim()) {
      setEatingPreferences([...eatingPreferences, newEatingPref.trim()]);
      setNewEatingPref('');
    }
  };

  const removeEatingPref = (index: number) => {
    setEatingPreferences(eatingPreferences.filter((_, i) => i !== index));
  };

  const addDietaryPref = () => {
    if (newDietaryPref.trim()) {
      setDietaryPreferences([...dietaryPreferences, newDietaryPref.trim()]);
      setNewDietaryPref('');
    }
  };

  const removeDietaryPref = (index: number) => {
    setDietaryPreferences(dietaryPreferences.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    let finalAvatarUrl = avatarUrl;
    
    if (avatarFile) {
      try {
        setUploading(true);
        finalAvatarUrl = await uploadToCloudinary(avatarFile, 'image');
      } catch (err) {
        console.error('Upload avatar failed:', err);
        alert('Failed to upload avatar');
        return;
      } finally {
        setUploading(false);
      }
    }

    const payload = user
      ? {
          id: user.id,
          username,
          email,
          dob,
          gender,
          address: { city, street },
          avatarUrl: finalAvatarUrl,
          allergies,
          eatingPreferences,
          dietaryPreferences,
        } as UserUpdateRequest
      : {
          username,
          email,
          role,
          dob,
          gender,
          address: { city, street },
          provider: 'NORMAL',
          avatarUrl: finalAvatarUrl,
          password,
          allergies,
          eatingPreferences,
          dietaryPreferences,
        } as UserCreateRequest;

    onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <User className="w-6 h-6" />
            {user ? 'Update User Profile' : 'Create New User'}
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-5">
              {/* Avatar Section */}
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-5 border border-orange-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Profile Picture
                </h3>
                <div className="flex items-center gap-4">
                  <img
                    src={avatarUrl || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
                    alt="Avatar"
                    className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
                  />
                  <label className="cursor-pointer bg-white hover:bg-orange-50 text-orange-600 px-4 py-2 rounded-lg border-2 border-orange-200 transition-colors text-sm font-medium">
                    Change Photo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Basic Info */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <User className="w-4 h-4 text-orange-500" />
                    Username
                  </label>
                  <input
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-orange-500" />
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {!user && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role
                    </label>
                    <select
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none bg-white"
                      value={role}
                      onChange={(e) => setRole(e.target.value as 'USER' | 'ADMIN')}
                    >
                      <option value="USER">User</option>
                      <option value="ADMIN">Admin</option>
                    </select>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-orange-500" />
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender
                    </label>
                    <select
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none bg-white"
                      value={gender}
                      onChange={(e) => setGender(e.target.value as 'MALE' | 'FEMALE' | 'OTHER')}
                    >
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>
                </div>

                {!user && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Lock className="w-4 h-4 text-orange-500" />
                      Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                )}
              </div>

              {/* Address */}
              <div className="bg-blue-50 rounded-2xl p-5 border border-blue-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  Address
                </h3>
                <div className="space-y-3">
                  <input
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none bg-white"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <input
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none bg-white"
                    placeholder="Street"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Preferences */}
            <div className="space-y-5">
              {/* Allergies */}
              <div className="bg-red-50 rounded-2xl p-5 border border-red-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  🚫 Allergies
                </h3>
                <div className="flex gap-2 mb-3">
                  <input
                    className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all outline-none bg-white text-sm"
                    placeholder="Add allergy (e.g., Peanuts)"
                    value={newAllergy}
                    onChange={(e) => setNewAllergy(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addAllergy()}
                  />
                  <button
                    onClick={addAllergy}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {allergies.map((allergy, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-red-200"
                    >
                      <span className="text-sm text-gray-700">{allergy}</span>
                      <button
                        onClick={() => removeAllergy(index)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Eating Preferences */}
              <div className="bg-green-50 rounded-2xl p-5 border border-green-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  🍽️ Eating Preferences
                </h3>
                <div className="flex gap-2 mb-3">
                  <input
                    className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none bg-white text-sm"
                    placeholder="Add preference (e.g., Spicy food)"
                    value={newEatingPref}
                    onChange={(e) => setNewEatingPref(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addEatingPref()}
                  />
                  <button
                    onClick={addEatingPref}
                    className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {eatingPreferences.map((pref, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-green-200"
                    >
                      <span className="text-sm text-gray-700">{pref}</span>
                      <button
                        onClick={() => removeEatingPref(index)}
                        className="text-green-600 hover:text-green-800 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dietary Preferences */}
              <div className="bg-purple-50 rounded-2xl p-5 border border-purple-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  🥗 Dietary Preferences
                </h3>
                <div className="flex gap-2 mb-3">
                  <input
                    className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none bg-white text-sm"
                    placeholder="Add diet (e.g., Vegetarian)"
                    value={newDietaryPref}
                    onChange={(e) => setNewDietaryPref(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addDietaryPref()}
                  />
                  <button
                    onClick={addDietaryPref}
                    className="bg-purple-500 hover:bg-purple-600 text-white p-2 rounded-lg transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {dietaryPreferences.map((pref, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-purple-200"
                    >
                      <span className="text-sm text-gray-700">{pref}</span>
                      <button
                        onClick={() => removeDietaryPref(index)}
                        className="text-purple-600 hover:text-purple-800 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Provider Info */}
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                <label className="block text-xs font-medium text-gray-500 mb-2">
                  Provider
                </label>
                <div className="text-sm font-semibold text-gray-700">
                  {user?.provider || 'NORMAL'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-white hover:bg-gray-100 text-gray-700 rounded-xl border-2 border-gray-200 font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={uploading}
            className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl font-medium shadow-lg shadow-orange-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? 'Uploading...' : user ? 'Update User' : 'Create User'}
          </button>
        </div>
      </div>
    </div>
  );
}