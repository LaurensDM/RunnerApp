import { Auth0Provider } from 'react-native-auth0';
import {AUTH0_CLIENT_ID, AUTH0_DOMAIN} from "@env";

export default function AuthProvider({ children }: any) {
    return (
        <Auth0Provider domain={AUTH0_DOMAIN} clientId={AUTH0_CLIENT_ID} >
            {children}
        </Auth0Provider>
    );
}