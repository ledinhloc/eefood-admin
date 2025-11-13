import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShieldAlert, SearchX, ServerCrash, CircleAlert } from 'lucide-react';

interface ErrorPageProps {
  code?: number;
  title?: string;
  description?: string;
}

export default function ErrorPage({
  code,
  title,
  description,
}: ErrorPageProps) {
  const navigate = useNavigate();
  const location = useLocation();

  // Nếu không có props, tự xác định lỗi dựa vào URL (vd: /403, /404)
  const path = location.pathname;
  let errorCode = code ?? (parseInt(path.replace('/', '')) || 404);

  let errorTitle = title;
  let errorDescription = description;
  let Icon = CircleAlert;

  switch (errorCode) {
    case 403:
      errorTitle = errorTitle ?? 'Access Denied';
      errorDescription =
        errorDescription ?? 'You do not have permission to access this page.';
      Icon = ShieldAlert;
      break;
    case 500:
      errorTitle = errorTitle ?? 'Server Error';
      errorDescription =
        errorDescription ?? 'Something went wrong. Please try again later.';
      Icon = ServerCrash;
      break;
    default:
      errorCode = 404;
      errorTitle = errorTitle ?? 'Page Not Found';
      errorDescription =
        errorDescription ??
        'The page you are looking for does not exist or has been moved.';
      Icon = SearchX;
      break;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted text-center p-6">
      <div className="bg-white dark:bg-card shadow-lg rounded-2xl p-10 max-w-md w-full">
        <div className="flex flex-col items-center space-y-4">
          <Icon className="text-primary w-16 h-16" />
          <h1 className="text-7xl font-bold text-foreground">{errorCode}</h1>
          <h2 className="text-2xl font-semibold">{errorTitle}</h2>
          <p className="text-muted-foreground">{errorDescription}</p>

          <div className="flex space-x-4 mt-6">
            <Button variant="outline" onClick={() => navigate(-1)}>
              Go Back
            </Button>
            <Button onClick={() => navigate('/login')}>Home</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
