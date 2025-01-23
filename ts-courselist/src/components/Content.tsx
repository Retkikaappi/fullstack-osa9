import { CoursePart } from '../App';
import Part from './Part';

const Content = ({ courses }: { courses: CoursePart[] }) => {
  console.log(courses);
  return (
    <div>
      {courses.map((course) => (
        <div key={course.name}>
          <h3>
            {course.name} {course.exerciseCount}
          </h3>
          <Part course={course} />
        </div>
      ))}
    </div>
  );
};

export default Content;
