import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme";
import { StatusBar } from "expo-status-bar";
import { coffeeItems } from "../constants";
import Carousel from "react-native-snap-carousel";
import CoffeeCard from "../components/coffeeCard";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { MapPinIcon } from "react-native-heroicons/solid";

const { width, height } = Dimensions.get("window");
const ios = Platform.OS === "ios";

export default function HomeScreen() {
  const [searchText, setSearchText] = useState("");
  const [filteredItems, setFilteredItems] = useState(coffeeItems);

  const handleSearch = () => {
    const filtered = coffeeItems.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="auto" />

      <Image
        source={require("../assets/images/beansBackground1.png")}
        style={{
          height: height * 0.2,
          width: "100%",
          position: "absolute",
          top: -5,
          opacity: 0.1,
        }}
      />

      <SafeAreaView style={ios ? { marginBottom: -8 } : null}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 4,
          }}
        >
          <Image
            source={require("../assets/images/avatar.png")}
            style={{ height: 36, width: 36, borderRadius: 18 }}
          />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 8,
            }}
          >
            <MapPinIcon size={25} color={themeColors.bgLight} />
            <Text style={{ fontWeight: "600", fontSize: 16 }}>
              Coronda , Santa Fe
            </Text>
          </View>

          <BellIcon size={27} color="black" />
        </View>

        <View
          style={{
            marginHorizontal: 5,
            shadowColor: "#000",
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 2,
            marginTop: height * 0.06,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderRadius: 25,
              backgroundColor: "#e6e6e6",
            }}
          >
            <TextInput
              placeholder="Search"
              style={{ padding: 12, flex: 1, fontWeight: "600", color: "gray" }}
              value={searchText}
              onChangeText={(text) => setSearchText(text)}
              onSubmitEditing={handleSearch}
            />
            <TouchableOpacity
              style={{
                padding: 8,
                borderRadius: 20,
                backgroundColor: themeColors.bgLight,
              }}
              onPress={handleSearch}
            >
              <MagnifyingGlassIcon size={25} strokeWidth={2} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      <View
        style={{
          overflow: "visible",
          justifyContent: "center",
          flex: 1,
          marginTop: ios ? 10 : 0,
        }}
      >
        <View>
          <Carousel
            containerStyle={{ overflow: "visible" }}
            data={filteredItems}
            renderItem={({ item }) => <CoffeeCard item={item} />}
            firstItem={1}
            loop
            inactiveSlideScale={0.75}
            inactiveSlideOpacity={0.75}
            sliderWidth={width}
            itemWidth={width * 0.63}
            slideStyle={{ display: "flex", alignItems: "center" }}
          />
        </View>
      </View>
    </View>
  );
}
