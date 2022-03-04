import axios from "axios";
import env from "react-dotenv";
class TodoService {
  getAll = async () => {
    return await axios.get(`${env.API_URL}/todo`);
  };
}

export default TodoService;
