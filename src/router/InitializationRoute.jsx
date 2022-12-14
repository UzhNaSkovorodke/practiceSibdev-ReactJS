import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { logoutObserver } from 'src/api/observers';
import { PATHNAMES } from 'src/consts';
import { useLogout } from 'src/hooks';

import storage from '../api/storage';

const InitializationRoute = () => {
  const navigate = useNavigate();
  const handleLogout = useLogout();
  const [isInit, setIsInit] = useState(false);

  useEffect(() => {
    if (isInit) return;
    !storage.GET('refresh') ? navigate(PATHNAMES.login) : navigate(PATHNAMES.pockets);
    setIsInit(true);
  }, [navigate, isInit]);

  useEffect(() => {
    const subId = logoutObserver.subscribe(handleLogout);
    return () => logoutObserver.unsubscribe(subId);
  }, [handleLogout]);

  return isInit ? <Outlet /> : <h1>тут будет прелоадер</h1>; //TODO
};

export default InitializationRoute;
