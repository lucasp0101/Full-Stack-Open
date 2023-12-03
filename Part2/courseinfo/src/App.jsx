const Header = ({ name }) => {
  return <h1>{name}</h1>
}

const Part = ({ name, exercises }) => {
  return (
    <li>
      {name} {exercises}
    </li>
  )
}

const Content = ({ parts }) => {
  return (
    <ul>
      {parts.map(part => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </ul>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)

  return <p>Number of exercises {total}</p>
}

const Course = ({name, parts}) => {
  console.log(name, parts);
  return (
    <div>
      <Header name={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  console.log(course);

  return <Course name={course.name} parts={course.parts} />
}

export default App