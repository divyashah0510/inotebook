import { Alert } from '@material-tailwind/react'
import React from 'react'

const Message = () => {
    return (
        <div className="flex w-full flex-col gap-2">
            <Alert className='mt-5 mb-5 mx-auto'  color='green' variant='ghost'>
                <p className='flex justify-center items-center font-extrabold text-xl'>
                    This is a Message
                </p>
            </Alert>
        </div>
    )
}

export default Message