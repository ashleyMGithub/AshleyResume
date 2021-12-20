import { StyleSheet, Dimensions, StatusBar } from "react-native"
const DimData = Dimensions.get("window");


const page_colour={
    red: "#ff4d4d",
    black: "#000000",
    white: "#ffffff",
    ghost_white: "#f8f8ff",
    sapphire: "#52B2BF",
    blue: 'blue',
    purple: 'purple',
    yellow: 'yellow',
    pink: 'pink',
    peach: "#FFCBA4",
    dark_peach: "#A06800",
    mild_dark_peach: "#CE8600",
    mild_peach: "#E99A65",
    brown: "#734414",
    dark_brown: "#381E0E"
}

const buttonWidth=1.5;


const styles = StyleSheet.create({
    container:{
        height: DimData.height - StatusBar.currentHeight,
        width: DimData.width,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor:'pink',
        //marginTop: StatusBar.currentHeight,
    },
    HomePage:{
        height: '100%',
        width:'100%',
        backgroundColor: page_colour.ghost_white,
        justifyContent:'flex-start',
        alignItems:'center',
    },
    HomeSector:{
        width: DimData.width,
        height: DimData.height,
        justifyContent:'flex-start',
        alignItems:'center',
    },
    MenuBar:{
        height:'7.5%',
        width: '100%',
        backgroundColor: page_colour.ghost_white,
        flexDirection: 'row',
    },
    MenuBarTop:{
        borderBottomWidth: buttonWidth,
        borderBottomColor: page_colour.red
    },
    MenuBarBottom:{
        borderTopWidth: buttonWidth,
        borderTopColor: page_colour.black
    },
    MenuBarButton:{
        height:'100%',
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
    },
    SideMenuArea:{
        height:'100%',
        width:'20%',
        alignItems: 'center',
    },
    BottomBar:{
        flex:1,
        alignItems: 'center',
    
    },
    BottomBarEnd:{
        flex:1,
    },
})

module.exports = {
    page_colour,
    styles
}

