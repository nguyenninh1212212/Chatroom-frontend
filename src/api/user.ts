import api from ".";
import { UserInfo } from "../type/user";

export interface TheUserInfo {
  message: string;
  data: UserInfo;
}

export const getUser = async (
  username: string,
  email: string
): Promise<TheUserInfo> => {
  const res = await api.get<TheUserInfo>("/auth/info", {
    params: { username, email },
  });
  return res.data;
};
