import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    margin: `${theme.spacing(1)}px`,
    padding: theme.spacing(1),
  },
}));

const MessageItem = ({ user, body, created_at }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} key={uuidv4()}>
      <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar alt={user.name} src={user.avatar_url} />
          </Grid>
          <Grid item xs>
            <Grid container justify="space-between">
              <Grid item>
                <Typography variant="h6" component="span">
                  {user.name}
                </Typography>{" "}
                @{user.username}
              </Grid>
              <Grid item>
                <Typography>{moment(created_at).fromNow()}</Typography>
              </Grid>
            </Grid>
            <Grid item xs>
              {body}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default function Stream({ messages }) {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={1}>
      {messages.map((message) => MessageItem(message))}
    </Grid>
  );
}
