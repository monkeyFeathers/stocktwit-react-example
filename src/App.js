import React from 'react';
import NavBar from './components/NavBar';
import axios from "axios";
import Container from '@material-ui/core/Container';
import Fade from '@material-ui/core/Fade';
import Stream from './components/Stream';

const symbolStreamsApi = axios.create({
    baseURL: "stocktwits/api/2/streams/symbol/"
});

const ERROR = "ERROR";
const INITIALIZE = "INITIALIZE";
const LOADING = "LOADING";
const LOADED = "LOADED";

export default class App extends React.Component {
    state = {
        symbols: ['AAPL', 'BAC'],
        activeStream: 'AAPL',
        streams: [],
        appState: INITIALIZE,
        error: null
    }

    async componentDidMount() {
        window.app = this;
        await this.fetchStreams();
    }

    async fetchStreams() {
        const { symbols, streams: previousStreams } = this.state;

        this.setState({loading: true});
        try {
            const streams = await Promise.all( symbols.map(symbol => symbolStreamsApi.get(`${symbol}.json`)));
            this.setState({streams, appState: LOADED}) 
        } catch(error) {
            this.setState({error, appState: ERROR, streams: previousStreams});
        }
        this.setState({loading: false});
    }

    changeHandler = (_, value) => {
        this.setState({activeStream: value});
    }

    render () {
      const { symbols, streams, appState, activeStream } = this.state;
      const changeHandler = this.changeHandler;
      let content;

      switch(appState) {
          case INITIALIZE:
              content = "Loading..."
          break;
          case LOADING:
              content = "Loading..."
          break;
          case ERROR:
              content = (<pre>{JSON.stringify(this.state.error, null, 4)}</pre>);
          break;
          case LOADED:
          default:
              content = "no messages";
              if (streams.length) {
                  content = streams.map(stream => {
                      const {symbol: {symbol}} = stream.data;
                      return (
                        <Stream stream={stream.data} isActive={symbol === activeStream} key={`stream-${symbol}`}/>
                      );
                  });
              }
          break;
      } 


      return (
        <div>
          <NavBar symbols={symbols} streams={streams} changeHandler={changeHandler} activeStream={activeStream}/>
            <Container maxWidth={false}>
                { content }
            </Container>
        </div>
      );
    }
}
