
import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Header, List } from 'semantic-ui-react';
import { Activity } from '../app/models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../features/activities/dashboard/ActivityDashboard';

function App() {
  const [activities,setActivities] = useState<Activity[]>([]);
  const [selectedActivity,setSelectedActivity] = useState<Activity |undefined>(undefined);
   const[editMode,setEditMode]=useState(false);
  useEffect(()=>{
    axios.get<Activity[]>('http://localhost:5000/api/activities')
      .then(response =>{
        setActivities(response.data);
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
      />
     </Container>
    </Fragment>
      
  )
}

export default App
