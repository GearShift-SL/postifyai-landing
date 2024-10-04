import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

/* ---------------------------------- DATA ---------------------------------- */
const APIENDPOINT = '/api/signup/'
const SUCCESSMESSAGE = {
  title: '¡Gracias!',
  description:
    'Te hemos añadido a nuestra lista de espera. Serás de los primeros en recibir noticias cuando publiquemos la primera versión de AutoVisita y tendrás acceso al descuento.'
}

/* ----------------------------------- Zod ---------------------------------- */
const SignupFormSchema = z.object({
  first_name: z.string().min(1, 'Por favor introduce tu nombre.'),
  last_name: z.string().min(1, 'Introduce tus apellidos.'),
  email: z
    .string()
    .min(1, 'Introduce una dirección de correo.')
    .email('Introduce una dirección de correo válida.'),
  // password: z.string().min(1, 'Por favor introduce una contraseña.'),
  // confirm_password: z.string().min(1, 'Por favor confirma tu contraseña.'),
  terms: z.boolean().refine((value) => value === true, {
    message: 'Debes aceptar los términos y condiciones.'
  })
})

type SignupFormValues = z.infer<typeof SignupFormSchema>

/* --------------------------------- Component ------------------------------- */
const SignupForm = () => {
  /* ---------------------------------- Hooks --------------------------------- */
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<SignupFormValues>({
    resolver: zodResolver(SignupFormSchema)
  })

  /* -------------------------------- Functions ------------------------------- */
  const onSubmit = async (data: SignupFormValues) => {
    setIsSubmitting(true)

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
      setError('Algo ha salido mal. Por favor, inténtalo de nuevo.')
    }

    setIsSubmitting(false)
  }

  /* --------------------------------- Render --------------------------------- */
  if (isSuccess) {
    return (
      <section>
        <div className='flex flex-col items-center justify-center px-6 py-8 my-10 md:my-20 mx-auto lg:py-0'>
          <div className='w-full bg-green-200 rounded-lg shadow-xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                {SUCCESSMESSAGE.title}
              </h1>
              <p className='text-gray-500 dark:text-gray-400'>
                {SUCCESSMESSAGE.description}
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section>
        <div className='flex flex-col items-center justify-center px-6 py-8 my-10 md:my-20 mx-auto lg:py-0'>
          <div className='w-full bg-white rounded-lg shadow-xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                Error
              </h1>
              <p className='text-red-500 dark:text-red-400'>{error}</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section>
      <div className='flex flex-col items-center justify-center px-6 py-8 my-10 md:my-20 mx-auto lg:py-0'>
        <div className='w-full bg-white rounded-lg shadow-xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
              Únete a la lista de espera
            </h1>

            <form
              className='space-y-4 md:space-y-6'
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* First Name */}
              <div>
                <label
                  htmlFor='first_name'
                  className={`block mb-2 text-sm font-medium ${errors.first_name ? 'text-red-400' : 'text-gray-900 dark:text-white'}`}
                >
                  Nombre
                </label>
                <input
                  required
                  {...register('first_name', { required: true })}
                  placeholder='Juan'
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    errors.first_name ? 'border-red-400' : ''
                  }`}
                />
                {errors.first_name && (
                  <p className='text-red-500 text-sm mt-2'>
                    {errors.first_name.message}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label
                  htmlFor='last_name'
                  className={`block mb-2 text-sm font-medium ${errors.last_name ? 'text-red-400' : 'text-gray-900 dark:text-white'}`}
                >
                  Apellidos
                </label>
                <input
                  required
                  {...register('last_name', { required: true })}
                  placeholder='Limon'
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    errors.last_name ? 'border-red-400' : ''
                  }`}
                />
                {errors.last_name && (
                  <p className='text-red-500 text-sm mt-2'>
                    {errors.last_name.message}
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

              {/* Password */}
              {/* <div>
                <label
                  htmlFor='password'
                  className={`block mb-2 text-sm font-medium ${errors.password ? 'text-red-400' : 'text-gray-900 dark:text-white'}`}
                >
                  Contraseña
                </label>
                <input
                  required
                  type='password'
                  {...register('password', { required: true })}
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    errors.password ? 'border-red-400' : ''
                  }`}
                />
                {errors.password && (
                  <p className='text-red-500 text-sm mt-2'>
                    {errors.password.message}
                  </p>
                )}
              </div> */}

              {/* Confirm Password */}
              {/* <div>
                <label
                  htmlFor='confirm_password'
                  className={`block mb-2 text-sm font-medium ${errors.confirm_password ? 'text-red-400' : 'text-gray-900 dark:text-white'}`}
                >
                  Confirma la contraseña
                </label>
                <input
                  required
                  type='password'
                  {...register('confirm_password', { required: true })}
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    errors.confirm_password ? 'border-red-400' : ''
                  }`}
                />
                {errors.confirm_password && (
                  <p className='text-red-500 text-sm mt-2'>
                    {errors.confirm_password.message}
                  </p>
                )}
              </div> */}

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
                    Acepto los{' '}
                    <a
                      className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                      href='/terms'
                    >
                      Términos y condiciones
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
                className={`${(isSubmitting || isSuccess || error) && 'opacity-50 cursor-not-allowed'} w-full  text-center btn-primary`}
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
                  Enviar
                </div>
              </button>

              {/* <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                Already have an account?{' '}
                <a
                  href='#'
                  className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                >
                  Login here
                </a>
              </p> */}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignupForm
