import { Picker } from '@react-native-picker/picker';
import { StyleSheet } from 'react-native';
import theme from '../theme';

const SortFilter = (props) => {
    const styles = StyleSheet.create({
        container: {
            color: theme.colors.dark,
            margin: theme.positioning.minimumMargin,
            marginTop: 0,
            marginRight: 0,
        },
    });

    const valueChangeHandler = (itemValue) => {
        props.setSelectedFilter(itemValue);
    };

    return (
        <Picker
            style={styles.container}
            selectedValue={props.selectedFilter}
            onValueChange={valueChangeHandler}
        >
            <Picker.Item label="Sort by..." enabled={false} color="grey" />
            <Picker.Item label="Latest repositories" value="LATEST" />
            <Picker.Item
                label="Highest rated repositories"
                value="HIGHEST"
            />
            <Picker.Item
                label="Lowest rated repositories"
                value="LOWEST"
            />
        </Picker>
    );
};

export default SortFilter;
