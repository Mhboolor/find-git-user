import React, { useEffect, useState } from 'react'

function PopularRepo() {

    const [repo , setRepo] = useState([]);


    useEffect(() => {
        
    } , [])

  return (
    <div className='bg-white rounded-sm p-5'>
        <div className='font-medium'>
            <h3>10 ریپازیتوری با بیشترین ستاره :</h3>
        </div>
        <div>

        </div>
    </div>
  )
}

export default PopularRepo