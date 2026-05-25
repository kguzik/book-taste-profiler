import Pill from '@/components/ui/Pill';
import { tasteDimensions } from '@/data/taste-dimensions';

type Props = {
  selected: string[];
  onToggle: (tag: string) => void;
};

export default function TagSelector({ selected, onToggle }: Props) {
  return (
    <div className='flex flex-col gap-5'>
      {tasteDimensions.map((dimension) => (
        <div key={dimension.label}>
          <p className='mb-2.5 text-xs font-medium tracking-widest text-white/30 uppercase'>
            {dimension.label}
          </p>
          <div className='flex flex-wrap gap-2'>
            {dimension.tags.map((tag) => (
              <Pill
                key={tag}
                selected={selected.includes(tag)}
                onClick={() => onToggle(tag)}
              >
                {tag}
              </Pill>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
