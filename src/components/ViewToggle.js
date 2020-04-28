import React from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {marginRight: theme.spacing(2)}
}));

export default function ToggleButtonNotEmpty() {
  const classes = useStyles();
  const [viewStyle, setViewStyle] = React.useState('feed');

  const updateViewStyle = (_, newViewStyle) => {
    if (newViewStyle !== null) {
      setViewStyle(newViewStyle);
    }
  };

  return (
      <ToggleButtonGroup
          value={viewStyle}
          className={classes.root}
          exclusive
          onChange={updateViewStyle}
          aria-label="view style"
      >
          <ToggleButton value="feed" aria-label="feed view">
              <Typography variant="button">Feed</Typography>
          </ToggleButton>
          <ToggleButton value="card" aria-label="card view">
              Card
          </ToggleButton>
      </ToggleButtonGroup>
  );
}

