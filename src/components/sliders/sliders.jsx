import React from 'react'
import leftChevron from '../../assets/left-arrow.svg'
import rightChevron from '../../assets/right-arrow.svg'
import { useState,useEffect } from 'react'
import slidersData from '../../data/sliderData'
import './sliders.css'
export default function Sliders() {
    const [index, setIndex] = useState(1)

    const toggleImage = (value) => {
        if (index + value > slidersData.length) {
            setIndex(1)
        } else if (index + value < 1) {
            setIndex(slidersData.length)
        } else {
            setIndex(index + value)
        }
    }
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => {
                if (prevIndex === slidersData.length) {
                    return 1
                } else {
                    return prevIndex + 1
                }
            })
        }, 3000)
        return () => clearInterval(interval)
    }, [index])    
  return (
     <> 
        <p className="index-info">{index} / {slidersData.length}</p>
        <div className="slider">
            <p className="image-info">{slidersData.find(obj => obj.id === index).description}</p>
            <img src={`/images/img-${index}.jpg`} alt="bedroom" className="image" />


            <button onClick={() => toggleImage(- 1)}
            className="navigation-button prev-button">
                <img src={leftChevron} alt="previous image" />
            </button>
            
            <button onClick={() => toggleImage(1)}
            className="navigation-button next-button">
                <img src={rightChevron} alt="next image" />
            </button>
        </div>
     </>
  )
}

