import React from 'react'
import {isString, makeObservable} from './useClick'
import {Observable} from 'rxjs'
import Button from './Button'
import { render } from '@testing-library/react'

describe('useClick', () => {

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