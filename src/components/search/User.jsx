import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Loading from "../Loading";
import axios from "axios";

function User() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setErroe] = useState();
  const [repo, setRepo] = useState([]);
  const { user } = useParams();

  useEffect(() => {
    // Use Fetch For Get Api
    // const fetchUser = async () => {
    //   const response = await fetch(`https://api.github.com/users/${user}`);
    //   const data = await response.json();
    //   return setData(data);
    // };
    // const fetchRepo = async () => {
    //   const response = await fetch(`https://api.github.com/users/${user}/repos`);
    //   const data = await response.json();
    //   return setRepo(data);
    // };
    // fetchUser();
    // fetchRepo();

    // Use Axios For Get Api
    const fetchData = async () => {
      try {
        const { data: getData } = await axios.get(
          `https://api.github.com/users/${user}`
        );
        const { data: getRepo } = await axios.get(
          `https://api.github.com/users/${user}/repos`
        );

        setData(getData);
        setRepo(getRepo);
        setLoading(false);
      } catch (err) {
        if (err.status !== 200) {
          setErroe(err.message);
        }
      }
    };
    fetchData();
  }, []);

  return error ? (
    <p className="text-center text-lg font-semibold text-red-500">
      این نام کاربری وجود ندارد !!!
    </p>
  ) : loading ? (
    <Loading />
  ) : data ? (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-center">
        <img
          src={data && data.avatar_url}
          alt="user_image"
          className="rounded-full w-32 h-32"
        />
      </div>
      <div className="flex items-center justify-evenly flex-col gap-4 sm:flex-row">
        <div className="flex items-center gap-2">
          <p>نام کاربری : </p>
          <p>{data.login}</p>
        </div>
        <div className="flex items-center gap-2">
          <p>آدرس کاربر : </p>
          <p>{data.location}</p>
        </div>
        <div className="flex items-center gap-2">
          <p>تعداد ریپازیتوری ها :</p>
          <p>{repo.length}</p>
        </div>
      </div>
      <div className="w-full overflow-auto">
        <table className="border border-collapse border-slate-400 w-[600px] sm:w-full">
          <thead>
            <tr>
              <th className="border border-slate-300 py-2">نام</th>
              <th className="border border-slate-300 py-2">آدرس</th>
            </tr>
          </thead>
          {repo.length ? (
            <tbody>
              {repo.map((item) => (
                <tr className="text-center" key={item.id}>
                  <td className="border border-slate-300 py-2">{item.name}</td>
                  <td className="border border-slate-300 py-2">
                    <Link to={item.svn_url}>{item.svn_url}</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td className="text-red-500 text-center py-2" colSpan={2}>- این کاربر ریپازیتوری برای نمایش ندارد -</td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  ) : null;
}
export default User;
