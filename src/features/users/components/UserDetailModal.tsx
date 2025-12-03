import React from 'react';
import type { UserResponse } from '../types/user.types';

interface UserDetailModalProps {
  user: UserResponse;
  closeModal: () => void;
}

export const UserDetailModal: React.FC<UserDetailModalProps> = ({ user, closeModal }) => {

    const allergies = user.allergies ?? [];
    const eatingPreferences = user.eatingPreferences ?? [];
    const dietaryPreferences = user.dietaryPreferences ?? [];
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={closeModal}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center gap-4">
            <img
              src={user.avatarUrl || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
              alt={user.username}
              className="w-20 h-20 rounded-full border-4 border-slate-200"
            />
            <div>
              <h2 className="text-2xl font-bold text-slate-800">{user.username}</h2>
              <p className="text-slate-600">{user.email}</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-slate-500">Role</label>
              <p className="text-slate-800 mt-1">{user.role}</p>
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-500">Provider</label>
              <p className="text-slate-800 mt-1">{user.provider}</p>
            </div>
          </div>
        
          {allergies.length > 0 && (
            <div>
              <label className="text-sm font-semibold text-slate-500">Allergies</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {allergies.map((allergy, i) => (
                  <span key={i} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                    {allergy}
                  </span>
                ))}
              </div>
            </div>
          )}

          {eatingPreferences.length > 0 && (
            <div>
              <label className="text-sm font-semibold text-slate-500">Eating Preferences</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {eatingPreferences.map((pref, i) => (
                  <span key={i} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    {pref}
                  </span>
                ))}
              </div>
            </div>
          )}

          {dietaryPreferences.length > 0 && (
            <div>
              <label className="text-sm font-semibold text-slate-500">Dietary Preferences</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {dietaryPreferences.map((pref, i) => (
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
            onClick={closeModal}
            className="px-6 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
