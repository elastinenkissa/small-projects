const theme = {
    colors: {
        dark: '#24292e',
        light: '#ffffff',
        primary: '#0366d6',
        error: '#D8000C',
        errorBackground: '#FFBABA',
    },
    fontSizes: {
        body: 14,
        subheading: 16,
        heading: 25,
    },
    fonts: {
        main: 'System',
        android: 'Roboto',
        ios: 'Arial',
    },
    fontWeights: {
        normal: '400',
        bold: '900',
    },
    horizontalContainer: {
        flexGrow: 1,
        justifyContent: 'space-around',
        flexDirecton: 'row',
        alignItems: 'center',
    },
    borders: {
        borderRadius: 3,
        borderWidth: 0.5,
    },
    positioning: {
        minimumMargin: 10,
        minimumPadding: 10,
    },
    components: {
        card: {
            padding: 10,
            paddingTop: 15,
            paddingBottom: 15,
            borderRadius: 3,
            margin: 0,
            textAlign: 'center',
        },
    },
    visibility: {
        greyed: 0.5
    }
};

export default theme;
