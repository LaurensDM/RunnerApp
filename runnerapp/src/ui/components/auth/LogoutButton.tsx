import { useAuth0 } from "react-native-auth0";
import { Button } from "react-native-paper";

const LogoutButton = () => {
    const {clearSession} = useAuth0();

    const onPress = async () => {
        try {
            await clearSession();
        } catch (e) {
            console.log(e);
        }
    };

    return <Button onPress={onPress} >
        Log out
    </Button>
}

export default LogoutButton;