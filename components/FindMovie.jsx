import React from 'react'
import { StyleSheet, Text, View, Button, FlatList, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
// Pickers
import Select2 from 'react-native-select-two'
import CustomMultiPicker from "react-native-multiple-select-list"
import { Slider, CheckBox } from 'react-native-elements'
import SearchableDropdown from 'react-native-searchable-dropdown';
// API calls
import { getCategoriesFromApi, getPeople } from '../API/TMDBApi'

class FindMovie extends React.Component {

  constructor(props) {
    super(props)
    this.searchedText = ""
    this.state = {
      popularity_checked: false,
      categories_id: [],
      categories_id_selected: [],
      peoples: [],
      peoples_selected: [],
      min_rating: 0,
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

  _tooglePopularityChecked() {
    if(this.state.popularity_checked) {
      this.setState({
        popularity_checked: false
      })
    } else {
      this.setState({
        popularity_checked: true
      })
    }
  }

  navigateToSlider() {
    this.props.navigation.navigate('FindMovieList', {
      similar_movie_id: this.state.similar_movie_id,
      categories_id_selected: this.state.categories_id_selected
    })
  }

  _searchTextInputChanged(text) {
    this.searchedText = text
    getPeople(text).then(data => {
      const first_data = data.results.slice(0, 3)
      this.setState({
        peoples: first_data
      })
    })
  }

  resetSearch() {
    this.searchedText = ""
    this.setState({
      peoples: []
    })
  }

  addPeople(people) {
    if(!this.state.peoples_selected.includes(people)) {
      this.setState({
        peoples_selected: [...this.state.peoples_selected, people]
      })
    }
  }

  removePeople(people) {
    const new_peoples = this.state.peoples_selected.filter(item => item !== people)
    this.setState({
      peoples_selected: new_peoples
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

        <TextInput
          style={styles.textinput}
          placeholder='Acteur'
          onChangeText={(text) => this._searchTextInputChanged(text)}
          onSubmitEditing={() => this.resetSearch()}
        />

        <FlatList
          style={styles.list_peoples}
          data={this.state.peoples}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.peoples_item}
              onPress={() => this.addPeople(item)}>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
        />

         <FlatList
          data={this.state.peoples_selected}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.peoples_item}
              onPress={() => this.removePeople(item)}>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
        />


        <Text>OU</Text>

        <View>
          <Text>Trouver un film similaire :</Text>
          <Select2
            isSelectSingle
            style={{ borderRadius: 5 }}
            colorTheme={'blue'}
            popupTitle='Sélectionner un film'
            title='Sélectionner un film'
            cancelButtonText='Annuler'
            selectButtonText='Valider'
            searchPlaceHolderText='Rechercher film'
            listEmptyTitle='Il faut avoir vu le film'
            data={this.props.seenMovies}
            onSelect={data => this.setState({ similar_movie_id: data })}
            onRemoveItem={data => { this.setState({ similar_movie_id: data })}}
          />
        </View>

        <Button title='Trouver film' onPress={() => {this.navigateToSlider()}} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    paddingHorizontal: 20
  },
  textinput: {
    borderColor: '#e3e5e8',
    height: 50,
    borderWidth: 2,
    paddingLeft: 5,
    borderRadius: 5,
    marginRight: 5
  },
  list_peoples: {
    position: 'absolute',
    marginLeft: 20
  },
  peoples_item: {
    borderWidth: 1,
    borderColor: '#e3e5e8',
    borderRadius: 5,
    padding: 5,
    marginTop: 2,
    backgroundColor: '#e3e5e8'
  }
})

const mapStateToProps = state => {
  return {
    seenMovies: state.toggleSeen.seenMovies
  }
}

export default connect(mapStateToProps)(FindMovie)

