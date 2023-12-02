const Part = (props) => {
  return (
    <p>{props.name}: {props.exercises} exercises</p>
  )
}

const Content = (props) => {
  return (
    <>
      <h1>{props.name}</h1>
      {Part(props.parts[0])}
      {Part(props.parts[1])}
      {Part(props.parts[2])}
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }

  return (
    <div>
      {Content( course )}
      {Part({name: "Total", exercises: course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises})}
    </div>
  )
}

export default App