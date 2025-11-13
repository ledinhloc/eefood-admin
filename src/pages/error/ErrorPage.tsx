import { Button } from '@/components/ui/button';
import { useLocation, useNavigate } from 'react-router-dom';

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

  switch (errorCode) {
    case 403:
      errorTitle = errorTitle ?? 'Access Denied';
      errorDescription =
        errorDescription ?? 'You do not have permission to access this page.';
      break;
    case 500:
      errorTitle = errorTitle ?? 'Server Error';
      errorDescription =
        errorDescription ?? 'Something went wrong. Please try again later.';
      break;
    default:
      errorCode = 404;
      errorTitle = errorTitle ?? 'Page Not Found';
      errorDescription =
        errorDescription ??
        'The page you are looking for does not exist or has been moved.';
      break;
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900 p-6">
      <div className="flex flex-col items-center space-y-8 max-w-2xl w-full">
        {/* Error Code */}
        <div className="text-center space-y-4">
          <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {errorCode}
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
            {errorTitle}
          </h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            {errorDescription}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="px-8 py-6 text-lg"
          >
            Go Back
          </Button>
          <Button
            onClick={() => navigate('/login')}
            className="px-8 py-6 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Go to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
