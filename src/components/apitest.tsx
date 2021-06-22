import { useEffect, useState } from "react";

function ApiTest() {
  const [count, setCount] = useState(0);
  const [items, setItemsData] = useState([]);
  const [resources, setResources] = useState(1);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${resources}`)
      .then((res) => res.json())
      .then((json) => setItemsData(json))
      .catch((err) => console.log(err));
  }, [resources]);

  function Increment() {
    setCount(count + 1);
  }
  function NextPage() {
    setResources(resources + 1);
  }
  function PrevPage() {
    setResources(resources - 1);
  }

  return (
    <>
      {/* <button
        onClick={() => {
          setResources("posts");
        }}
      >
        POSTS
      </button>
      <button
        onClick={() => {
          setResources("comments");
        }}
      >
        COMMENTS
      </button>
      <button
        onClick={() => {
          setResources("todos");
        }}
      >
        TODOS
      </button> */}

      <button onClick={NextPage}>Next Page</button>
      <button onClick={PrevPage}>Prev Page</button>

      <div>
        {/* {items.map((item) => {
          return <pre>{JSON.stringify(item)}</pre>;
        })} */}
        <pre>{JSON.stringify(items, null, 2)}</pre>
      </div>

      <h1>{count}</h1>
      <button onClick={Increment}>Increment </button>
    </>
  );
}
export default ApiTest;
