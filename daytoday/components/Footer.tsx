import EmailIcon from "@/icons/emailIcon";
import GitHubIcon from "@/icons/githubIcon";
import LinkedInIcon from "@/icons/linkedInIcon";

const Footer = () => {
    return(
    <div className="bg-eerie-black flex justify-around p-5 mt-5 shadow-2xl shadow-black">
        <div id="github" onClick={() => window.open('https://github.com/TeunvdKleij', '_blank')} className="flex gap-2 hover:cursor-pointer">
            <GitHubIcon width={24} color="#919191"/>
            <h1 className="text-light-grey">GitHub</h1>
        </div>
            <a id="email" className="flex gap-2 hover: cursor-pointer" href="mailto:teunvanderkleij@gmail.com">
                <EmailIcon width={24} color="#919191"/>
                <h1 className="text-light-grey">Email me!</h1>
            </a>
        {/* </div> */}
        <div id="linkedIn" onClick={() => window.open('https://www.linkedin.com/in/teun-van-der-kleij-9b805a258/', '_blank')} className="flex gap-2 hover:cursor-pointer">
            <LinkedInIcon width={24} color="#919191"/>
            <h1 className="text-light-grey">LinkedIn</h1>
        </div>
    </div>
    );
}
export default Footer;