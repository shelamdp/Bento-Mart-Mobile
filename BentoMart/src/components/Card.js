import { Avatar, Button, Card, Text } from 'react-native-paper';
import { FlatList, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
export default function CardMenu({ menu }) {
    const theme = useTheme();
    const navigation = useNavigation()
    return (
        <Card style={styles.card}>
            <Card.Title title={menu.name}/>
            <Card.Cover source={{ uri: menu.imgUrl }} style={styles.image} />
            <Text style={styles.price} variant="bodyMedium">Rp. {menu.price}</Text>
            <Card.Actions >
                <Button style={styles.button} textColor='#dc3545' title="Detail"
                    onPress={() => {
                        navigation.navigate('Detail', {
                            id: menu.id,
                        })
                    }}>Detail</Button>
                <Button buttonColor='#ffc107' style={styles.button} textColor='black' title="Order">+Order</Button>
            </Card.Actions>
        </Card>
    )
}

const styles = StyleSheet.create({
    card: {
        margin: 10,
        padding: 10,
    },
    image: {
        maxWidth: 150,
        marginLeft: 2
    },
    price: {
        marginLeft: 10,
        marginTop: 10,
        fontSize: 12
    },
    action:{
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    button: {
        width: "18%",
        height: "80%",
    }
})