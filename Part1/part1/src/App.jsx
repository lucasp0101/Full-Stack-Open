const Part = (props) => {
  return (
    <p>{props.part}: {props.exercises} exercises</p>
  )
}

const Header = (name) => {
  return (
    <div>{name}</div>
  )
}

const Content = (props) => {
  return (
    <>
      {Part(props[0])}
      {Part(props[1])}
      {Part(props[2])}
    </>
  )
}

const Total = (n_exercises) => {
  return (
    <p>Number of exercises {n_exercises}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <h1>{Header(course)}</h1>
      {Content(
              [{part: part1, exercises: exercises1}, 
              {part: part2, exercises: exercises2}, 
              {part: part3, exercises: exercises3}]
            )}
      {Total(exercises1 + exercises2 + exercises3)}
    </div>
  )
}

export default App