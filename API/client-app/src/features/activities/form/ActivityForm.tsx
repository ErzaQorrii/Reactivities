import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";





export default observer( function ActivityForm()
{
  const {activityStore} = useStore();
  const {selectedActivity,createActivity,updateActivity,loading} = activityStore;
  // Initialize the form state with either the selected activity or default empty values
  const initialState = selectedActivity ??
{
  id:'',
  title:'',
  category:'',
  description:'',
  date:'',
  city:'',
  venue:''
}
const[activity,setActivity]=useState(initialState);
 // Function to handle form submission
function handleSubmit()
{
  activity.id?updateActivity(activity):createActivity(activity);
}
function handleInputChange(event:ChangeEvent<HTMLInputElement |HTMLTextAreaElement>)
{
  const {name,value}=event.target;// Destructure the name and value from the event target
  // Update the activity state dynamically based on the input's name attribute
  setActivity({...activity,[name]:value});
}

return(
  <Segment clearing>
    <Form onSubmit={handleSubmit} autoComplete='off'>
      <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange}/>
      <Form.TextArea placeholder='Description'  value={activity.description} name='description' onChange={handleInputChange}/>
      <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange}/>
      <Form.Input placeholder='Date' type='date' value={activity.date} name='date' onChange={handleInputChange}/>
      <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange}/>
      <Form.Input placeholder='Venue'value={activity.venue} name='venue' onChange={handleInputChange}/>
       <Button  loading={loading}floated='right' positive type='submit' content='Submit'/>
       <Button  floated='right' type='button' content='Cancle'/>


    </Form>
  </Segment>
)
})