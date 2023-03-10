import React from "react";
import "./Home.css";

const Home: React.FC<any> = () => {
  return (
    <div className="home flex-column">
      <div className="home-container">
        <h1 className="welcome-banner">
          Thank You for Choosing Revature Books!
        </h1>
        <br />
        <h3>Please Login or Register to Continue</h3>
      </div>
    </div>
  );
};

export default Home;
