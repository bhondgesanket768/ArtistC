import { DefaultTheme } from "@react-navigation/native"

const myTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: "orange",
        background: "white"
    }
}

export default myTheme