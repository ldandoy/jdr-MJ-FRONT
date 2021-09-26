import { useHistory } from "react-router-dom"
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux'

import { googleLogin } from '../../redux/actions/authActions'

const GoogleAuthButton =  () => {
    let history = useHistory();
    const dispatch = useDispatch()

    const onSuccessHandler = async (response) => {
        const id_token = response.tokenId
        await dispatch(googleLogin(id_token))
        history.push("/my-account");
    }

    const onFailureHandler = (response) => {
        history.push("/logout")
    }

    return (
        <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            isSignedIn={false}
            buttonText="Connection avec Google"
            accessType="offline"
            onSuccess={onSuccessHandler}
            onFailure={onFailureHandler}
            cookiePolicy={'single_host_origin'}
        />
    )
}

export default GoogleAuthButton