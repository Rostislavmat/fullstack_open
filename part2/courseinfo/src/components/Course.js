const Header = (props) =>
(
    <h1>
        Course {props.course}
    </h1>
)

const Part = (props) => {
    return (<p> {props.name} {props.exercises} </p>)
}

const Content = (props) => {
    const parts = props.parts
    console.log(parts)
    return (
        parts.map(item => <Part key={item.id} name={item.name} exercises={item.exercises} />)
    )
}

const Total = ({ parts }) => {
    var sum = parts.reduce((acc, part) => acc + part.exercises, 0)
    return (<p>Number of exercises {sum}</p>)
}

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course