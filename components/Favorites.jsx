import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import FilmItem2 from './FilmItem2'
import { connect } from 'react-redux'

class Favorites extends React.Component {

  _displayDetailForFilm = (idFilm) => {
    this.props.navigation.navigate('FilmDetail', {idFilm: idFilm})
  }

  render() {
    return (
      <FlatList
        data={this.props.favoriteFilm}
        extraData={[this.props.favoriteFilm, this.props.seenMovies]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <FilmItem2
              film={item}
              isFilmFavorite={(this.props.favoriteFilm.findIndex(film => film.id === item.id) !== -1) ? true : false}
              displayDetailForFilm={this._displayDetailForFilm}
            />
        )}
      />
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  avatar_container: {
    alignItems: 'center'
  }
})

const mapStateToProps = state => {
  return {
    favoriteFilm: state.toggleFavorite.favoriteFilm,
    seenMovies: state.toggleSeen.seenMovies
  }
}

export default connect(mapStateToProps)(Favorites)
