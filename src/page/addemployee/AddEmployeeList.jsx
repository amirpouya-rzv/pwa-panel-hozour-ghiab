import { BiLoader } from "react-icons/bi";
import AddEmployeeCardItem from "./AddEmployeeCardItem";

function AddEmployeeList({ cards, loading, onSelect }) {
  return (
    <div className="md:w-[30%] bg-white shadow-md rounded-2xl  dark:bg-gradient-to-b dark:from-dark_background dark:to-to_dark_background p-4">
      <div className="flex items-center mb-4 border-b dark:border-b-to_dark_background pb-2 border-[#175DB8] ">
        <p className="text-lg text-[#175DB8] mr-2 dark:text-to_dark_background">کارمندان پیشنهادی</p>
      </div>
      <div className="flex gap-3 overflow-x-auto md:flex-col md:overflow-y-auto md:max-h-[80vh] hide-scrollbar ">
        {loading ? (
          <p className="text-center text-gray-500 flex justify-center dark:text-lightgray"><BiLoader className="animate-spin" size={20}/></p>
        ) : (
          cards.slice(0, 10).map((card) => (
            <AddEmployeeCardItem key={card.id} card={card} onClick={() => onSelect(card.id)} />
          ))
        )}
      </div>
    </div>
  );
}

export default AddEmployeeList;
