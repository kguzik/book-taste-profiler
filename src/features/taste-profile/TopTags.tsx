import Pill from '@/components/ui/Pill';
import { tasteProfileContent } from '@/data/taste-profile';

type Props = {
  tags: string[];
};

export default function TopTags({ tags }: Props) {
  if (tags.length === 0) return null;

  return (
    <div>
      <p className='mb-3 text-xs font-medium tracking-widest text-white/25 uppercase'>
        {tasteProfileContent.profile.topVibesHeading}
      </p>
      <div className='flex flex-wrap gap-2'>
        {tags.map((tag) => (
          <Pill key={tag}>{tag}</Pill>
        ))}
      </div>
    </div>
  );
}
