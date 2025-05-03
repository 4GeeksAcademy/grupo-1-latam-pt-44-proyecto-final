import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import DormireLogo from "../assets/img/sheep_logo.svg";

function SplashScreen() {

  return (
    <div className="d-flex justify-content-center vh-100 align-items-center">
      <AnimatePresence>
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }} // No animación de salida
          >
            <motion.div
              className="text-center flex flex-col items-center space-y-4"
              animate={{ scale: [1.1, 1.2, 1.1] }}
              transition={{
                duration: 3,
                ease: "easeInOut",
                repeat: Infinity
              }}
            >
              <img className="logo" src={DormireLogo} alt="Logo" />
            </motion.div>
          </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default SplashScreen
