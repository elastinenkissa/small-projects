const NewBlog = (props) => {
    return (
        <form onSubmit={props.onCreate}>
            <div>
                Title:
                <input
                    type="text"
                    name="title"
                    value={props.title}
                    onChange={props.titleChange}
                />
            </div>
            <div>
                URL:
                <input
                    type="url"
                    name="url"
                    value={props.url}
                    onChange={props.urlChange}
                />
            </div>
            <button type="submit">Create</button>
        </form>
    );
};

export default NewBlog;
