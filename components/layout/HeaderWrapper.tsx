'use client';

import Header from './Header';
import { useUser } from './UserProvider';
import { User } from '@/types';

export default function HeaderWrapper({ initialUser }: { initialUser: User | null }) {
  const { user, logout } = useUser();

  return <Header user={user || initialUser} onLogout={logout} />;
}
