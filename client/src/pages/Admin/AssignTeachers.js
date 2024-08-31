import React, { useState, useEffect } from "react";
import usePrepareAssignments from "../../hooks/usePrepareAssignments";
import Dropdown from "../../components/Dropdown";
import { handleSave } from "../../utils/handleSave";
import { useAuth } from "../../context/authContext/AuthProvider";

const AssignTeachers = () => {
  const { state } = useAuth();
  const token = state?.token;

  const {
    classTeacherMap,
    classNameMap,
    teacherAssignments,
    error,
    loading,
    classesError,
    teachersError,
    teachers,
    setTeacherAssignments
  } = usePrepareAssignments();

  const [assignments, setAssignments] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  // Initialize assignments state when data from the hook is available
  useEffect(() => {
    if (classTeacherMap) {
      const initialAssignments = {};
      Object.keys(classTeacherMap).forEach((classId) => {
        classTeacherMap[classId].forEach((teacher, slotIndex) => {
          if (teacher.id) {
            initialAssignments[`${classId}-${slotIndex}`] = teacher.id;
          }
        });
      });
      setAssignments(initialAssignments);
    }
  }, [classTeacherMap]);

  const handleDropdownChange = (classId, slotIndex, teacherId) => {
    if (teacherId && (teacherAssignments[teacherId] || 0) >= 7) {
      setErrorMessage("This teacher is already assigned to 7 classes.");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    setAssignments((prevAssignments) => ({
      ...prevAssignments,
      [`${classId}-${slotIndex}`]: teacherId
    }));

    setTeacherAssignments((prevAssignments) => {
      const updatedTeacherAssignments = { ...prevAssignments };
      if (teacherId) {
        updatedTeacherAssignments[teacherId] = (updatedTeacherAssignments[teacherId] || 0) + 1;
      }
      return updatedTeacherAssignments;
    });

    setErrorMessage("");
  };

  const handleUnassignClick = (classId, slotIndex) => {
    const currentTeacherId = assignments[`${classId}-${slotIndex}`];
    if (currentTeacherId) {
      setTeacherAssignments((prevAssignments) => {
        const updatedTeacherAssignments = { ...prevAssignments };
        updatedTeacherAssignments[currentTeacherId] = Math.max((updatedTeacherAssignments[currentTeacherId] || 1) - 1, 0);
        return updatedTeacherAssignments;
      });
    }
    setAssignments((prevAssignments) => ({
      ...prevAssignments,
      [`${classId}-${slotIndex}`]: ""
    }));
  };

  const onSave = async () => {
    try {
      await handleSave(assignments, token);
      alert("Changes saved successfully!");
    } catch (error) {
      console.error("Error saving changes:", error);
      alert("Error saving changes.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (classesError || teachersError) return <div>Error: {classesError || teachersError}</div>;

  const getTeacherName = (classId, slotIndex) => {
    const teacherId = assignments[`${classId}-${slotIndex}`];
    const teacher = classTeacherMap[classId]?.find(t => t.id === teacherId);
    return teacher ? teacher.name : "No teacher assigned";
  };

  return (
    <div className="flex flex-col space-y-4 p-4">
      <div className="relative bg-white shadow-md rounded-md p-4">
        <h1 className="text-2xl font-bold mb-2">Classes</h1>
        {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
        
        <div className="overflow-x-auto">
          <div className="relative">
            <button
              onClick={onSave}
              className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Save Changes
            </button>
            <div className="h-[calc(100vh-290px)] overflow-y-auto max-h-[500px]">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Class Name</th>
                    <th className="py-2 px-4 border-b">Slots</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(classTeacherMap).map((classId) => (
                    <tr key={classId} className="border-t">
                      <td className="py-2 px-4 border-b text-lg font-semibold">
                        {classNameMap[classId] || "Unknown Class"}
                      </td>
                      <td className="py-2 px-4">
                        <table className="w-full">
                          <tbody>
                            {Array.from({ length: 7 }, (_, slotIndex) => (
                              <tr key={slotIndex} className="border-t">
                                <td className="py-2 px-4">Slot-{slotIndex + 1}</td>
                                <td className="py-2 px-4">
                                  {getTeacherName(classId, slotIndex)}
                                </td>
                                <td className="py-2 px-4">
                                  <Dropdown
                                    options={teachers}
                                    selectedValue={assignments[`${classId}-${slotIndex}`] || ""}
                                    onChange={(e) =>
                                      handleDropdownChange(
                                        classId,
                                        slotIndex,
                                        e.target.value
                                      )
                                    }
                                    warning=""
                                    style={{ width: "200px" }}
                                  />
                                </td>
                                <td className="py-2 px-4">
                                  <button
                                    onClick={() =>
                                      handleUnassignClick(
                                        classId,
                                        slotIndex
                                      )
                                    }
                                    className={`bg-red-500 text-white px-2 py-1 rounded-md ${
                                      !assignments[`${classId}-${slotIndex}`]
                                        ? "cursor-not-allowed opacity-50"
                                        : ""
                                    }`}
                                    disabled={
                                      !assignments[`${classId}-${slotIndex}`]
                                    }
                                  >
                                    Unassign
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignTeachers;
