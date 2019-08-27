import React from 'react'
import ReactDOM from 'react-dom'
import Button from './Button'
import { render, fireEvent, waitForElement, waitForDomChange } from '@testing-library/react'

describe('Button component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Button />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
})

describe('Dom updates', () => {
    it('should update button label to "Hello 2"', async (done) => {
        const {getByTestId} = render(<Button interval={500}/>)
        const el = await waitForElement(() => getByTestId('btn')) as HTMLButtonElement
        fireEvent.click(el)
        fireEvent.click(el)
        fireEvent.click(el)
        const t = await waitForDomChange({container: el})
        expect(el.textContent).toEqual('Hello 2')
        done()
    })
})
