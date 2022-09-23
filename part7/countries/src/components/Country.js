const Country = (props) => {
    if (!props.country) {
        return <div>Not found...</div>;
    }

    return (
        <div>
            <h3>{props.country.name.common}</h3>
            <div>Population: {props.country.population}</div>
            <div>Capital: {props.country.capital}</div>
            <img
                src={props.country.flags.png}
                height="100"
                alt={`Flag of ${props.country.name.common}`}
            />
        </div>
    );
};

export default Country;
