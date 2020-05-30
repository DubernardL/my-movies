import React from 'react'
import { StyleSheet, Text, Image } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import Search from '../components/search'
import FilmDetail from '../components/FilmDetail'
import Favorites from '../components/Favorites'
import News from '../components/News'
import TopRatedFilms from '../components/Top'

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

const NewsStackNavigator = createStackNavigator({
  News: {
    screen: News,
    navigationOptions: {
      title: 'News'
    },
    FilmDetail: {
      screen: FilmDetail
    }
  }
})

const TopStackNavigator = createStackNavigator({
  TopRatedFilms: {
    screen: TopRatedFilms,
    navigationOptions: {
      title: 'Top Films'
    },
    FilmDetail: {
      screen: FilmDetail
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
    News: {
      screen: NewsStackNavigator,
      navigationOptions: {
        tabBarIcon: () => {
          return <Image
            source={require('../assets/new.png')}
            style={styles.icon}/>
        }
      }
    },
    TopRatedFilms: {
      screen: TopStackNavigator,
      navigationOptions: {
        tabBarIcon: () => {
          return <Image
            source={require('../assets/trophy.png')}
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
