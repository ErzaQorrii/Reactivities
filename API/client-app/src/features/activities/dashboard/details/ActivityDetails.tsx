import React from "react";
import { Button, Card, CardContent, CardDescription, CardHeader, CardMeta, Icon,Image } from "semantic-ui-react";
import { Activity } from "../../../../app/models/activity";

interface Props
{
  activity:Activity;
  cancleSelectActivity:()=>void;
  openForm:(id:string)=>void;

}

export default function ActivityDetails({activity,cancleSelectActivity,openForm}:Props)
{
  console.log("Activity: ", activity);
  console.log("Image Path: ", `/assets/categoryImages/${activity.category}.jpg`);
 return(
  <Card fluid>
  <Image src={`/assets/categoryImages/${activity.category}.jpg`}  />
  <CardContent>
    <CardHeader>{activity.title}</CardHeader>
    <CardMeta>
      <span>{activity.date}</span>
    </CardMeta>
    <CardDescription>
     {activity.description}
    </CardDescription>
  </CardContent>
  <CardContent extra>
    <Button.Group widths='2'>
      <Button onClick={()=> openForm(activity.id)} basic color='blue' content='Edit'/>
      <Button onClick={cancleSelectActivity} basic color='grey' content='Cancle'/>

    </Button.Group>
  </CardContent>
</Card>
 )
}