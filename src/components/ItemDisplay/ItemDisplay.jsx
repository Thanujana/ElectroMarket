import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../Context/ShareContext'

const FoodDisplay = () => {

    const {item_list} = useContext(StoreContext)
  return (
    <div>
      
    </div>
  )
}

export default FoodDisplay
