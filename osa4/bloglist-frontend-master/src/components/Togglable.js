import React, { useState, useImperativeHandle } from "react"

const Togglable = React.forwardRef(({ children, showButtonLabel, hideButtonLabel, hideAtTop, alwaysShown, }, ref) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : "none" }
  const hideWhenVisible = { display: visible ? "none" : '' }

  const changeVisible = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      changeVisible
    }
  })

  return hideAtTop ? (
    <div>
      {alwaysShown}

      <button className="show" style={hideWhenVisible} onClick={changeVisible}>{showButtonLabel}</button>

      <button className="hide" style={showWhenVisible} onClick={changeVisible}>{hideButtonLabel}</button>
      <div style={showWhenVisible} className="testDiv">
        {children}
      </div>
    </div>
  )
    : (
      <div>
        {alwaysShown}
        <button style={hideWhenVisible} onClick={changeVisible}>{showButtonLabel}</button>
        <div style={showWhenVisible} className="testDiv">
          {children}
          <button onClick={changeVisible}>{hideButtonLabel}</button>
        </div>
      </div>
    )
})

Togglable.displayName = "Togglable"

export default Togglable