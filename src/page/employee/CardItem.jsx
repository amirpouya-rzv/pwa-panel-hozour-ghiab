import React from "react";
import { CiEdit } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";
import { BiTrash } from "react-icons/bi";

function CardItem({ card, onClick, onDelete }) {

  return (
    <div
      className="min-w-[240px] md:min-w-0 dark:bg-darkgray bg-white border-2 mb-5  shadow hover:scale-105 transition rounded-3xl  cursor-pointer"
      onClick={onClick}
    >
      <span className="flex justify-end p-5">
        <button className="text-teal-700"><CiEdit size={24}/></button>
        <button
          className="text-lightred text-3xl"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <BiTrash size={20}/>
        </button>
        
      </span>

      <div className="flex flex-col-reverse  justify-center hover:shadow-2xl  items-start w-full" dir="rtl">
        <div className="flex flex-col  justify-center text-center p-5 gap-2 text-[12px] w-full">
          <InfoMini label="نام" value={card.first_name} />
          <InfoMini label="نام خانوادگی" value={card.last_name} />
          <InfoMini label="شعبه" value={card.branch_default} />
        </div>
        <div className="flex flex-col justify-center   items-center">
          {card.photo_url ? (
            <img
              src={card?.photo_url}
              alt="employee"
              className="w-[100px] h-[100px] flex justify-center mx-36 mb-5 md:mx-52 rounded-full object-cover border-2 border-blue dark:border-lightgray"
            />
          ) : (
            <FaUserCircle size={80} className="border-2 w-[100px] h-[100px] mx-36 md:mx-40 border-blue dark:border-white rounded-full bg-white" />
          )}
          {/* <div className="mt-2 text-center border-2 dark:border dark:bg-lightgray dark:border-black border-blue rounded-3xl w-3/4 px-10 py-10 md:text-lg">
            <p>شناسه یکتا</p>
            <p className="truncate">{card.decoded_device_id}</p>
          </div> */}
        </div>

      </div>

    </div>
  );
}

function InfoMini({ label, value }) {
  return (
    <div>
      <p className="text-[12px] px-5 text-right dark:text-white my-2">{label}:</p>
      <p className="text-[12px] flex justify-center border-2 dark:border dark:border-lightgray dark:bg-stone-600 dark:text-white border-stone-300 rounded-full md:px-14 py-2 mt-1 overflow-x-auto whitespace-nowrap">
        {value}
      </p>
    </div>
  );
}

export default CardItem;
