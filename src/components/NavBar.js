import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: theme.spacing(2),
  },
  viewToggle: { marginRight: theme.spacing(2) },
  title: {
    flexGrow: 1,
  },
}));

const findStream = (symbol, streams) => {
    return streams.find(stream => stream.data.symbol.symbol === symbol);
};

function TabLabel ({symbol, messages}) {
    
}

export default function NavBar(props) {
  const classes = useStyles();
  const {symbols, changeHandler, activeStream, streams} = props;
    console.log(props);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            StockTwits Symbols Streamer
          </Typography>
            <Tabs value={activeStream} onChange={changeHandler} aria-label="simple tabs example">
                { symbols.map(symbol => ( <Tab label={<Badge badgeContent={30} color="secondary">{symbol}</Badge>} value={symbol} key={symbol}/>)) }
            </Tabs>
        </Toolbar>
      </AppBar>
    </div>
  );
}
