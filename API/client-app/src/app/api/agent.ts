import axios,{AxiosResponse} from 'axios';
import { Activity } from '../models/activity';

axios.defaults.baseURL = 'http://localhost:5000/api';

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
  list:()=>requests.get<Activity[]>('/activities')
}
// Combining all resource-related objects into a single exportable agent
const agent = {
  Activities
} 
export default agent;