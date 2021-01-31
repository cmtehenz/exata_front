import React, { useState, useCallback, useEffect, memo } from 'react';
import { FiX, FiUsers, FiMenu, FiHome } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import logoImg from '../../assets/logo.png';

import { Container } from './styles';

const Sidebar: React.FC = () => {
  const [isOpened, setIsOpened] = useState(() => {
    const sidebarState = localStorage.getItem('@Exata:sidebarState');

    if (sidebarState) {
      return true;
    }

    return false;
  });

  const handleToggleSidebar = useCallback(() => {
    setIsOpened(state => !state);
  }, []);

  useEffect(() => {
    if (isOpened) {
      localStorage.setItem('@Exata:sidebarState', String(isOpened));
    } else {
      localStorage.removeItem('@Exata:sidebarState');
    }
  }, [isOpened]);

  return (
    <Container isOpened={!!isOpened}>
      <div>
        {isOpened && <img src={logoImg} alt="Exata" />}

        <button type="button" onClick={handleToggleSidebar}>
          {isOpened ? <FiX size={32} /> : <FiMenu size={32} />}
        </button>
      </div>
      <nav>
        <NavLink to="/dashboard">
          {isOpened && 'Home'}
          <FiHome size={24} />
        </NavLink>
        <NavLink to="/clients">
          {isOpened && 'Clientes'}
          <FiUsers size={24} />
        </NavLink>
      </nav>
    </Container>
  );
};

export default memo(Sidebar);
