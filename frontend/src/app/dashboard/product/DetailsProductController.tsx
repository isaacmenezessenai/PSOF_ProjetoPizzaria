   import React from "react";
import { SafeAreaView, View, ScrollView, Image, Text } from "react-native";

export default (props) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
      }}
    >
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "#FAF6ED",
        }}
      >
        <Image
          source={{
            uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7AMENvnOxd/3c37b0yd_expires_30_days.png",
          }}
          resizeMode="stretch"
          style={{
            height: 44,
            marginTop: 29,
            marginBottom: 12,
            marginHorizontal: 22,
          }}
        />

        <Image
          source={{
            uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7AMENvnOxd/axxaqo5r_expires_30_days.png",
          }}
          resizeMode="stretch"
          style={{
            height: 209,
            marginBottom: 12,
            marginHorizontal: 1,
          }}
        />

        <View
          style={{
            paddingHorizontal: 50,
            marginBottom: 12,
            marginHorizontal: 30,
          }}
        >
          <Text
            style={{
              color: "#10191F",
              fontSize: 40,
              fontWeight: "bold",
              marginHorizontal: 20,
            }}
          >
            Pizza Tal
          </Text>
          <Text
            style={{
              color: "#828282",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Molho de tomate, Queijo, Pepperoni
          </Text>
        </View>

        <Image
          source={{
            uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7AMENvnOxd/68tkjonc_expires_30_days.png",
          }}
          resizeMode="stretch"
          style={{
            height: 18,
            marginBottom: 12,
            marginHorizontal: 22,
          }}
        />

        <View
          style={{
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 4,
              paddingHorizontal: 19,
            }}
          >
            <Image
              source={{
                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7AMENvnOxd/z2o17lsy_expires_30_days.png",
              }}
              resizeMode="stretch"
              style={{
                width: 24,
                height: 25,
                marginRight: 46,
              }}
            />
            <Image
              source={{
                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7AMENvnOxd/kjtnljud_expires_30_days.png",
              }}
              resizeMode="stretch"
              style={{
                width: 32,
                height: 33,
                marginRight: 46,
              }}
            />
            <Image
              source={{
                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7AMENvnOxd/u7ye8g58_expires_30_days.png",
              }}
              resizeMode="stretch"
              style={{
                width: 39,
                height: 39,
              }}
            />
          </View>
        </View>

        {/* View vazia convertida para self-closing */}
        <View
          style={{
            marginBottom: 12,
            marginHorizontal: 27,
          }}
        />

        <Text
          style={{
            color: "#10191F",
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 10,
            marginLeft: 10,
          }}
        >
          Adicional
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#FFFFFF",
            borderColor: "#E6E6E6",
            borderRadius: 25,
            borderWidth: 1,
            marginBottom: 10,
            marginHorizontal: 10,
          }}
        />

        <Image
          source={{
            uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7AMENvnOxd/9xzala1s_expires_30_days.png",
          }}
          resizeMode="stretch"
          style={{
            borderRadius: 25,
            width: 89,
            height: 79,
            marginRight: 15,
          }}
        />

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 10,
          }}
        >
          <View
            style={{
              alignItems: "center",
              marginLeft: 3,
            }}
          >
            <Text
              style={{
                color: "#10191F",
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 6,
              }}
            >
              Queijo
            </Text>
            <Text
              style={{
                color: "#10191F",
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              R$ 1.67
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: 3,
            }}
          >
            <View
              style={{
                width: 13,
                height: 5,
                backgroundColor: "#000000",
                marginRight: 10,
              }}
            />
            <Text
              style={{
                color: "#000000",
                fontSize: 32,
                fontWeight: "bold",
                marginRight: 13,
              }}
            >
              1
            </Text>
            <View
              style={{
                paddingHorizontal: 5,
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};