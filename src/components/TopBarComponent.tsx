import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

interface Props {
    searchEvent: (searchInput: string) => void;
}

export default class TopBarComponent extends React.Component<Props> {
    inputChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        this.props.searchEvent(event.target.value);
    }
    
    render() {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <span>Kuinox's Pokedex</span>
                        <InputBase
                            onChange={this.inputChange}
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Toolbar>
                </AppBar>
            </div>
        );
    }

}
