import React from 'react'
import { StyleSheet, Text, View, Button, FlatList, TextInput, TouchableOpacity, ScrollView } from 'react-native'
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
    if(this.state.categories_id_selected.length > 0) {
      this.props.navigation.navigate('FindMovieList', {
        categories_id_selected: this.state.categories_id_selected
      })
    } else if (this.state.peoples_selected.length > 0) {
      this.props.navigation.navigate('FindMovieList', {
        peoples_selected: this.state.peoples_selected
      })
    } else if (this.state.similar_movie_id != null) {
      this.props.navigation.navigate('FindMovieList', {
        similar_movie_id: this.state.similar_movie_id
      })
    }
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

        <Text style={styles.présentation}><Text style={{fontWeight: 'bold'}}>Tu ne sais pas quoi regarder ?</Text> T'es au bon endroit : entre tes filtres et parcours les films sélectionnés en fonction de ces derniers</Text>

        <Text style={styles.text_of_inputs}>Trouver des films par genre(s) :</Text>
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

        <View style={styles.or}>
          <Text style={styles.or_txt}>OU</Text>
        </View>

        <Text style={styles.text_of_inputs}>Trouver des films par acteur(s) :</Text>
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
              style={[styles.peoples_item, {marginTop: 2}]}
              onPress={() => this.addPeople(item)}>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
        />

        <View>
         <FlatList
          style={styles.peoples_selected}
          data={this.state.peoples_selected}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={[styles.peoples_item, {margin: 5}]}
              onPress={() => this.removePeople(item)}>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
        </View>

        <View style={styles.or}>
          <Text style={styles.or_txt}>OU</Text>
        </View>

        <View>
          <Text style={styles.text_of_inputs}>Trouver un film similaire :</Text>
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

        <TouchableOpacity style={[styles.or, {marginTop: 20}]} onPress={() => this.navigateToSlider()}>
          <Text style={[styles.or_txt, {fontSize: 20}]}>Trouver films</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    paddingHorizontal: 20
  },
  présentation: {
    color: '#6dc1c4',
    marginVertical: 20,
    fontSize: 15
  },
  text_of_inputs: {
    color: '#18979b',
    marginBottom: 10,
  },
  textinput: {
    borderColor: '#cecece',
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 7,
    borderRadius: 5
  },
  list_peoples: {
    position: 'absolute',
    marginLeft: 20
  },
  peoples_selected: {
    flexDirection: 'row'
  },
  peoples_item: {
    borderWidth: 1,
    borderColor: '#cecece',
    borderRadius: 5,
    padding: 5,
    backgroundColor: '#cecece'
  },
  or: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10
  },
  or_txt: {
    color: 'white',
    backgroundColor: '#5ed4ff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: '#5ed4ff',
    borderRadius: 30,
    fontWeight: 'bold'
  }
})

const mapStateToProps = state => {
  return {
    seenMovies: state.toggleSeen.seenMovies
  }
}

export default connect(mapStateToProps)(FindMovie)

