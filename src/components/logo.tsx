import { MailSearch } from 'lucide-react';
import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
  iconOnly?: boolean;
};

export default function Logo({ className, iconOnly = false }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="bg-primary/20 text-primary p-2 rounded-lg">
        <MailSearch className="h-6 w-6" />
      </div>
      {!iconOnly && (
        <span className="text-xl font-semibold text-foreground">
          Email Detective
        </span>
      )}
    </div>
  );
}
