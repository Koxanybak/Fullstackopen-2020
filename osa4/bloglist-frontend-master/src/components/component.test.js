import React from "react"
import { render, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import Blogs from "./Blogs"
import BlogForm from "./BlogForm"

describe("<Blogs />", () => {
  let component
  const like = jest.fn()

  beforeEach(() => {
    component = render(
      <Blogs blogs={[{
        title: "terve",
        author: "minä",
        likes: 5,
        id: 25,
        url: "huh",
        user: {
          username: "hellas",
          name: "Arto Hellas",
        },
      }]} user={{
        username: "hellas",
        name: "Arto Hellas",
      }} 
      updateBlog={like} />
    )
  })
  
  test("renders title and author but not url and likes", () => {
    expect(component.container).toHaveTextContent("terve")
    expect(component.container.querySelector(".testDiv")).toHaveStyle("display: none")
  })

  test("url and likes are shown when the show button is pressed", () => {
    const button = component.getByText("view")
    fireEvent.click(button)

    expect(component.container.querySelector(".testDiv")).toHaveStyle("display: block")
  })

  test("eventhandler is called two times when the like button is pressed two times", () => {
    const button = component.getByText("view")
    fireEvent.click(button)

    const likeButton = component.getByText("like")
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(like.mock.calls).toHaveLength(2)
  })
})

describe("<BlogForm />", () => {
  let component
  const create = jest.fn()

  beforeEach(() => {
    component = render(
      <BlogForm createBlog={create} />
    )
  })

  test("calls the callback function with the correct parameters", () => {
    const form = component.container.querySelector("form")

    const titleInput = component.container.querySelector("#title")
    const authorInput = component.container.querySelector("#author")
    const urlInput = component.container.querySelector("#url")

    fireEvent.change(titleInput, {
      target: { value: "otsikko" }
    })
    fireEvent.change(authorInput, {
      target: { value: "kirjoittaja" }
    })
    fireEvent.change(urlInput, {
      target: { value: "osoite" }
    })

    fireEvent.submit(form)

    expect(create.mock.calls).toHaveLength(1)
    expect(create.mock.calls[0][0]).toEqual({
      title: "otsikko",
      author: "kirjoittaja",
      url: "osoite",
    })
  })
})