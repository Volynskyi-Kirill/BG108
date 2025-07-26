import { ReactNode } from 'react';
import clsx from 'clsx';

type Props = {
  children: ReactNode;
  className?: string;
};

export default function Container({ children, className }: Props) {
  return (
    <div className={clsx('mx-auto max-w-[1170px] p-4', className)}>
      {children}
    </div>
  );
}
