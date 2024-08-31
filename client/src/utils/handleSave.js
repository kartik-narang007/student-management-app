import axios from "axios";
import { BULK_ASSIGNMENTS_UPDATE } from "../utils/adminApis";

export const handleSave = async (assignments, token) => {



    try {
        const assignmentsToSave = Object.keys(assignments).map(key => {
            const [classId, slotIndex] = key.split("-");
            const teacherId = assignments[key];
            return { classId, slotIndex, teacherId };
        });

        await axios.post(BULK_ASSIGNMENTS_UPDATE, { assignments: assignmentsToSave },{
            headers:{
                Authorization:`${token}`
            }
        });
    } catch (error) {
        throw new Error("Error saving assignments");
    }
};
