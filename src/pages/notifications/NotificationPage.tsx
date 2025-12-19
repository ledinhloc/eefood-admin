import { useSendNotificationMutation } from '@/features/notifications/services/notificationApi.ts';
import type { NotificationRequest } from '@/features/notifications/types/noti.types';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Send, Trash2, Bell, CheckCircle2, XCircle } from 'lucide-react';

export function NotificationPage() {
  const [sendNotification, { isLoading, isSuccess, isError, error }] =
    useSendNotificationMutation();

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
  };

  const handleSubmit = async () => {
    if (!sendToAll && (!formData.userId || formData.userId <= 0)) {
      alert('Please enter a valid User ID');
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

    console.log('Sending notification payload:', payload);

    try {
      await sendNotification(payload).unwrap();
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
    } catch (error: any) {
      console.error('Failed to send notification:', error);
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
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-8xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-600 rounded-lg">
            <Bell className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Notification Management
            </h1>
            <p className="text-slate-600">Send system notifications to users</p>
          </div>
        </div>

        {/* Main Card */}
        <Card className="shadow-lg border-slate-200">
          <CardHeader className="space-y-1 bg-gradient-to-r from-blue-50 to-slate-50 border-b">
            <CardTitle className="text-xl">Send Notification</CardTitle>
            <CardDescription>
              Create and send notifications to all users or specific individuals
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              {/* Recipient Selection */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Recipients</Label>
                <RadioGroup
                  value={sendToAll ? 'all' : 'specific'}
                  onValueChange={(value) => setSendToAll(value === 'all')}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2 border rounded-lg p-3 flex-1 cursor-pointer hover:bg-slate-50 transition-colors">
                    <RadioGroupItem value="all" id="all" />
                    <Label htmlFor="all" className="cursor-pointer flex-1">
                      All users
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-lg p-3 flex-1 cursor-pointer hover:bg-slate-50 transition-colors">
                    <RadioGroupItem value="specific" id="specific" />
                    <Label htmlFor="specific" className="cursor-pointer flex-1">
                      Specific user
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* User ID Input */}
              {!sendToAll && (
                <div className="space-y-2">
                  <Label htmlFor="userId">
                    User ID <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="userId"
                    type="number"
                    name="userId"
                    value={formData.userId || ''}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        userId: e.target.value
                          ? Number(e.target.value)
                          : undefined,
                      }))
                    }
                    placeholder="Enter user ID"
                    min="1"
                  />
                </div>
              )}

              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">
                  Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter notification title"
                />
              </div>

              {/* Body */}
              <div className="space-y-2">
                <Label htmlFor="body">
                  Message <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="body"
                  name="body"
                  value={formData.body}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Enter notification message"
                  className="resize-none"
                />
              </div>

              {/* Type */}
              <div className="space-y-2">
                <Label htmlFor="type">
                  Type <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, type: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select notification type" />
                  </SelectTrigger>
                  <SelectContent>
                    {notificationTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Optional Fields */}
              <div className="space-y-4 pt-4 border-t">
                <h3 className="font-semibold text-slate-700">
                  Optional Fields
                </h3>

                {/* Path */}
                <div className="space-y-2">
                  <Label htmlFor="path">Path</Label>
                  <Input
                    id="path"
                    name="path"
                    value={formData.path || ''}
                    onChange={handleInputChange}
                    placeholder="/posts/123"
                  />
                </div>

                {/* Avatar URL */}
                <div className="space-y-2">
                  <Label htmlFor="avatarUrl">Avatar URL</Label>
                  <Input
                    id="avatarUrl"
                    name="avatarUrl"
                    type="url"
                    value={formData.avatarUrl || ''}
                    onChange={handleInputChange}
                    placeholder="https://example.com/avatar.jpg"
                  />
                </div>

                {/* Post Image URL */}
                <div className="space-y-2">
                  <Label htmlFor="postImageUrl">Post Image URL</Label>
                  <Input
                    id="postImageUrl"
                    name="postImageUrl"
                    type="url"
                    value={formData.postImageUrl || ''}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              {/* Success/Error Messages */}
              {isSuccess && (
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    Notification sent successfully!
                  </AlertDescription>
                </Alert>
              )}

              {isError && (
                <Alert className="bg-red-50 border-red-200">
                  <XCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    Failed to send notification:{' '}
                    {error && 'data' in error
                      ? JSON.stringify(error.data)
                      : 'Unknown error'}
                  </AlertDescription>
                </Alert>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClear}
                  className="gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear
                </Button>
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="gap-2 bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="w-4 h-4" />
                  {isLoading ? 'Sending...' : 'Send Notification'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default NotificationPage;
