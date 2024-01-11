import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

const blogData = {
  title: 'Mock blog',
  author: 'Peter',
  likes: 'numberOfMockLikes',
  url: 'http://mock.url'
}

const mockHandleLike = jest.fn()
const mockHandleDelete = jest.fn()
const mockCurrentUser = 'mockCurrentUser'

test('Renders only title and author initially', () => {
  render(<Blog 
    blog={blogData} 
    handleLike={mockHandleLike} 
    handleDelete={mockHandleDelete} 
    currentUser={mockCurrentUser}/>
  )

  let renderedElementTitle = null
  let renderedElementAuthor = null
  let renderedElementLikes = null
  let renderedElementURL = null

  try {
    renderedElementTitle = screen.getByText(/Mock/i)
    renderedElementAuthor = screen.getByText(/Peter/i)
    renderedElementLikes = screen.getByText(/numberOfMockLikes/i)
    renderedElementURL = screen.getByText(/http/i)
  } catch (error) {}

  expect(renderedElementTitle).not.toBe(null)
  expect(renderedElementAuthor).not.toBe(null)
  expect(renderedElementURL).toBe(null)
  expect(renderedElementLikes).toBe(null)
})

test('Renders all info after clicking show', async () => {
  render(<Blog 
    blog={blogData} 
    handleLike={mockHandleLike} 
    handleDelete={mockHandleDelete} 
    currentUser={mockCurrentUser}/>
  )

  const user = userEvent.setup()
  const button = screen.getByText(/Show/i)

  await user.click(button)

  let renderedElementURL = null
  let renderedElementLikes = null

  try {
    renderedElementURL = screen.getByText(/http/i)
    renderedElementLikes = screen.getByText(/numberOfMockLikes/i)
  }
  catch (error) {}

  expect(renderedElementURL).not.toBe(null)
  expect(renderedElementLikes).not.toBe(null)
})

test('Checks that the event handler handleLike gets called\
  twice when the button Like is clicked twice' , async () => {
    const { container } = render(<Blog 
      blog={blogData} 
      handleLike={mockHandleLike} 
      handleDelete={mockHandleDelete} 
      currentUser={mockCurrentUser}/>
    )
  
    const user = userEvent.setup()
    const button = screen.getByText(/Show/i)

    await user.click(button)

    const likeButton = container.querySelector('.blogLikeButton')

    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandleLike.mock.calls).toHaveLength(2)
})