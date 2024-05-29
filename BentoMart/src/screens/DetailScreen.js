import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { gql, useQuery } from '@apollo/client';
import { GET_DETAIL } from '../queries/menuQueries';

export default function DetailScreen({ route }) {
  const navigation = useNavigation()
  const { id } = route.params

  const { loading, error, data } = useQuery(GET_DETAIL, {
    variables: {
      getDetailMenuId: id
    }
  })

  if (loading) return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  )

  if (error) return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Ooops... something went wrong!</Text>
      <Text>Please wait a moment</Text>
    </View>
  )

  const menu = data.getDetailMenu

  return (
    <View style={styles.container}>
      <Image source={{ uri: menu.imgUrl }} style={styles.image} />
      <Text style={styles.author}>Made by chef {menu.username}</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{menu.name}</Text>
        <Text style={styles.price}>Rp. {menu.price}</Text>
        <Text style={styles.sectionTitle}>Ingredients:</Text>
        {menu.Ingredients.map((ingredient, index) => (
          <Text key={index} style={styles.ingredient}>{ingredient.name}</Text>
        ))}
        <Text style={styles.sectionTitle}>Descriptions:</Text>
        <Text style={styles.description}>{menu.description}</Text>
        <View style={styles.buttonsContainer}>
          <Button
            mode="outlined"
            textColor="#dc3545"
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            Back
          </Button>
          <Button
            mode="contained"
            buttonColor='#ffc107'
            textColor="black"
            onPress={() => { }}
            style={styles.orderButton}
          >
            + Order
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 20,
  },
  detailsContainer: {
    paddingHorizontal: 20,
    width: '100%',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    color: '#d91319',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 8
  },
  ingredient: {
    fontSize: 14,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    marginBottom: 20,
  },
  author: {
    color: "#6c757d",
    fontSize: 12,
    marginBottom: 15,
    // fontWeight: "bold"
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  backButton: {
    flex: 1,
    marginRight: 10,
    borderColor: '#dc3545',
    borderWidth: 2,
  },
  orderButton: {
    flex: 1,
    marginLeft: 10,
  },
});
