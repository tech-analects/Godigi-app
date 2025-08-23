// app/(main)/CustomDrawerContent.tsx
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { Text, View } from "react-native";

export default function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      {/* 👋 Your custom content at top */}
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Hello</Text>
      </View>

      {/* 🚪 Default drawer items (Feed, Profile, etc.) */}
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}
