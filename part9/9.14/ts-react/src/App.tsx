interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseWithDescription extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CourseWithDescription {
  type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseWithDescription {
  type: "submission";
  exerciseSubmissionLink: string;
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart;
type HeaderProp = { name: string };
type ContentProp = { courseParts: CoursePart[] };

const Header = ({ name }: HeaderProp) => <h1>{name}</h1>;
const Content = ({ courseParts }: ContentProp) => {
  return (
    <>
      {courseParts.map(part => <Part part={part} key={part.name} />)}
    </>
  );
};
const Part = ({ part }: { part: CoursePart }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled course part: ${JSON.stringify(value)}`
    );
  };

  switch (part.type) {
    case 'normal':
      return (
        <>
        <h3>{part.name} {part.exerciseCount}</h3>
        <p>{part.description}</p>
        </>
      );
    case 'groupProject':
      return (
        <>
        <h3>{part.name} {part.exerciseCount}</h3>
        <p>project exercises {part.groupProjectCount}</p>
        </>
      );
    case 'submission':
      return (
        <>
        <h3>{part.name} {part.exerciseCount}</h3>
        <p>{part.description}</p>
        <p>submit to {part.exerciseSubmissionLink}</p>
        </>
      );
    default:
      return assertNever(part);
  }
}
const Total = ({ courseParts }: ContentProp) => {
  const total = courseParts.reduce((carry, part) => carry + part.exerciseCount, 0);
  return <p>Number of exercises {total}</p>;
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the easy course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the hard course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    }
  ]

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;