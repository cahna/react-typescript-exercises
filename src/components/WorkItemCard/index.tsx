import { FC, ReactNode } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end"
  }
});

export interface Props {
  title: string;
  header: string;
  subheader: string;
  content: ReactNode;
  actions: ReactNode;
}

const WorkItemCard: FC<Props> = ({
  title,
  header,
  subheader,
  content,
  actions
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} role="region">
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
          role="heading"
        >
          {title}
        </Typography>
        <Typography variant="h5" component="h2">
          {header}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {subheader}
        </Typography>
        <Typography variant="body2" component="p" role="contentinfo">
          {content}
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>{actions}</CardActions>
    </Card>
  );
};

export default WorkItemCard;
