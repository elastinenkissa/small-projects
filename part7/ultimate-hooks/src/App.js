import { useField, useResource } from './hooks';

const App = () => {
    const content = useField('text');
    const name = useField('text');
    const number = useField('text');

    const [notes, noteService] = useResource('http://localhost:3005/notes');
    const [persons, personService] = useResource(
        'http://localhost:3005/persons'
    );

    const handleNoteSubmit = (event) => {
        event.preventDefault();
        noteService.create({ content: content.value });
    };

    const handlePersonSubmit = (event) => {
        event.preventDefault();
        personService.create({ name: name.value, number: number.value });
    };

    return (
        <div>
            <h2>Notes</h2>
            <form onSubmit={handleNoteSubmit}>
                Content: <input {...content} />
                <button type="submit">Create</button>
            </form>
            {notes.map((note) => (
                <p key={note.id}>{note.content}</p>
            ))}

            <h2>Persons</h2>
            <form onSubmit={handlePersonSubmit}>
                Name: <input {...name} /> <br />
                Number: <input {...number} />
                <button type="submit">Create</button>
            </form>
            {persons.map((person) => (
                <p key={person.id}>
                    {person.name} {person.number}
                </p>
            ))}
        </div>
    );
};

export default App;
