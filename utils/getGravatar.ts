import { Md5 } from "ts-md5";

const gravatarUrl = "https://www.gravatar.com/avatar/";

export const getGravatar = (email: string, size = 200) => {
  const hashedEmail = Md5.hashStr(email.toLowerCase().trim());
  return gravatarUrl + Md5.hashStr(email) + "?s=" + size;
};
