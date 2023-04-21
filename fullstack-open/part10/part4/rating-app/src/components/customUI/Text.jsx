import { Text as NativeText, StyleSheet, Platform } from 'react-native';

import theme from '../../theme';

const Text = ({ style, ...props }) => {
    const styles = StyleSheet.create({
        text: {
            color: theme.colors.textPrimary,
            fontSize: theme.fontSizes.body,
            fontFamily: Platform.select({
                android: theme.fonts.android,
                ios: theme.fonts.ios
            }),
            fontWeight: theme.fontWeights.normal,
        },
        colorTextSecondary: {
            color: theme.colors.light,
        },
        colorPrimary: {
            color: theme.colors.primary,
        },
        fontSizeSubheading: {
            fontSize: theme.fontSizes.subheading,
        },
        fontSizeHeading: {
            fontSize: theme.fontSizes.heading,
        },
        fontWeightBold: {
            fontWeight: theme.fontWeights.bold,
        },
        backgroundBlue: {
            backgroundColor: theme.colors.primary,
        },
    });
    const textStyle = [
        styles.text,
        props.light && styles.colorTextSecondary,
        props.color === 'primary' && styles.colorPrimary,
        props.fontSize === 'subheading' && styles.fontSizeSubheading,
        props.fontSize === 'heading' && styles.fontSizeHeading,
        props.fontWeight === 'bold' && styles.fontWeightBold,
        props.blue && [styles.backgroundBlue, styles.colorTextSecondary],
        style,
    ];

    return <NativeText style={textStyle} {...props} />;
};

export default Text;
