import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Statistic = ({ text, value }) => (
  <p>{text} {value}</p>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const onClickGood = () => setGood(good + 1)
  const onClickNeutral = () => setNeutral(neutral + 1)
  const onClickBad = () => setBad(bad + 1)

  return (
    <div>
      <Header text = "give feedback"/>
      <Button onClick={onClickGood} text={"Good"} />
      <Button onClick={onClickNeutral} text={"Neutral"} />
      <Button onClick={onClickBad} text={"Bad"} /> <br /> 

      <Header text = "statistics"/>
      <Statistic text={"Good"} value={good} />
      <Statistic text={"Neutral"} value={neutral} />
      <Statistic text={"Bad"} value={bad} />
    </div>
  )
}

export default App