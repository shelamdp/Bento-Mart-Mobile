import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import CardMenu from '../components/Card';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES, GET_MENUS } from '../queries/menuQueries';
import CategoryButton from '../components/CategoryButton';


export default function MenuScreen({ navigation }) {
    const { loading, error, data } = useQuery(GET_MENUS)
    const { loading: loadingCat, error: errorCat, data: dataCat } = useQuery(GET_CATEGORIES)

    if (loading || loadingCat) return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <ActivityIndicator size="large" />
        </View>
    )

    if (error || errorCat) return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>Ooopsss... something went wrong!</Text>
            <Text>Please wait a moment</Text>
        </View>
    )
    const categories = dataCat.getAllCategories
    const menus = data.getAllMenus

    return (
        <ScrollView>
            <View style={styles.container}>
                <View>
                    <Text style={styles.bannerText}> ALL MENU </Text>
                </View>
                <View style={styles.categoryContainer}>
                    {categories.map((category) => (
                        <CategoryButton key={category} title={category.name} />
                    ))}
                </View>
                <FlatList
                    data={menus}
                    renderItem={({ item }) => <CardMenu menu={item} style={styles.card} />}
                    numColumns={2}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: "8%",
    },
    categoryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    card: {
        flexDirection: "row",
    },
    bannerText: {
        width: "100%",
        // backgroundColor: "#ffc107",
        padding: 20,
        fontSize: 18,
        fontWeight: 'bold',
        color: "#d91319"
    },
})