import axios from "axios";

// A mock function to mimic making an async request for data
export async function fetchTours(data) {
  console.log("from api", data)
  return axios.get(`http://localhost:3002/tour/all-tours/?limit=${data.limit}&page=${data.page}`)
}



