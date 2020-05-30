import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FilmList from './FilmList'
import { getTopRatedFilmsFromApi } from '../API/TMDBApi'

class TopRatedFilms extends React.Component {

  constructor(props) {
    super(props)
    this.page = 0
    this.totalPages = 0
    this.state = {
      films: [],
      isLoading: false
    }
    this._loadFilms = this._loadFilms.bind(this)
  }

  componentDidMount() {
    this._loadFilms()
  }

  _loadFilms() {
    this.setState({ isLoading: true })
    getTopRatedFilmsFromApi(this.page+1).then(data => {
        this.page = data.page
        this.totalPages = data.total_pages
        this.setState({
          films: [ ...this.state.films, ...data.results ],
          isLoading: false
        })
      })
  }

  render() {
    return (
      <View style={styles.main_container}>
        <FilmList
          films={this.state.films}
          navigation={this.props.navigation}
          loadFilms={this._loadFilms}
          page={this.page}
          totalPages={this.totalPages}
          favoriteList={false}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  }
})

export default TopRatedFilms
