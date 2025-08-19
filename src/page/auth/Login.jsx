import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginServiceuser } from '../../services/loginservices';
import { errorToast, successToast } from '../../utils/toastutils';
import { ToastContainer } from 'react-toastify';
import { CiAirportSign1 } from 'react-icons/ci';
import { CgSpinner } from 'react-icons/cg';
import 'react-toastify/dist/ReactToastify.css';

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
        navigate('/');
        successToast("ورود با موفقیت انجام شد");
      } else {
        errorToast(res.data.message || 'اطلاعات وارد شده اشتباه است');
      }
    } catch (err) {
      console.error(err);
      errorToast('خطا در ورود به سیستم');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-t from-[#EDEDED] to-[#8184B8] flex items-center justify-center relative">
      <ToastContainer />

      {/* فرم ورود */}
      <div className="w-full max-w-md rounded-2xl px-6 py-12 shadow-xl bg-[#6994CC9E] relative">
        {/* لوگو */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-40 h-40 bg-blue border shadow-lg rounded-full flex items-center justify-center">
          <img src='/96_x_96-removebg-preview.png' />
        </div>

        <form onSubmit={handleSubmit} className="pt-20 space-y-6">
          {/* نام کاربری */}
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

          {/* رمز عبور */}
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

          {/* مرا به خاطر بسپار */}
          <div className="flex items-center justify-end gap-2">
            <label className="text-sm text-black">مرا به خاطر بسپار</label>
            <input type="checkbox" />
          </div>
          <div className='flex  flex-col'>
            <span>نام کاربری : amirpouya</span>
            <span>رمز عبور : 123456</span>
          </div>
          {/* دکمه ورود */}
          <button
            type="submit"
            disabled={loading}
            className="w-full text-center py-3 rounded-xl bg-blue hover:bg-toblue text-white text-lg transition-all duration-200 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className='flex justify-center items-center gap-3'>
                در حال ورود...
                <CgSpinner size={20} className='animate-spin' />
              </div>
            ) : (
              <div className='text-center'>ورود</div>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
