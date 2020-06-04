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
      min_rating: [0],
      popularity: false,
      similar_movie_id: []
    }
  }

  componentDidMount() {
    getCategoriesFromApi().then(data => {
      this.setState({
        categories_id: [ ...this.state.categories_id, ...data.genres ]
      })
    })
  }
  enableScroll = () => this.setState({ scrollEnabled: true });
  disableScroll = () => this.setState({ scrollEnabled: false });

  _toogleChecked() {
    if(this.state.checked) {
      this.setState({
        checked: false,
        popularity: false
      })
    } else {
      this.setState({
        checked: true,
        popularity: true
      })
    }
  }

  render() {
    const notes = {"1":"1", "2":"2", "3":"3", "4":"4", "5":"5", "6":"6", "7":"7", "8":"8", "9":"9", "10":"10"}

    const similar = [
      { id: 1, name: 'xx ezdcze' },
      { id: 2, name: 'cecezcez' },
      { id: 3, name: 'cezcezcez' },
      { id: 4, name: 'czeczecze' },
      { id: 5, name: 'cezczeczec' },
      { id: 6, name: 'brtrbtrtb6' },
      { id: 7, name: 'brtbrtbr' },
      { id: 8, name: 'brttbrbrt' },
      { id: 9, name: 'brtbrtbrb' },
      { id: 10, name: 'vcxv' }
    ]


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
          title='Trouver dans les films les plus populaire'
          iconRight
          checked={this.state.checked}
          onPress={() => {this._toogleChecked()}}
        />

        <Text>{this.state.popularity}</Text>

        <CustomMultiPicker
          options={notes}
          search={false}
          multiple={false}
          returnValue={"label"} // label or value
          callback={(data)=>{ this.setState({ data }) }} // callback, array of selected items
          rowBackgroundColor={"#eee"}
          rowHeight={40}
          rowRadius={5}
          iconColor={"#00a2dd"}
          iconSize={30}
          scrollViewHeight={130}
        />


        <Button title='Trouver film' onPress={() => {}} />


        <Text> ///////// genre //////</Text>
        <FlatList
          data={this.state.categories_id_selected}
          keyExtractor={(item) => item.toString()}
          renderItem={({item}) => (
            <Text>{item}</Text>
          )}
        />

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
