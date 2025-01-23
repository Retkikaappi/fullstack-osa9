// import { CourseParts } from '../App';

const Content = ({
  courses,
}: {
  // courses: CourseParts[]
  courses: { name: string; exerciseCount: number }[];
}) => {
  console.log(courses);
  return (
    <div>
      {courses.map((e) => (
        <p key={e.name}>
          {e.name} {e.exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content;
