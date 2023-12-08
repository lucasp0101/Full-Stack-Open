const listHelper = require('../utils/list_helper')

describe('total likes', () => {
    const emptyList = []
    
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            likes: 5,
            author: 'Edsger W. Dijkstra'
        }
    ]

    const listWithMultipleBlogs = [
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
        }
    ]


    test('of empty list is zero', () => {
        const result = listHelper.totalLikes(emptyList)
        expect(result).toBe(0)
    })

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('when list has more than one blog', () => {
        const result = listHelper.totalLikes(listWithMultipleBlogs)
        expect(result).toBe(15)
    })
})
