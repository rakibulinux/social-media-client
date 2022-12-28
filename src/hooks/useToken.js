import { useEffect, useState } from "react";

const useToken = (email) => {
  const [token, setToken] = useState("");
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/jwt?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.socialUserToken) {
          localStorage.setItem("socialUserToken", data.socialUserToken);
          setToken(data.socialUserToken);
        }
      });
  }, [email]);
  return [token];
};

export default useToken;
