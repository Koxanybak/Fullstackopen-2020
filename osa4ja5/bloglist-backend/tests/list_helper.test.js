const listHelper = require("../utils/list_helper")

test("dummy returns one", () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe("totalLikes", () => {
  test("of an empty list is zero", () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test("when list has only one blog equals the likes of that", () => {
    expect(listHelper.totalLikes([
      {
        _id: "5e8c99a32a18231cdc56c40f",
        title: "tämmönen",
        author: "minä",
        url: "sdfokasmfd",
        likes: 4,
        __v: 0
      }
    ])).toBe(4)
  })

  test("of a bigger list is calculated right", () => {
    expect(listHelper.totalLikes([
      {
        _id: "5e8c99a32a18231cdc56c40f",
        title: "tämmönen",
        author: "minä",
        url: "sdfokasmfd",
        likes: 4,
        __v: 0
      },
      {
        _id: "5e8c99a32a18231cdc56c40f",
        title: "tämmönen",
        author: "minä",
        url: "sdfokasmfd",
        likes: 0,
        __v: 0
      },
      {
        _id: "5e8c99a32a18231cdc56c40f",
        title: "tämmönen",
        author: "minä",
        url: "sdfokasmfd",
        likes: 500,
        __v: 0
      },
      {
        _id: "5e8c99a32a18231cdc56c40f",
        title: "tämmönen",
        author: "minä",
        url: "sdfokasmfd",
        likes: 30,
        __v: 0
      },
      {
        _id: "5e8c99a32a18231cdc56c40f",
        title: "tämmönen",
        author: "minä",
        url: "sdfokasmfd",
        likes: 2,
        __v: 0
      }
    ])).toBe(536)
  })
})

describe("favouriteBlog", () => {
  test("of an empty list is null", () => {
    expect(listHelper.favouriteBlog([])).toEqual(null)
  })

  test("of a single blog equals it's like count", () => {
    expect(listHelper.favouriteBlog([
      {
        _id: "5e8c99a32a18231cdc56c40f",
        title: "tämmönen",
        author: "minä",
        url: "sdfokasmfd",
        likes: 4,
        __v: 0
      }
    ])).toEqual({
      _id: "5e8c99a32a18231cdc56c40f",
      title: "tämmönen",
      author: "minä",
      url: "sdfokasmfd",
      likes: 4,
      __v: 0
    })
  })

  test("of a bigger list is calculated correctly", () => {
    expect(listHelper.favouriteBlog([
      {
        _id: "5e8c99a32a18231cdc56c40f",
        title: "mimmonen",
        author: "minä",
        url: "sdfokasmfd",
        likes: 2,
        __v: 0
      },
      {
        _id: "5e8c99a32a18231cdc56c40f",
        title: "tämmönen",
        author: "minä",
        url: "sdfokasmfd",
        likes: 34,
        __v: 0
      },
      {
        _id: "5e8c99a32a18231cdc56c40f",
        title: "tommonen",
        author: "minä",
        url: "sdfokasmfd",
        likes: 0,
        __v: 0
      },
      {
        _id: "5e8c99a32a18231cdc56c40f",
        title: "millanen",
        author: "minä",
        url: "sdfokasmfd",
        likes: 7,
        __v: 0
      }
    ])).toEqual({
      _id: "5e8c99a32a18231cdc56c40f",
      title: "tämmönen",
      author: "minä",
      url: "sdfokasmfd",
      likes: 34,
      __v: 0
    })
  })
})

describe("mostBlogs", () => {
  test("returns null when blogs is empty", () => {
    expect(listHelper.mostBlogs([])).toBe(null)
  })

  test("returns the correct blogger with the correct amount of blogs", () => {
    expect(listHelper.mostBlogs([
      {
        _id: "5e8c99a32a18231cdc56c40f",
        title: "mimmonen",
        author: "leevi",
        url: "sdfokasmfd",
        likes: 2,
        __v: 0
      },
      {
        _id: "5e8c99a32a18231cdc56c40f",
        title: "tämmönen",
        author: "leevi",
        url: "sdfokasmfd",
        likes: 34,
        __v: 0
      },
      {
        _id: "5e8c99a32a18231cdc56c40f",
        title: "tommonen",
        author: "mikael",
        url: "sdfokasmfd",
        likes: 0,
        __v: 0
      },
      {
        _id: "5e8c99a32a18231cdc56c40f",
        title: "millanen",
        author: "leevi",
        url: "sdfokasmfd",
        likes: 7,
        __v: 0
      },
      {
        _id: "5e8c99a32a18231cdc56c40f",
        title: "millanen",
        author: "harri",
        url: "sdfokasmfd",
        likes: 7,
        __v: 0
      },
      {
        _id: "5e8c99a32a18231cdc56c40f",
        title: "millanen",
        author: "mikael",
        url: "sdfokasmfd",
        likes: 7,
        __v: 0
      },
      {
        _id: "5e8c99a32a18231cdc56c40f",
        title: "millanen",
        author: "mikael",
        url: "sdfokasmfd",
        likes: 7,
        __v: 0
      },
      {
        _id: "5e8c99a32a18231cdc56c40f",
        title: "millanen",
        author: "harri",
        url: "sdfokasmfd",
        likes: 7,
        __v: 0
      },
      {
        _id: "5e8c99a32a18231cdc56c40f",
        title: "millanen",
        author: "leevi",
        url: "sdfokasmfd",
        likes: 7,
        __v: 0
      }
    ])).toEqual({
      author: "leevi",
      blogs: 4
    })
  })
})

describe("mostLikes", () => {
  test("of an empty list is null", () => {
    expect(listHelper.mostLikes([])).toBe(null)
  })

  test("of a single blogger is his like count", () => {
    expect(listHelper.mostLikes([
      {
        _id: "5e8c99a32a18231cdc56c40f",
        title: "millanen",
        author: "leevi",
        url: "sdfokasmfd",
        likes: 7,
        __v: 0
      }
    ])).toEqual({
      author: "leevi",
      likes: 7
    })
  })

  test("of a bigger list is calculated correctly", () => {
    expect(listHelper.mostLikes([
      {
        _id: "5e8c99a32a18231cdc56c40f",
        title: "mimmonen",
        author: "leevi",
        url: "sdfokasmfd",
        likes: 3,
        __v: 0
      },
      {
        _id: "5e8c99a32a18231cdc56c40f",
        title: "tämmönen",
        author: "leevi",
        url: "sdfokasmfd",
        likes: 5,
        __v: 0
      },
      {
        _id: "5e8c99a32a18231cdc56c40f",
        title: "tommonen",
        author: "mikael",
        url: "sdfokasmfd",
        likes: 1,
        __v: 0
      },
      {
        _id: "5e8c99a32a18231cdc56c40f",
        title: "millanen",
        author: "leevi",
        url: "sdfokasmfd",
        likes: 11,
        __v: 0
      },
      {
        _id: "5e8c99a32a18231cdc56c40f",
        title: "millanen",
        author: "harri",
        url: "sdfokasmfd",
        likes: 0,
        __v: 0
      },
      {
        _id: "5e8c99a32a18231cdc56c40f",
        title: "millanen",
        author: "mikael",
        url: "sdfokasmfd",
        likes: 11,
        __v: 0
      },
      {
        _id: "5e8c99a32a18231cdc56c40f",
        title: "millanen",
        author: "mikael",
        url: "sdfokasmfd",
        likes: 9,
        __v: 0
      },
      {
        _id: "5e8c99a32a18231cdc56c40f",
        title: "millanen",
        author: "harri",
        url: "sdfokasmfd",
        likes: 7,
        __v: 0
      },
      {
        _id: "5e8c99a32a18231cdc56c40f",
        title: "millanen",
        author: "leevi",
        url: "sdfokasmfd",
        likes: 3,
        __v: 0
      }
    ])).toEqual({
      author: "leevi",
      likes: 22
    })
  })
})