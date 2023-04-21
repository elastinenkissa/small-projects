import { useQuery } from '@apollo/client';
import { ALL_BOOKS, LOGGED_USER } from '../queries';

const Recommended = (props) => {
    const loggedUser = useQuery(LOGGED_USER);

    const books = useQuery(ALL_BOOKS, {
        variables: {
            genre: loggedUser.data?.me?.favoriteGenre,
        },
    });

    if (books.loading) return <>Loading...</>;

    if (!props.show) return null;

    return (
        <>
            <h1>recommendations</h1>
            <p>
                books in your favorite genre{' '}
                <strong>{loggedUser.data.me.favoriteGenre}</strong>
            </p>
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
        </>
    );
};

export default Recommended;
