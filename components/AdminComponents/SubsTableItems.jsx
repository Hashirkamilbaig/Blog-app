import React from 'react'

const SubsTableItems = ({email}) => {
  return (
    <tr className='bg-white border-b text-left'>
      <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
        {email?email : 'No Email'}
      </th>
      <td className='px-6 py-4 hidden sm:block'>{"11 jan 2024"}</td>
      <td className='px-6 py-4 cursor-pointer'>x</td>
    </tr>
  )
}

export default SubsTableItems