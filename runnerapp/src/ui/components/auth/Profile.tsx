import { useAuth0 } from "react-native-auth0";
import { Text } from "react-native-paper";

const Profile = () => {
    const {user} = useAuth0();

    return (
        <>
            {user && <Text>Logged in as {user.name}</Text>}
            {!user && <Text>Not logged in</Text>}
        </>
    )
}