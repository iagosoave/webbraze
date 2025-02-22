import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircleIcon, 
  RocketIcon, // Changed from RocketLaunchIcon to RocketIcon
  ShoppingCartIcon 
} from 'lucide-react';

const AnimatedGradientBackground = () => (
  <motion.div 
    className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-20"
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.2 }}
    transition={{ 
      duration: 2, 
      repeat: Infinity, 
      repeatType: "reverse" 
    }}
  />
);

const SectionTitle = ({ children }) => (
  <motion.h2
    className="text-4xl font-bold text-center text-gray-800 mb-12"
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    {children}
  </motion.h2>
);

const PriceCard = ({ title, price, features, index }) => {
  const icons = [
    <RocketIcon key="landing" className="text-indigo-600" />, // Changed from RocketLaunchIcon to RocketIcon
    <ShoppingCartIcon key="ecommerce" className="text-pink-600" />
  ];

  return (
    <motion.div
      className="bg-white shadow-2xl rounded-2xl p-8 border-2 border-transparent hover:border-indigo-300 transition-all duration-300"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
      }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 10 
      }}
    >
      <div className="flex items-center mb-6">
        {icons[index]}
        <h3 className="text-2xl font-semibold ml-4 text-gray-800">{title}</h3>
      </div>
      
      <div className="text-5xl font-extrabold text-indigo-600 mb-6">
        R$ {price}
        <span className="text-sm text-gray-500 ml-2">/ projeto</span>
      </div>
      
      <ul className="space-y-4 mb-8">
        {features.map((feature, idx) => (
          <motion.li 
            key={idx} 
            className="flex items-center text-gray-700"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <CheckCircleIcon className="mr-3 text-green-500" size={20} />
            {feature}
          </motion.li>
        ))}
      </ul>
      
      <motion.button
        className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Escolher Plano
      </motion.button>
    </motion.div>
  );
};

const Pricing = () => {
  const plans = [
    {
      title: "Landing Page",
      price: "350",
      features: [
        "Design Personalizado",
        "Mobile First", 
        "Otimização SEO", 
        "Analytics", 
        "Suporte 30 dias"
      ]
    },
    {
      title: "E-commerce",
      price: "900",
      features: [
        "Painel Admin", 
        "Integração Pagamentos", 
        "Gestão de Produtos", 
        "Marketing Tools", 
        "Suporte Premium"
      ]
    }
  ];

  return (
    <section className="relative py-32 overflow-hidden">
      <AnimatedGradientBackground />
      <div className="container mx-auto px-4">
        <SectionTitle>Planos</SectionTitle>
        
        <motion.div 
          className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
              }
            }
          }}
        >
          {plans.map((plan, index) => (
            <PriceCard key={index} {...plan} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;