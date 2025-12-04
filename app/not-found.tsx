import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='flex flex-col gap-2 justify-center items-center min-h-[80vh]'>
      <h2 className='text-xl text-gray-800 dark:text-gray-50'>Sorry, Page Not Found 🥹</h2>
      <Link href="/" className='text-white bg-blue-500 p-2 rounded'>Return Home</Link>
    </div>
  )
}