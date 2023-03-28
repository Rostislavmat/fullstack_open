
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
        parts.map(item => <div key={Math.random()} > <Part name={item.name} exercises={item.exercises} /> </div>) 
    )
}

const Total = (props) => {
    var sum = 0
    for (const part of props.parts) {
        sum += part.exercises
    }
    return (<p>Number of exercises {sum}</p>)
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
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default App;
