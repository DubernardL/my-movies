import React from 'react'
import { ActivityIndicator, StyleSheet, FlatList, Text, View, Button, Image } from 'react-native'
import { connect } from 'react-redux'

// API calls
import { getSimilarMovies, getImageFromApi, getMoviesByGenre, getMoviesByPeople } from '../API/TMDBApi'
import Swiper from 'react-native-deck-swiper'

class FindMovieList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      cards: [],
      page: 1,
      total_pages: 10,
      length_card: 0,
      isLoading: false,
      allSwipped: false
    }
  }

  componentDidMount(){
    this.setState({ isLoading: true })
    this.loadMovies()
  }

  loadMovies() {
    // SIMILAR MOVIES
    if(this.props.navigation.state.params.similar_movie_id != undefined) {
      const movie_id = this.props.navigation.state.params.similar_movie_id[0]
      getSimilarMovies(movie_id, 1).then(data => {
        this.setState({
          cards: data,
          isLoading: false
        })
      })
    }
    // MOVIES GENRE
    if(this.props.navigation.state.params.categories_id_selected != undefined) {
      getMoviesByGenre(this.props.navigation.state.params.categories_id_selected, this.state.page+1).then(data => {
        this.setState({
          cards: data,
          isLoading: false
        })
      })
    }
    // MOVIES OF PEOPLE
    if(this.props.navigation.state.params.peoples_selected != undefined) {
      getMoviesByPeople(this.props.navigation.state.params.peoples_selected, this.state.page+1).then(data => {
        this.setState({
          cards: data,
          isLoading: false
        })
      })
    }
  }

  renderCard = (card, index) => {
    if (card != undefined) {
      return (
        <View style={styles.card}>
          <View style={styles.img_container}>
            {this.diplayFav(card)}
            {this.diplaySeen(card)}
          </View>
          <View style={styles.img}>
            <Image
              style={styles.poster}
              source={{uri: getImageFromApi(card.poster_path)}}
            />
          </View>
          <View style={styles.description}>
            <Text style={styles.title}>{card.title}</Text>
            <Text style={styles.overview} numberOfLines={7}>{card.overview}</Text>
          </View>
        </View>
      )
    }
  }

  diplayFav(movie) {
    const favContain = this.props.favoriteFilm.find(e => e.id === movie.id)
    if(favContain != undefined) {
      return(<Image source={require('../assets/plain_heart.png')} style={styles.favorite_image}/>)
    }
  }

  diplaySeen(movie) {
    const seenContain = this.props.seenMovies.find(e => e.id === movie.id)
    if(seenContain != undefined) {
      return(<Image source={require('../assets/seen.png')} style={styles.favorite_image}/>)
    }
  }

  addMovieToFav(movie) {
    const action = { type:'TOGGLE_FAVORITE', value: movie }
    this.props.dispatch(action)
  }

  addMovieToSeen(movie) {
    const action = { type:'TOGGLE_SEEN', value: movie }
    this.props.dispatch(action)
  }

  onSwiped = (type, cardIndex) => {
    const movie = this.state.cards[cardIndex]
    const favContain = this.props.favoriteFilm.find(e => e.id === movie.id)
    const seenContain = this.props.seenMovies.find(e => e.id === movie.id)

    if(type === 'right' && favContain === undefined) {
      this.addMovieToFav(movie)
    }
    if(type === 'top' && seenContain === undefined) {
      this.addMovieToSeen(movie)
    }
  }

  swipeLeft = () => {
    this.swiper.swipeLeft()
  }

  allCardsSwipped() {
    console.log('ALL SWIPPED')
    if (this.state.allSwipped) {
      return(
        <View style={styles.container_all_swipped}>
          <Text style={styles.txt_all_swipped}>On pas plus de films pour les critères que tu as entrés...</Text>
        </View>
      )
    }
  }

  swipperOn() {
    return (
      <Swiper
          ref={swiper => {
            this.swiper = swiper
          }}
          onSwipedAll={() => this.setState({ allSwipped: true }) }
          useViewOverflow={false}
          onSwipedLeft={() => this.onSwiped('left', this.cardIndex)}
          onSwipedRight={() => this.onSwiped('right', this.cardIndex)}
          onSwipedTop={() => this.onSwiped('top', this.cardIndex)}
          disableBottomSwipe={true}
          onTapCard={this.swipeLeft}
          cards={this.state.cards}
          onSwiped={(cardIndex) => {this.cardIndex = cardIndex}}
          cardIndex={0}
          cardVerticalMargin={40}
          renderCard={this.renderCard}
          backgroundColor={'#5ed4ff'}
          stackSize={2}
          stackSeparation={0}
          overlayLabels={{
            left: {
              title: 'NOPE',
              style: {
                label: {
                  backgroundColor: '#dd2121',
                  borderColor: '#dd2121',
                  color: 'white',
                  borderWidth: 1
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start',
                  marginTop: 30,
                  marginLeft: -30
                }
              }
            },
            right: {
              title: 'LIKE',
              style: {
                label: {
                  backgroundColor: '#16cc43',
                  borderColor: '#16cc43',
                  color: 'white',
                  borderWidth: 1
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  marginTop: 30,
                  marginLeft: 30
                }
              }
            },
            top: {
              title: 'DÉJÀ VU',
              style: {
                label: {
                  backgroundColor: 'grey',
                  borderColor: 'grey',
                  color: 'white',
                  borderWidth: 1
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }
              }
            }
          }}
          animateOverlayLabelsOpacity
          animateCardOpacity
        >
        </Swiper>
      )
  }

  displaySwipper() {
    if(this.state.cards.length != 0) {
      return this.swipperOn()
    }
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <Text>On cherche tes films :D</Text>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  render () {
    return (
      <View style={styles.container}>
        {this.displaySwipper()}
        {this._displayLoading()}
        {this.allCardsSwipped()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  card: {
    height: 530,
    borderWidth: 2,
    borderRadius: 7,
    borderColor: '#EDEDED',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 20
  },
  img: {
    alignItems: 'center'
  },
  poster: {
    width: 200,
    height: 290
  },
  title: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 20
  },
  img_container: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  favorite_image: {
    height: 40,
    width: 40,
    marginBottom: 10,
    opacity: 0.5
  },
  overview: {
    fontSize: 12
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container_all_swipped: {
    flex: 1,
    padding: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txt_all_swipped: {
    color: 'white',
    textAlign: 'center',
    fontSize: 30
  }
})

const mapStateToProps = (state) => {
  return {
    favoriteFilm: state.toggleFavorite.favoriteFilm,
    seenMovies: state.toggleSeen.seenMovies
  }
}

export default connect(mapStateToProps)(FindMovieList)