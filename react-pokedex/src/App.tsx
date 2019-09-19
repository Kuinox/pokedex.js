import React from 'react';
import TopBarComponent from './components/TopBarComponent';
import { PokemonStore } from "kuinox-pokedex-backend";
import CssBaseline from '@material-ui/core/CssBaseline';
import PokemonListDisplay from "./components/PokemonListDisplay";
interface Props {
  pokeStore: PokemonStore;
}

interface State {
  searchInput: string,
  currentPokemon: string
}

export default class App extends React.Component<Props, State>  {
  state: State = {
    searchInput: "",
    currentPokemon: ""
  };

  searchInputEvent = (searchInput: string) => this.setState({ searchInput: searchInput });
  pokemonChoosedEvent = (pokemonName: string) => this.setState({ currentPokemon: pokemonName });

  render() {
    return (
      <div className="App">
        <CssBaseline />
        <header className="App-header">
          <TopBarComponent searchEvent={this.searchInputEvent} />
          <PokemonListDisplay
            pokeStore={this.props.pokeStore}
            getSearchText={() => this.state.searchInput}
            pokemonChoosedCallback={this.pokemonChoosedEvent} />
        </header>
      </div>
    );
  }
}
