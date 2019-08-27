import React, { SFC} from 'react'

type Props = {
    interval?: number;
    label?:string;
}

const Button:SFC<Props> = (props:Props) => {
    return <button data-testid="btn">Hello</button>
}

export default Button