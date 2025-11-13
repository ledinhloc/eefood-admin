import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';

interface FieldProps {
  id: string;
  label: string;
  icon: React.ElementType;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  showToggle?: boolean;
  show?: boolean;
  onToggle?: () => void;
}

export const Field: React.FC<FieldProps> = ({
  id,
  label,
  icon: Icon,
  value,
  error,
  onChange,
  type = 'text',
  placeholder,
  showToggle,
  show,
  onToggle,
}) => {
  const inputType = showToggle ? (show ? 'text' : 'password') : type;

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-black">
        {label}
      </label>

      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black" />

        <Input
          id={id}
          name={id}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="pl-10 pr-10 h-12 border-gray-300"
        />

        {showToggle && onToggle && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="absolute right-0 top-1/2 -translate-y-1/2 h-full px-3 hover:bg-transparent"
          >
            {show ? (
              <EyeOff className="w-4 h-4 text-black" />
            ) : (
              <Eye className="w-4 h-4 text-black" />
            )}
          </Button>
        )}
      </div>

      {error && <p className="text-sm font-medium text-red-500">{error}</p>}
    </div>
  );
};
