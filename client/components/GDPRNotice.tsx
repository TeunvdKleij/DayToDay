import { Dispatch, SetStateAction, useState } from "react";
import Dialog from "./Dialog/Dialog";


interface GDPRProps{
    setGdpr: Dispatch<SetStateAction<string>>
}
const GDPRNotice = ({setGdpr} : GDPRProps) => {
    const [showModal, setShowModal] = useState<boolean>(false);

    const setGdprMessage = (gdpr: boolean) => {
        var date = new Date
        localStorage.setItem("gdpr", `${gdpr ? "accepted at "+date : "denied" }`)
        setGdpr(gdpr ? "accepted at "+date : "denied")
        setShowModal(false);
    }
    return (
        <Dialog
            setShowModal={setShowModal}
            title={"GDPR notice"}
            description={"On this website, there are functional cookies being used. Do you agree with the use of these cookies and wish to continue to the website"}
            onAccept={() => setGdprMessage(true)}
            onCancel={() => setGdprMessage(false)}
            maxWidth={500}
            canAccept={true}
        />
    );
}
export default GDPRNotice;