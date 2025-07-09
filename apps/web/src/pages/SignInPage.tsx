import { useState } from 'react'
import { EyeSlash, Eye, Google } from 'iconsax-reactjs'
import AuthLayout from "@/layouts/AuthLayout";
import { Link } from 'react-router-dom';

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const isFormValid = email.trim() !== '' && password.trim() !== ''

  return (
    <AuthLayout>
      <div className='flex flex-col gap-8'>
            {/* Form Title */}
            <div className='flex flex-col gap-1'>
              <h1 className='font-semibold text-grey-900 text-3xl'>Log in to your account</h1>
              <p className='text-grey-500 text-lg font-normal'>Welcome back, please enter your details.</p>
            </div>

            {/* Form Container Main */}
            <div className='flex flex-col gap-8'>
              <div>
                <button className='w-full flex items-center justify-center gap-2 bg-primary-50 border border-primary-500 hover:border-primary-50 text-primary-700 text-base font-normal rounded-full py-3 px-6 cursor-pointer'>
                  <Google variant='Bold' />
                  <p>Log in with Google</p>
                </button>
              </div>

              <div className="flex items-center gap-4 my-6">
                <hr className="flex-grow border-t border-grey-100" />
                <span className="text-grey-600 text-sm">OR</span>
                <hr className="flex-grow border-t border-grey-100" />
              </div>

              <form
                className='flex flex-col gap-8'
                onSubmit={(e) => {
                  e.preventDefault()
                  if (!isFormValid) return
                  // perform login logic here
                }}
              >
                <div className='flex flex-col gap-6'>
                  {/* Email */}
                  <div className='flex flex-col gap-2'>
                    <label htmlFor="email" className='text-sm font-normal text-grey-800'>Email</label>
                    <input
                      type="email"
                      id="email"
                      placeholder='e.g AdesanyaM@gmail.com'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className='w-full border border-grey-100 rounded-full px-3 py-2 text-base text-grey-900 outline-none focus:ring-2 focus:ring-grey-200 transition duration-150'
                    />
                  </div>

                  {/* Password */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="text-sm font-normal text-grey-800">Password</label>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="********"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-transparent w-full rounded-full border border-grey-100 py-2 px-3 pr-10 text-sm text-grey-900 outline-none focus:ring-2 focus:ring-grey-200 transition duration-150"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-grey-500"
                        onClick={() => setShowPassword(prev => !prev)}
                      >
                        {showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    <Link to={"/reset-password"} className="text-xs text-primary-500 hover:underline font-normal mt-1">
                      Forgot Password
                    </Link>
                  </div>
                </div>

                {/* Submit Button */}
                <div className='flex flex-col items-center gap-4'>
                  <button
                    type='submit'
                    disabled={!isFormValid}
                    className={`py-3 px-6 rounded-full w-full text-base font-normal transition duration-200 ${
                      isFormValid
                        ? 'bg-primary-500 text-white hover:bg-primary-600'
                        : 'bg-grey-100 text-grey-400 cursor-not-allowed'
                    }`}
                  >
                    Log In
                  </button>
                  <p className='text-sm font-normal text-[#202020]'>
                    Don’t have an account? <span className='text-primary-500 cursor-pointer pb-20'>Create Account</span>
                  </p>
                </div>
              </form>
            </div>
          </div>
    </AuthLayout>
  )
}

export default SignInPage
