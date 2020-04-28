import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

export default function AlignItemsList(props) {
    const content = props.stream.messages.reduce((result, {user, body, id}) => {
        result.push(
            <ListItem alignItems="flex-start" key={id} divider={true}>
                <ListItemAvatar>
                    <Avatar alt={user.name} src={user.avatar_url} />
                </ListItemAvatar>
                <ListItemText
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                color="textPrimary"
                            >
                                { user.name} ({user.username})
                            </Typography>
                            {` — ${body}`}
                        </React.Fragment>
                    }
                />
            </ListItem>
        );

        return result;
    }, []);

  return (
    <List>
        { content }
    </List>
  );
}

