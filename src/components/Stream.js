import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Fade from '@material-ui/core/Fade';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: 'absolute'
  },
   paper: {
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
  link: {
    margin: `auto ${theme.spacing(1)}px`,
    wordBreak: 'break-all'
  },
  messageBody: {
    wordBreak: 'break-all'
  }
}));

const lastIndex = arr => arr.length - 1;
const isString = x => typeof x === "string";
const last = arr => arr[arr.length - 1];

const extractLinks = body => body.split(/\s/).reduce((r, w) => {
    if (RegExp(/https?:\/\/(\S{3}.)?\S+./).test(w)) { 
        r.push(TruncatedLink(w));
    } else if (isString(last(r))) {
        r[lastIndex(r)] = `${last(r)} ${w}`;
    } else {
        r.push(w)
    }
    return r;
}, [])

const TruncatedLink = href => { 
    const {link} = useStyles();
    const shortUrlExp = RegExp(/\/([^\/]+)\//);

    return (
        <Link href={href} className={link} key={uuidv4()} noWrap>
            {href.match(shortUrlExp) ? href.match(shortUrlExp)[1] : `${href.slice(0,10)}...`}
        </Link>
    );
};

const getContent = body => {
    const extractedLinks = extractLinks(body);
    return extractedLinks.map(x => typeof x === 'string' ? (<Typography key={uuidv4()}>{x}</Typography>) : x);
};

const MessageItem = ({user, body, id}) => {
    const classes = useStyles();

    return (
      <Paper className={classes.paper} key={uuidv4()}>
          <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                  <Avatar alt={user.name} src={user.avatar_url} />
              </Grid>
              <Grid item xs>
                  <Grid item>
                      <Typography variant="h6" component="span">{ user.name }</Typography> (@{ user.username })
                  </Grid>
                  <Grid item xs>
                      {getContent(body)}
                  </Grid>
              </Grid>
          </Grid>
      </Paper>
    );
};

export default function Stream({stream, isActive}) {
  const { messages} = stream;
  const classes = useStyles();
  const onExit = console.log('on exit called:', stream.symbol.symbol);

  return (
      <Fade in={isActive} onExit={onExit} timeout={{enter: 525, exit: 400}}>
          <div className={classes.root}>
              { messages.map(MessageItem) }
          </div>
      </Fade>
  );
}
// import React from 'react';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import Avatar from '@material-ui/core/Avatar';
// import Typography from '@material-ui/core/Typography';
// 
// export default function AlignItemsList(props) {
//     const content = props.stream.messages.reduce((result, {user, body, id}) => {
//         result.push(
//             <ListItem alignItems="flex-start" key={id} divider={true}>
//                 <ListItemAvatar>
//                     <Avatar alt={user.name} src={user.avatar_url} />
//                 </ListItemAvatar>
//                 <ListItemText
//                     secondary={
//                         <React.Fragment>
//                             <Typography
//                                 component="span"
//                                 variant="body2"
//                                 color="textPrimary"
//                             >
//                                 { user.name} ({user.username})
//                             </Typography>
//                             {` — ${body}`}
//                         </React.Fragment>
//                     }
//                 />
//             </ListItem>
//         );
// 
//         return result;
//     }, []);
// 
//   return (
//     <List>
//         { content }
//     </List>
//   );
// }

