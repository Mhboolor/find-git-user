import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function User() {
  const [data, setData] = useState();
  const { user } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`https://api.github.com/users/${user}`);
      const data = await response.json();
      return setData(data);
    };
    fetchUser();
  }, []);

  return <div>Loading ...</div>;
}

export default User;
