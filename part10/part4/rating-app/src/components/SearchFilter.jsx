import { StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import theme from '../theme';

const SearchFilter = (props) => {
    const styles = StyleSheet.create({
        searchbar: {
            margin: theme.positioning.minimumMargin,
        },
    });

    return (
        <Searchbar
            style={styles.searchbar}
            placeholder="Search"
            onChangeText={(query) => props.setSearchQuery(query)}
            value={props.searchQuery}
        />
    );
};

export default SearchFilter;
