import { Outlet } from 'react-router-dom'
import Navigation from '../components/Navigation'
import {motion} from "framer-motion"
function RootLayout() {
  const anim = (variants) => {
      return {
        initial : "initial",
        animate : "enter",
        exit : "exit",
        variants
      }
  }
  const opacity = {
    initial : {
      opacity : 0
    },
    enter : {
      opacity : 1
    },
    exit : {
      opacity : 0
    }
  }
  return <>
        <Navigation />
        <motion.div {...anim(opacity)}>
        <Outlet />  
        </motion.div>
  </>
}

export default RootLayout