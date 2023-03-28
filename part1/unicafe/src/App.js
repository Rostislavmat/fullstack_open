import { useState } from 'react'

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const Buttons = ({ options }) => {
    const incCounter = (state) => {
        const [counter, setCounter] = state;
        return () => setCounter(counter + 1);
    };
    return (
        <>
        <h1 key={Math.random()}>Give feedback!</h1>
        <div style={{ display: "flex" }}>
            {options.map((option, index) => (
                <p key={index}>
                    <Button text={option.name} handleClick={incCounter(option.state)} />
                </p>
            ))}
            </div>
        </>
    );
};


const StatisticLine = ({ name, value }) => {
    return (
        <tr>
            <td key={name + "name"}>{name}</td>
            <td key={name + "value"}>{value}</td>
        </tr>)
};

const Statistics = ({ options }) => {
    const values = [];
    let sum = 0;
    let total_n = 0;
    options.forEach((option) => {
        let number = option.state[0];
        sum += number * option.weight;
        total_n += number;
        values.push({ name: option.name, value: number });
    });

    if (total_n === 0) {
        return (<tr><td>No feedback yet</td></tr>);
    }

    values.push({ name: "total", value: total_n });
    values.push({ name: "average", value: sum / total_n });
    values.push({
        name: "positive",
        value: values[0].value * 100 / total_n + "%",
    });
    return (
        values.map((stat) => (
            <StatisticLine
                key={stat.name}
                name={stat.name}
                value={stat.value}
            />
        )));
};

const StatsWrapper = ({ options }) => (
    <>
        <h1 key="header">Feedback Stats</h1>
        <table>
            <tbody>
                <Statistics options={options} />
            </tbody>
        </table>
    </>
)

const App = () => {
    // save clicks of each button to its own state
    const goodState = useState(0)
    const neutralState = useState(0)
    const badState = useState(0)

    const options = [
        { name: "good", state: goodState, weight: 1 },
        { name: "neutral", state: neutralState, weight: 0 },
        { name: "bad", state: badState, weight: -1 },
    ]

    

    return (
        <div>
            <Buttons options={options} />
            <StatsWrapper options={options} />
        </div>
    )
}

export default App;
