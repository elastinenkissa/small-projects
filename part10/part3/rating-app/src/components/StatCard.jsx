import { StyleSheet, View } from 'react-native';
import Text from './customUI/Text';

const StatCard = (props) => {
    const styles = StyleSheet.create({
        flexContainer: {
            alignItems: 'center',
        },
    });
    return (
        <View style={styles.flexContainer}>
            <Text fontWeight="bold">
                {props.stat >= 1000
                    ? `${(props.stat / 1000).toFixed(1)}k`
                    : props.stat}
            </Text>
            <Text color="primary">{props.statName}</Text>
        </View>
    );
};

export default StatCard;
