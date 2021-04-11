import React from 'react'
import Rating from './Rating'
import { Card} from 'react-bootstrap'
import { Link } from 'react-router-dom'
function Products({product}) {
    return (
        <Card className="my-3 p-3 rounded"> 
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image}/>
            </Link>

            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as="div">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>
            </Card.Body>
            <Card.Text as="div">
                <div className="my-3">
                   <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f83825'}/>
                </div>
            </Card.Text>
            <Card.Text as="h3">
                Rs.{product.price}
            </Card.Text>
            
        </Card> 
    )
}

export default Products
