import React from 'react';
import NavBar from './components/NavBar';
import axios from "axios";
import Container from '@material-ui/core/Container';
import Stream from './components/Stream';
// import Typography from '@material-ui/core/Typography';
// import Link from '@material-ui/core/Link';
// import { bottom } from '@material-ui/system';
// import Box from '@material-ui/core/Box';

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Copyright © Javier Quiroz'} {new Date().getFullYear()}{'.'}
//       </Typography>
//   );
// }

const symbolStreamsApi = axios.create({
    baseURL: "stocktwits/api/2/streams/symbol/"
});

export default class App extends React.Component {
    state = {
        symbols: ['aapl'],
        aapl: null,
        streams: [],
        error: null
    }

    async componentDidMount() {
        window.app = this;
        await this.fetchStreams();
    }

    async fetchStreams() {
        const { symbols } = this.state;

        try {
            const streams = await Promise.all( symbols.map(symbol => symbolStreamsApi.get(`${symbol}.json`)));
            this.setState({streams}) 
        } catch(error) {
            this.setState({error});
        }
    }

    render () {
      const content = this.state.streams.length && !this.state.error 
            ? this.state.streams.map(stream => <Stream stream={stream.data} key={stream.data.symbol.symbol} />)
        : (<pre>{JSON.stringify(this.state.error, null, 4)}</pre>);

      return (
        <div>
          <NavBar />
            <Container maxWidth={false}>
                { content }
            </Container>
        </div>
      );
    }
}
