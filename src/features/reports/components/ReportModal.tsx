import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useUpdateReportStatusMutation } from '@/features/reports/services/reportApi';
import type { ReportResponse } from '@/features/reports/types/report.types';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface ReportModalProps {
  report: ReportResponse | null;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function ReportModal({
  report,
  open,
  setOpen,
}: ReportModalProps) {
  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState<{ status?: string }>({});
  const [updateReportStatus, { isLoading: isUpdating }] =
    useUpdateReportStatusMutation();

  useEffect(() => {
    if (open && report) {
      setStatus(report.status);
      setErrors({});
    }
  }, [open, report]);

  const validateForm = (): boolean => {
    const newErrors: { status?: string } = {};

    if (!status) {
      newErrors.status = 'Vui lòng chọn trạng thái';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm() || !report) return;

    console.log('Sending request:', {
      id: report.id,
      status,
      type: report.targetType,
    });

    try {
      await updateReportStatus({
        id: report.id,
        status,
        type: report.targetType,
      }).unwrap();

      toast.success('Cập nhật trạng thái báo cáo thành công!');
      setOpen(false);
    } catch (err: any) {
      console.error('Update report status error:', err);

      if (err?.status === 400) {
        toast.error(err?.data?.message || 'Dữ liệu không hợp lệ');
      } else if (err?.status === 401) {
        toast.error('Phiên đăng nhập đã hết hạn');
      } else if (err?.status === 403) {
        toast.error('Bạn không có quyền cập nhật báo cáo này');
      } else if (err?.status === 404) {
        toast.error('Không tìm thấy báo cáo');
      } else if (err?.data?.message) {
        toast.error(err.data.message);
      } else {
        toast.error('Có lỗi xảy ra khi cập nhật trạng thái');
      }
    }
  };

  if (!report) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-full sm:max-w-2xl p-6 rounded-xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Cập nhật trạng thái báo cáo
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            Thay đổi trạng thái xử lý của báo cáo này
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Thông tin báo cáo */}
          <div className="p-4 bg-gray-50 rounded-lg border space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-sm text-gray-600">Report ID:</span>
                <span className="ml-2 font-medium">{report.id}</span>
              </div>
              <div>
                <span className="text-sm text-gray-600">Reporter ID:</span>
                <span className="ml-2 font-medium">{report.reporterId}</span>
              </div>
              <div>
                <span className="text-sm text-gray-600">Target Type:</span>
                <span className="ml-2 font-medium uppercase">
                  {report.targetType}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-600">Target ID:</span>
                <span className="ml-2 font-medium">{report.targetId}</span>
              </div>
            </div>
            <div>
              <span className="text-sm text-gray-600">Lý do:</span>
              <p className="mt-1 text-sm">{report.reason}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Ngày tạo:</span>
              <span className="ml-2 text-sm">
                {new Date(report.createdAt).toLocaleString('vi-VN')}
              </span>
            </div>
          </div>

          {/* Trạng thái */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">
              Trạng thái <span className="text-red-500">*</span>
            </label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PENDING">Chờ duyệt</SelectItem>
                <SelectItem value="RESOLVED">Đã duyệt</SelectItem>
                <SelectItem value="REJECTED">Từ chối</SelectItem>
              </SelectContent>
            </Select>
            {errors.status && (
              <p className="text-red-500 text-sm mt-1">{errors.status}</p>
            )}
          </div>
        </div>

        <DialogFooter className="mt-6 flex justify-end space-x-3">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isUpdating}
          >
            Hủy
          </Button>
          <Button onClick={handleSubmit} disabled={isUpdating}>
            {isUpdating ? 'Đang cập nhật...' : 'Cập nhật'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
