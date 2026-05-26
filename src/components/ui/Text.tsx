type Props = {
  heading: string;
  subtext?: string;
  className?: string;
};

export default function Text({ heading, subtext, className }: Props) {
  return (
    <div className={className}>
      <h2 className='text-sm text-white/60'>{heading}</h2>
      {subtext && (
        <p className='mt-1 text-sm text-white/15'>{subtext}</p>
      )}
    </div>
  );
}
