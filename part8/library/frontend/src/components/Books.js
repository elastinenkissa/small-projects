import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { ALL_BOOKS } from '../queries';
import SortButton from './SortButton';

const Books = (props) => {
    const [genre, setGenre] = useState('');
    const books = useQuery(ALL_BOOKS, {
        variables: { genre },
        fetchPolicy: "cache-and-network",
        nextFetchPolicy: "cache-and-network"
    });

    if (books.loading) return <>Loading...</>;

    if (!props.show) {
        return null;
    }

    return (
        <div>
            <h2>books</h2>
            {genre ? <p>In genre <strong>{genre}</strong> </p> : null}
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {books.data?.allBooks.map((a) => (
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <SortButton value="genre1" onSort={(genre) => setGenre(genre)}>
                    genre1
                </SortButton>
                <SortButton value="genre2" onSort={(genre) => setGenre(genre)}>
                    genre2
                </SortButton>
                <SortButton value="genre3" onSort={(genre) => setGenre(genre)}>
                    genre3
                </SortButton>
                <SortButton value="genre4" onSort={(genre) => setGenre(genre)}>
                    genre4
                </SortButton>
                <SortButton value="" onSort={(genre) => setGenre(genre)}>
                    all
                </SortButton>
            </div>
        </div>
    );
};

export default Books;
