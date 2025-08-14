import React, { useState } from "react";
import { CiTrash } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";
import ConfirmModal from "../../components/ConfirmModal";

function CardItem({ card, onClick, onDelete }) {

  return (
    <div
      className="min-w-[240px] md:min-w-0 dark:bg-darkgray bg-white border-[1.5px] border-lightgray shadow hover:scale-105 transition rounded-3xl p-4 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-start w-full" dir="rtl">
        <div className="flex flex-col justify-center text-center gap-2 text-[12px] w-1/2">
          <InfoMini label="نام" value={card.first_name} />
          <InfoMini label="نام خانوادگی" value={card.last_name} />
          <InfoMini label="شعبه" value={card.branch_default} />
        </div>
        <div className="flex flex-col items-center w-1/2">
          {card.photo_url ? (
            <img
              src={card?.photo_url}
              alt="employee"
              className="w-[80px] h-[80px] rounded-full object-cover border-2 border-blue dark:border-black"
            />
          ) : (
            <FaUserCircle size={80} className="border-2 border-blue dark:border-black rounded-full bg-white"/>
          )}
          <div className="mt-2 text-center border-2 dark:border dark:bg-lightgray dark:border-black border-blue rounded-3xl w-3/4 px-10 py-10 md:text-lg">
            <p>شناسه یکتا</p>
            <p className="truncate">{card.decoded_device_id}</p>
          </div>
        </div>

      </div>

      <button
        className="mx-16 mt-4"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        <CiTrash className="text-red-500" size={24} />
      </button>
    </div>
  );
}

function InfoMini({ label, value }) {
  return (
    <div>
      <p className="text-[10px] text-center dark:text-lightgray my-2">{label}:</p>
      <p className="text-[10px] flex justify-center border-2 dark:border dark:border-lightgray dark:bg-lightgray border-blue rounded-full md:px-14 py-2 mt-1 overflow-x-auto whitespace-nowrap">
        {value}
      </p>
    </div>
  );
}

export default CardItem;
