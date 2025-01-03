
import { Fragment, useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../app/models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../app/api/agent';

function App() {
  const [activities,setActivities] = useState<Activity[]>([]);
  const [selectedActivity,setSelectedActivity] = useState<Activity |undefined>(undefined);
   const[editMode,setEditMode]=useState(false);

  useEffect(()=>{
   agent.Activities.list().then(response =>{
      let activities:Activity[]=[];
      response.forEach(activity=>
      {
        activity.date=activity.date.split('T')[0];
        activities.push(activity);
      }
      )
        setActivities(activities);
      })
  },[])
  

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
    setActivities([...activities.filter(x=>x.id!==id)])

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
    // Check if the activity has an `id`
    // If it does, we're editing an existing activity; otherwise, we're creating a new one.
    activity.id 
        ? // For editing, update the activities state by:
          // 1. Filtering out the activity with the matching `id` from the current activities array.
          // 2. Adding the updated activity to the array.
          setActivities([...activities.filter(x => x.id !== activity.id), activity])
        : // For creating, add the new activity to the activities array
          // 1. Use the spread operator to include all existing activities.
          // 2. Append the new activity to the array.
          3// // Create activity: Generate a unique ID for the new activity
          setActivities([...activities, {...activity,id:uuid()}]);

    // Close the form by setting editMode to `false`.
    setEditMode(false);

    // Set the selected activity to the newly created or updated activity
    // to display it in the UI.
    setSelectedActivity(activity);
}



  return (
    <Fragment>
     <Container style={{marginTop:'7em'}}>
     <NavBar openForm={handleFormOpen}/>
     <ActivityDashboard
      activities={activities}
      selectedActivity={selectedActivity}
      selectActivity = {handleSelectActivity}
      cancleSelectActivity = {handleCancleSelectActivity}
      editMode={editMode}
      openForm={handleFormOpen}
      closeForm={handleFormClose}
      createOrEdit={handleCreateOrEditActivity}
      deleteActivity ={handleDeleteActivity}
      />
     </Container>
    </Fragment>
      
  )
}

export default App
