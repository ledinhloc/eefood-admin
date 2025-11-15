import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAppDispatch, useAppSelector } from '@/core/store/store';
import { type Gender } from '@/features/auth/types/auth.types.ts';
import { normalizeGender } from '@/utils/normalizeGender.ts';
import { uploadToCloudinary } from '@/utils/uploadMedia.ts';
import validateAge from '@/utils/validate.ts';
import { Calendar, Camera, Mail, User } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Oval } from 'react-loader-spinner';
import { toast } from 'sonner';
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from '../services/authApi';
import { setError, setLoading, setUser } from '../slices/authSlice';

const ProfileForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, isLoading, error } = useAppSelector((state) => state.auth);
  const { data: profileData, refetch, isFetching } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  // QUAN TRỌNG: Khởi tạo formData với null và chỉ set khi có dữ liệu
  const [formData, setFormData] = useState<{
    id: number | null;
    username: string;
    gender: Gender;
    dob: string;
    email: string;
    address: { city: string; street: string };
    avatarUrl: string;
  } | null>(null);

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    dob: '',
    gender: '',
  });

  useEffect(() => {
    if (profileData?.data && !formData) {
      const userData = profileData.data;
      console.log('Backend gender:', userData.gender);
      console.log('Normalized gender:', normalizeGender(userData.gender));

      setFormData({
        id: userData.id,
        username: userData.username || '',
        gender: normalizeGender(userData.gender),
        dob: userData.dob
          ? new Date(userData.dob).toISOString().split('T')[0]
          : '',
        email: userData.email || '',
        address: {
          city: userData.address?.city || '',
          street: userData.address?.street || '',
        },
        avatarUrl: userData.avatarUrl || '',
      });
    }
  }, [profileData, formData]);

  useEffect(() => {
    return () => {
      setFormData(null);
    };
  }, []);

  // Show error toast
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(setError(null));
    }
  }, [error, dispatch]);

  // Form validation
  const validateForm = () => {
    if (!formData) return false;

    const newErrors = { username: '', email: '', dob: '', gender: '' };
    let isValid = true;

    if (!formData.username) {
      newErrors.username = 'Please enter your full name';
      isValid = false;
    } else if (formData.username.length < 2) {
      newErrors.username = 'Full name must be at least 2 characters';
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email';
      isValid = false;
    }

    if (!formData.gender) {
      newErrors.gender = 'Please select your gender';
      isValid = false;
    }
    if (!formData.dob) {
      newErrors.dob = 'Please select your date of birth';
      isValid = false;
    } else if (!validateAge(formData.dob)) {
      newErrors.dob = 'You must be at least 18 years old';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Input change handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;

    const { name, value } = e.target;

    if (name === 'city' || name === 'street') {
      setFormData((prev) => ({
        ...prev!,
        address: {
          ...prev!.address,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev!,
        [name]: value,
      }));
    }

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Select gender change
  const handleSelectChange = (value: 'MALE' | 'FEMALE' | 'OTHER') => {
    if (!formData) return;

    console.log('Gender selected:', value);
    setFormData((prev) => ({ ...prev!, gender: value }));
  };

  // Submit handler
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData || !validateForm()) return;

    if (!formData.id) {
      toast.error('User ID is missing');
      return;
    }

    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const profileUpdateData = {
        id: formData.id,
        username: formData.username,
        gender: formData.gender,
        dob: formData.dob || undefined,
        address: {
          city: formData.address.city || '',
          street: formData.address.street || '',
        },
        avatarUrl: formData.avatarUrl || undefined,
      };

      console.log('Updating with gender:', profileUpdateData.gender);

      const result = await updateProfile(profileUpdateData).unwrap();

      if (result.data) {
        dispatch(setUser(result.data));
        console.log('Update result:', result.data);
        toast.success('Profile updated successfully!');
        // refetch();
      }
    } catch (error: unknown) {
      const errorMessage =
        (error as { data?: { message?: string } })?.data?.message ||
        'Profile update failed. Please try again.';
      dispatch(setError(errorMessage));
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="relative">
      {(isFetching || !formData) && (
        <div className="absolute inset-0 bg-white/70 z-50 flex items-center justify-center backdrop-blur-[2px]">
          <Oval
            height={50}
            width={50}
            color="#4f46e5"
            secondaryColor="#e0e7ff"
            strokeWidth={6}
          />
        </div>
      )}
      <Card className="w-full shadow-xl border-0">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Personal Information
          </CardTitle>
          <CardDescription className="text-gray-600">
            Manage your profile information and preferences
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img
                src={
                  formData?.avatarUrl ||
                  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=face'
                }
                alt="Profile Avatar"
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <input
                type="file"
                id="avatarInput"
                accept="image/*"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  try {
                    toast.info('Uploading image...');

                    const uploadedUrl = await uploadToCloudinary(file, 'image');

                    setFormData((prev) => ({
                      ...prev!,
                      avatarUrl: uploadedUrl,
                    }));

                    toast.success('Upload successful!');
                  } catch (err) {
                    toast.error('Upload failed!');
                    console.error(err);
                  }
                }}
              />
              <button
                type="button"
                onClick={() => document.getElementById('avatarInput')?.click()}
                className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 shadow-lg transition-colors"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            {/* Full Name */}
            <div className="md:col-span-2">
              <Label htmlFor="username">Full Name</Label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="username"
                  name="username"
                  type="text"
                  value={formData?.username}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              {errors.username && (
                <p className="text-sm text-red-500 mt-1">{errors.username}</p>
              )}
            </div>

            {/* Email */}
            <div className="md:col-span-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData?.email}
                  onChange={handleInputChange}
                  className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Gender */}
            <div>
              <Label htmlFor="gender">Gender</Label>
              <Select
                key={formData?.gender}
                value={formData?.gender}
                onValueChange={handleSelectChange}
              >
                <SelectTrigger className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 mt-1">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && (
                <p className="text-sm text-red-500 mt-1">{errors.gender}</p>
              )}
            </div>

            {/* DOB */}
            <div>
              <Label htmlFor="dob">Date of Birth</Label>
              <div className="relative mt-1">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="dob"
                  name="dob"
                  type="date"
                  value={formData?.dob}
                  onChange={handleInputChange}
                  className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              {errors.dob && (
                <p className="text-sm text-red-500 mt-1">{errors.dob}</p>
              )}
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <Label>Address</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <Input
                  id="city"
                  name="city"
                  type="text"
                  placeholder="City"
                  value={formData?.address.city}
                  onChange={handleInputChange}
                />
                <Input
                  id="street"
                  name="street"
                  type="text"
                  placeholder="Street"
                  value={formData?.address.street}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Submit */}
            <div className="md:col-span-2 pt-4">
              <Button
                type="submit"
                disabled={isLoading || isUpdating}
                className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
              >
                {isLoading || isUpdating ? (
                  <div className="flex items-center gap-2">
                    <Oval
                      height={20}
                      width={20}
                      color="#ffffff"
                      secondaryColor="#e0e0e0"
                      strokeWidth={5}
                      strokeWidthSecondary={5}
                      visible={true}
                      ariaLabel="loading"
                    />
                    <span>Updating...</span>
                  </div>
                ) : (
                  'Update Information'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileForm;
