import React from 'react'
import moment from 'moment'
import numeral from 'numeral'
import { connect } from 'react-redux'

import { Share, Platform, StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'

import { getFilmDetailFromApi, getImageFromApi } from '../API/TMDBApi';
import EnlargeShrink from '../animations/EnlargeShrink'

class FilmDetail extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      film: undefined,
      isLoading: true
    }
    this._shareFilm = this._shareFilm.bind(this)
    this._toggleFavorite = this._toggleFavorite.bind(this)
  }

  componentDidMount() {
    getFilmDetailFromApi(this.props.navigation.state.params.idFilm)
      .then(data => {
        this.setState({
          film: data,
          isLoading: false
        })
      }, () => { this._updateNavigationParams() })
      return
  }

  // Fonction pour faire passer la fonction _shareFilm et le film aux paramètres de la navigation. Ainsi on aura accès à ces données au moment de définir le headerRight
  _updateNavigationParams() {
    this.props.navigation.setParams({
      shareFilm: this._shareFilm,
      film: this.state.film
    })
  }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state
    // On accède à la fonction shareFilm et au film via les paramètres qu'on a ajouté à la navigation
    if (params.film != undefined && Platform.OS === 'ios') {
      return {
        // On a besoin d'afficher une image, il faut donc passe par une Touchable une fois de plus
        headerRight: <TouchableOpacity
                        style={styles.share_touchable_headerrightbutton}
                        onPress={() => params.shareFilm()}>
                        <Image
                          style={styles.share_image}
                          source={require('../assets/share.android.png')} />
                      </TouchableOpacity>
      }
    }
  }

  _displayFloatingActionButton() {
    const { film } = this.state
    if(film != undefined && Platform.OS === 'android') {
      return (
        <TouchableOpacity
          style={styles.share_touchable_floatingactionbutton}
          onPress={() => this._shareFilm()}>
          <Image
            style={styles.share_image}
            source={require('../assets/share.android.png')} />
        </TouchableOpacity>
      )
    }
  }

  _shareFilm() {
    const { film } = this.state
    Share.share({ title: film.title, message: film.overview })
      .then(
        Alert.alert(
          'Succès',
          'Film partagé',
          [
            {text: 'OK', onPress: ()=> {}}
          ]
        )
      )
      .catch(err =>
        Alert.alert(
          'Echec',
          'Impossible de partager le film',
          [
            {text: 'OK', onPress: ()=> {}}
          ]
        )
      )
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  componentDidUpdate() {
  }

  _toggleFavorite() {
    const action = { type:'TOGGLE_FAVORITE', value: this.state.film }
    this.props.dispatch(action)
  }

  _displayFavoriteImage() {
    let sourceImage = require('../assets/empty_heart.png')
    let shouldEnlarge = false
    if(this.props.favoriteFilm.findIndex(item => item.id === this.state.film.id) !== -1) {
      // Déjà dans les fav
      sourceImage = require('../assets/plain_heart.png')
      shouldEnlarge = true
    }
    return (
        <EnlargeShrink shouldEnlarge={shouldEnlarge}>
          <Image
            source={sourceImage}
            style={styles.favorite_image}/>
        </EnlargeShrink>
      )
  }

  _toggleSeen() {
    const action = { type:'TOGGLE_SEEN', value: this.state.film }
    this.props.dispatch(action)
  }

  _displaySeenImage() {
    let sourceImage = require('../assets/not_seen.png')
    let shouldEnlarge = false
    if(this.props.seenMovies.findIndex(item => item.id === this.state.film.id) !== -1) {
      // Déjà dans les vus
      sourceImage = require('../assets/seen.png')
      shouldEnlarge = true
    }
    return (
        <EnlargeShrink shouldEnlarge={shouldEnlarge}>
          <Image
            source={sourceImage}
            style={styles.favorite_image}/>
        </EnlargeShrink>
      )
  }


  _displayFilm() {
    const { film } = this.state
    if (film != undefined) {
      return (
        <ScrollView style={styles.scrollview_container}>
          <Image
            style={styles.image}
            source={{uri: getImageFromApi(film.backdrop_path)}}
          />
          <Text style={styles.title_text}>{film.title}</Text>

          <View style={styles.icons}>
            <TouchableOpacity
              onPress={() => this._toggleFavorite() }
              style={styles.favorite_container}>
              {this._displayFavoriteImage()}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this._toggleSeen() }
              style={styles.favorite_container}>
              {this._displaySeenImage()}
            </TouchableOpacity>
          </View>

          <Text style={styles.description_text}>{film.overview}</Text>
          <Text style={styles.default_text}>Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
          <Text style={styles.default_text}>Note : {film.vote_average} / 10</Text>
          <Text style={styles.default_text}>Nombre de votes : {film.vote_count}</Text>
          <Text style={styles.default_text}>Budget : {numeral(film.budget).format('0,0[.]00 $')}</Text>
          <Text style={styles.default_text}>Genre(s) : {film.genres.map(function(genre){
              return genre.name;
            }).join(" / ")}
          </Text>
          <Text style={styles.default_text}>Companie(s) : {film.production_companies.map(function(company){
              return company.name;
            }).join(" / ")}
          </Text>
          {this._displayFloatingActionButton()}
        </ScrollView>
      )
    }
  }

  render() {
    return (
      <View style={styles.main_container}>
        {this._displayLoading()}
        {this._displayFilm()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollview_container: {
    flex: 1
  },
  image: {
    height: 169,
    margin: 5
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 35,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center'
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
    margin: 5,
    marginBottom: 15
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  },
  favorite_container: {
    alignItems: 'center',
    marginHorizontal: 15
  },
  favorite_image: {
    flex: 1,
    width: null,
    height: null
  },
  share_touchable_floatingactionbutton: {
    position: 'absolute',
    width: 60,
    height: 60,
    right: 30,
    bottom: 30,
    borderRadius: 30,
    backgroundColor: '#e91e63',
    justifyContent: 'center',
    alignItems: 'center'
  },
  share_image: {
    width: 30,
    height: 30
  }
})

const mapStateToProps = (state) => {
  return {
    favoriteFilm: state.toggleFavorite.favoriteFilm,
    seenMovies: state.toggleSeen.seenMovies
  }
}

export default connect(mapStateToProps)(FilmDetail)
