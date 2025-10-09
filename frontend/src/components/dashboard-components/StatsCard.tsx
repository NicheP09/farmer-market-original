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
      <div
        className={`p-5 h-auto shadow-sm rounded-xl hover:shadow-md ${className}`}
      >
        <div className="flex  justify-between">
          <div>
            <p className=" font-medium text-lg text-[#737373]">{title}</p>
            <h4 className="text-black text-[24px] my-3 font-bold">{value}</h4>
            {hint && <div className=" text-pri font-medium mt-1">{hint}</div>}
          </div>
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white">
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;