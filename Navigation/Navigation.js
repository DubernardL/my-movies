import React from 'react'
import { StyleSheet, Text, Image } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import Search from '../components/search'
import FilmDetail from '../components/FilmDetail'
import Favorites from '../components/Favorites'
import Seen from '../components/Seen'
import FindMovie from '../components/FindMovie'

const SearchStackNavigator1 = createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions: {
      title: 'Rechercher'
    }
  },
  FilmDetail: {
    screen: FilmDetail
  }
});

const FavoritesStackNavigator = createStackNavigator({
  Favorites: {
    screen: Favorites,
    navigationOptions: {
      title: 'Favoris'
    }
  },
  FilmDetail: {
    screen: FilmDetail
  }
})

const SeenStackNavigator = createStackNavigator({
  Seen: {
    screen: Seen,
    navigationOptions: {
      title: 'Films vus'
    }
  },
  FilmDetail: {
    screen: FilmDetail
  }
})

const FindMovieStackNavigator = createStackNavigator({
  FindMovie: {
    screen: FindMovie,
    navigationOptions: {
      title: 'Trouver un film'
    }
  }
})

const MoviesTabNavigator = createBottomTabNavigator(
  {
    Search: {
      screen: SearchStackNavigator1,
      navigationOptions: {
        tabBarIcon: () => {
          return <Image
            source={require('../assets/research.png')}
            style={styles.icon}/>
        }
      }
    },
    Favorites: {
      screen: FavoritesStackNavigator,
      navigationOptions: {
        tabBarIcon: () => {
          return <Image
            source={require('../assets/plain_heart.png')}
            style={styles.icon}/>
        }
      }
    },
    Seen: {
      screen: SeenStackNavigator,
      navigationOptions: {
        tabBarIcon: () => {
          return <Image
            source={require('../assets/seen.png')}
            style={styles.icon}/>
        }
      }
    },
    FindMovie: {
      screen: FindMovieStackNavigator,
      navigationOptions: {
        tabBarIcon: () => {
          return <Image
            source={require('../assets/seen.png')}
            style={styles.icon}/>
        }
      }
    }
  },
  {
    tabBarOptions: {
      activeBackgroundColor: '#DDDDDD',
      inactiveBackgroundColor: '#FFFFFF',
      showLabel: false,
      showIcon: true
    }
  }
)

const SearchStackNavigator = createAppContainer(MoviesTabNavigator)

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  }
})

export default SearchStackNavigator
