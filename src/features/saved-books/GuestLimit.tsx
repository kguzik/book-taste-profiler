import Button from '@/components/ui/Button';
import { libraryContent } from '@/data/library';

const { heading, description, signUpLabel, loginLabel } =
  libraryContent.GuestLimit;

export default function GuestLimit() {
  return (
    <div className='flex flex-col items-center gap-4 py-4 text-center'>
      <p className='text-base font-semibold text-white'>{heading}</p>
      <p className='max-w-sm text-sm text-white/50'>{description}</p>
      <div className='mt-2 flex gap-3'>
        <Button href='/login?tab=signup'>{signUpLabel}</Button>
        <Button variant='secondary' href='/login'>
          {loginLabel}
        </Button>
      </div>
    </div>
  );
}
