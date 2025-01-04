
import { Fragment, useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../app/models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../app/api/agent';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../app/stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const {activityStore} = useStore();

  const [activities,setActivities] = useState<Activity[]>([]);
  const [selectedActivity,setSelectedActivity] = useState<Activity |undefined>(undefined);
   const[editMode,setEditMode]=useState(false);
   const [submitting,setSubmitting]=useState(false);

  useEffect(()=>{
     activityStore.loadActivities();
  },[activityStore])
  

  function handleSelectActivity(id:String)
  {
    setSelectedActivity(activities.find(x=>x.id===id));
  }
  

   function handleCancleSelectActivity()
   {
    setSelectedActivity(undefined);
   }

   function handleDeleteActivity(id:string)
   {
    setSubmitting(true);
    agent.Activities.delete(id).then(()=>
    {
      setActivities([...activities.filter(x=>x.id!==id)]);
      setSubmitting(false);

    })

   }


// The handleFormOpen function is used to handle opening the form in two scenarios:
// 1. If an ID is provided, it selects the activity associated with that ID using handleSelectActivity.
// 2. If no ID is provided, it clears any currently selected activity using handleCancelSelectActivity.
// After determining the activity context, it sets editMode to true to display the form.
   function handleFormOpen(id?:string)
   {
    id?handleSelectActivity(id):handleCancleSelectActivity();
    setEditMode(true);
   }
   
   function handleFormClose()
   {
    setEditMode(false);
   }


   function handleCreateOrEditActivity(activity: Activity) {
     // Update or create activity:
    // If `id` exists, replace the activity; otherwise, add it to the state.
    setSubmitting(true);
    if (activity.id) {
          agent.Activities.update(activity).then(()=>{
          setActivities([...activities.filter(x => x.id !== activity.id), activity]);
          setSelectedActivity(activity);
          setEditMode(false);
          setSubmitting(false);

          })}
        // Create a new activity:
      // Add it to the state with a unique ID, close the form, and set it as the selected activity.
          else{
            activity.id=uuid();
            agent.Activities.create(activity).then(()=>
            {
              setActivities([...activities, activity]);
              setSelectedActivity(activity);
              setEditMode(false);
              setSubmitting(false);
            })
          }
        }

if (activityStore.loadingInitial) return<LoadingComponent content='Loading app'/>


  return (
    <Fragment>
     <Container style={{marginTop:'7em'}}>
      

     <NavBar openForm={handleFormOpen}/>
     <ActivityDashboard
      activities={activityStore.activities}
      selectedActivity={selectedActivity}
      selectActivity = {handleSelectActivity}
      cancleSelectActivity = {handleCancleSelectActivity}
      editMode={editMode}
      openForm={handleFormOpen}
      closeForm={handleFormClose}
      createOrEdit={handleCreateOrEditActivity}
      deleteActivity ={handleDeleteActivity}
      submitting={submitting}
      />
     </Container>
    </Fragment>
      
  )
}

export default observer(App)
