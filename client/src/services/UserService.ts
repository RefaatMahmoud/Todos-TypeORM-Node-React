import BaseService from "./BaseService";
const apiEndPoint = "user";
class UserService extends BaseService {
  constructor() {
    super(apiEndPoint);
  }
}
export default UserService;
