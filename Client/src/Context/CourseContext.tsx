import React, { createContext, useContext, useState } from 'react';

interface Course {
  id: number;
  title: string;
  instructor: string;
  description: string;
  difficulty: string;
  materials: string[]; // it can accept to add other fields as necessary
}

interface CourseContextType {
  courses: Course[];
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
  course?: Course;
  setCourse: React.Dispatch<React.SetStateAction<Course | undefined>>;

}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [course, setCourse] = useState<Course | undefined>(undefined);

  return (
    <CourseContext.Provider value={{ courses, setCourses, course, setCourse }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourseContext = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourseContext must be used within a CourseProvider');
  }
  return context;
};
