// import React from "react";
// import { View, Text } from "react-native";
// import BackButton from "../components/backButton";

// export default function Ajuda() {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <BackButton />
//       <Text>Página Ajuda</Text>
//     </View>
//   );
// }

import React from "react";
import { SafeAreaView, View, ScrollView, Text, Image, TouchableOpacity, } from "react-native";
import BackButton from "../components/backButton";
export default () => {
	return (
		<SafeAreaView 
			style={{
				flex: 1,
				backgroundColor: "#FFFFFF",
			}}>
			<ScrollView  
				style={{
					flex: 1,
					backgroundColor: "#FFFFFF",
					borderColor: "#000000",
					borderRadius: 19,
					borderWidth: 2,
					shadowColor: "#000000",
					shadowOpacity: 1.0,
					shadowOffset: {
					    width: 3,
					    height: 4
					},
				}}>
				<View 
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						marginTop: 20,
						marginBottom: 21,
						marginHorizontal: 26,
					}}>
					<Text 
						style={{
							color: "#10191F",
							fontSize: 32,
							fontWeight: "bold",
							marginRight: 4,
							flex: 1,
						}}>
						{"Chamar Ajuda"}
					</Text>
					<Text 
						style={{
							color: "#1A1F3F",
							fontSize: 24,
							textAlign: "right",
							flex: 1,
						}}>
						<BackButton />
					</Text>
				</View>
				<Image
					source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7AMENvnOxd/6oz44nr2_expires_30_days.png"}} 
					resizeMode = {"stretch"}
					style={{
						borderRadius: 19,
						height: 25,
						marginBottom: 13,
					}}
				/>
				<View 
					style={{
						marginBottom: 61,
						marginHorizontal: 47,
					}}>
					<Text 
						style={{
							color: "#000000",
							fontSize: 24,
							textAlign: "center",
							marginHorizontal: 2,
						}}>
						{"Está com alguma dúvida ou teve um problema? Clique no botão para pedir ajuda ao garçom."}
					</Text>
				</View>
				<View 
					style={{
						marginBottom: 268,
						marginHorizontal: 47,
					}}>
					<TouchableOpacity 
						style={{
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "center",
							backgroundColor: "#9A1105",
							borderColor: "#FFFFFF",
							borderRadius: 24,
							borderWidth: 1,
							paddingVertical: 1,
						}} onPress={()=>alert('Sua ajuda foi solicitada ao servidor!')}>
						<Image
							source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7AMENvnOxd/rmcpnr6i_expires_30_days.png"}} 
							resizeMode = {"stretch"}
							style={{
								borderRadius: 24,
								width: 36,
								height: 49,
								marginRight: 10,
							}}
						/>
						<Text 
							style={{
								color: "#FFFFFF",
								fontSize: 20,
								fontWeight: "bold",
							}}>
							{"Chamar Ajuda"}
						</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}