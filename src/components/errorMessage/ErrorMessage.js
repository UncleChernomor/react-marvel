import errorimg from './error-0.gif';

const ErrorMessage = () => {
    return (
        <div>
            <img src={errorimg} alt='big error' style={{maxWidth: '200px'}} />
        </div>
    )
}

export default ErrorMessage;