import React, { useEffect, useState } from "react";
import AppInput from "../../components/shared/AppInput";
import HeadersBranch from "./HeadersBranch";
import { FaPlus } from "react-icons/fa";
import { BsBoundingBoxCircles } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import CustomSelect from "../../components/shared/CustomSelect";
import NeshanMap from "../neshan/NeshanMap";
import axios from "axios";
import { createBranch } from "../../services/branchService";
import { employeeService } from "../../services/employeeservices";
import { errorToast, successToast, warningToast } from "../../utils/toastutils";

function Branch() {
    const [modalOpen, setModalOpen] = useState(false);
    const [companyName, setCompanyName] = useState("");
    const [companyAdress, setCompanyAdress] = useState("");

    const [mapData, setMapData] = useState({
        lat1: null,
        long1: null,
        lat2: null,
        long2: null,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { lat1, long1, lat2, long2 } = mapData;
        if (!companyName.trim() || !lat1 || !lat2 || !long1 || !long2) {
            warningToast("لطفاً نام شرکت و نقاط مبدأ و مقصد را وارد کنید.");
            return;
        }

        const payload = {
            name: companyName,
            address: companyAdress,
            lat1,
            long1,
            lat2,
            long2,
        };

        try {
            const res = await createBranch(payload);
            console.log("ارسال موفق:", res.data);
            successToast("ثبت با موفقیت انجام شد!");
        } catch (err) {
            console.error("خطا:", err);
            errorToast("ارسال ناموفق بود.");
        }
    };




    const [employeeOptions, setEmployeeOptions] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const handlegetworkerlist = async () => {
        try {
            const res = await employeeService();
            const options = res.data.map((emp) => ({
                id: emp.id,
                label: emp.name,
            }));
            setEmployeeOptions(options);
        } catch (err) {
            console.error("خطا در دریافت لیست کارمندان:", err);
        }
    };

    useEffect(() => {
        handlegetworkerlist();
    }, []);

    const handleClearMap = () => {
        setMapData({
            lat1: null,
            long1: null,
            lat2: null,
            long2: null,
        });
    };

    return (
        <div className="w-full  md:px-5 mb-52 md:mb-0 pt-10 shadow-xl">
            <div className="w-full  dark:border dark:border-lightgray mb-10 dark:bg-lightgray border-4 rounded-3xl">
                <HeadersBranch />

                <form
                    onSubmit={handleSubmit}
                    className="bg-white dark:border dark:border-lightgray dark:text-black dark:bg-darkgray rounded-3xl space-y-8 md:w-[600px] w-[90%] mx-auto p-8 flex flex-col items-center gap-6 text-right"
                >
                    <div className="w-full">
                        <AppInput
                            title="نام شرکت :"
                            placeholder="نام شرکت را وارد کنید"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                    </div>

                    <div className="w-full">
                        <AppInput
                            title="آدرس شرکت :"
                            placeholder="آدرس را اینجا وارد کنید..."
                            value={companyAdress}
                            onChange={(e) => setCompanyAdress(e.target.value)}
                        />
                    </div>

                    <div className="w-full">
                        <label className="block mb-2 text-lg text-gray-700 dark:text-white">
                            انتخاب موقعیت مکانی :
                        </label>
                        <button
                            type="button"
                            onClick={() => setModalOpen(true)}
                            className="flex md:mx-96 mx-48 items-center gap-2  text-[#175DB8] dark:text-white"
                        >
                            <FaPlus size={24} />
                        </button>

                        {mapData.lat1 && (
                            <div className="mt-4 flex flex-col items-center">
                                <label className="block mb-1  dark:text-white text-gray-700 font-semibold">
                                    موقعیت انتخاب شده:
                                </label>

                                {/* دکمه حذف موقعیت */}
                                <button
                                    type="button"
                                    onClick={handleClearMap}
                                    className="mb-2 self-end text-red-600 text-sm px-3 py-1 border border-red-500 rounded hover:bg-red-100 transition"
                                >
                                    x
                                </button>

                                <div className="md:w-[500px] w-full h-72 md:h-[200px] border rounded overflow-hidden shadow">
                                    <NeshanMap
                                        initialPositions={mapData}
                                        onPositionsChange={() => { }}
                                        style={{ width: "100%", height: "100%" }}
                                    />
                                </div>
                            </div>  
                        )}
                    </div>

                    <div className="w-full">
                        <button
                            type="submit"
                            className="text-white mx-36 md:mx-80 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-16 py-2.5 text-center me-2 mb-2"
                        >
                            ثبت
                        </button>
                    </div>
                </form>
            </div>

            {/* مدال انتخاب نقشه */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
                    <div className="bg-[#979696] rounded-xl w-full max-w-4xl h-[80vh] max-h-[90vh] p-4 relative flex flex-col">
                        <div className="flex justify-between p-2">
                            <div className="flex flex-col justify-start gap-2">
                                <RxCross2 onClick={() => setModalOpen(false)} className="text-white text-[20px]"/>
                                <p className="text-[14px]">موقعیت مکانی شعبه جدید را انتخاب کنید</p>
                            </div>
                            <div className="flex flex-row justify-center items-center gap-4 px-3 py-1 bg-white rounded-xl border-2 border-blue dark:border-black">
                                <p className="text-[14px]">انتخاب محدوده</p>
                                <BsBoundingBoxCircles className="text-blue text-[24px]"/>
                            </div>
                        </div>
                        <div className="w-full h-full rounded-xl overflow-hidden">
                            <NeshanMap
                                onPositionsChange={(data) => setMapData(data)}
                                initialPositions={mapData}
                            />
                        </div>
                        <div>
                            <button
                                onClick={() => setModalOpen(false)}
                                className="absolute md:top-[490px] bottom-16 left-36 md:left-[250px] border-blue dark:border-darkgray  bg-blue dark:bg-darkgray border-4 px-20 z-40 text-xl text-white rounded"
                            >
                                ثبت
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Branch;
