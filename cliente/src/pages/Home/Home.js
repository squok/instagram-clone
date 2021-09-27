import React from "react";
import "./Home.scss";
import Feed from "../../components/Home/Feed";
import { Grid } from "semantic-ui-react";
import UserNotFolloweds from "../../components/Home/UserNotFolloweds";
export default function Home() {
  return (
    <Grid className="home">
      <Grid.Column className="home__left" width={11}>
        <Feed />
      </Grid.Column>
      <Grid.Column className="right" width={5}>
        <UserNotFolloweds />
      </Grid.Column>
    </Grid>
  );
}
