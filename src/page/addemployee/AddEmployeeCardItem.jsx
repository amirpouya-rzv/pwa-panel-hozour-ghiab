import { FaUserCircle } from "react-icons/fa";
import AddEmployeeInfoMini from "./AddEmployeeInfoMini";

function AddEmployeeCardItem({ card, onClick }) {
  return (
    <div
      className="min-w-[240px] md:min-w-0 dark:bg-darkgray bg-white border-[1.5px] border-stone-300 shadow hover:scale-105 transition rounded-3xl p-4 cursor-pointer"
      onClick={onClick}
    >
      <div dir="rtl" className="flex justify-between items-start ">
        <div className="flex flex-col gap-2 text-[12px] ">
          <AddEmployeeInfoMini label="نام" value={card.first_name} />
          <AddEmployeeInfoMini label="نام خانوادگی" value={card.last_name} />
          {/* <AddEmployeeInfoMini label="کد ملی" value={card.melli} /> */}
          <AddEmployeeInfoMini label="شعبه" value={card.branch_default} />
        </div>
        <div className="flex flex-col items-center ">
          {card.photo_url ? (
            <img
              src={card.photo_url}
              alt="employee"
              className="w-[60px] h-[60px] md:h-[80px] md:w-[80px] rounded-full object-cover border-2 border-blue dark:border-black"
            />
          ) : (
            <FaUserCircle size={80} className="border-2 border-stone-300 dark:border-black rounded-full bg-white"/>
          )}
          <div className="mt-2 text-center border-2 dark:border dark:bg-lightgray dark:border-black border-blue rounded-3xl md:w-3/4 w-3/3 md:px-10 py-10 text-lg">
            <p>شناسه یکتا</p>
            <p  className="truncate">{card.decoded_device_id}</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AddEmployeeCardItem;
