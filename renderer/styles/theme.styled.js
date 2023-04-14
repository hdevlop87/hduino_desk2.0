import { Colors, shadow } from '../styles'

export const light = {
    name: "light",

    colors: {
        background_light: Colors.purple_light,
        background_normal: Colors.purple_normal,
        background_hover: Colors.purple_hover,
        background_pressed: Colors.purple_pressed,
        background_dark: Colors.purple_dark,

        background: {
            body: Colors.light_BG_Body,
            paper: Colors.light_BG_Paper,
        },

        text: {
            primary: Colors.light_Text_Primary,
            secondary: Colors.light_Text_Secondary,
            desactived: Colors.light_Text_Desactived
        },


    },
    Shadow:{
        cardShadow: shadow.light6
    },
};

export const dark = {
    name: "dark",

    colors: {
        background_light: Colors.purple_light,
        background_normal: Colors.purple_normal,
        background_hover: Colors.purple_hover,
        background_pressed: Colors.purple_pressed,
        background_dark: Colors.purple_dark,

        background: {
            body: Colors.dark_BG_Body,
            paper: Colors.dark_BG_Paper,
        }, 

        text: {
            primary: Colors.dark_Text_Primary,
            secondary: Colors.dark_Text_Secondary,
            desactived: Colors.dark_Text_Desactived
        },
    },
    Shadow: {
        cardShadow: shadow.dark6
    },
};

