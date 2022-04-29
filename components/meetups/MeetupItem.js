import Card from "../ui/Card";
import {useRouter} from "next/router";
import classes from "./MeetupItem.module.css";

function MeetupItem(props) {
  const path = useRouter();
  function showDetailsHandler() {
    path.push("/" + props.id);
    // navigate programmtically we can use push method
  }
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>
        <div className={classes.actions}>
          {/* in order to navigate programmatically we 'useRouter'
          to define specific 'path' instead of link component */}
          <button onClick={showDetailsHandler}>Show Details</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
