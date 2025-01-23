import { CourseParts } from '../App';

const Content = ({ courses }: { courses: CourseParts[] }) => {
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
