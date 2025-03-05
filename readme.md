## Short sumarry

This is simple project displaying Star Wars characters from free Star Wars API (https://swapi.py4e.com/). It is React Native application using Expo, Expo Router for routing, Nativewind + Tailwind for component styling and Axios + React Query for data fetching and caching. When user land on the first screen he is presented with the first 10 Star Wars characters and as he scrolls down there are another characters loaded (there is infinite scroll implemented). User can also "pull-to-refresh" to get the fresh characters from API if he wants to. There is also search bar, where user can search among these characters and the result of the search is displayed below. User can see the detail of every character by pressing the character card, and he gets to the Character Detail page, where is more detailed data about specific character.
! I have tried using proposed endpoint for character images -> https://starwars-
visualguide.com/assets/img/characters/{id}.jpg but it didn't work. So I have found one github repository that stores these images and used that (https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/${characterId}.jpg)
The only sensible filtering I have found only for search, the API documentation doesn't provide information on any other filters I can use on the API.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the Expo Go where you can choose in which device to start your app.
