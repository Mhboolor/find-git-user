import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import { Link } from "react-router-dom";

function PopularRepo() {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [repo, setRepo] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [sort, setSort] = useState();

  useEffect(() => {
    const fetchRepo = async () => {
      try {
        const { data: getRepo } = await axios.get(
          "https://api.github.com/search/repositories?q=stars:>1&sort=stars&order=desc"
        );
        const result = getRepo.items.slice(0, 10);
        setRepo(result);
        setLoading(false);
      } catch (err) {
        if (err.status !== 200) {
          setError(err.messages);
        }
      }
    };
    fetchRepo();
  }, []);

  useEffect(() => {
    let result;
    switch (sort) {
      case "most-star":
        result = [...repo].sort((prev , next) => next.stargazers_count - prev.stargazers_count)
        setFiltered(result)
        break;
      case "most-fork":
        result = [...repo].sort((prev , next) => next.forks - prev.forks)
        setFiltered(result)
        break;
      case "last-update":
        result = [...repo].sort((prev , next) => new Date(next.updated_at) - new Date(prev.updated_at))
        setFiltered(result)
        break;
      default:
        break;
    }
  }, [sort]);

  const filterRepo = (param) => {
    if (param.length >= 3) {
      const filteredRepo = repo.filter((repo) =>
        repo.name.toLowerCase().includes(param.toLowerCase())
      );
      setFiltered(filteredRepo);
    } else {
      setFiltered([]);
    }
  };

  return (
    <div className="bg-white rounded-sm p-5">
      {error ? (
        <div>
          <p>خطا در هنگام دریافت اطلاعات از سرور</p>
          <p>{error}</p>
        </div>
      ) : loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col gap-5">
          <div className="font-medium flex items-center justify-between flex-col sm:flex-row gap-4">
            <h3 className="sm:text-xl ">10 ریپازیتوری با بیشترین ستاره</h3>
            <div className="flex gap-4 flex-col sm:flex-row">
              <select
                className="border rounded-md outline-0 p-2"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="most-star">بیشترین ستاره</option>
                <option value="most-fork">بیشترین فورک</option>
                <option value="last-update">اخرین آپدیت</option>
              </select>
              <input
                type="text"
                placeholder="جستجو کنید ..."
                className=" bg-slate-100 border px-2 py-1 rounded-sm outline-0 focus-visible:border-black"
                onChange={(e) => filterRepo(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full overflow-auto">
            <table className="border border-collapse rounded-md border-slate-400 w-[800px] sm:w-full">
              <thead>
                <tr>
                  <th className="border p-2">نام</th>
                  <th className="border p-2">آدرس</th>
                  <th className="border p-2">تعداد ستاره</th>
                  <th className="border p-2">تعداد فورک</th>
                  <th className="border p-2">تاریخ آپدیت</th>
                </tr>
              </thead>
              {filtered.length > 0 ? (
                <tbody>
                  {filtered.map((item) => (
                    <tr className="text-center" key={item.id}>
                      <td className="p-2 border ">{item.name}</td>
                      <td className="p-2 border ">
                        <Link>{item.svn_url}</Link>
                      </td>
                      <td className="p-2 border ">{item.stargazers_count}</td>
                      <td className="p-2 border ">{item.forks}</td>
                      <td className="p-2 border ">{item.updated_at}</td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody>
                  {repo.map((item) => (
                    <tr className="text-center" key={item.id}>
                      <td className="p-2 border ">{item.name}</td>
                      <td className="p-2 border ">
                        <Link>{item.svn_url}</Link>
                      </td>
                      <td className="p-2 border ">{item.stargazers_count}</td>
                      <td className="p-2 border ">{item.forks}</td>
                      <td className="p-2 border ">{item.updated_at}</td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default PopularRepo;
