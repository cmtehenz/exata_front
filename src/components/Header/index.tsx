import React from 'react';
import { FiPower } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';

import * as S from './styles';

const Header: React.FC = () => {
  const { signOut, user } = useAuth();

  return (
    <S.Header>
      <S.HeaderContent>
        <S.Profile>
          <img
            src={
              user.avatar_url ||
              `https://avatars.dicebear.com/4.5/api/avataaars/${user.id}.svg`
            }
            alt={user.name}
          />
          <div>
            <span>Bem-vindo,</span>
            <Link to="/profile">
              <strong>{user.name}</strong>
            </Link>
          </div>
        </S.Profile>
        <button type="button" onClick={signOut}>
          <FiPower />
        </button>
      </S.HeaderContent>
    </S.Header>
  );
};

export default Header;
