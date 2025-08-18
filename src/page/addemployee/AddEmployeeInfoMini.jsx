function AddEmployeeInfoMini({ label, value }) {
  return (
    <div >
      <p className="text-[10px] text-center dark:text-white my-2">{label}:</p>
      <p className="text-[10px] flex justify-center border-2 dark:border dark:border-lightgray dark:bg-lightgray border-blue rounded px-2 mt-1 max-w-[100px] overflow-x-auto whitespace-nowrap">
        {value}
      </p>
    </div>
  );
}

export default AddEmployeeInfoMini;
