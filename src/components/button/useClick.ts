import React, { useRef, useEffect, useCallback, useState, RefObject, Dispatch} from 'react'
import {fromEvent, Observable, Subscribable, Unsubscribable} from 'rxjs'
import {map, debounceTime} from 'rxjs/operators'

type NullableObservarbel = Observable<any> | null;
type NUllabe = HTMLButtonElement | null;
type NullableSubscribable = Subscribable<any> | null
type NullableUnsubscribable = Unsubscribable | null
export type Result = {
    ref: RefObject<HTMLButtonElement>;
    count:number;
    updateCount:Dispatch<React.SetStateAction<number>>;
}

export const isString = (input:any):Boolean => (typeof input === "string" && input !== "")

export const makeObservable = (el:NUllabe, eventType:string):NullableObservarbel => el instanceof HTMLElement && isString(eventType) ? fromEvent(el, eventType) : null

export const useClick = (time:number = 500):Result => {
    const button: RefObject<HTMLButtonElement> = useRef(null)
    const [count, updateCount] = useState<number>(0)
    const fireAfterSubscribe = useCallback((c) => {updateCount(c)}, [])
    useEffect(():()=>void => {
        const el = button.current
        const observerble =  makeObservable(el, 'click')
        let _count = count
        let subscribable:NullableSubscribable = null
        let subscribe:NullableUnsubscribable = null
        if(observerble){
            subscribable = observerble.pipe(
                map(e => _count++),
                debounceTime(time)
            )
            const subscribe = subscribable.subscribe(fireAfterSubscribe)
        }
        return () => subscribe && subscribe.unsubscribe()
    // eslint-disable-next-line
    }, [])
    return {ref:button, count, updateCount:fireAfterSubscribe}
}