import classes from "../styles/hero.module.css"
import UploadFile from "./UploadFile"

function Hero() {

  return <section className={classes.main}>
        <h1>Visualize and Edit your CSV files online for FREE</h1>
        <UploadFile />
  </section>
}

export default Hero