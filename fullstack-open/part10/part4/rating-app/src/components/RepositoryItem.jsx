import React from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';
import theme from '../theme';
import Text from './customUI/Text';
import StatCard from './StatCard';
import * as Linking from 'expo-linking';
import TextCard from './TextCard';

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
            ...theme.components.card,
            paddingTop: 5,
            paddingBottom: 5,
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
        button: {
            marginTop: 20,
        },
    });
    return (
        <View testID="repositoryItem" style={styles.container}>
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
                    <TextCard style={styles.language}>
                        {props.item.language}
                    </TextCard>
                </View>
            </View>
            <View style={styles.flexContainer2}>
                <StatCard stat={props.item.stargazersCount} statName="Stars" />
                <StatCard stat={props.item.forksCount} statName="Forks" />
                <StatCard stat={props.item.reviewCount} statName="Reviews" />
                <StatCard stat={props.item.ratingAverage} statName="Rating" />
            </View>
            {props.singleView && (
                <Pressable onPress={() => Linking.openURL(props.item.url)}>
                    <TextCard fontWeight="bold" style={styles.button}>
                        Open in GitHub
                    </TextCard>
                </Pressable>
            )}
        </View>
    );
};

export default RepositoryItem;
