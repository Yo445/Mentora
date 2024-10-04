import { GoogleOAuthProvider } from '@react-oauth/google';
import { Outlet } from 'react-router-dom';

export default function App(): JSX.Element {

  return (
    <GoogleOAuthProvider clientId={yourclientId}>
      <Outlet />
    </GoogleOAuthProvider>

  );
  
  // 
}
