export interface ReportResponse {
  id: number;
  reporterId: number;
  targetType: string;
  reason: string;
  status: string;
  targetId: number;
  createdAt: Date;
}
export interface ReportQueryParams {
  reporterId?: number | null;
  type?: string | null;
  reason?: string | null;
  targetId?: number | null;
  page?: number;
  status?: string | null;
  limit?: number;
}
export interface ReportPageResponse {
  message: string;
  data: {
    content: ReportResponse[];
    totalPages: number;
    totalElements: number;
    number: number;
    size: number;
  };
}

export interface UpdateReportStatusRequest {
  id: number;
  status: string;
  type: string;
}