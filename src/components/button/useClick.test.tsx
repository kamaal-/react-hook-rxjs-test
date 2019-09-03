import React from 'react'
import {isString, makeObservable, useClick } from './useClick'
import {Observable} from 'rxjs'
import {map, debounceTime} from 'rxjs/operators'
import Button from './Button'
import { render, fireEvent, waitForElement } from '@testing-library/react'
import {act} from 'react-dom/test-utils'
import { renderHook, act as hookAct } from '@testing-library/react-hooks'


describe('useState', () => {
    it('should update count using useState', () => {
        const {result} = renderHook(() => useClick(400))
        const {updateCount} = result.current
        hookAct(() => {
            updateCount(8) 
        })
        expect(result.current.count).toBe(8)
    })
})

describe('makeObservable', () => {
    it('should return false for non HTMLElement', () => {
        const observable = makeObservable({}, 'click')
        expect(observable instanceof Observable).toBe(false)
    })

    it('should return false for non non string event', () => {
        const {getByTestId} = render(<Button/>)
        const el = getByTestId('btn') as HTMLButtonElement
        const observable = makeObservable(el, 20)
        expect(observable instanceof Observable).toBe(false)
    })

    it('should return false for null', () => {
        const observable = makeObservable(null, 'click')
        expect(observable instanceof Observable).toBe(false)
    })

    it('should create observable', () => {
        const {getByTestId} = render(<Button/>)
        const el = getByTestId('btn') as HTMLButtonElement
        const observable = makeObservable(el, 'click')
        expect(observable instanceof Observable).toBe(true)
    })
})

describe('isString', () => {

    it('is a string "click"', () => {
        expect(isString('click')).toEqual(true)
    })

    it('is not a string: object', () => {
        expect(isString({})).toEqual(false)
    })

    it('is not a string: 9', () => {
        expect(isString(9)).toEqual(false)
    })

    it('is not a string: nothing', () => {
        expect(isString(null)).toEqual(false)
    })
})

describe('Observable', () => {
    it('Should subscribe observable', async (done) => {
        await act( async () => {
            const {getByTestId} = render(<Button/>)
            const el = await waitForElement(() => getByTestId('btn')) as HTMLButtonElement
            const observerble =  makeObservable(el, 'click');
            if(observerble){
                let count = 1
                observerble
                    .pipe(
                        map(e => count++),
                        debounceTime(400)
                    )
                    .subscribe(s => {
                        expect(s).toEqual(6)
                        done()
                    })
                
                fireEvent.click(el)
                fireEvent.click(el)
                fireEvent.click(el)
                fireEvent.click(el)
                fireEvent.click(el)
                fireEvent.click(el)
            }
        })
    })
})