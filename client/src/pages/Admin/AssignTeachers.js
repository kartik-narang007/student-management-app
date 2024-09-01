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
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState("");

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
    const currentTeacherId = assignments[`${classId}-${slotIndex}`];
  
    let currentTeacherCount = 0;
    let newTeacherCount = 0;
  
    if (currentTeacherId) {
      currentTeacherCount = Object.values(assignments).filter(id => id === currentTeacherId).length;
    }
    
    if (teacherId) {
      newTeacherCount = Object.values(assignments).filter(id => id === teacherId).length;
    }
  
    if (teacherId && newTeacherCount >= 7) {
      setErrorMessage("This teacher is already assigned to 7 classes.");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }
  
    setTeacherAssignments((prevAssignments) => {
      const updatedAssignments = { ...prevAssignments };
  
      if (currentTeacherId && currentTeacherId !== teacherId) {
        updatedAssignments[currentTeacherId] = Math.max((updatedAssignments[currentTeacherId] || 1) - 1, 0);
      }
  
      if (teacherId) {
        updatedAssignments[teacherId] = (updatedAssignments[teacherId] || 0) + 1;
      }
  
      return updatedAssignments;
    });
  
    setAssignments((prevAssignments) => ({
      ...prevAssignments,
      [`${classId}-${slotIndex}`]: teacherId
    }));
  
    setErrorMessage("");
  };

  const handleUnassignClick = (classId, slotIndex) => {
    const currentTeacherId = assignments[`${classId}-${slotIndex}`];
  
    if (currentTeacherId) {
      setTeacherAssignments((prevAssignments) => {
        const updatedAssignments = { ...prevAssignments };
  
        updatedAssignments[currentTeacherId] = Math.max((updatedAssignments[currentTeacherId] || 1) - 1, 0);
  
        return updatedAssignments;
      });
    }
  
    setAssignments((prevAssignments) => ({
      ...prevAssignments,
      [`${classId}-${slotIndex}`]: ""
    }));
  };

  const onSave = async () => {
    setSaving(true);
    setNotification(""); // Clear previous notifications
    try {
      await handleSave(assignments, token);
      setNotification("Changes saved successfully!");
    } catch (error) {
      setNotification("Error saving changes.");
    } finally {
      setSaving(false);
      setTimeout(() => setNotification(""), 2000); // Hide notification after 2 seconds
    }
  };

  if (loading) return <div>Loading...</div>;
  if (classesError || teachersError) return <div>Error: {classesError || teachersError}</div>;

  const getTeacherName = (classId, slotIndex) => {
    const teacherId = assignments[`${classId}-${slotIndex}`];
    const teacher = classTeacherMap[classId]?.find(t => t.id === teacherId);
    return teacher ? teacher.name : "No teacher assigned";
  };

  const TableRow = ({ classId, slotIndex }) => (
    <tr key={slotIndex} className="border-t">
      <td className="py-2 px-4">Slot-{slotIndex + 1}</td>
      <td className="py-2 px-4">{getTeacherName(classId, slotIndex)}</td>
      <td className="py-2 px-4">
        <Dropdown
          options={teachers}
          selectedValue={assignments[`${classId}-${slotIndex}`] || ""}
          onChange={(e) => handleDropdownChange(classId, slotIndex, e.target.value)}
          warning="" // No warning in Dropdown component
          style={{ width: "200px" }}
        />
      </td>
      <td className="py-2 px-4">
        <button
          onClick={() => handleUnassignClick(classId, slotIndex)}
          className={`bg-red-500 text-white px-2 py-1 rounded-md ${!assignments[`${classId}-${slotIndex}`] ? "cursor-not-allowed opacity-50" : ""}`}
          disabled={!assignments[`${classId}-${slotIndex}`]}
          aria-label={`Unassign teacher from slot ${slotIndex + 1}`}
        >
          Unassign
        </button>
      </td>
    </tr>
  );

  return (
    <div className="flex flex-col space-y-4 p-4">
      <div className="relative bg-white shadow-md rounded-md p-4">
        {saving && (
          <div className="absolute top-2 right-4 flex items-center space-x-2">
            <span className="text-blue-500">Saving...</span>
          </div>
        )}
        <button
          onClick={onSave}
          className="absolute top-2 right-4 bg-blue-500 text-white px-4 py-2 rounded-md flex items-center justify-center"
          aria-label="Save changes"
          disabled={saving}
        >
          {saving ? (
            <div className="spinner border-t-transparent border-white mx-auto"></div>
          ) : (
            "Save Changes"
          )}
        </button>
        <h1 className="text-2xl font-bold mb-2">Classes</h1>
        {notification && <div className="text-blue-500 mb-4">{notification}</div>}
        {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
        <div className="overflow-x-auto">
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
                            <TableRow key={slotIndex} classId={classId} slotIndex={slotIndex} />
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
  );
};

export default AssignTeachers;
