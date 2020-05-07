import React from "react";
import ReactDOM from "react-dom";

// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface OneThreeBase extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends OneThreeBase {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends OneThreeBase {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartBase {
  name: "My course";
  studentCount: number;
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  )
}

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  switch(part.name) {
    case "Fundamentals":
      return (
        <p>
          {part.name} {part.exerciseCount} {part.description}
        </p>
      )
    case "Using props to pass data":
      return (
        <p>
          {part.name} {part.exerciseCount} {part.groupProjectCount}
        </p>
      )
    case "Deeper type usage":
      return (
        <p>
          {part.name} {part.exerciseCount} {part.description} {part.exerciseSubmissionLink}
        </p>
      )
    case "My course":
      return (
        <p>
          {part.name} {part.exerciseCount} {part.studentCount}
        </p>
      )
    default:
      assertNever(part)
      return null
  }
};

const Header: React.FC<{ courseName: string}> = ({ courseName }) => {
  return (
    <h1>{courseName}</h1>
  );
};

const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
  return (
    <div>
      <Part part={courseParts[0]} />
      <Part part={courseParts[1]} />
      <Part part={courseParts[2]} />
      <Part part={courseParts[3]} />
    </div>
  );
};

const Total: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
  return (
    <p>
      Number of exercises{" "}
      {courseParts.reduce((carry: number, part: CoursePart) => carry + part.exerciseCount, 0)}
    </p>
  );
};

const App: React.FC = () => {
  const courseName: string = "Half Stack application development";
  // this is the new coursePart variable
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "My course",
      exerciseCount: 4,
      studentCount: 1
    }
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));