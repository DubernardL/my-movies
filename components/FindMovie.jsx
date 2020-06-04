import React from 'react'
import { StyleSheet, Text, View, Button, FlatList } from 'react-native'
import FindMovieInputs from './FindMovieInputs'
import { getCategoriesFromApi } from '../API/TMDBApi'
import Select2 from 'react-native-select-two'
import CustomMultiPicker from "react-native-multiple-select-list"
import { Slider, CheckBox } from 'react-native-elements';

class FindMovie extends React.Component {

  constructor(props) {
    super(props)
    this.page = 0
    this.totalPages = 0
    this.state = {
      checked: false,
      categories_id: [],
      categories_id_selected: [],
      min_rating: 0,
      popularity_status: false,
      popularity: 40,
      similar_movie_id: [],
      films: []
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

  _findMovies() {

  }

  render() {
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
          onPress={() => {this._toogleChecked()}}
        />

        <Button title='Trouver film' onPress={this._findMovies()} />
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

export default FindMovie;
