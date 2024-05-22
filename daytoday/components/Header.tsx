interface HeaderInterface {
    done: boolean,
    headerText: string,
    percentage: number
}

const Header = ({done, headerText, percentage} : HeaderInterface) => {
    return (
        <div className="flex justify-between w-full items-center">
            <h1 id="title" className="flex justify-center md:text-3xl text-lg font-bold">{headerText}</h1>
            <div className={`w-1/5 rounded-full h-2.5 ${done ? "bg-green-800" :"bg-gray-700"}`}>
                <div className={`${done ? "bg-green-600" :"bg-blue-600"} h-2.5 rounded-full w-5/5`} style={{ width: `${percentage}%`, transition: 'width 0.5s ease' }}></div>
            </div>
        </div>
    );
}
export default Header;