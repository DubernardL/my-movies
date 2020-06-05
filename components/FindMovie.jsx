import React from 'react'
import { StyleSheet, Text, View, Button, FlatList } from 'react-native'
import { connect } from 'react-redux'
// Pickers
import Select2 from 'react-native-select-two'
import CustomMultiPicker from "react-native-multiple-select-list"
import { Slider, CheckBox } from 'react-native-elements'
import SearchableDropdown from 'react-native-searchable-dropdown';
// API calls
import { getCategoriesFromApi } from '../API/TMDBApi'

class FindMovie extends React.Component {

  constructor(props) {
    super(props)
    this.page = 0
    this.totalPages = 0
    this.state = {
      checked: false,
      popularity_status: false,
      categories_id: [],
      categories_id_selected: [],
      min_rating: 0,
      popularity: 40,
      similar_movie_id: null
    }
  }

  componentDidMount() {
    getCategoriesFromApi().then(data => {
      this.setState({
        categories_id: [ ...this.state.categories_id, ...data.genres ]
      })
    })
  }

  _toogleChecked() {
    if(this.state.checked) {
      this.setState({
        checked: false,
        popularity_status: false
      })
    } else {
      this.setState({
        checked: true,
        popularity_status: true,
      })
    }
  }

  navigateToSlider() {
    this.props.navigation.navigate('FindMovieList', {
      similar_movie_id: this.state.similar_movie_id
    })
  }

  render() {
    const { navigation } = this.props
    return (
      <View style={styles.main_container}>

        <Select2
          style={{ borderRadius: 5 }}
          colorTheme={'blue'}
          popupTitle='Selectionner un ou plusieurs genres'
          title='Selection genre(s)'
          cancelButtonText='Annuler'
          selectButtonText='Valider'
          searchPlaceHolderText='Entrez un genre'
          listEmptyTitle='Désolé on a pas :/'
          data={this.state.categories_id}
          onSelect={data => this.setState({ categories_id_selected: data })}
          onRemoveItem={data => { this.setState({ categories_id_selected: data })}}
        />

        <Text>Note minimale : {this.state.min_rating}</Text>
        <Slider
          value={this.state.value}
          onValueChange={value => this.setState({ min_rating: value })}
          maximumValue={10}
          minimumValue={0}
          step={1}
          thumbTintColor={ '#00a9ff' }
          maximumTrackTintColor={"#B3B3B3"}
          minimumTrackTintColor={"#00a9ff"}
        />

        <CheckBox
          center
          title='Trouver dans les films les plus populaires'
          iconRight
          checked={this.state.checked}
          onPress={() => {}}
        />


        <Select2
          isSelectSingle
          style={{ borderRadius: 5 }}
          colorTheme={'blue'}
          popupTitle='Selectionner un ou plusieurs genres'
          title='Selection genre(s)'
          cancelButtonText='Annuler'
          selectButtonText='Valider'
          searchPlaceHolderText='Entrez un genre'
          listEmptyTitle='Désolé on a pas :/'
          data={this.props.seenMovies}
          onSelect={data => this.setState({ similar_movie_id: data })}
          onRemoveItem={data => { this.setState({ similar_movie_id: data })}}
        />

        <Button title='Trouver film' onPress={() => {this.navigateToSlider()}} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    paddingHorizontal: 20
  }
})

const mapStateToProps = state => {
  return {
    seenMovies: state.toggleSeen.seenMovies
  }
}

export default connect(mapStateToProps)(FindMovie)

