import { Outlet } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function App(): JSX.Element {

  return (
    <GoogleOAuthProvider clientId='28611108443-fuc05t4db416chirpiuif3inn9kjmumn.apps.googleusercontent.com'>
      <Outlet />
    </GoogleOAuthProvider>

  );
  
  // 
}
