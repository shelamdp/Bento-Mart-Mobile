import { StyleSheet, Text, View, Button, FlatList, SafeAreaView, Dimensions, ActivityIndicator, Image, ScrollView } from 'react-native';
import Card from '../components/Card';
import { useQuery, gql } from '@apollo/client';
import { GET_MENUS } from '../queries/menuQueries';
import Carousel from 'react-native-snap-carousel';

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export default function HomeScreen() {
    const { loading, error, data } = useQuery(GET_MENUS);

    if (loading) return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <ActivityIndicator size="large" />
        </View>
    )
    if (error) return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>Ooopsss... something went wrong!</Text>
            <Text>Please wait a moment</Text>
        </View>
    )

    const menus = data.getAllMenus
    const carouselData = [
        {
            title: 'Banner 1',
            image: 'https://hokben-images.s3.ap-southeast-3.amazonaws.com/slider/b521340aede6375c6392262dd2eb6c2a-1685675059206',
        },
        {
            title: 'Banner 2',
            image: 'https://hokben-images.s3.ap-southeast-3.amazonaws.com/slider/525911fbfd26e612ea336f2e756f193b-1675838676547',
        },
        {
            title: 'Banner 3',
            image: 'https://hokben-images.s3.ap-southeast-3.amazonaws.com/slider/b5e1b40f081b3e589d5b2e396edbc22e-1675216494339',
        },
    ];

    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
                <Carousel
                    data={carouselData}
                    renderItem={({ item }) => (
                        <View style={styles.carouselItem}>
                            <Image source={{ uri: item.image }} style={styles.carouselImage} />
                        </View>
                    )}
                    sliderWidth={windowWidth}
                    itemWidth={windowWidth - 20}
                    loop={true}
                    autoplay={true}
                    autoplayInterval={5000}
                />
                <View style={styles.bannerContainer}>
                    <View>
                        <Text style={styles.bannerText}> RECOMMENDATION </Text>
                    </View>
                </View>
                <FlatList
                    data={menus.slice(0, 6)}
                    renderItem={({ item }) => <Card menu={item} />}
                    numColumns={2}
                />
            </SafeAreaView>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        paddingTop: "8%"
    },
    carouselItem: {
        width: windowWidth - 20,
        height: windowHeight / 4,
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 10,
    },
    carouselImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    bannerContainer: {
        // backgroundColor: "#ffc107",
        alignItems: 'center',
        justifyContent: 'center',
    },
    yellowBanner: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 20,
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
