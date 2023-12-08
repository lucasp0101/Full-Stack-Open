const listHelper = require('../utils/list_helper')

describe('most blogs', () => {
    const emptyList = []
    
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            likes: 5,
            author: 'Edsger W. Dijkstra'
        }
    ]

    const listWithMultipleBlogsOneBigger = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            likes: 5,
            author: 'Edsger W. Dijkstra'
        },
        {
            _id: '5a422aa71b54a676234d17f9',
            title: 'Go To Statement Considered Harmful',
            likes: 10,
            author: 'Edsger W. Dijkstra'
        },
        {
            _id: '5a422aa71b54a676234d17f0',
            title: 'Go To Statement Considered Harmful',
            likes: 15,
            author: 'Luca'
        }
    ]

    const listWithMultipleBlogsTwoBigger = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            likes: 15,
            author: 'Edsger W. Dijkstra'
        },
        {
            _id: '5a422aa71b54a676234d17f9',
            title: 'Go To Statement Considered Harmful',
            likes: 10,
            author: 'Luca'
        }
    ]

    test('of empty list is empty', () => {
        const result = listHelper.mostBlogs(emptyList)
        expect(result).toEqual({})
    })

    test('when list has only one blog equals the author of that blog', () => {
        const result = listHelper.mostBlogs(listWithOneBlog)
        expect(result).toEqual({'Edsger W. Dijkstra': 1})
    })

    test('when list has more than one blog and there isnt a draw', () => {
        const result = listHelper.mostBlogs(listWithMultipleBlogsOneBigger)
        expect(result).toEqual({'Edsger W. Dijkstra': 2})
    })

    test('when list has more than one blog and there is a draw', () => {
        const result = listHelper.mostBlogs(listWithMultipleBlogsTwoBigger)
        expect(result).toEqual({'Edsger W. Dijkstra': 1})
    })
})