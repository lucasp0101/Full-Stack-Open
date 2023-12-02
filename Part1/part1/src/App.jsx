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
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
  return (
    <div>
      <h1>{Header(course)}</h1>
      {Content( parts )}
      {Part({name: "Total", exercises: parts[0].exercises + parts[1].exercises + parts[2].exercises})}
    </div>
  )
}

export default App