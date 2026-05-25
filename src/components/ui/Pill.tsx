type Props = {
  children: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
};

const base =
  'inline-flex items-center whitespace-nowrap rounded-full border px-4 py-1.5 text-sm transition-colors duration-200';

const idle =
  'border-white/10 bg-white/[0.04] text-white/45 hover:border-white/25 hover:text-white/75';
const active = 'border-white/35 bg-white/10 text-white';

export default function Pill({
  children,
  selected,
  onClick,
  className = '',
}: Props) {
  const colorStyles = selected ? active : idle;
  const pillClasses = `${base} ${colorStyles}${className ? ` ${className}` : ''}`;

  if (onClick) {
    return (
      <button
        type='button'
        onClick={onClick}
        className={`cursor-pointer ${pillClasses}`}
      >
        {children}
      </button>
    );
  }

  return <span className={`cursor-default ${pillClasses}`}>{children}</span>;
}
