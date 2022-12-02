import "../../public/logo.png";
import "./About.css";

const About = () => {
  return (
    <div className="mt-40 text-center justify-center">
      <img src="logo.png" alt="logo" className="contact-image" />
      {/* border: "1px red solid", */}
      <div className="text-lg px-40 mt-12" /*style={{textAlign: "center", marginTop: 170, fontSize: 18, width: "100%", marginLeft: 80}}*/>

        <h2 className="textColor">
          <b className="text-xl">Purpose:</b>
        </h2>
        <p style={{ textAlign: "center" }}>
          As society has progressed, we have developed ways to make structuring projects easier but not necessarily more fun.

          Why not? Nearly everything in people’s lives requires some amount of planning. Although there are existing services that allow you to organize your
          goals, they fail to take advantage of people’s desire to receive instant gratification and to have fun.
          Our goal is to create a service that allows people to plan their goals in a fun and engaging way.

          We wanted to create a platform that would help people stay motivated and on track with their goals by utilizing video game environment which capitilizes our desire for immediate rewards, pleasure, and feedback.
          We hope that this app will help people achieve their goals and become better versions of themselves.

        </p>

      </div>
      <div className="text-lg px-40 mt-12" >
        <h2 className="textColor"><b className="text-xl">Our Developers:</b></h2>
        <p>
          Ryan Chang, Prahas Pattem, Nabi Nabiyev, Karim Mammadli, Nick Norton
        </p>
      </div>
    </div>
  );
};


export default About;
