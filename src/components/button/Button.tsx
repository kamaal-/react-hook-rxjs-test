import React, { SFC} from 'react'
import {useClick} from './useClick'

type Props = {
    interval?: number;
    label?:string;
}

const Button:SFC<Props> = (props:Props) => {
    const {ref, count} = useClick(props.interval)
    return <button data-testid="btn" ref={ref}>Hello {count}</button>
}

export default Button