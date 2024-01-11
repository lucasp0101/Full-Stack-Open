import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import NewBlogForm from './NewBlogForm'

const blogData = {
  title: 'Mock blog',
  author: 'Peter',
  url: 'http://mock.url'
}

const createNewBlogMockHandler = jest.fn()

test('The New Blog Form works correctly', async () => {
  const { container } = render(<NewBlogForm createNewBlog={createNewBlogMockHandler}></NewBlogForm>)


  let titleInput = null
  let authorInput = null
  let urlInput = null
  let sendButton = null

  try {
    titleInput = screen.getByPlaceholderText( /title/i )
    authorInput = screen.getByPlaceholderText( /author/i )
    urlInput = screen.getByPlaceholderText( /URL/i )
    sendButton = screen.getByText(/Create/i)
  } 
  catch (exception) {
    console.log(exception);
  }

  const user = userEvent.setup()

  await user.type(titleInput, blogData.title)
  await user.type(authorInput, blogData.author)
  await user.type(urlInput, blogData.url)
  await user.click(sendButton)

  expect(createNewBlogMockHandler.mock.calls).toHaveLength(1)

  expect(createNewBlogMockHandler.mock.calls[0][0]).toEqual(blogData)
})