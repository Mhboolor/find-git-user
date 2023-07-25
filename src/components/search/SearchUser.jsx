import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchUser() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const [error , setError] = useState();

  const searchHandler = () => {
    if(search.length >= 3){
      navigate(`/${search}`)
      setError('')
    }else{
      setError("حداقل باید 3 کاراکتر وارد کنید !!!")
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-center gap-4">
        <button className=" bg-green-400 px-2 py-1 rounded-md font-medium" onClick={searchHandler}>
          جستجو
        </button>
          <input
            type="text"
            placeholder="جستجوی کاربر ..."
            className="border rounded-md px-2 py-1 outline-0 focus-visible:border-black"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
      </div>
      {
        error && <p className="text-center text-red-500">{error}</p>
      }
      <div className="flex items-center justify-center">
        <p className="text-lg">کاربری را جستجو کنید</p>
      </div>
    </div>
  );
}

export default SearchUser;
