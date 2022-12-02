// import "./Contact.css"; // Tell webpack that Button.js uses these styles
import "../../../public/logo.png";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="container">
      <img src="logo.png" alt="logo" className="contact-image"></img>
      
      <div style={{textAlign: "center", marginTop: 90, fontSize: 18, marginLeft: 80}}>
      
        <h2 className="textColor">
        <b style={{fontSize: 20, marginBottom: 10}}>Contact Us:</b>
        </h2>
        <p style={{textAlign: "center"}}>
        If you have any questions or concerns, please contact us at:
        <br></br>
        <br></br>
        <a href="mailto:
        ">Email: <br></br><u>Enjoyagoals@gmail.com</u></a>
        <br></br>
        <br></br>
        Enjoyagoals: <a href="https://github.com/pprahas/Enjoyagoals
        "><u style={{marginBottom: 80}}> Github</u></a>
        <br></br>
        Prahas Pattem: <a href="https://github.com/pprahas"><u>Github</u></a>  <a href="https://www.linkedin.com/in/pprahas"><u>LinkedIn</u></a> 
        <br></br>

        Karim Mammadli: <a href="https://github.com/Karim-Mammadli"><u>Github</u></a> <a href="https://www.linkedin.com/in/karimmammadli"><u>LinkedIn</u></a> 
        <br></br>
        Ryan Chang: <a href="https://github.com/nayr-gnahc"><u>Github</u></a> <a href="https://www.linkedin.com/in/ryan-chang-1b1b3b1b3"><u>LinkedIn</u></a> 
        <br></br>
        Nabi Nabiyev: <a href="https://github.com/mikewazovski"><u>Github</u></a> <a href="https://www.linkedin.com/in/nabi-nabiyev-0b0b0b0b0"><u>LinkedIn</u></a> 
        <br></br>
        Nick Norton: <a href="https://github.com/NickNort"><u>Github</u></a> <a href="https://www.linkedin.com/in/nick-norton-0b0b0b0b0"><u>LinkedIn</u></a> 
        <br></br>
       
      </p>
      
    </div>

      </div>
  );
};

export default Contact;
