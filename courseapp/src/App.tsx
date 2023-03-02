interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBaseWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartBaseWithDescription {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackround extends CoursePartBaseWithDescription {
  backroundMaterial: string;
  kind: "background";
}

interface CoursePartSpecial extends CoursePartBaseWithDescription {
  requirements: string[];
  kind: "special";
}

type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackround
  | CoursePartSpecial;

const Header = ({ name }: { name: string }) => <h1>{name}</h1>;

const CoursePart = ({ course }: { course: CoursePart }) => (
  <p>
    <b>
      {course.name} {course.exerciseCount}
    </b>
    <br />
    <Part course={course} />
  </p>
);

const Content = ({ courses }: { courses: CoursePart[] }) => (
  <div>
    {courses.map((c) => (
      <CoursePart course={c} key={c.name} />
    ))}
  </div>
);

const Part = ({ course }: { course: CoursePart }) => {
  switch (course.kind) {
    case "basic":
      return <i>{course.description}</i>;
    case "background":
      return (
        <div>
          <i>{course.description}</i>
          <br />
          background material: {course.backroundMaterial}
        </div>
      );
    case "group":
      return <>project exercises {course.groupProjectCount}</>;
    case "special":
      return (
        <div>
          <i>{course.description}</i> <br />
          required skills: {course.requirements.join(", ")}
        </div>
      );
  }
};

const Total = ({ courses }: { courses: CoursePart[] }) => (
  <p>
    Number of exercises{" "}
    {courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
);

const App = () => {
  const courseName = "Half Stack application development";

  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group",
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backroundMaterial:
        "https://type-level-typescript.com/template-literal-types",
      kind: "background",
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special",
    },
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content courses={courseParts} />
      <Total courses={courseParts} />
    </div>
  );
};
export default App;
