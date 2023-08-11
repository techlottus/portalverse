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
          <th className='text-surface-0 text-base font-texts bg-primary-200 px-4 py-2.5 border border-solid border-surface-100 rounded-trounded-t-lg flex justify-between'>
          <span className=''>{data.head}</span><span className='material-icons'>{data.icon}</span>
        </th>
        </tr>
      </thead>
      <tbody className='bg-surface-0'>
        {
          data.rows.map((row: any, i: number)=>{
            return [<tr key={i} className='border-b border-solid border-surface-100'><td className='px-6 py-2 font-texts text-sm'>{data.rows[i]}</td></tr>]
          })
        }
      </tbody>
    </table>
  </div>
})

export default Table