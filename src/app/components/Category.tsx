'use client'
import { useSearchParams } from "next/navigation"
import {useRouter} from 'next/navigation'
import { useCallback } from "react"
import queryString from 'query-string'

interface CategoryProps {
  label: string;
  selected: boolean;
}


const Category: React.FC<CategoryProps> = ({ label, selected }) =>{
  const router = useRouter()

  const params = useSearchParams()

  const handleClick = useCallback (() => {
     if(label === 'All'){
      router.push('/')
     }else{
      let currentQuery = {};
      if(params){
        currentQuery = queryString.parse(params.toString())
      }
      const updatedQuery = {
        ...currentQuery,
        category: label
      }

      const url = queryString.stringifyUrl({
        url: '/',
        query: updatedQuery
      },
      {
        skipNull: true
      }
    )

    router.push(url)
     }

  },[label, params, router] )  
  return (
    <div onClick={handleClick} className={` text-center lg:p-2 p-1 border-b-2 hover:text-red-400 transition cursor-pointer
      ${selected ? 'border-b-red-800 text-slate-300' : 'border-transparent text-white'}
    `}>
      <div className="font-medium md:text-[10px] hover:text-slate-500 text-white xl:text-sm">{label}</div>
    </div>
  )
}

export default Category