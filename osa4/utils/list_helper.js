const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favouriteBlog = (blogs) => {
  return blogs.length === 0
    ? null
    : blogs.reduce((fav, blog) => blog.likes >= fav.likes ? blog : fav, { likes: 0 })
}

const mostBlogs = (blogs) => {
  const bloggers = blogs.reduce((bloggers, blog) => {
    if (!bloggers.find(blogger => blogger.author === blog.author)) {
      return bloggers.concat({ author: blog.author, blogs: 1 })
    } else {
      let blogger = bloggers.find(blogger => blogger.author === blog.author)
      blogger.blogs++
      return bloggers
    }
  }, [])
  return bloggers.length === 0
    ? null
    : bloggers.reduce((maxBlogger, blogger) => blogger.blogs >= maxBlogger.blogs ? blogger : maxBlogger, { blogs: 0})
}

const mostLikes = blogs => {
  const bloggers = blogs.reduce((bloggers, blog) => {
    if (!bloggers.find(blogger => blogger.author === blog.author)) {
      return bloggers.concat({ author: blog.author, likes: blog.likes })
    } else {
      let blogger = bloggers.find(blogger => blogger.author === blog.author)
      blogger.likes += blog.likes
      return bloggers
    }
  }, [])

  return bloggers.length === 0
    ? null
    : bloggers.reduce((maxBlogger, blogger) => blogger.likes >= maxBlogger.likes ? blogger : maxBlogger, { likes: -1})
}

module.exports = {
  dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes,
}