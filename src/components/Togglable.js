import { useState,forwardRef,useImperativeHandle } from "react";
import PropTypes from 'prop-types'
const Togglable = forwardRef((props,refs)=>
{
    //login form is initally invisible
    const [visibility,setVisibility] = useState(false)

    const toggleVisibility = () =>
{
    setVisibility(!visibility)
}
useImperativeHandle(refs,()=>{
    return {
        toggleVisibility
    }
})
    return (
        <div>
            <div style={{display:visibility? 'none':''} }>
                <button onClick={toggleVisibility}>{props.label}</button>
            </div>
        
        <div style={{display:visibility? '':'none'}}>
            {props.children}
            <button onClick={toggleVisibility}>Cancel</button>
        </div>

        </div>
    )
    })

    Togglable.propTypes = {
        label: PropTypes.string.isRequired
      }

export default Togglable