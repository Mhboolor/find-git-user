import React from "react";

function Loading() {
  return (
    <div className="flex items-center justify-center flex-col gap-5">
        <div className="border-[16px] border-[#f3f3f3] border-t-blue-700 border-b-blue-700 animate-spin w-28 h-28 rounded-full"></div>
        <p className="font-semibold text-center">درحال دریافت اطلاعات از سرور</p>
    </div>
  );
}

export default Loading;
