import { ReactNode } from 'react'

function AddCardWarning({ children }: { children: ReactNode }): JSX.Element {
  return (
    <div className="bg-red-700 font-bold text-gray-800 rounded-md shadow-md p-2 m-2 mb-5">
      <span>Warning: </span>
      {children}
    </div>
  )
}

export default AddCardWarning
