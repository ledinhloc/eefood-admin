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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useSendNotificationMutation } from '@/features/notifications/services/notificationApi.ts';
import type { NotificationRequest } from '@/features/notifications/types/noti.types';
import {
  Bell,
  Image,
  Link2,
  MessageSquare,
  Send,
  Sparkles,
  Trash2,
  User,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function NotificationPage() {
  const [sendNotification, { isLoading }] = useSendNotificationMutation();

  const [formData, setFormData] = useState<NotificationRequest>({
    title: '',
    body: '',
    type: 'SYSTEM',
    path: '',
    avatarUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpWRmsQrEDgAe7vz-uJobkzfOPCmDQo1imtA&s',
    postImageUrl: '',
    userId: undefined,
  });

  const [sendToAll, setSendToAll] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const notificationTypes = [
    'SYSTEM',
    'REACTION',
    'COMMENT',
    'FOLLOW',
    'SHARE_RECIPE',
    'SAVE_RECIPE',
    'WELCOME',
    'RECOMMEND_RECIPE',
    'REPORT',
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.body.trim()) {
      newErrors.body = 'Message is required';
    }

    if (!sendToAll && (!formData.userId || formData.userId <= 0)) {
      newErrors.userId = 'Valid User ID is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }

    const payload: NotificationRequest = {
      title: formData.title.trim(),
      body: formData.body.trim(),
      type: formData.type,
      path:
        formData.path && formData.path.trim() !== ''
          ? formData.path.trim()
          : null,
      avatarUrl: formData.avatarUrl || null,
      postImageUrl: formData.postImageUrl || null,
      userId: sendToAll ? null : Number(formData.userId),
    };

    try {
      await sendNotification(payload).unwrap();
      toast.success('Notification sent successfully!', {
        description: sendToAll
          ? 'Sent to all users'
          : `Sent to user ID: ${formData.userId}`,
      });
      handleClear();
    } catch (error: any) {
      console.error('Failed to send notification:', error);
      toast.error('Failed to send notification', {
        description: error?.data?.message || 'An unexpected error occurred',
      });
    }
  };

  const handleClear = () => {
    setFormData({
      title: '',
      body: '',
      type: 'SYSTEM',
      path: '',
      avatarUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpWRmsQrEDgAe7vz-uJobkzfOPCmDQo1imtA&s',
      postImageUrl: '',
      userId: null,
    });
    setSendToAll(true);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-8xl mx-auto space-y-6">
        {/* Header with animated gradient */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 shadow-2xl">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative flex items-center gap-4">
            <div className="p-4 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-3xl font-bold text-white mb-1">
                Notification Center
              </h1>
              <p className="text-indigo-100 text-sm sm:text-base">
                Send beautiful notifications to your users instantly
              </p>
            </div>
          </div>
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
        </div>

        {/* Main Card with modern design */}
        <Card className="shadow-xl border-0 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-indigo-50 border-b border-indigo-100 pb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Sparkles className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <CardTitle className="text-2xl text-slate-900">
                  Create Notification
                </CardTitle>
                <CardDescription className="text-slate-600 mt-1">
                  Craft engaging messages for your audience
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-8 px-6 sm:px-8">
            <div className="space-y-8">
              {/* Recipient Selection - Enhanced */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <User className="w-5 h-5 text-indigo-600" />
                  <Label className="text-base font-semibold text-slate-900">
                    Select Recipients
                  </Label>
                </div>
                <RadioGroup
                  value={sendToAll ? 'all' : 'specific'}
                  onValueChange={(value) => {
                    setSendToAll(value === 'all');
                    if (value === 'all' && errors.userId) {
                      setErrors((prev) => ({ ...prev, userId: '' }));
                    }
                  }}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="relative">
                    <RadioGroupItem
                      value="all"
                      id="all"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="all"
                      className="flex flex-col items-center justify-between rounded-xl border-2 border-slate-200 bg-white p-5 hover:bg-slate-50 peer-data-[state=checked]:border-indigo-600 peer-data-[state=checked]:bg-indigo-50 cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      <Bell className="w-6 h-6 mb-2 text-slate-600 peer-data-[state=checked]:text-indigo-600" />
                      <span className="font-semibold text-slate-900">
                        All Users
                      </span>
                      <span className="text-xs text-slate-500 mt-1">
                        Broadcast message
                      </span>
                    </Label>
                  </div>
                  <div className="relative">
                    <RadioGroupItem
                      value="specific"
                      id="specific"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="specific"
                      className="flex flex-col items-center justify-between rounded-xl border-2 border-slate-200 bg-white p-5 hover:bg-slate-50 peer-data-[state=checked]:border-indigo-600 peer-data-[state=checked]:bg-indigo-50 cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      <User className="w-6 h-6 mb-2 text-slate-600 peer-data-[state=checked]:text-indigo-600" />
                      <span className="font-semibold text-slate-900">
                        Specific User
                      </span>
                      <span className="text-xs text-slate-500 mt-1">
                        Target individual
                      </span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* User ID Input - Enhanced */}
              {!sendToAll && (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                  <Label
                    htmlFor="userId"
                    className="text-sm font-medium text-slate-900"
                  >
                    User ID <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      id="userId"
                      type="number"
                      name="userId"
                      value={formData.userId || ''}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          userId: e.target.value
                            ? Number(e.target.value)
                            : undefined,
                        }));
                        if (errors.userId) {
                          setErrors((prev) => ({ ...prev, userId: '' }));
                        }
                      }}
                      placeholder="Enter user ID"
                      min="1"
                      className={`pl-10 h-11 ${errors.userId ? 'border-red-500 focus-visible:ring-red-500' : 'border-slate-200'}`}
                    />
                  </div>
                  {errors.userId && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                      {errors.userId}
                    </p>
                  )}
                </div>
              )}

              {/* Title - Enhanced */}
              <div className="space-y-2">
                <Label
                  htmlFor="title"
                  className="text-sm font-medium text-slate-900"
                >
                  Notification Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., New Feature Available!"
                  className={`h-11 ${errors.title ? 'border-red-500 focus-visible:ring-red-500' : 'border-slate-200'}`}
                />
                {errors.title && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                    {errors.title}
                  </p>
                )}
              </div>

              {/* Body - Enhanced */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-1">
                  <MessageSquare className="w-4 h-4 text-indigo-600" />
                  <Label
                    htmlFor="body"
                    className="text-sm font-medium text-slate-900"
                  >
                    Message Content <span className="text-red-500">*</span>
                  </Label>
                </div>
                <Textarea
                  id="body"
                  name="body"
                  value={formData.body}
                  onChange={handleInputChange}
                  rows={5}
                  placeholder="Write your notification message here..."
                  className={`resize-none ${errors.body ? 'border-red-500 focus-visible:ring-red-500' : 'border-slate-200'}`}
                />
                {errors.body && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                    {errors.body}
                  </p>
                )}
                <p className="text-xs text-slate-500">
                  {formData.body.length} characters
                </p>
              </div>

              {/* Type - Enhanced */}
              <div className="space-y-2">
                <Label
                  htmlFor="type"
                  className="text-sm font-medium text-slate-900"
                >
                  Notification Type <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, type: value }))
                  }
                >
                  <SelectTrigger className="h-11 border-slate-200">
                    <SelectValue placeholder="Select notification type" />
                  </SelectTrigger>
                  <SelectContent>
                    {notificationTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type.replace(/_/g, ' ')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Optional Fields - Enhanced */}
              <div className="space-y-6 pt-6 border-t border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-5 bg-indigo-600 rounded-full"></div>
                  <h3 className="font-semibold text-slate-900">
                    Additional Options
                  </h3>
                  <span className="text-xs text-slate-500 ml-auto">
                    Optional
                  </span>
                </div>

                {/* Path */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Link2 className="w-4 h-4 text-slate-400" />
                    <Label
                      htmlFor="path"
                      className="text-sm font-medium text-slate-700"
                    >
                      Deep Link Path
                    </Label>
                  </div>
                  <Input
                    id="path"
                    name="path"
                    value={formData.path || ''}
                    onChange={handleInputChange}
                    placeholder="/posts/123 or /profile/user"
                    className="h-11 border-slate-200"
                  />
                </div>

                {/* Avatar URL */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-slate-400" />
                    <Label
                      htmlFor="avatarUrl"
                      className="text-sm font-medium text-slate-700"
                    >
                      Avatar URL
                    </Label>
                  </div>
                  <Input
                    id="avatarUrl"
                    name="avatarUrl"
                    type="url"
                    value={formData.avatarUrl || ''}
                    onChange={handleInputChange}
                    placeholder="https://example.com/avatar.jpg"
                    className="h-11 border-slate-200"
                  />
                </div>

                {/* Post Image URL */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Image className="w-4 h-4 text-slate-400" />
                    <Label
                      htmlFor="postImageUrl"
                      className="text-sm font-medium text-slate-700"
                    >
                      Post Image URL
                    </Label>
                  </div>
                  <Input
                    id="postImageUrl"
                    name="postImageUrl"
                    type="url"
                    value={formData.postImageUrl || ''}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                    className="h-11 border-slate-200"
                  />
                </div>
              </div>

              {/* Action Buttons - Enhanced */}
              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-slate-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClear}
                  className="gap-2 h-11 border-slate-300 hover:bg-slate-50"
                  disabled={isLoading}
                >
                  <Trash2 className="w-4 h-4" />
                  Clear Form
                </Button>
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="gap-2 h-11 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Send className="w-4 h-4" />
                  {isLoading ? 'Sending...' : 'Send Notification'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-indigo-100 shadow-md">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-indigo-100 rounded-lg mt-0.5">
                <Sparkles className="w-4 h-4 text-indigo-600" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-indigo-900">
                  Quick Tip
                </p>
                <p className="text-sm text-indigo-700">
                  Use clear, concise titles and engaging messages to improve
                  notification engagement rates.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default NotificationPage;
