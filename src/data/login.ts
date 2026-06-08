export const loginContent = {
  tabs: {
    login: {
      label: 'Log in',
      heading: 'Welcome back',
      subheading: 'Sign in to your reading profile',
      submitLabel: 'Log in',
      loadingLabel: 'Signing in…',
    },
    signup: {
      label: 'Sign up',
      heading: 'Create an account',
      subheading: 'Start building your taste profile',
      submitLabel: 'Sign up',
      loadingLabel: 'Creating account…',
    },
  },
  fields: {
    email: {
      label: 'Email',
      placeholder: 'you@example.com',
    },
    password: {
      label: 'Password',
      placeholder: '········',
    },
    confirmPassword: {
      label: 'Confirm password',
      placeholder: '········',
    },
  },
  passwordRules: [
    { label: 'At least 8 characters', test: (p: string) => p.length >= 8 },
    { label: 'One uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
    { label: 'One number', test: (p: string) => /[0-9]/.test(p) },
  ],
};
