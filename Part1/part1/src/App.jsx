const Part = (props) => {
  return (
    <p>{props.name}: {props.exercises} exercises</p>
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
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <h1>{Header(course)}</h1>
      {Content( [part1, part2, part3] )}
      {Part({name: "Total", exercises: part1.exercises + part2.exercises + part3.exercises})}
    </div>
  )
}

export default App