
import { motion } from 'framer-motion';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { FiExternalLink } from 'react-icons/fi';

const ContactRedirect: React.FC = () => {
  const portfolioUrl = "https://portfolio-2-two-ebon.vercel.app";

//   useEffect(() => {
//     // Optional: Small delay so the user sees the "Redirecting" state
//     const timer = setTimeout(() => {
//       window.location.href = portfolioUrl;
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, []);

  return (
    <div className="min-h-screen bg-white text-black font-['EB_Garamond',_serif] flex items-center justify-center px-8">
      <div className="max-w-2xl w-full">
        
        {/* Animated Status */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="flex items-center gap-4 text-[#948181] font-sans text-xs uppercase tracking-[0.4em] font-bold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#948181] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#948181]"></span>
            </span>
            Establishing Connection
          </div>

          <h1 className="text-6xl md:text-8xl font-bold uppercase tracking-tighter leading-none">
            Contact <br />
            <span className="italic font-medium text-black/30">Portal.</span>
          </h1>

          <p className="font-sans text-xl opacity-60 leading-relaxed max-w-md">
            For Contacting Me Visit My Protfolio.
          </p>

          <motion.a
            href={portfolioUrl}
            whileHover={{ x: 10 }}
            className="inline-flex items-center gap-4 py-4 text-sm font-sans font-black uppercase tracking-widest border-b-2 border-black group"
          >
            Visit <HiOutlineArrowNarrowRight className="text-xl" />
          </motion.a>
        </motion.div>

        {/* Minimal Footer Branding */}
        <div className="fixed bottom-12 left-8 right-8 flex justify-between items-end opacity-10">
          <div className="text-4xl font-bold tracking-tighter uppercase">Crunch</div>
          <FiExternalLink size={24} />
        </div>
      </div>
    </div>
  );
};

export default ContactRedirect;