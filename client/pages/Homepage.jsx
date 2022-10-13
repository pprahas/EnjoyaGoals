import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function Homepage() {
  return (
    <div>
      <Header />
      <h1 className="text-center text-8xl text-red-400	">Homepage</h1>;
      <Sidebar />
    </div>
  );
}
