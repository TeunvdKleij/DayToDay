import { HexColorPicker } from "react-colorful";

const ColorPicker = ({ color, setColor, setVisible, visible, message, handleSaveColor } : any) => {

    const handleClose = () => {
        setVisible(false);
    }

    const handleSave = () => {
        handleSaveColor(color);
        handleClose();
    }

    return (
        visible && (
            <>
                <div onClick={() => handleClose()} className="inset-0 backdrop-blur-sm fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 z-[100]" />
                <div id="color-picker" className="relative top-[50%] translate-y-[-50%] bg-[#252525] z-[100] shadow-2xl p-[10px] rounded-[8px] w-[250px] h-auto flex-col gap-[10px] flex justify-center align-middle items-center">
                    {message && <h1 className={"text-xl text-center text-white"}>{message}</h1>}
                    <HexColorPicker color={color} onChange={setColor} />
                    <button onClick={handleSave} style={{ backgroundColor: color }} className="w-full p-[10px] rounded-[8px] hover:brightness-90">Save</button>
                    <button onClick={handleClose} className="w-full p-[10px] rounded-[8px] bg-[#555] hover:brightness-90">Cancel</button>
                </div>
            </>
        )
    );
}

export default ColorPicker;

