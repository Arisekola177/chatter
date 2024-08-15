'use client'

import { useRouter } from "next/navigation"
import queryString from "query-string"
import { useForm } from "react-hook-form"

const SearchInput = () => {
  const router = useRouter()

  // Corrected 'searhTerm' to 'searchTerm'
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      searchTerm: '' // Updated here
    }
  })

  const onSubmit = async (data: any) => {
    if (!data.searchTerm) return router.push('/');

    const url = queryString.stringifyUrl({
      url: '/',
      query: {
        searchTerm: data.searchTerm
      }
    }, { skipNull: true })

    router.push(url)
    reset()
  }

  return (
    <div className="flex items-center">
      <input 
        {...register('searchTerm')} // Ensure this matches with defaultValues
        placeholder='search category'
        type='text'
        autoComplete='off'
        className='md:p-2 xs:p-1 border xs:w-[90%] md:w-full mx-auto placeholder:text-xs border-gray-300 rounded-l-md focus:outline-none focus:border-[0.5px] focus:border-slate-500'
      />
      <button 
        onClick={handleSubmit(onSubmit)} 
        className='bg-slate-700 hover:opacity-80 xs:text-xs md:text-base text-white p-2 rounded-r-md'
      >
        Search
      </button>
    </div>
  )
}

export default SearchInput
