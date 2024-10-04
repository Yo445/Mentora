import { GoogleOAuthProvider } from '@react-oauth/google';
import 'dotenv/config';
import { Outlet } from 'react-router-dom';

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

export default function App(): JSX.Element {

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Outlet />
    </GoogleOAuthProvider>

  );
  
  // 
}
