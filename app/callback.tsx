// pages/callback.tsx

import { useRouter } from 'next/router';

const CallbackPage = () => {
  const router = useRouter();

  // Redirect to home after handling the callback
  router.push('/');

  return <div>Redirecting...</div>;
};

export default CallbackPage;
