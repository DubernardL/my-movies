import React from 'react';
import { StyleSheet, View, Button, TextInput, FlatList, Text, Image, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { getImageFromApi } from '../API/TMDBApi'
import FadeIn from '../animations/FadeIn'

class FilmItem2 extends React.Component {

  _displayFav() {
    if(this.props.isFilmFavorite) {
      return(
        <Image
          style={styles.favorite_image}
          source={require('../assets/plain_heart.png')}
        />
      )
    }
  }

  _displaySeen() {
    if(this.props.isMovieSeen) {
      return(
        <Image
          style={styles.favorite_image}
          source={require('../assets/seen.png')}
        />
      )
    }
  }

  render() {
    const { film, displayDetailForFilm } = this.props

    return (
      <FadeIn>
        <TouchableOpacity
          style={styles.main_container}
          onPress={() => displayDetailForFilm(film.id)}>
          <Image
            style={styles.image}
            source={{uri: getImageFromApi(film.poster_path)}}
          />
          <View style={styles.content_container}>
            <View style={styles.header_container}>
              <Text style={styles.title_text}>{film.title}</Text>
              <Text style={styles.vote_text}>{film.vote_average}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </FadeIn>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flexDirection: 'row',
    paddingVertical: 10,
    marginHorizontal: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#b8d8e0'
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginRight: 5
  },
  content_container: {
    flex: 1,
    margin: 5
  },
  header_container: {
    flex: 3,
    alignItems: 'center',
    flexDirection: 'row'
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 18,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5
  },
  vote_text: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#666666'
  },
  description_container: {
    flex: 7
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666'
  },
  date_container: {
    flex: 1
  },
  date_text: {
    textAlign: 'right',
    fontSize: 14
  },
  favorite_image: {
    width: 25,
    height: 25,
    marginRight: 5
  }
})
export default FilmItem2
