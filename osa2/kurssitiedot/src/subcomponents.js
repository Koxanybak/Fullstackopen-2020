import React from "react"

const Header = (props) => {
    return (
      <div>
        <h2>{props.course.name}</h2>
      </div>
    )
  }
  
  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map((part) => {
          return (
            <Part key={part.id} name={part.name} exercises={part.exercises} />
          )
        })}
      </div>
    )
  }
  
  const Part = ({ name, exercises }) => {
    return (
      <div>
        <p>{name} {exercises}</p>
      </div>
    )
  }
  
  const Total = ({ parts }) => {
    return (
      <div>
        <h4>
          total of {parts.reduce(((sum, part) => sum + part.exercises), 0)} exercises
        </h4>
      </div>
    )
  }

export { Header, Content, Total }