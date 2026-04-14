import { NextRequest, NextResponse } from "next/server";

// PRE-DEFINED LOCAL QUESTION BANK FOR 100% RELIABLE DEMOS
const questionBank: Record<string, any[]> = {
    python: [
        { question: "What is the output of `print(type([]))` in Python?", options: ["<class 'list'>", "<class 'array'>", "<class 'dict'>", "<class 'set'>"], correctIndex: 0 },
        { question: "Which collection in Python is ordered, changeable, and allows duplicate members?", options: ["Tuple", "Set", "Dictionary", "List"], correctIndex: 3 },
        { question: "How do you define a function in Python?", options: ["def my_func():", "function my_func():", "create my_func():", "void my_func():"], correctIndex: 0 },
        { question: "What does the `pass` statement do in Python?", options: ["Terminates the loop", "Acts as a placeholder doing nothing", "Skips the current iteration", "Throws an exception"], correctIndex: 1 },
        { question: "Which method is used to remove whitespace from both ends of a string in Python?", options: ["strip()", "trim()", "ptrim()", "clean()"], correctIndex: 0 },
        { question: "In Python, how do you insert COMMENTS?", options: ["// This is a comment", "/* This is a comment */", "# This is a comment", "<!-- This is a comment -->"], correctIndex: 2 },
        { question: "Which operator is used for exponentiation in Python?", options: ["^", "**", "//", "%"], correctIndex: 1 },
        { question: "What will `bool('False')` evaluate to?", options: ["True", "False", "None", "Error"], correctIndex: 0 },
        { question: "What is the purpose of the `__init__` method in a Python class?", options: ["To delete an object", "To initialize instance variables", "To compile the class", "To import modules"], correctIndex: 1 },
        { question: "Which of the following is NOT a core data type in Python?", options: ["List", "Dictionary", "Class", "Tuple"], correctIndex: 2 },
        { question: "How do you open a file 'data.txt' for reading in Python?", options: ["open('data.txt', 'r')", "file('data.txt', 'read')", "open_file('data.txt', 'r')", "read('data.txt')"], correctIndex: 0 },
        { question: "What is the result of `3 // 2` in Python 3?", options: ["1.5", "1", "2", "0"], correctIndex: 1 },
        { question: "Which keyword is used for exception handling in Python?", options: ["catch", "except", "throw", "handle"], correctIndex: 1 },
        { question: "What is a 'lambda' function in Python?", options: ["A mathematical library", "An anonymous inline function", "A keyword for looping", "A type of list"], correctIndex: 1 },
        { question: "What does the `len()` function do?", options: ["Finds the object's memory size", "Returns the length of an object", "Converts integer to long", "None of the above"], correctIndex: 1 }
    ],
    javascript: [
        { question: "Which of the following is not a reserved word in JavaScript?", options: ["interface", "throws", "program", "short"], correctIndex: 2 },
        { question: "What is the output of `typeof null` in JavaScript?", options: ["'object'", "'null'", "'undefined'", "'boolean'"], correctIndex: 0 },
        { question: "How can you add a single line comment in JavaScript?", options: ["<!-- Comment -->", "// Comment", "' Comment", "/* Comment */"], correctIndex: 1 },
        { question: "Which method adds one or more elements to the end of an array?", options: ["pop()", "push()", "join()", "slice()"], correctIndex: 1 },
        { question: "What does the `===` operator check?", options: ["Value equality only", "Type equality only", "Value and Type equality", "None of the above"], correctIndex: 2 },
        { question: "Which function is used to parse a JSON string into a JavaScript object?", options: ["JSON.parse()", "JSON.stringify()", "JSON.toObject()", "JSON.parseObject()"], correctIndex: 0 },
        { question: "What does NaN stand for?", options: ["Not a Null", "Not a Number", "New array Notation", "No active Node"], correctIndex: 1 },
        { question: "In JavaScript, how do you declare a block-scoped variable?", options: ["var", "let", "declare", "define"], correctIndex: 1 },
        { question: "What is a closure in JavaScript?", options: ["A blocked code sequence", "A function carrying its lexical scope", "A memory leak", "An API call format"], correctIndex: 1 },
        { question: "Which array method returns a new array after iterating and applying a function to all elements?", options: ["forEach()", "filter()", "map()", "reduce()"], correctIndex: 2 },
        { question: "What is the correct way to write an arrow function?", options: ["() => {}", "function => {}", "=> () {}", "() -> {}"], correctIndex: 0 },
        { question: "How do you set a timer that executes a function after a specified delay?", options: ["setInterval()", "setTimeout()", "delay()", "wait()"], correctIndex: 1 },
        { question: "Which statement stops the execution of a switch block?", options: ["continue", "stop", "break", "return"], correctIndex: 2 },
        { question: "What specifies an event handler for a click in DOM?", options: ["onClick", "onclick", "listenClick", "handleClick"], correctIndex: 1 },
        { question: "How do you check if 'x' is an array?", options: ["typeof x === 'array'", "Array.isArray(x)", "x.isArray()", "x instanceof Array"], correctIndex: 1 }
    ],
    react: [
        { question: "Which hook is used to manage state in a functional component?", options: ["useEffect", "useState", "useContext", "useReducer"], correctIndex: 1 },
        { question: "What is JSX in React?", options: ["A CSS framework", "A JavaScript syntax extension", "A state management tool", "A new language"], correctIndex: 1 },
        { question: "How do you pass data from a parent component to a child component?", options: ["State", "Context", "Props", "Redux"], correctIndex: 2 },
        { question: "Which React hook is used for performing side effects?", options: ["useState", "useMemo", "useEffect", "useRef"], correctIndex: 2 },
        { question: "What is the Virtual DOM?", options: ["A direct copy of the HTML DOM", "A lightweight, in-memory representation of the DOM", "A separate browser window", "None of the above"], correctIndex: 1 },
        { question: "In React, keys are used to:", options: ["Encrypt data", "Identify which items have changed, been added, or removed", "Manage component state", "Bind event handlers"], correctIndex: 1 },
        { question: "How do you properly update a state variable named 'count' initialized with useState?", options: ["count = count + 1", "setState(count + 1)", "setCount(count + 1)", "update(count + 1)"], correctIndex: 2 },
        { question: "What will `useEffect(() => {}, [])` do?", options: ["Run after every render", "Run once upon mounting", "Never run", "Result in an error"], correctIndex: 1 },
        { question: "Which method is required inside a class component to render UI?", options: ["return()", "render()", "ui()", "display()"], correctIndex: 1 },
        { question: "What does the `useMemo` hook do?", options: ["Caches a computationally expensive value", "Memoizes a function", "Manages state", "Triggers side effects"], correctIndex: 0 },
        { question: "How do you handle routing in a standard React Single Page Application?", options: ["window.location", "React Router", "Next.js routing", "Express.js"], correctIndex: 1 },
        { question: "React fragments are used to:", options: ["Group multiple elements without adding an extra node to the DOM", "Fragment component states", "Split code", "Add styling"], correctIndex: 0 },
        { question: "What is 'prop drilling'?", options: ["Passing props down multiple component layers unnecessarily", "A drilling animation", "Extracting props", "Injecting props universally"], correctIndex: 0 },
        { question: "What does `useRef` return?", options: ["A mutable ref object", "A state variable", "A DOM node strictly", "A context provider"], correctIndex: 0 },
        { question: "How can you share state globally without a library like Redux?", options: ["Props", "Component State", "React Context API", "LocalStorage"], correctIndex: 2 }
    ],
    java: [
        { question: "Which data type is used to create a variable that stores text?", options: ["String", "Txt", "string", "Char"], correctIndex: 0 },
        { question: "In Java, what is the size of an int variable?", options: ["8 bits", "16 bits", "32 bits", "64 bits"], correctIndex: 2 },
        { question: "Which method is the starting point for any Java program?", options: ["start()", "init()", "main()", "run()"], correctIndex: 2 },
        { question: "What keyword is used to inherit a class?", options: ["implements", "inherits", "extends", "super"], correctIndex: 2 },
        { question: "What is a correct syntax to output 'Hello World' in Java?", options: ["Console.WriteLine('Hello World');", "System.out.println('Hello World');", "echo('Hello World');", "print('Hello World');"], correctIndex: 1 },
        { question: "Which keyword creates an object in Java?", options: ["class", "object", "new", "create"], correctIndex: 2 },
        { question: "What does the 'final' keyword signify?", options: ["The class is abstract", "The variable's value cannot be modified", "The method must be overridden", "It's the last line of code"], correctIndex: 1 },
        { question: "Which collection class stores key-value pairs?", options: ["ArrayList", "HashSet", "HashMap", "LinkedList"], correctIndex: 2 },
        { question: "What happens if a class has no constructor?", options: ["Compilation error", "The compiler generates a default no-arg constructor", "Runtime exception", "The program ignores object creation"], correctIndex: 1 },
        { question: "What is Encapsulation?", options: ["Binding data and methods into a single unit", "Hiding implementation details", "Creating new classes from existing ones", "Treating objects as their parent types"], correctIndex: 0 },
        { question: "Which interface must be implemented to use a Thread?", options: ["Callable", "Runnable", "Threadable", "Executor"], correctIndex: 1 },
        { question: "Does Java support multiple inheritance with classes?", options: ["Yes", "No", "Only for abstract classes", "Only in Java 8+"], correctIndex: 1 },
        { question: "What is an abstract class?", options: ["A class that cannot be instantiated", "A class with only static methods", "A class with no methods", "A final class"], correctIndex: 0 },
        { question: "What is the equivalent of 'null' for primitive types?", options: ["null", "0", "None for primitives", "undefined"], correctIndex: 2 },
        { question: "What is the correct way to handle exceptions?", options: ["if/else blocks", "switch case", "try/catch blocks", "throw/return"], correctIndex: 2 }
    ],
    sql: [
        { question: "What does SQL stand for?", options: ["Structured Query Language", "Strong Question Language", "Structured Question Language", "Standard Query Language"], correctIndex: 0 },
        { question: "Which SQL statement is used to extract data from a database?", options: ["GET", "EXTRACT", "SELECT", "OPEN"], correctIndex: 2 },
        { question: "Which statement is used to update data in a database?", options: ["SAVE", "MODIFY", "UPDATE", "SAVE AS"], correctIndex: 2 },
        { question: "Which SQL clause is used to filter records?", options: ["FILTER", "WHERE", "ORDER", "HAVING"], correctIndex: 1 },
        { question: "What does the JOIN clause do?", options: ["Combines columns from multiple tables", "Deletes redundant data", "Combines rows from two or more tables based on a related column", "Creates a new table"], correctIndex: 2 },
        { question: "Which keyword is used to sort the result-set?", options: ["SORT", "ORDER BY", "ALIGN", "GROUP BY"], correctIndex: 1 },
        { question: "What is a Primary Key?", options: ["A key to unlock database access", "A unique identifier for a table record", "The first column in a table", "A foreign identifier"], correctIndex: 1 },
        { question: "What function returns the number of records in a table?", options: ["SUM()", "COUNT()", "TOTAL()", "MAX()"], correctIndex: 1 },
        { question: "Which statement is used to insert new data into a database?", options: ["ADD RECORD", "INSERT INTO", "ADD NEW", "APPEND"], correctIndex: 1 },
        { question: "What is the difference between TRUNCATE and DELETE?", options: ["DELETE removes table structure, TRUNCATE removes data", "TRUNCATE resets identity and does not log individual row deletions", "They are identical", "TRUNCATE is a DML command"], correctIndex: 1 },
        { question: "How do you select all columns from a table named 'Persons'?", options: ["SELECT [all] FROM Persons", "SELECT * FROM Persons", "SELECT Persons", "EXTRACT * FROM Persons"], correctIndex: 1 },
        { question: "The OR operator displays a record if:", options: ["ALL conditions are TRUE", "ANY condition is TRUE", "The first condition is TRUE", "No conditions are true"], correctIndex: 1 },
        { question: "Which keyword selects unique values?", options: ["UNIQUE", "DIFFERENT", "DISTINCT", "FILTER"], correctIndex: 2 },
        { question: "What is an INDEX used for?", options: ["To speed up data retrieval", "To define table schema", "To link foreign keys", "To store backup data"], correctIndex: 0 },
        { question: "What is a Foreign Key?", options: ["A unique constraint", "A key pointing to a primary key in another table", "A user access key", "A remote database link"], correctIndex: 1 }
    ],
    html: [
        { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyper Tool Markup Language"], correctIndex: 0 },
        { question: "Who makes the Web standards?", options: ["Mozilla", "Microsoft", "The World Wide Web Consortium (W3C)", "Google"], correctIndex: 2 },
        { question: "Choose the correct HTML element for the largest heading:", options: ["<head>", "<h6>", "<h1>", "<heading>"], correctIndex: 2 },
        { question: "What is the correct HTML element for inserting a line break?", options: ["<break>", "<lb>", "<br>", "<hr>"], correctIndex: 2 },
        { question: "What is the correct HTML for adding a background color?", options: ["<body bg='yellow'>", "<body style='background-color:yellow;'>", "<background>yellow</background>", "<body color='yellow'>"], correctIndex: 1 },
        { question: "Choose the correct HTML element for giving text importance (bold):", options: ["<b>", "<strong>", "<important>", "<i>"], correctIndex: 1 },
        { question: "What is the correct HTML for creating a hyperlink?", options: ["<a>http://url.com</a>", "<a url='http://url.com'>link</a>", "<a href='http://url.com'>link</a>", "<link>http://url.com</link>"], correctIndex: 2 },
        { question: "Which character is used to indicate an end tag?", options: ["*", "^", "<", "/"], correctIndex: 3 },
        { question: "How can you open a link in a new tab/browser window?", options: ["<a href='url' target='new'>", "<a href='url' target='_blank'>", "<a href='url' new>", "<a href='url' target='_window'>"], correctIndex: 1 },
        { question: "Which element is used to define an unordered list?", options: ["<ol>", "<ul>", "<li>", "<list>"], correctIndex: 1 },
        { question: "How do you add an image in HTML?", options: ["<image src='url' alt='text'>", "<img path='url'>", "<img src='url' alt='text'>", "<img href='url'>"], correctIndex: 2 },
        { question: "What is the correct HTML for a dropdown list?", options: ["<input type='dropdown'>", "<list>", "<select>", "<dropdown>"], correctIndex: 2 },
        { question: "What does the `<head>` element contain?", options: ["Main visible content", "Metadata about the document", "Footer links", "Images"], correctIndex: 1 },
        { question: "Which input type defines a slider control?", options: ["slider", "range", "controls", "scroll"], correctIndex: 1 },
        { question: "In HTML5, which element is used to specify a footer for a document?", options: ["<bottom>", "<footer>", "<section>", "<foot>"], correctIndex: 1 }
    ],
    css: [
        { question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Creative Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"], correctIndex: 0 },
        { question: "Where in an HTML document is the correct place to refer to an external style sheet?", options: ["At the end of the document", "In the <body> section", "In the <head> section", "Before the <html> tag"], correctIndex: 2 },
        { question: "Which HTML tag is used to define an internal style sheet?", options: ["<style>", "<script>", "<css>", "<link>"], correctIndex: 0 },
        { question: "Which is the correct CSS syntax?", options: ["body:color=black;", "{body:color=black;}", "body {color: black;}", "{body;color:black;}"], correctIndex: 2 },
        { question: "How do you insert a comment in a CSS file?", options: ["// this is a comment //", "' this is a comment", "/* this is a comment */", "<!-- this is a comment -->"], correctIndex: 2 },
        { question: "Which property is used to change the background color?", options: ["color", "bgcolor", "background-color", "bg-color"], correctIndex: 2 },
        { question: "How do you add a background color for all <h1> elements?", options: ["h1.all {background-color:#FFFFFF;}", "all.h1 {background-color:#FFFFFF;}", "h1 {background-color:#FFFFFF;}", "h1 {color:#FFFFFF;}"], correctIndex: 2 },
        { question: "Which CSS property is used to change the text color of an element?", options: ["fgcolor", "text-color", "color", "font-color"], correctIndex: 2 },
        { question: "Which CSS property controls the text size?", options: ["font-style", "text-size", "text-style", "font-size"], correctIndex: 3 },
        { question: "How do you select an element with id 'demo'?", options: [".demo", "*demo", "#demo", "demo"], correctIndex: 2 },
        { question: "How do you select elements with class name 'test'?", options: ["#test", "*test", ".test", "test"], correctIndex: 2 },
        { question: "How do you display hyperlinks without an underline?", options: ["a {text-decoration:none;}", "a {underline:none;}", "a {text-decoration:no-underline;}", "a {decoration:no-underline;}"], correctIndex: 0 },
        { question: "How do you make each word in a text start with a capital letter?", options: ["text-transform:capitalize", "text-style:capitalize", "transform:capitalize", "text-transform:uppercase"], correctIndex: 0 },
        { question: "Which property is used to change the left margin of an element?", options: ["margin-left", "padding-left", "indent", "left-margin"], correctIndex: 0 },
        { question: "How do you make a list that lists its items with squares?", options: ["list-type: square;", "list-style-type: square;", "list: square;", "style: square;"], correctIndex: 1 }
    ],
    generic: [
        { question: "What is an API?", options: ["Application Programming Interface", "Advanced Procedural Interface", "Automated Program Integration", "Active Protocol Interlink"], correctIndex: 0 },
        { question: "Which of the following is a version control system?", options: ["Docker", "Git", "Kubernetes", "Linux"], correctIndex: 1 },
        { question: "What is the primary function of a compiler?", options: ["To run arbitrary programs immediately", "To convert high-level code into machine or byte code", "To fix logical errors", "To track memory usage"], correctIndex: 1 },
        { question: "What is a prominent feature of Object-Oriented Programming?", options: ["Global variables only", "Strict procedural execution", "Encapsulation, Inheritance, and Polymorphism", "Machine language compatibility"], correctIndex: 2 },
        { question: "Which protocol is primarily used for secure web browsing?", options: ["HTTP", "HTTPS", "FTP", "SSH"], correctIndex: 1 },
        { question: "What is meant by 'CI/CD'?", options: ["Continuous Integration / Continuous Deployment", "Code Inspection / Code Delivery", "Custom Installation / Custom Deployment", "Computer Interface / Computer Design"], correctIndex: 0 },
        { question: "What does JSON stand for?", options: ["JavaScript Object Notation", "Java Standard Output Network", "JavaScript Output Node", "JavaScript Oriented Notation"], correctIndex: 0 },
        { question: "What is a 'bug' in software engineering?", options: ["A hardware component", "An unintended error or flaw in the code", "A new feature", "A virus"], correctIndex: 1 },
        { question: "What is Agile methodology primarily focused on?", options: ["Writing large documentation", "Iterative development and flexibility", "Fixed timeline execution", "Command driven architecture"], correctIndex: 1 },
        { question: "What does 'Debugging' mean?", options: ["Adding features quickly", "Removing comments", "Identifying and resolving logic or code errors", "Compiling code"], correctIndex: 2 },
        { question: "Which mathematical concept is foundational to relational databases?", options: ["Graph Theory", "Calculus", "Set Theory", "Trigonometry"], correctIndex: 2 },
        { question: "What distinguishes a RESTful API?", options: ["It uses SOAP", "It is stateless and relies on HTTP standard methods", "It relies on local WebSockets exclusively", "It uses only XML payloads"], correctIndex: 1 },
        { question: "What is the typical time complexity of retrieving a value from a well-balanced Hash Map?", options: ["O(log n)", "O(n)", "O(1)", "O(n^2)"], correctIndex: 2 },
        { question: "What is 'Syntax'?", options: ["The structural rules governing the structure of a programming statement", "The runtime library", "The operating system interface", "A UI component"], correctIndex: 0 }
    ]
};

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { skill } = body;

        if (!skill) {
            return NextResponse.json({ error: "Skill is required" }, { status: 400 });
        }

        // Try mapping the skill directly, lowercase
        const normalizedSkill = skill.toLowerCase().trim();
        let questionsPool: any[] = [];

        // Check if the exact requested skill is known in our bank
        if (questionBank[normalizedSkill]) {
            questionsPool = [...questionBank[normalizedSkill]];
        } else {
            // Find a partial match (e.g. if skill is "react.js", it will match "react")
            for (const key in questionBank) {
                if (normalizedSkill.includes(key)) {
                    questionsPool = [...questionBank[key]];
                    break;
                }
            }
        }

        // If no match found, fallback to generic software engineering questions
        if (questionsPool.length === 0) {
            questionsPool = [...questionBank.generic];
        }

        // Shuffle the questions pool using Fisher-Yates algorithm
        for (let i = questionsPool.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [questionsPool[i], questionsPool[j]] = [questionsPool[j], questionsPool[i]];
        }

        // Always clamp to exactly 10 questions to perfectly fit UI expectations
        const finalQuestions = questionsPool.slice(0, 10);

        return NextResponse.json({ questions: finalQuestions });
    } catch (error: any) {
        console.error("Error generating test locally:", error);
        return NextResponse.json({ error: error.message || "An error occurred while generating the test" }, { status: 500 });
    }
}
