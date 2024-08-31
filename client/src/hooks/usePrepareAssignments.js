import { useState, useEffect } from "react";
import useFetchClasses from "./useFetchClasses";
import useFetchTeachers from "./useFetchTeachers";

const usePrepareAssignments = () => {
  const { classes, loading: loadingClasses, error: classesError } = useFetchClasses();
  const { teachers, loading: loadingTeachers, error: teachersError } = useFetchTeachers();

  const [classTeacherMap, setClassTeacherMap] = useState({});
  const [classNameMap, setClassNameMap] = useState({});
  const [teacherAssignments, setTeacherAssignments] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    if (classes.length && teachers.length) {
      const teacherIdToNameMap = teachers.reduce((acc, teacher) => {
        acc[teacher._id] = teacher.fullName;
        return acc;
      }, {});

      const updatedClassTeacherMap = {};
      const updatedClassNameMap = {};

      classes.forEach((classItem) => {
        updatedClassNameMap[classItem._id] = classItem.name;

        updatedClassTeacherMap[classItem._id] = classItem.teachers.map(teacherId => ({
          id: teacherId,
          name: teacherIdToNameMap[teacherId]
        }));
      });

      const updatedTeacherAssignments = teachers.reduce((acc, teacher) => {
        acc[teacher._id] = 0;
        return acc;
      }, {});

      setClassTeacherMap(updatedClassTeacherMap);
      setClassNameMap(updatedClassNameMap);
      setTeacherAssignments(updatedTeacherAssignments);
    }
  }, [classes, teachers]);

  return {
    classTeacherMap,
    classNameMap,
    setClassNameMap,
    teacherAssignments,
    error,
    loading: loadingClasses || loadingTeachers,
    classesError,
    teachersError,
    teachers,
    setTeacherAssignments
  };
};

export default usePrepareAssignments;
