import { useCallback } from 'react';
import Signin from '../components/Signin';

export default function SigninContainer() {
  const login = useCallback((reqData) => {}, []);
  return <Signin login={login} />;
}
