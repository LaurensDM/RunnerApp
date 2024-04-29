import { useAuth0 } from "react-native-auth0";
import { Button } from "react-native-paper";

const LoginButton = () => {
    const { authorize } = useAuth0();

    const onPress = async () => {
        try {
            await authorize();
        } catch (e) {
            console.log(e);
        }
    };

    return <Button onPress={onPress}>
        Log in
    </Button>
}

export default LoginButton;