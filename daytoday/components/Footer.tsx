
const Footer = () => {
    return(
    <div className="bg-eerie-black flex justify-around p-5 mt-5 shadow-2xl shadow-black text-zinc-400">
         <div onClick={() => window.open('https://www.linkedin.com/in/teun-van-der-kleij-9b805a258/', '_blank')} className="hover:cursor-pointer">© Teun van der Kleij, 2024</div>
    </div>
    );
}
export default Footer;