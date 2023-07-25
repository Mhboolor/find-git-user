import React, { useState } from "react";
import { Link } from "react-router-dom";

function SearchUser() {
  const [search, setSearch] = useState();

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center gap-4">
        <Link className=" bg-green-400 px-2 py-1 rounded-md font-medium" to={`/${search}`}>
          جستجو
        </Link>
        <input
          type="text"
          placeholder="جستجوی کاربر ..."
          className="border rounded-md px-2 py-1 outline-0 focus-visible:border-black"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-center">
        <p>کاربری را جستجو کنید</p>
      </div>
    </div>
  );
}

export default SearchUser;
