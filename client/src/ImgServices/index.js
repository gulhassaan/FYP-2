import axios from "axios";
import { baseURL } from "../constant";
const API = axios.create({
baseURL:baseURL

})



export default API;