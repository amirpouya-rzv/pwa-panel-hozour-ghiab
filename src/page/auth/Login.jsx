import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginServiceuser } from '../../services/loginservices';
import { errorToast, successToast } from '../../utils/toastutils';
import { ToastContainer } from 'react-toastify';
import { CiAirportSign1 } from 'react-icons/ci';
import { CgSpinner } from 'react-icons/cg';

function Login() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({ username: '', password: '' });
  const [data, setData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ username: '', password: '' });

    let valid = true;
    const newErrors = { username: '', password: '' };

    if (!data.username.trim()) {
      newErrors.username = 'نام کاربری الزامی است';
      valid = false;
    }
    if (!data.password.trim()) {
      newErrors.password = 'رمز عبور الزامی است';
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await LoginServiceuser(data);
      if (res.status === 200) {
        localStorage.setItem('authTokens', JSON.stringify(res.data));
        navigate('/'); // ✅ ریدایرکت به صفحه اصلی
        successToast("ورود با موفقیت انجام شد");
      } else {
        errorToast(res.data.message || 'اطلاعات وارد شده اشتباه است');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen w-full bg-gradient-to-t from-[#EDEDED] to-[#8184B8] relative">
      <ToastContainer />

      {/* فرم موبایل */}
      <div className="md:hidden flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md rounded-2xl px-6 py-10 shadow-xl bg-[#6994CC9E] relative">
          <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-28 h-28 bg-[#6994CC9E] border shadow-lg rounded-full flex items-center justify-center">
            <CiAirportSign1 size={60} />
          </div>

          <form onSubmit={handleSubmit} className="pt-16 space-y-6">
            <div>
              <label className="block text-right text-black text-lg mb-1">نام کاربری:</label>
              <input
                type="text"
                className={`w-full px-4 py-2 rounded-xl text-right outline-none border transition-all
                ${errors.username ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue`}
                value={data.username}
                onChange={(e) => setData({ ...data, username: e.target.value })}
              />
              {errors.username && <p className="text-red-500 text-sm mt-1 text-right">{errors.username}</p>}
            </div>

            <div>
              <label className="block text-right text-black text-lg mb-1">رمز عبور:</label>
              <input
                type="password"
                className={`w-full px-4 py-2 rounded-xl text-right outline-none border transition-all
                ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue`}
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1 text-right">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-end space-x-2">
              <label className="text-sm text-black">مرا به خاطر بسپار</label>
              <input type="checkbox" />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full text-center py-3 rounded-xl bg-blue hover:bg-toblue text-white text-lg transition-all duration-200"
            > 
            {loading ? <div className='flex justify-center text-center items-center gap-3'>
              در حال ورود...
              <CgSpinner size={20} className='animate-spin' />
            </div> :
              <div className='text-center'>
                ورود
              </div>}
            </button>
          </form>
        </div>
      </div>

      {/* فرم دسکتاپ */}
      <div className="hidden md:flex items-end justify-center min-h-screen">
        {/* آبی پررنگ کف صفحه */}
        <div className="relative w-[1000px] h-[300px] bg-blue rounded-t-3xl flex items-center justify-center overflow-visible">

          {/* آبی کم‌رنگ چسبیده از بیرون بالا */}
          <div className="absolute bottom-0  bg-[#6994CC9E] h-[500px] w-[500px] rounded-t-3xl p-6 flex flex-col items-center justify-start shadow-xl">
            {/* لوگو */}
            <span className="absolute -top-16 w-36 h-36 bg-[#6994CC9E] rounded-full shadow-lg flex items-center justify-center">
              <CiAirportSign1 size={70} />
            </span>

            {/* فرم */}
            <form onSubmit={handleSubmit} className="mt-40 w-[420px] space-y-6">
              <div>
                <label className="block text-right text-black text-xl mb-2">نام کاربری:</label>
                <input
                  type="text"
                  className={`w-full px-4 py-3 rounded-xl text-right outline-none border transition-all
              ${errors.username ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue`}
                  value={data.username}
                  onChange={(e) => setData({ ...data, username: e.target.value })}
                />
                {errors.username && <p className="text-red-500 text-sm mt-1 text-right">{errors.username}</p>}
              </div>

              <div>
                <label className="block text-right mt-10 text-black text-xl mb-2">رمز عبور:</label>
                <input
                  type="password"
                  className={`w-full px-4 py-3  rounded-xl text-right outline-none border transition-all
              ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue`}
                  value={data.password}
                  onChange={(e) => setData({ ...data, password: e.target.value })}
                />
                {errors.password && <p className="text-red-500 text-sm mt-1 text-right">{errors.password}</p>}
              </div>

              <div className="flex items-center gap-3 ">
                <input type="checkbox" />
                <label className="text-right text-black text-sm">رمز عبور را به خاطر بسپار</label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full text-center disabled:cursor-not-allowed py-3 mt-10 rounded-xl bg-blue hover:bg-toblue text-white text-lg transition-all"
              >
                {loading ? <div className='flex justify-center text-center items-center gap-3'>
                  در حال ورود...
                  <CgSpinner size={20} className='animate-spin' />
                </div> :
                  <div className='text-center'>
                    ورود
                  </div>}
              </button>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Login;
