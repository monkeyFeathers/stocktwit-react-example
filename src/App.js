import axios from "axios";
import React from "react";
import { isEqual, isEmpty } from "lodash";
import theme from "./theme";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Skeleton from "@material-ui/lab/Skeleton";
import Stream from "./components/Stream";
import NavBar from "./components/NavBar";
import ShowChartIcon from "@material-ui/icons/ShowChart";

const symbolStreamsApi = axios.create({
  baseURL: "stocktwits/api/2/streams/symbol/",
});

const ERROR = "ERROR";
const INITIALIZE = "INITIALIZE";
const LOADING = "LOADING";
const LOADED = "LOADED";

const styles = {
  root: {
    marginTop: "3rem",
  },
  loader: {
    flexGrow: 1,
  },
  paper: {
    margin: `${theme.spacing(1)}px`,
    padding: theme.spacing(1),
  },
};

function Loader() {
  return (
    <Grid container style={styles.loader}>
      <Grid item xs={12}>
        <Paper style={styles.paper}>
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
        </Paper>
      </Grid>
    </Grid>
  );
}

function NoMessages() {
  return (
    <Paper
      style={{
        height: "20rem",
        width: "20rem",
        margin: "auto",
        textAlign: "center",
      }}>
      <div style={{ margin: "3rem auto" }}>
        <ShowChartIcon style={{ fontSize: "10rem" }} />
      </div>
      <div style={{ margin: "auto" }}>No messages</div>
    </Paper>
  );
}

export default class App extends React.Component {
  state = {
    symbols: [],
    streams: [],
    messages: [],
    appState: INITIALIZE,
    error: null,
  };

  async componentDidMount() {
    await this.fetchStreams();
  }
  componentDidUpdate(_, { symbols: prevSymbols }) {
    const { symbols } = this.state;

    if (!isEqual(symbols, prevSymbols)) {
      if (isEmpty(symbols)) {
        this.setState({ streams: [], messages: [] });
      } else {
        this.fetchStreams();
      }
    }
  }

  async fetchStreams() {
    const { symbols } = this.state;

    if (symbols.length) {
      this.setState({ appState: LOADING });
      try {
        const streams = await Promise.all(
          symbols.map(({ symbol }) =>
            symbolStreamsApi.get(`${symbol}.json`, { params: { limit: 5 } })
          )
        );

        this.setState({
          streams,
          appState: LOADED,
          messages: streams
            .reduce((r, { data }) => r.concat(data.messages), [])
            .sort(
              (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
            ),
        });
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          this.setState({ error, appState: ERROR });
        } else {
          this.setState({ appState: LOADED });
        }
      }
    }
  }

  onSymbolChange = (_, symbols) => {
    this.setState({ symbols });
  };

  render() {
    const { symbols, messages, appState, streams } = this.state;
    let content;

    switch (appState) {
      case LOADING:
        content = Loader();
        break;
      case ERROR:
        content = <pre>{JSON.stringify(this.state.error, null, 4)}</pre>;
        break;
      case INITIALIZE:
      case LOADED:
      default:
        content = NoMessages();
        if (messages.length) {
          content = <Stream messages={messages} />;
        }
        break;
    }

    return (
      <div>
        <NavBar
          symbols={symbols}
          onSymbolChange={this.onSymbolChange}
          streams={streams}
        />
        <Grid container style={styles.root}>
          {content}
        </Grid>
      </div>
    );
  }
}
