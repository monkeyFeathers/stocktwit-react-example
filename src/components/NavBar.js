import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SymbolSearch from "./SymbolSearchAutocomplete";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavBar({ symbols, streams, onSymbolChange }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Grid container alignItems="center">
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" className={classes.title}>
                StockTwits Symbols Streamer
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <SymbolSearch
                value={symbols}
                streams={streams}
                onChange={onSymbolChange}
              />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
