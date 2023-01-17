/* jshint esversion: 6 */
import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from "axios";


const useStyles = makeStyles({
    root: {
        minWidth: 150,
    },
    bullet: {
        display: 'inline-block',
        margin: '10 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});
export default function OutlinedCard(props,value) {
    const classes = useStyles();
    let [position, setPosition] = React.useState('');
    console.log(Object.values(Object.values(props)[0]));
    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
            key: 'AIzaSyDSR-cgFYuYuXoDo4jvjxL0FbTfEN4me2c',
            address: (Object.values(Object.values(props)[0])).toString(),
        },
    }).then(function (response) {
        const result = response.data.results;
        setPosition(Object.values(result)[1].formatted_address);
        console.log(Object.values(result));
    });
    return (
        <div>
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    What's your position
                </Typography>
                <Typography variant="h5" component="h2">
                    Your position is in {typeof(props)=='object'? position:null}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
        </div>
    );
}
