// Token 발급을 위한 API 로직 분리
import axios from 'axios';
import { LoginReqType } from '../types';

const USER_API_URL = '';
// API
export default class UserService {
  public static async login(reqData: LoginReqType): Promise<string> {
    const response = await axios.post(USER_API_URL, reqData);
    return response.data.token;
  }
}
