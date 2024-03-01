import { Alert } from '@material-tailwind/react'
import React from 'react'

const Message = (props) => {
    return (
        <div>
            {props.alert && <Alert className='mt-1' variant='gradient' color={props.alert.type}>{props.alert.msg}</Alert>}
        </div>
    )
}

export default Message