import img from './error.gif';

const ErrorMessage = () => {
    return (
        <img style={{display: "block", width: "250px", height: "250px", objectFit: "contain", margin: "o auto" }} src={img} alt="error"/>
    )
}

export default ErrorMessage;