import {useRef, useState} from 'react'
import './App.css'

function App() {
  const [maxValue, setMaxValue] = useState<number>(0);
  const [value, setValue] = useState<number>(0)
  const maxValueRef = useRef<HTMLInputElement>(0)
  const startValueRef = useRef<HTMLInputElement>(0)

  const changeMaxValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {

    setMaxValue(value)
  }

  const setValueHandler = () => {
    const maxValue = maxValueRef.current.valueAsNumber
    const startValue = startValueRef.current.valueAsNumber
    setMaxValue(maxValue)
    setValue(startValue)
  }

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
                   className="form__input"
                   onChange={changeMaxValueHandler}
            />
          </div>
          <div className="form__item">
            <label htmlFor="startValue" className="form__label">Start value</label>
            <input type="number"
                   id={'startValue'}
                   ref={startValueRef}
                   value={value}
                   className="form__input"/>
          </div>
          <div className="settings__bottom">
            <button type="button" className="settings__btn btn" onClick={setValueHandler}>set</button>
          </div>
        </div>
      </div>
      <div className="counter">
        <div className="counter__value">{value}</div>
        <div className="counter__bottom">
          <button type="button" className="counter__btn btn">inc</button>
          <button type="button" className="counter__btn btn">reset</button>
        </div>
      </div>
    </div>
  )
}

export default App
