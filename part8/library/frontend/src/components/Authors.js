import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries';

const Author = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [born, setBorn] = useState(props.author.born);

    const [editAuthor] = useMutation(EDIT_AUTHOR);

    const bornStyle = {
        width: 28,
    };

    const buttonStyle = {
        cursor: 'pointer',
    };

    const editYearHandler = () => {
        setEditMode(!editMode);
        if (!editMode) {
            return;
        }
        editAuthor({ variables: { name: props.author.name, setBornTo: +born } });
    };

    return (
        <>
            <td>{props.author.name}</td>
            <td>
                {editMode ? (
                    <input
                        value={born || ''}
                        style={bornStyle}
                        onChange={({ target }) => setBorn(target.value)}
                    />
                ) : (
                    props.author.born
                )}
            </td>
            <td>{props.author.bookCount}</td>
            <td style={buttonStyle} onClick={editYearHandler}>
                {editMode ? 'Save' : 'Edit'}
            </td>
        </>
    );
};

const Authors = (props) => {
    const authors = useQuery(ALL_AUTHORS);

    if (authors.loading) return <>Loading...</>;

    if (!props.show) {
        return null;
    }

    return (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>born</th>
                        <th>books</th>
                    </tr>
                    {authors.data.allAuthors.map((a) => (
                        <tr key={a.name}>
                            <Author author={a} />
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Authors;
