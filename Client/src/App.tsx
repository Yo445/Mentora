import { GoogleOAuthProvider } from '@react-oauth/google';
import { Outlet } from 'react-router-dom';
export default function App(): JSX.Element {

  return (
    <GoogleOAuthProvider clientId='367982540516-t0m3ufofatssqb55lgahjpaij6b79b97.apps.googleusercontent.com'>
      <Outlet />
    </GoogleOAuthProvider>

  );
  
}
