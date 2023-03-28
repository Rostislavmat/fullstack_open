import { useState } from 'react'


const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>



const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
    ]

    const len = anecdotes.length

    const getRandom = () => Math.floor(Math.random() * len)

    const [selected, setSelected] = useState(getRandom())

    const [votes, setVotes] = useState(new Int32Array(len))

    const upVote = () => {
        const newVotes = [...votes]
        newVotes[selected] += 1
        setVotes(newVotes)
    }

    const newSelection = () => (setSelected(getRandom()))

    let max_votes = -1
    let max_i = -1

    for (const i in votes) {
        if (votes[i] > max_votes) {
            max_votes = votes[i]
            max_i = i
        }
    }

    return (
        <div>
            <h1> Random Anecdote </h1>
            <p> {anecdotes[selected]} </p>
            <Button handleClick={upVote} text="vote" />
            <Button handleClick={newSelection} text="different anecdote" />
            <h1> Anecdote with most votes </h1>
            <p> {anecdotes[max_i]} </p>
            <p> has {max_votes} votes </p>
        </div>
    )
}

export default App