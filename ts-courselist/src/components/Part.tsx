import { CoursePart } from '../App';

const neverCheck = (val: never): never => {
  throw new Error(`invalid value ${JSON.stringify(val)}`);
};

const Part = ({ course }: { course: CoursePart }) => {
  let info = null;
  switch (course.kind) {
    case 'basic':
      info = <p>{course.description}</p>;
      break;
    case 'group':
      info = <p>{course.groupProjectCount}</p>;
      break;
    case 'background':
      info = (
        <>
          <p>{course.description}</p>
          <p>{course.backgroundMaterial}</p>
        </>
      );
      break;
    case 'special':
      info = (
        <>
          <p>{course.description}</p>
          <p>required skills: {course.requirements.join(', ')}</p>
        </>
      );
      break;
    default:
      return neverCheck(course);
      break;
  }
  return <>{info}</>;
};

export default Part;
