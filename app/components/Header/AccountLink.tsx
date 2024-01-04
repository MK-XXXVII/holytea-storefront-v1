import {useMatches, Link} from '@remix-run/react';
import {IconAccount, IconLogin} from '../Icon';

interface MatchData {
  isLoggedIn: boolean;
}

export function AccountLink({className}: {className?: string}) {
  const [root] = useMatches();
  const isLoggedIn = (root.data as MatchData).isLoggedIn;
  return isLoggedIn ? (
    <Link to="/account" className={className}>
      <IconAccount />
    </Link>
  ) : (
    <Link to="/account/login" className={className}>
      <IconLogin />
    </Link>
  );
}

