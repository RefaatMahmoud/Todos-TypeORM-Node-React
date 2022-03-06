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
  create = async (data: any) => {
    return await axios.post(
      `${process.env.REACT_APP_API_URL}/${this.apiEndPoint}`,
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
