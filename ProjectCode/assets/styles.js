import { StyleSheet } from "react-native"

export default StyleSheet.create({
    container: {
        // defining elements of the parent container
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
      },
      header: {
        // defining the dimensions of the header
        width: '100%',
        height: 80,

        // add border to bottom of header
        borderBottomWidth: 2,
        borderColor: '#B2B2B2',

        // aligning title in center and placing at the bottom of the View
        alignItems: 'center',
        justifyContent: 'flex-end'
      },
      headerTitle: {
        // header styling
        fontSize: 30,
        fontWeight: 'bold',
      },
      list: {
        // adding padding between head and first card
        // setting with to be 95%
        paddingTop: 10,
        width: '95%',
      },
      evenButton: {
        // positioning of the button 
        position: 'absolute',
        bottom: 90,
        padding: 20,
        alignSelf: 'flex-end',
      },

      footer: {
        // position at bottom
        position: 'absolute',
        bottom: 0,
        // dimensions
        width: '100%',
        height: 90,

        // adding border to top
        borderTopWidth: 2,
        borderColor: '#B2B2B2',
        
        // alignment of contents
        alignItems: 'center',
        justifyContent: 'center',
      },
      footerImg: {
        // position
        marginHorizontal: 65,
        marginBottom: 10,
        height: 40,
        resizeMode: 'stretch',
    }
});