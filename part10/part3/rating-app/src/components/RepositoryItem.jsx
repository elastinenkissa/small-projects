import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import theme from '../theme';
import Text from './customUI/Text';
import StatCard from './StatCard';

const RepositoryItem = (props) => {
    const styles = StyleSheet.create({
        container: {
            backgroundColor: '#ffffff',
            padding: 15,
        },
        image: {
            width: 40,
            height: 40,
            borderRadius: 3,
        },
        language: {
            padding: 5,
            borderRadius: theme.borders.borderRadius,
        },
        flexContainer1: {
            flexDirection: 'row',
        },
        flexContainerChild2: {
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            height: 80,
            marginLeft: 10,
            marginBottom: 10,
        },
        flexContainer2: {
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-around',
        },
    });
    return (
        <View style={styles.container}>
            <View style={styles.flexContainer1}>
                <View>
                    <Image
                        style={styles.image}
                        source={{ uri: props.item.ownerAvatarUrl }}
                    />
                </View>
                <View style={styles.flexContainerChild2}>
                    <Text fontWeight="bold">{props.item.fullName}</Text>
                    <Text>{props.item.description}</Text>
                    <Text blue light style={styles.language}>
                        {props.item.language}
                    </Text>
                </View>
            </View>
            <View style={styles.flexContainer2}>
                <StatCard stat={props.item.stargazersCount} statName="Stars" />
                <StatCard stat={props.item.forksCount} statName="Forks" />
                <StatCard stat={props.item.reviewCount} statName="Reviews" />
                <StatCard stat={props.item.ratingAverage} statName="Rating"/>
            </View>
        </View>
    );
};

export default RepositoryItem;
