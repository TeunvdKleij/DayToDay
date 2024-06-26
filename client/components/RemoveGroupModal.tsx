import { GroupContext } from "@/providers/GroupProvider";
import { NoteContext } from "@/providers/NoteProvider";
import { TaskContext } from "@/providers/TaskProvider";
import { Dispatch, SetStateAction, useContext } from "react";
import Dialog from "@/components/Dialog/Dialog";

interface RemoveGroupInterface{
    setShowModal: Dispatch<SetStateAction<boolean>>
    groupName: string
    prevGroup: string
}

const RemoveGroupModal = ({setShowModal, groupName, prevGroup} : RemoveGroupInterface) => {
    const {removeTasksByGroup} = useContext(TaskContext);
    const {removeGroup, setGroupItem, groups} = useContext(GroupContext);
    const {removeNotesByGroup} = useContext(NoteContext);

    const removeClick = async (item: string) => {
        await removeNotesByGroup(item);
        await removeTasksByGroup(item);
        await removeGroup(item);
        groups.splice(groups.indexOf(item), 1)
        setGroupItem(groupName)
        localStorage.setItem('groupSelection', (groups && groups.length > 0 ? groups[0] : ''));
        setShowModal(false)
    }


    return (
        <Dialog
            setShowModal={setShowModal}
            title={"Remove group"}
            description={"Are you sure you want to remove <b class='pl-1'>" + prevGroup + "</b>?"}
            onAccept={async () => removeClick(prevGroup)}
            canAccept={true}
            maxWidth={500}
        />
    );
}
export default RemoveGroupModal