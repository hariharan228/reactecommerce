import React from 'react'
import {Spinner} from 'react-bootstrap'
function Loading() {
    return (
        <div>
             
             <Spinner animation="border" role="status" style ={{ height:'100px',width:'100px',margin:'auto',display:'block'}}>
                <span className="sr-only">Loading...</span>
             </Spinner>
        </div>
    )
}

export default Loading
