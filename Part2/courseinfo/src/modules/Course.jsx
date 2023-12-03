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
  
    return <p>Total exercises: {total}</p>
  }
  
  const Course = ({name, parts}) => {
    return (
      <div>
        <Header name={name} />
        <Content parts={parts} />
        <Total parts={parts} />
      </div>
    )
  }

  export default Course