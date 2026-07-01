import { motion } from 'framer-motion';
import { useState } from 'react';

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);

  const whatsappNumber = '918838417707';
  const message = encodeURIComponent(`Hello Astra Nexora,

My Name:
Business Name:

I would like to discuss:

☐ Website Development
☐ SEO
☐ Branding
☐ Social Media Marketing
☐ Other

Please contact me regarding my project.`);

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-6 right-6 z-[90] flex items-center gap-3 group"
    >
      {/* Pulse effect */}
      <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-25" />
      <span className="absolute inset-0 rounded-full bg-green-500 animate-pulse opacity-30" />

      {/* Label */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 10 }}
        className="absolute right-full mr-3 px-4 py-2 rounded-xl glass border border-white/10 whitespace-nowrap"
      >
        <span className="text-sm font-display font-medium text-white">Chat with us</span>
      </motion.div>

      {/* Button */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-shadow duration-300"
      >
        <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.291 9.291 0 01-4.718-1.289l-.339-.201-3.51.92 1.072-3.419-.223-.351a9.234 9.234 0 01-1.414-4.927c0-5.098 4.153-9.243 9.262-9.243 2.468 0 4.789 1.02 6.534 2.87a9.214 9.214 0 012.705 6.548c-.003 5.097-4.157 9.242-9.266 9.242m7.849-17.017C18.152 1.682 15.667.5 12.996.5c-5.193 0-9.418 4.216-9.418 9.397 0 1.654.435 3.272 1.26 4.709L.5 23.5l5.07-1.327a9.436 9.436 0 004.504 1.145h.004c5.194 0 9.42-4.216 9.42-9.398 0-2.509-.981-4.868-2.762-6.635"/>
        </svg>
      </motion.div>
    </motion.a>
  );
}
