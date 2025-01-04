import axios,{AxiosResponse} from 'axios';
import { Activity } from '../models/activity';

const sleep = (delay:number)=>
  {
    return new Promise((resolve)=>
    {
      setTimeout(resolve,delay)
    
    })
  }
  
axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response=>
{
  try{
    await sleep(1000);
    return response;
  }
  catch(error)
  {
    console.error(error);
    return await Promise.reject(error);
  }
}
)

// Helper function to extract the data property from the Axios response
const responseBody= <T>(response: AxiosResponse<T>)=>response.data;


// Object containing methods for making HTTP requests
const requests = {
  get:<T> (url: string) => axios.get<T>(url).then(responseBody),
  post:<T> (url: string,body:{}) => axios.post<T>(url,body).then(responseBody),
  put:<T> (url: string,body:{}) => axios.put<T>(url,body).then(responseBody),
  del:<T> (url: string) => axios.delete<T>(url).then(responseBody),
}


const Activities = {
  // Method to list all activities by making a GET request to the /activities endpoint
  list:()=>requests.get<Activity[]>('/activities'),
  details:(id:string)=>requests.get<Activity>(`/activities/${id}`),
  create:(activity:Activity)=>axios.post<void>(`/activities/`,activity),
  update:(activity:Activity)=>axios.put<void>(`/activities/${activity.id}`,activity),
  delete:(id:string)=>axios.delete<void>(`/activities/${id}`)
}
// Combining all resource-related objects into a single exportable agent
const agent = {
  Activities
} 
export default agent;