import Axios from "axios";

export default (token: string) => Axios.create({
  headers: {
    'Authorization': token.split(" ")[0] !== "Bearer" ? "Bearer " + token : token
  },
});