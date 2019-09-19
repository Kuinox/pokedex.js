import React from 'react';
import { PokemonStore } from "../backend/services/PokemonStore";
import SearchResultComponent from "./SearchResultComponent";
import { createStyles, WithStyles, CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { PokemonName } from '../backend/services/PokeTypes';

const styles = createStyles({
    buttonList: {
        display: "flex",
        flexWrap: "wrap"
    }
});

interface Props extends WithStyles<typeof styles> {
    pokeStore: PokemonStore,
    getSearchText: () => string,
    pokemonChoosedCallback: (pokemonId: string) => void;
}

interface State {
    pokeList: PokemonName[] | null;
}

class PokemonListDisplay extends React.Component<Props, State> {
    pokeStore: PokemonStore;
    pokeListCache: PokemonName[];
    constructor(props: Props) {
        super(props);
        this.pokeStore = props.pokeStore;
        this.state = {
            pokeList: null
        };
        this.pokeListCache = this.props.pokeStore.getPokemonsWithId();
    }

    searchPokemon() {
        let text = this.props.getSearchText();
        const { classes } = this.props;
        return (
            <div className={classes.buttonList}>
                {
                    this.pokeListCache
                        .filter( p=> p.name.match(new RegExp(".*" + text + ".*")))
                        .map((p) => <SearchResultComponent pokeStore={this.props.pokeStore} pokemonId={p.id} key={p.id} pokemonName={p.name} />)
                }
            </div>
        )
    }

    render() {
        return (<ul>{this.searchPokemon()}</ul>);
    }
}

export default withStyles(styles)(PokemonListDisplay);