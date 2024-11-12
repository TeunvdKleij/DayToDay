import { Dispatch, SetStateAction } from "react"
import Dialog from "./Dialog"


interface CookieProps{
    setToggleCookies: Dispatch<SetStateAction<boolean>>
}

const CookieDialog = ({setToggleCookies} : CookieProps) => {

    return(
        <Dialog 
            setShowModal={setToggleCookies} 
            maxWidth={500} 
            title="Cookies" 
            canAccept={true}
            onlyNotice={true}
            onlyAccept={true} 
            onAccept={() => setToggleCookies(true)}
            acceptMessage="Sluiten"
            >
                <p className="text-center">This website uses cookies to enhance your browsing experience, 
                    manage your account, and maintain your personalized settings and tasks. 
                    By continuing to use our site, you agree to our use of cookies. 
                    Learn more in our Privacy Policy. </p>
            </Dialog>
    )
}
export default CookieDialog