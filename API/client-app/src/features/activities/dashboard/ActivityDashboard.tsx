import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../layout/LoadingComponent";

export default observer(function ActivityDashboard() {
  const { activityStore } = useStore();
  // const { selectedActivity, editMode } = activityStore;
  const { loadActivities, activityRegistry } = activityStore;

  useEffect(() => {
    if(activityRegistry.size <=1)
    {
      loadActivities();
    }
  }, [loadActivities,activityRegistry]);

  if (activityStore.loadingInitial)
    return <LoadingComponent content="Loading app" />;
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList />
      </Grid.Column>
      <Grid.Column width="6">
        <h1> Activity Filters</h1>
      </Grid.Column>
    </Grid>
  );
});
