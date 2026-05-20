import Link from 'next/link';

type Variant = 'primary' | 'secondary';

type Props = {
  variant?: Variant;
  href?: string;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  className?: string;
};

const styles: Record<Variant, string> = {
  primary: 'bg-white text-black hover:opacity-85',
  secondary:
    'border border-white/15 text-white/60 hover:border-white/35 hover:text-white/90',
};

const base =
  'inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-200 cursor-pointer';

export default function Button({
  variant = 'primary',
  href,
  children,
  type = 'button',
  onClick,
  className = '',
}: Props) {
  const btnStyles = `${base} ${styles[variant]}${className ? ` ${className}` : ''}`;

  if (href) {
    return (
      <Link href={href} className={btnStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={btnStyles}>
      {children}
    </button>
  );
}
