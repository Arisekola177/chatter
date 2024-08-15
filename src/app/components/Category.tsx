'use client'
import { useSearchParams } from "next/navigation"
import {useRouter} from 'next/navigation'
import { useCallback } from "react"
import queryString from 'query-string'

interface CategoryProps {
  label: string;
  Icon: React.ComponentType<{ size: number }>;
  selected: boolean;
}


const Category: React.FC<CategoryProps> = ({ label, Icon, selected }) =>{
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
    <div onClick={handleClick} className={`flex items-center justify-between text-center lg:p-2 p-1 border-b-2 hover:text-red-400 transition cursor-pointer
      ${selected ? 'border-b-red-800 text-red-800' : 'border-transparent text-red-500'}
    `}>
      
      <Icon size={14} />
      <div className="font-medium md:text-[10px] text-red-500 xl:text-sm">{label}</div>
    </div>
  )
}

export default Category