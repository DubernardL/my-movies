import React from 'react'
import { StyleSheet, FlatList, Text, View } from 'react-native'
import MoviesCard from './MoviesCard'
// API calls
import { getSimilarMovies } from '../API/TMDBApi'

class FindMovieList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      films: []
    }
  }

  componentDidMount(){
    this.loadMovies()
  }

  loadMovies() {
    if(this.props.navigation.state.params.similar_movie_id != null) {
      getSimilarMovies(this.props.navigation.state.params.similar_movie_id[0], 1).then(data => {
        this.setState({
          films: [ ...this.state.films, ...data.results ]
        })
      })
    }
  }

  render() {
    return (
      <View style={styles.list}>
        <MoviesCard style={styles.cards} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1
  },
  cards: {
    borderWidth: 3,
    borderColor: 'red'
  }
})


export default FindMovieList
