import BaseService from "./BaseService";
const apiEndPoint = "todo";
class TodoService extends BaseService {
  constructor() {
    super(apiEndPoint);
  }
}
export default TodoService;
