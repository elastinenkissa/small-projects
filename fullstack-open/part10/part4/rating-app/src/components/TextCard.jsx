import { StyleSheet } from 'react-native';
import theme from '../theme';
import Text from './customUI/Text';

const TextCard = ({ style, ...props }) => {
    const styles = StyleSheet.create({
        card: {
            ...theme.components.card,
        },
    });
    const cardStyle = [styles.card, style];
    return (
        <Text blue style={cardStyle} {...props}>
            {props.children}
        </Text>
    );
};

export default TextCard;
