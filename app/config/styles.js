import { Platform } from "react-native"

export default {
    text: {
        fontSize: 18,
        color: "#0c0c0c",
        fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir"
    }
}