import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { useAuth0 } from "react-native-auth0";
import { Icon } from "react-native-paper";

export default function CustomDrawerContent(props: any){
    const {clearSession} = useAuth0();
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="logout"
          icon={
            ({color, size}) => (
              <Icon source="logout" color={color} size={size} />
            )
          }
          onPress={clearSession}
        />
      </DrawerContentScrollView>
    );
  }