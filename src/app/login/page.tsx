'use client';

import { useState, type SubmitEvent } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import { createClient } from '@/lib/supabase/client';
import { loginContent } from '@/data/login';

type Tab = 'login' | 'signup';

export default function LoginPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { tabs, fields, passwordRules } = loginContent;
  const tabContent = tabs[activeTab];

  function validateSignUp(): string | null {
    for (const rule of passwordRules) {
      if (!rule.test(password)) return `${rule.label} is required.`;
    }
    if (password !== confirmPassword) return 'Passwords do not match.';
    return null;
  }

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');

    if (activeTab === 'signup') {
      const validationError = validateSignUp();
      if (validationError) {
        setError(validationError);
        return;
      }
    }

    setLoading(true);

    const supabase = createClient();
    const { error: authError } =
      activeTab === 'login'
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });

    setLoading(false);

    if (authError) {
      setError(authError.message);
      return;
    }

    router.push('/library');
  }

  return (
    <main className='flex flex-1 items-center justify-center py-20 bg-black'>
      <Container>
        <div className='mx-auto max-w-sm'>
          <div className='mb-8 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight text-white'>
              {tabContent.heading}
            </h1>
            <p className='mt-2 text-sm text-white/40'>
              {tabContent.subheading}
            </p>
          </div>

          <div className='mb-6 flex rounded-full border border-white/10 p-1'>
            {(['login', 'signup'] as Tab[]).map((tab) => (
              <button
                key={tab}
                type='button'
                onClick={() => {
                  setActiveTab(tab);
                  setError('');
                  setConfirmPassword('');
                }}
                className={`flex-1 rounded-full py-2 text-sm font-medium transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-white text-black'
                    : 'text-white/50 hover:text-white/80'
                }`}
              >
                {tabs[tab].label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <div className='flex flex-col gap-1.5'>
              <label
                htmlFor='email'
                className='text-xs font-medium text-white/50 uppercase tracking-wider'
              >
                {fields.email.label}
              </label>
              <input
                id='email'
                type='email'
                autoComplete='email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-colors focus:border-white/25 focus:bg-white/8'
                placeholder={fields.email.placeholder}
              />
            </div>

            <div className='flex flex-col gap-1.5'>
              <label
                htmlFor='password'
                className='text-xs font-medium text-white/50 uppercase tracking-wider'
              >
                {fields.password.label}
              </label>
              <input
                id='password'
                type='password'
                autoComplete={
                  activeTab === 'login' ? 'current-password' : 'new-password'
                }
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-colors focus:border-white/25 focus:bg-white/8'
                placeholder={fields.password.placeholder}
              />
            </div>

            {activeTab === 'signup' && (
              <div className='flex flex-col gap-1.5'>
                <label
                  htmlFor='confirm-password'
                  className='text-xs font-medium text-white/50 uppercase tracking-wider'
                >
                  {fields.confirmPassword.label}
                </label>
                <input
                  id='confirm-password'
                  type='password'
                  autoComplete='new-password'
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className='w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-colors focus:border-white/25 focus:bg-white/8'
                  placeholder={fields.confirmPassword.placeholder}
                />
              </div>
            )}

            {activeTab === 'signup' && (
              <ul className='space-y-1 text-xs text-white/30'>
                {passwordRules.map((rule) => (
                  <li
                    key={rule.label}
                    className={rule.test(password) ? 'text-white/50' : ''}
                  >
                    {rule.label}
                  </li>
                ))}
              </ul>
            )}

            {error && (
              <p className='rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400'>
                {error}
              </p>
            )}

            <Button
              type='submit'
              variant='primary'
              disabled={loading}
              className='mt-2 w-full'
            >
              {loading ? tabContent.loadingLabel : tabContent.submitLabel}
            </Button>
          </form>
        </div>
      </Container>
    </main>
  );
}
