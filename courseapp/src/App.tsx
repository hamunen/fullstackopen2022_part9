interface Course {
  name: string;
  exerciseCount: number;
}

const Header = ({ name }: { name: string }) => <h1>{name}</h1>;

const CoursePart = ({ course }: { course: Course }) => (
  <p>
    {course.name} {course.exerciseCount}
  </p>
);

const Content = ({ courses }: { courses: Course[] }) => (
  <div>
    {courses.map((c) => (
      <CoursePart course={c} key={c.name} />
    ))}
  </div>
);

const Total = ({ courses }: { courses: Course[] }) => (
  <p>
    Number of exercises{" "}
    {courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
);

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
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
