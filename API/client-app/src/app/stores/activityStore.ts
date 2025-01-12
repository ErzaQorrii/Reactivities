import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../models/activity";
import agent from "../api/agent";
import { v4 as uuid } from "uuid";

export default class ActivityStore {
  activities: Activity[] = [];
  selectedActivity: Activity | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;

  // The constructor runs when an instance of `ActivityStore` is created.
  // `makeAutoObservable` automatically makes all properties observable
  // and binds actions (methods that modify the state) to this class.
  constructor() {
    makeAutoObservable(this);
  }

  // Action: Load activities from the API and populate the `activities` array.
  // This method is asynchronous because it involves a network request.
  loadActivities = async () => {
    this.setLoadingInitial(true);
    try {
      // Fetch the list of activities from the API using the `agent` utility.
      const activities = await agent.Activities.list();
      activities.forEach((activity) => {
        activity.date = activity.date.split("T")[0];
        this.activities.push(activity);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  // Action: Select an activity from the list.
  selectActivity = (id: string) => {
    this.selectedActivity = this.activities.find((a) => a.id === id);
  };

  //Action: Cancle select an activity
  cancleSelectedActivity = () => {
    this.selectedActivity = undefined;
  };

  //Action: Open the form based on activity
  openForm = (id?: string) => {
    id ? this.selectActivity(id) : this.cancleSelectedActivity();
    this.editMode = true;
  };

  //Action: Close Form
  closeForm = () => {
    this.editMode = false;
  };

  createActivity = async (activity: Activity) => {
    this.loading = true;
    activity.id = uuid();
    try {
      await agent.Activities.create(activity);
      runInAction(() => {
        this.activities.push(activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateActivity = async (activity: Activity) => {
    this.loading = true;
    try {
      await agent.Activities.update(activity);
      runInAction(() => {
        {
          this.activities = [
            ...this.activities.filter((a) => a.id !== activity.id),
            activity,
          ];
          this.selectedActivity = activity;
          this.editMode=false;
          this.loading=false;
        }
      });
    } catch (error) {
      console.log(error);
      runInAction(()=>{
        this.loading=false;
      })
    }
  };
}
