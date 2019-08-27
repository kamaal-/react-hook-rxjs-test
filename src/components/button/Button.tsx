import React, { SFC} from 'react'

type Props = {
    interval?: number;
    label?:string;
}

const Button:SFC<Props> = (props:Props) => {
    return <button>Hello</button>
}

export default Button