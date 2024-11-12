import { Dispatch, SetStateAction, useState } from "react";
import Dialog from "./Dialog";
import CookieDialog from "./CookieDialog";
import PrivacyDialog from "./PrivacyDialog";


interface GDPRProps{
    setGdpr: (msg: string) => void
}
const GDPRNotice = ({setGdpr} : GDPRProps) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [toggleCookies, setToggleCookies] = useState<boolean>(false)
    const [togglePrivacy, setTogglePrivacy] = useState<boolean>(false)

    const setGdprMessage = (gdpr: boolean) => {
        var date = new Date
        if (typeof window !== "undefined") localStorage.setItem("gdpr", `${gdpr ? "accepted at "+date : "denied" }`)
        setGdpr(gdpr ? "accepted at "+ date : "denied")
    }




    return (
        <div>
        <Dialog
            setShowModal={setShowModal}
            title={"GDPR notice"}
            onAccept={() => setGdprMessage(true)}
            onCancel={() => setGdprMessage(false)}
            maxWidth={500}
            canAccept={true}
            onlyNotice={false}>
        <p className="text-center">On this website, there are functional <button onClick={() => setToggleCookies(true)} className="underline text-blue-500">cookies</button> being used. Do you agree with the use of these cookies together with the <button onClick={() => setTogglePrivacy(true)} className="underline text-blue-500">privacy policy</button> and wish to continue to the website?</p>
        </Dialog>
        {toggleCookies && <CookieDialog setToggleCookies={setToggleCookies}/>}
        {togglePrivacy && <PrivacyDialog setTogglePrivacy={setTogglePrivacy}/>}
        </div>
    );
}
export default GDPRNotice;