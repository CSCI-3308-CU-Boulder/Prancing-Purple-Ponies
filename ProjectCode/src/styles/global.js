import {StyleSheet} from 'react-native';

export const globalStyles = StyleSheet.create({
    container:{
        flex:1,
        padding: 20,
        width: '100%',
    },
    listContainer:{
        //flex:1,
        marginTop: 20,
        width: '100%',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 20,
        fontSize: 20,
        borderRadius: 6,
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
    listSectionTitle: {
      // header styling
      fontSize: 24,
      fontWeight: 'bold',
    },
    modalContainer: {
        width: '95%',
        height: '80%',

        // create shadow effect on cards
        shadowOffset:{  width: 15,  height: 15,  },
        shadowColor: 'black',
        shadowOpacity: 0.15,
        // add padding inside for text and margin between cards
        padding: 20,
        margin: 10,

        // make background white so shadow doesn't shine through
        backgroundColor: 'white',

        // create border around the events and round corners
        borderWidth: 2,
        borderColor: '#B2B2B2',
        borderRadius: 20,
    },
    eventInfo: {
        height: '15%',
        flexDirection: 'row',
    },
    // view holding the buttons and counts of yesses and maybes
    rsvpCont: {
        flexDirection: 'row',
        width: "auto",
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8,
        marginRight: 8,
        marginBottom: 8,
        borderBottomEndRadius: 5,

    },
    // default styling of the buttons when they haven't been clicked
    rsvpButtons_default: {
        width: '40%',
        margin: 5,
        padding: 5,
        backgroundColor: '#E5E5E5',
        borderRadius: 5,
        alignItems: 'center',
    },
    // styling for when yes is clicked
    rsvpButtons_Click_Yes: {
        width: '40%',
        margin: 5,
        padding: 5,
        borderRadius: 5,
        alignItems: 'center',

        // When clicked
        fontWeight: 'bold',
        backgroundColor: '#ccf6c8',
    },
    // styling for when maybe is clicked
    rsvpButtons_Click_Maybe: {
        // default styling
        width: '40%',
        margin: 5,
        padding: 5,
        borderRadius: 5,
        alignItems: 'center',

        // When clicked
        fontSize: 12,
        fontWeight: 'bold',
        backgroundColor: '#fafcc2',
    },
    list: {
      // adding padding between head and first card
      // setting with to be 95%
      paddingTop: 10,
      marginBottom: 90,
      width: '100%',
    },
    detailList: {
      // adding padding between head and first card
      // setting with to be 95%
      paddingTop: 10,
      marginBottom: 20,
      width: '100%',
    },
    informationFields: {
        // put spacing at very top
        paddingVertical: 5,
        // put the icon and information in one row
        flexDirection: 'row',
    },
    event_title: {
        // special styling for the title of each event
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 7,
    }
});
