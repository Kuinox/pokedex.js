import React from 'react';
import { CircularProgress, Button } from '@material-ui/core';
import { withStyles, createStyles, WithStyles } from '@material-ui/styles';
import { PokemonStore } from '../backend/services/PokemonStore';
const styles = createStyles({
    li: {
        listStyleType: "none",
        width: "200px",
        minHeight: "100px",
    },
    liWidth: {
        maxHeight: "200px",
    },
    button: {
        width: "100%",
        height: "100%"
    },
    buttonContent: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "100%"
    },
    selected: {
        background: "rgba(255, 255, 255, 0.5)"
    }
});

interface Props extends WithStyles<typeof styles> {
    pokeStore: PokemonStore
    pokemonName: string,
    pokemonId: number,
}

interface State {
    open: boolean;
}


class SearchResultComponent extends React.Component<Props, State>{
    state: State = {
        open: false
    }

    pokemonName: string;
    constructor(props: Props) {
        super(props);
        this.pokemonName = props.pokemonName
    }

    clicked = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        this.setState({ open: !this.state.open });
    }

    pokeInfo() {
        const { classes } = this.props;
        if (!this.state.open) {
            return;
        }
        return <div>
            Types:
            <ul>
                {this.props.pokeStore.getPokemonTypesWithId(this.props.pokemonId).map((s, i) => <li key={i}>{s}</li>)}
            </ul>
            Stats:
            <ul>
                {this.props.pokeStore.getStatsWithId(this.props.pokemonId).map((s, i) => <li key={i}>{s.statsName} {s.value}</li>)}
            </ul>
        </div>
    }

    render() {
        const { classes } = this.props;
        let imgSrc = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + this.props.pokemonId + ".png"
        let css = classes.li;
        if (this.state.open) {
            css += " " + classes.selected;
        } else {
            css += " " + classes.liWidth;
        }
        return (
            <li className={css}>
                <Button className={classes.button} onClick={this.clicked} >
                    <div className={classes.buttonContent}>
                        <img src={imgSrc} />
                        {this.pokemonName}
                        {this.pokeInfo()}
                        <br />
                    </div>
                </Button>
            </li>);
    }
}

export default withStyles(styles)(SearchResultComponent);