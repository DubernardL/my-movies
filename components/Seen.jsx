import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import FilmItem2 from './FilmItem2'
import { connect } from 'react-redux'

class Seen extends React.Component {

  _displayDetailForFilm = (idFilm) => {
    this.props.navigation.navigate('FilmDetail', {idFilm: idFilm})
  }

  render() {
    return (
      <FlatList
        data={this.props.seenMovies}
        extraData={[this.props.favoriteFilm, this.props.seenMovies]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <FilmItem2
              film={item}
              isMovieSeen={(this.props.seenMovies.findIndex(film => film.id === item.id) !== -1) ? true : false}
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
    seenMovies: state.toggleSeen.seenMovies
  }
}

export default connect(mapStateToProps)(Seen)





