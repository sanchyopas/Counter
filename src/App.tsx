import {useEffect, useRef, useState} from 'react'
import './App.css'
import sc from '../src/common/styles/counter.module.scss'
import * as React from "react";
import {Button} from "./common/Button/Button.tsx";

function App() {
  const maxValueRef = useRef<HTMLInputElement>(null)
  const startValueRef = useRef<HTMLInputElement>(null)

  const [btnSetActive, setBtnSetActive] = useState<boolean>(false)

  const [maxValue, setMaxValue] = useState<number>(0);
  const [startValue, setStartValue] = useState<number>(0)
  const [counter, setCounter] = useState<number>(0)


  useEffect(() => {
    const savedMaxValue = localStorage.getItem('maxValue')
    const savedStartValue = localStorage.getItem('startValue')

    if (savedMaxValue !== null) {
      setMaxValue(Number(savedMaxValue))
    }

    if (savedStartValue !== null) {
      setStartValue(Number(savedStartValue))
      setCounter(Number(savedStartValue))
    }

  }, []);


  const changeMaxValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBtnSetActive(false)
    setMaxValue(e.currentTarget.valueAsNumber)
  }

  const changeStartValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBtnSetActive(false)
    setStartValue(e.currentTarget.valueAsNumber)
  }

  const setValueHandler = () => {

    if (startValueRef.current && maxValueRef.current) {
      localStorage.setItem("startValue", startValueRef.current.value)
      localStorage.setItem("maxValue", maxValueRef.current.value)
    }


    setStartValue(startValueRef.current?.valueAsNumber || 0)
    // setMaxValue(maxValueRef.current.valueAsNumber)
    // setCounter(startValueRef.current.valueAsNumber)
    setBtnSetActive(!btnSetActive)
  }

  const incrementHandler = () => {
    counter < maxValue ? setCounter(counter + 1) : maxValue;
  }

  const resetHandler = () => {
    setCounter(startValueRef.current?.valueAsNumber || 0)
  }

  const hasError = startValue < 0 || startValue >= maxValue;

  return (
    <div className="counter-cnt">
      <div className={'settings'}>
        <div className="settings__form form">
          <div className="form__item">
            <label htmlFor="maxValue" className="form__label">Max value</label>
            <input type="number"
                   id={'maxValue'}
                   ref={maxValueRef}
                   value={maxValue}
                   className={`form__input${hasError ? ' form__input--error' : ''}`}
                   onChange={changeMaxValueHandler}
            />
          </div>
          <div className="form__item">
            <label htmlFor="startValue" className="form__label">Start value</label>
            <input type="number"
                   id={'startValue'}
                   ref={startValueRef}
                   value={startValue}
                   className={`form__input${hasError ? ' form__input--error' : ''}`}
                   onChange={changeStartValueHandler}/>
          </div>
          <div className="settings__bottom">
            <button type="button"
                    className="settings__btn btn"
                    onClick={setValueHandler}

            >set
            </button>
            <Button className={'settings__btn'}
                    onClick={setValueHandler}
                    disabled={btnSetActive || hasError}
            >
              Set
            </Button>
          </div>
        </div>
      </div>
      <div className={sc.counter}>
        <div className={`${sc.counter__value} ${counter === maxValue && 'error'}`}>
          {
            hasError
              ? (<span>Incorrect Value!</span>)
              : btnSetActive
                ? counter
                : 'Enter values and press "Set" button'
          }
        </div>
        <div className={sc.counter__bottom}>
          <Button className={sc.counter__btn}
                  onClick={incrementHandler}
                  disabled={counter === maxValue || !btnSetActive}
          >
            Inc
          </Button>
          <Button className={sc.counter__btn}
                  onClick={resetHandler}
                  disabled={!btnSetActive}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  )
}

export default App
