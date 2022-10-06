import Text from "./Text"


const Heading = (props) => {
    return (
        <Text fontSize='heading' {...props}>{props.children}</Text>
    )
}

export default Heading