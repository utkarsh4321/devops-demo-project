import { useState } from "react";
import "./App.css";

const apiUrl =
  (window as any).env?.VITE_API_URL || import.meta.env.VITE_API_URL;

function App() {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl + "/countries");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1 style={{ color: "green" }}>
            Welcome to the Test DevOps App Deployment
          </h1>
          <p>This is a simple React application.</p>
          <span>Check for the repo rule</span>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde et
            illo quo praesentium modi facilis tenetur ullam eaque. Sapiente
            voluptatibus voluptatum optio id quae corrupti natus eum accusamus
            ut quo.tuuuss Hello raka ssc Changess sss
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Molestias,z corrupti.s
          </p>
        </header>
      </div>
      <div>
        <button onClick={fetchData}>Fetch Data from Backend</button>
      </div>
      <div>
        <h2>Data from Backend:</h2>
        {data.length > 0 ? (
          <ul>
            {data.map((item: any) => (
              <li key={item.code}>
                <strong>{item.code}</strong>: {item.name} - {item.population}{" "}
                people
              </li>
            ))}
          </ul>
        ) : (
          <p>No data available.</p>
        )}
      </div>
    </>
  );
}

export default App;
