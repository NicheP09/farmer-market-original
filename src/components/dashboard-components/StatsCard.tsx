import type React from "react";

type Props = {
  title: string;
  value: string | number;
  hint?: React.ReactNode;
  className?: string;
  icon: React.ReactNode;
};

const StatsCard = ({ title, value, hint, className = "", icon }: Props) => {
  return (
    <div>
      <div className={`p-5 rounded-xl hover:shadow-sm ${className}`}>
        <div className="flex  justify-between">
          <div>
            <p className=" font-medium text-xl text-[#737373]">{title}</p>
            <h4 className="text-black text-[28px] my-5 font-bold">{value}</h4>
            {hint && <div className=" text-pri font-medium mt-1">{hint}</div>}
          </div>
          <div className="w-13 h-13 flex items-center justify-center rounded-full bg-white">
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
