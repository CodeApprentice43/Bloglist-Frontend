import React from "react";
import Blog from './Blog'
import {render,screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent  from "@testing-library/user-event"

test('url and likes of a blog are hidden by default', async()=>{
    const blog = {
        title: 'testing react',
        author: 'John Doe',
        url: 'www.testing.com',
        likes: '0'
    }
    const container = render(<Blog blog = {blog} user = {'nafis'}/>).container

    const div = container.querySelector('.default-view')
    expect(div).toHaveTextContent('testing react')

    const div2 = container.querySelector('.toggle-view')
    expect(div2).toBe(null)

})
test('url and likes are shown when toggled on', async()=>{
    const blog = {
        title: 'testing react',
        author: 'John Doe',
        url: 'www.testing.com',
        likes: '0'
    }
   const container =  render(<Blog blog = {blog}  user = {'nafis'}/>).container

   const user = userEvent.setup()
   const button = screen.getByText('view')

   await user.click(button)

   const div = container.querySelector('.toggle-view')
   expect(div).toHaveTextContent('www.testing.com')
})


test(' likes event handler is invoked properly', async()=>{
   
    const blog = {
        title: 'testing react',
        author: 'John Doe',
        url: 'www.testing.com',
        likes: '0'
    }
    const mockhandler = jest.fn()

    const {container} = render(<Blog blog = {blog} user ='john' handeLike = {mockhandler}/>)

    const user = userEvent.setup()

    //click the view button to render the like button 
    const button = screen.getByText('view')

    await user.click(button)

    //like button is rendered and fetched 
    const likebutton = screen.getByText('like')

    await user.click(likebutton)
    await user.click(likebutton)

    expect(mockhandler.mock.calls).toHaveLength(2)
})



