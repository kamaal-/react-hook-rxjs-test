import {fromEvent, Observable} from 'rxjs'

type NullableObservarbel = Observable<any> | null;
type NUllabe = HTMLButtonElement | null;

export const isString = (input:any):Boolean => (typeof input === "string" && input !== "")

export const makeObservable = (el:NUllabe, eventType:string):NullableObservarbel => el instanceof HTMLElement && isString(eventType) ? fromEvent(el, eventType) : null

