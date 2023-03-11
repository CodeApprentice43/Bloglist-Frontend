import React from "react";
import BlogForm from './BlogForm'
import {render,screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent  from "@testing-library/user-event"

test('event handler is invoked upon submission of new blog', async()=>{
    const mockhandler = jest.fn()
    render(<BlogForm handlePost={mockhandler}/>)
    const user = userEvent.setup()
    const inputfields = screen.getAllByRole('textbox')
    const button = screen.getByText('Submit')

    await user.type(inputfields[0], 'a test blog')
    await user.type(inputfields[1],'www.test.com')
    await user.type(inputfields[2],'0')
    
    await user.click(button)

    expect(mockhandler.mock.calls).toHaveLength(1)
    console.log(mockhandler.mock.calls)
    expect()

})