import {isString} from './useClick'
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