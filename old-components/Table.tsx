import React, { createRef, FC, memo, useEffect } from 'react'
import TableData from '@/types/Table.types'

const Table:FC<TableData> = memo(({ data, classNames } : TableData) => {
  const tablePortalverseRef = createRef();

  useEffect(() => {
    (tablePortalverseRef.current as any).data = {
      head: data.head || '',
      icon: data.icon || '',
      rows: data.rows || []
    }
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  return <div className={classNames} ref={tablePortalverseRef as React.RefObject<HTMLDivElement>}>
    <table className="w-full">
      <thead>
        <tr>
          <th className='text-white text-base font-Nunito bg-[#8B9BA3] px-4 py-[10px] border border-[#8B9BA3] rounded-t-[8px] flex justify-between'>
          <span className=''>{data.head}</span><span className='material-icons'>{data.icon}</span>
        </th>
        </tr>
      </thead>
      <tbody className='bg-white'>
        {
          data.rows.map((row: any, i: number)=>{
            return [<tr key={i} className='border-b border-[#8B9BA3]'><td className='px-6 py-2 font-Nunito text-sm'>{data.rows[i]}</td></tr>]
          })
        }
      </tbody>
    </table>
  </div>
})

export default Table