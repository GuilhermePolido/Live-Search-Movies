import "./App.css";
import MoviesSearch from "./components/movies-search/MoviesSearch";

function App() {
  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ width: '50%', height: '50%', background: "#f5f5f5", padding: 40 }}>
        <MoviesSearch />
      </div>
    </div>
  );
}

export default App;
