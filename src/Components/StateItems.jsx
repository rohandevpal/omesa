import { useState, useEffect, } from "react";

export function StatItem({ value, suffix, label, shouldAnimate, width = "w-full" }) {
    const [currentValue, setCurrentValue] = useState(0)
    const [hasAnimated, setHasAnimated] = useState(false)
    useEffect(() => {
      if (shouldAnimate && !hasAnimated) {
        const duration = 2000
        const steps = 60
        const increment = value / steps
        const stepDuration = duration / steps
  
        let currentStep = 0
        const timer = setInterval(() => {
          currentStep++
          const newValue = Math.min(increment * currentStep, value)
          setCurrentValue(Math.round(newValue))
  
          if (currentStep >= steps) {
            clearInterval(timer)
            setCurrentValue(value)
            setHasAnimated(true)
            
          }
        }, stepDuration)
  
        return () => clearInterval(timer)
      } else if (!shouldAnimate) {
        setCurrentValue(0)
        setHasAnimated(false)
      }
    }, [shouldAnimate, hasAnimated, value])
  
    return (
        <div className="mb-12">
          <div className="flex justify-between items-center">
            <div className="text-5xl md:text-6xl font-sans font-medium text-white flex">
              {currentValue}
              {suffix}
            </div>
            <div className="text-gray-400 text-sm md:text-base font-[textFont]">{label}</div>
          </div>
          <div className={`border-b border-gray-600 mt-4 ${width}`}></div>
        </div>
      );      
  }