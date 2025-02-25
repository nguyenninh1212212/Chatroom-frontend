import api, { user_id } from ".";
import { ISearch } from "../type/search";

export const search = async (keyword: string): Promise<ISearch> => {
  const res = await api.get<ISearch>("/search", {
    params: { user_id, keyword },
  });
  return res.data;
};
