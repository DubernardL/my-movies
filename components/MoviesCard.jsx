import React from 'react'
import { Styles, StyleSheet, FlatList, Text, View, Animated, PanResponder } from 'react-native'
import { connect } from 'react-redux'

class MoviesCard extends React.Component {

 constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY()
    };
  }

  render() {
    return (
      <View style={styles.card}>
        <View style={styles.photo}></View>
        <View style={styles.infos}>
          <Text>Title</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 15
  },
  photo: {
    flex: 4,
    backgroundColor:'blue',
    borderTopRightRadius: 5,
    borderTopLeftRadius:5
  },
  infos: {
    flex: 1,
    backgroundColor:'grey',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius:5
  }
})

const mapStateToProps = state => {
  return {
    favoriteFilm: state.toggleFavorite.favoriteFilm,
    seenMovies: state.toggleSeen.seenMovies
  }
}

export default connect(mapStateToProps)(MoviesCard)
