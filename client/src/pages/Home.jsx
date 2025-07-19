// src/pages/Home.jsx
function Home() {
  const handleLogin = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Login</h1>
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
}

export default Home;
