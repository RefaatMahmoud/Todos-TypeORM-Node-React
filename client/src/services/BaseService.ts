import axios from "axios";
import { Key } from "react";
// import env from "react-dotenv";
class BaseService {
  constructor(private readonly apiEndPoint: string) {}
  getList = async () => {
    return await axios.get(
      `${process.env.REACT_APP_API_URL}/${this.apiEndPoint}`
    );
  };
  show = async (id: any) => {
    return await axios.get(
      `${process.env.REACT_APP_API_URL}/${this.apiEndPoint}/${id}`
    );
  };
  create = async (data: any) => {
    return await axios.post(
      `${process.env.REACT_APP_API_URL}/${this.apiEndPoint}`,
      data
    );
  };
  update = async (id: any, data: any) => {
    return await axios.put(
      `${process.env.REACT_APP_API_URL}/${this.apiEndPoint}/${id}`,
      data
    );
  };
  remove = async (id: Key) => {
    return await axios.delete(
      `${process.env.REACT_APP_API_URL}/${this.apiEndPoint}/${id}`
    );
  };
}

export default BaseService;
