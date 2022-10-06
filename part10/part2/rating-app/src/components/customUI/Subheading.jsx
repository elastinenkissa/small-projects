import Text from "./Text"


const Subheading = (props) => {
    return (
        <Text fontSize='subheading' {...props}>{props.children}</Text>
    )
}

export default Subheading