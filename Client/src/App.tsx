import { GoogleOAuthProvider } from '@react-oauth/google';
import { Outlet } from 'react-router-dom';
export default function App(): JSX.Element {

  return (
    <GoogleOAuthProvider clientId='28611108443-fuc05t4db416chirpiuif3inn9kjmumn.apps.googleusercontent.com'>
      <Outlet />
    </GoogleOAuthProvider>

  );
  
  // 
}
