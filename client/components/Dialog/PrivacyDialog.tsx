import { Dispatch, SetStateAction } from "react"
import Dialog from "./Dialog"


interface PrivacyProps{
    setTogglePrivacy: Dispatch<SetStateAction<boolean>>
}

const PrivacyDialog = ({setTogglePrivacy} : PrivacyProps) => {

    return(
        <Dialog 
            setShowModal={setTogglePrivacy} 
            onAccept={() => setTogglePrivacy(false)} 
            canAccept={true} 
            onlyNotice={true} 
            onlyAccept={true} 
            maxWidth={800} 
            acceptMessage="Sluiten"
            title="Privacy Policy">
                <div className="overflow-hidden">
                <p className="text-sm">
                    Effective Date: 10 July 2024
                    <br/><br/>
                    When you create an account with us, we collect the following personal information:
                    Email Address: Used to identify and communicate with you.
                    Password: Used to secure your account. Passwords are stored in an encrypted format and are not accessible to us in plain text.
                    <br/><br/>
                    <b>User-Generated Content</b>
                    <br/><br/>
                    When you use our application to manage your tasks, we collect the following:
                    Task Details: Information you input regarding your tasks, including but not limited to task descriptions, deadlines, priorities, and any other details you choose to include.
                    <br/><br/>
                    <b>How We Use Your Information</b>
                    <br/><br/>
                    We use the information we collect in the following ways:
                    To Create and Manage Your Account: Your email and password are used to create and secure your account.
                    To Communicate with You: We may use your email to send you updates, notifications, and other important information related to your account and our services.
                    <br/><br/>
                    <b>Disclosure of Your Information</b>
                    <br/><br/>
                    We do not sell, trade, or otherwise transfer your personal information to outside parties. We may disclose your information in the following scenarios:
                    Legal Requirements: We may disclose your information if required to do so by law or in response to valid requests by public authorities.
                    <br/><br/>
                    <b>Security of Your Information</b>
                    <br/><br/>
                    We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
                    <br/><br/>
                    <b>Your Data Protection Rights</b>
                    <br/><br/>
                    Depending on your location, you may have the following rights regarding your personal information:
                    Access: You have the right to request copies of your personal data.
                    Rectification: You have the right to request that we correct any information you believe is inaccurate.
                    Erasure: You have the right to request that we erase your personal data, under certain conditions.
                    Restrict Processing: You have the right to request that we restrict the processing of your personal data, under certain conditions.
                    Object to Processing: You have the right to object to our processing of your personal data, under certain conditions.
                    Data Portability: You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.
                    If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us at our provided contact information below.
                    <br/><br/>
                    <b>Cookies and Tracking Technologies</b>
                    <br/><br/>
                    Our application may use cookies and similar tracking technologies to enhance your experience. Cookies are small data files that are placed on your device when you visit a website. You can set your browser to refuse all or some browser cookies, or to alert you when cookies are being sent. If you disable or refuse cookies, some parts of the application may become inaccessible or not function properly.
                    <br/><br/>
                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy update when it changes.
                    <br/><br/>
                    <b>Contact Us</b>
                    <br/><br/>
                    If you have any questions about this Privacy Policy, please contact us:
                    <br/><br/>
                    Email: daytoday.helpr@gmail.com
                    <br/><br/>
                    By using our application, you hereby consent to our Privacy Policy and agree to its terms.
                </p>
                </div>
            </Dialog>
    )
}
export default PrivacyDialog