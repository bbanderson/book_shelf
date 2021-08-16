import { goBack } from 'connected-react-router';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Add from '../components/Add';
import { RootState } from '../types';
import { logout as logoutSagaStart } from '../redux/modules/auth';

export default function AddContainer(): JSX.Element {
  const dispatch = useDispatch();
  const loading = useSelector<RootState, boolean>(
    (state) => state.books.loading
  );
  const back = useCallback(() => {
    dispatch(goBack());
  }, [dispatch]);
  const logout = useCallback(() => {
    dispatch(logoutSagaStart());
  }, [dispatch]);
  return <Add loading={loading} back={back} logout={logout} />;
}
