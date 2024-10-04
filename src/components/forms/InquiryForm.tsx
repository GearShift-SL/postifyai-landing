import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

/* ---------------------------------- DATA ---------------------------------- */
const APIENDPOINT = '/api/inquiry'
const SUCCESSMESSAGE = {
  title: 'Thank You!',
  description: "We'll get back to you in the next 24 hours."
}

/* ----------------------------------- Zod ---------------------------------- */
const InquiryFormSchema = z.object({
  name: z.string().min(1, 'Please input your full name.'),
  email: z
    .string()
    .min(1, 'Please input an email address.')
    .email('Please input a valid email address.'),
  service: z.string().min(1, 'Please select a service.'),
  inquiry_body: z.string().min(1, 'Please input your inquiry.'),
  terms: z.boolean().refine((value) => value === true, {
    message: 'Please accept the terms and conditions.'
  })
})

type InquiryFormValues = z.infer<typeof InquiryFormSchema>

/* --------------------------------- Component ------------------------------- */
const InquiryForm = () => {
  /* ---------------------------------- Hooks --------------------------------- */
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(InquiryFormSchema)
  })

  /* -------------------------------- Functions ------------------------------- */
  const onSubmit = async (data: InquiryFormValues) => {
    setIsSubmitting(true)

    console.log(data)

    // Ping out API endpoint
    const response = await fetch(APIENDPOINT, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (response.ok) {
      setIsSuccess(true)
      reset()
    } else {
      setIsError(true)
    }

    setIsSubmitting(false)
  }

  /* --------------------------------- Render --------------------------------- */

  return (
    <>
      <section>
        <div className='flex flex-col items-center justify-center px-6 py-8 my-10 md:my-20 mx-auto lg:py-0'>
          <div className='w-full bg-white rounded-lg shadow-xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                Send us an inquiry
              </h1>

              <form
                className='space-y-4 md:space-y-6'
                onSubmit={handleSubmit(onSubmit)}
              >
                {/* Full Name */}
                <div>
                  <label
                    htmlFor='first_name'
                    className={`block mb-2 text-sm font-medium ${errors.name ? 'text-red-400' : 'text-gray-900 dark:text-white'}`}
                  >
                    Full Name
                  </label>
                  <input
                    required
                    {...register('name', { required: true })}
                    placeholder='John Doe'
                    className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                      errors.name ? 'border-red-400' : ''
                    }`}
                  />
                  {errors.name && (
                    <p className='text-red-500 text-sm mt-2'>
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor='email'
                    className={`block mb-2 text-sm font-medium ${errors.email ? 'text-red-400' : 'text-gray-900 dark:text-white'}`}
                  >
                    Email
                  </label>
                  <input
                    required
                    {...register('email', { required: true })}
                    placeholder='email@gmail.com'
                    className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                      errors.email ? 'border-red-400' : ''
                    }`}
                  />
                  {errors.email && (
                    <p className='text-red-500 text-sm mt-2'>
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Service */}
                <div>
                  <label
                    htmlFor='service'
                    className={`block mb-2 text-sm font-medium ${errors.service ? 'text-red-400' : 'text-gray-900 dark:text-white'}`}
                  >
                    Service
                  </label>
                  <select
                    required
                    {...register('service', { required: true })}
                    className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                      errors.service ? 'border-red-400' : ''
                    }`}
                  >
                    <option value=''>Select a service</option>
                    <option value='process-automation'>
                      Process Automation
                    </option>
                    <option value='tool-development'>Tool Development</option>
                    <option value='data-analysis'>Data Analysis</option>
                    <option value='other'>Other</option>
                  </select>
                  {errors.service && (
                    <p className='text-red-500 text-sm mt-2'>
                      {errors.service.message}
                    </p>
                  )}
                </div>

                {/* Inquiry */}
                <div>
                  <label
                    htmlFor='inquiry_body'
                    className={`block mb-2 text-sm font-medium ${errors.inquiry_body ? 'text-red-400' : 'text-gray-900 dark:text-white'}`}
                  >
                    Inquiry
                  </label>
                  <textarea
                    required
                    {...register('inquiry_body', { required: true })}
                    placeholder='Your inquiry here'
                    className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                      errors.inquiry_body ? 'border-red-400' : ''
                    }`}
                  />
                  {errors.inquiry_body && (
                    <p className='text-red-500 text-sm mt-2'>
                      {errors.inquiry_body.message}
                    </p>
                  )}
                </div>

                {/* Terms */}
                <div className='flex items-start'>
                  <div className='flex items-center h-5'>
                    <input
                      required
                      id='terms'
                      {...register('terms', { required: true })}
                      aria-describedby='terms'
                      type='checkbox'
                      className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
                    />
                  </div>
                  <div className='ml-3 text-sm'>
                    <label
                      className={`font-light  ${errors.terms ? 'text-red-400' : 'text-gray-500 dark:text-gray-300'}`}
                    >
                      I accept the{' '}
                      <a
                        className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                        href='/terms'
                      >
                        Terms and Conditions
                      </a>
                    </label>
                    {errors.terms && (
                      <p className='text-red-500 text-sm mt-2'>
                        {errors.terms.message}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  type='submit'
                  disabled={isSubmitting || isSuccess || isError}
                  className={`${(isSubmitting || isSuccess || isError) && 'opacity-50 cursor-not-allowed'} w-full  text-center btn-primary`}
                >
                  <div className='flex items-center justify-center'>
                    {isSubmitting && (
                      <svg
                        aria-hidden='true'
                        className='w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-800 mr-2'
                        viewBox='0 0 100 101'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                          fill='currentColor'
                        />
                        <path
                          d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                          fill='currentFill'
                        />
                      </svg>
                    )}
                    Send
                  </div>
                </button>
              </form>

              {isError && (
                <div
                  className='border border-red-500 p-4 mb-4 text-md text-red-800 dark:text-red-400 rounded-lg bg-red-50 dark:bg-gray-800 '
                  role='alert'
                >
                  <span className='font-medium'>Something went wrong!</span>
                  <br />
                  Try refreshing the page and submitting the form again later.
                </div>
              )}

              {isSuccess && (
                <div
                  className='border border-green-500 p-4 mb-4 text-md text-green-800 dark:text-green-400 rounded-lg bg-green-50 dark:bg-gray-800 '
                  role='alert'
                >
                  <span className='font-medium'>{SUCCESSMESSAGE.title}</span>
                  <br />
                  {SUCCESSMESSAGE.description}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default InquiryForm
