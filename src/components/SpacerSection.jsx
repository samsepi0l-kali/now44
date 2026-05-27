import { motion } from 'framer-motion'

export default function SpacerSection() {
  return (
    <section className="relative min-h-screen bg-black flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white/30">
          अगला सेक्शन
        </h2>
        <p className="text-gray-600 mt-4 text-lg">
          यहाँ कुछ नया आ रहा है...
        </p>
      </motion.div>
    </section>
  )
}
