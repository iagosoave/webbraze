import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Check, Menu, Workflow, Code, Calendar, MessageSquare, PenTool, MonitorPlay, ArrowRight, Star, Globe, Users, Coffee, Instagram } from 'lucide-react';
import por1 from './por1.png';  
import por2 from './por2.png';  
import por3 from './por3.png'; 
import cris from './cris.png'; 
import ban from './ban.png';
import logo from './logo.png'; // Ajuste o caminho da sua imagem 
// Importação da fonte Inter do Google Fonts (adicione no seu HTML)
// <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap">

const NavLink = ({ children, section, onClick }) => {
  const handleClick = (e) => {
    e.preventDefault();
    
    // Fecha o menu mobile se houver um onClick handler
    if (onClick) {
      onClick();
    }

    // Pequeno delay para garantir que o menu fechou
    setTimeout(() => {
      const element = document.getElementById(section);
      if (element) {
        const navHeight = 80;
        const extraPadding = 16; // Padding extra para melhor visualização
        const offset = navHeight + extraPadding;
        
        // Usando o scrollIntoView com offset
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  return (
    <a
      href={`#${section}`}
      onClick={handleClick}
      className="block w-full px-6 py-3 text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200 rounded-lg"
    >
      {children}
    </a>
  );
};

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const navBackground = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.8)"]
  );

  // Desabilita o scroll quando o menu mobile está aberto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const menuItems = [
    { section: 'hero', label: 'Início' },
    { section: 'process', label: 'Processo' },
    { section: 'portfolio', label: 'Portfólio' },
    { section: 'precos', label: 'Preços' },
    { section: 'faq', label: 'FAQ' }
  ];

  const handleMobileNavClick = () => {
    setIsMenuOpen(false);
  };


  return (
    <motion.nav
    style={{ backgroundColor: navBackground }}
    className="fixed w-full z-50 backdrop-blur-md"
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-3xl font-bold text-white flex items-center gap-2"
        >
          <img
            src={logo}
            alt="Webbraze Logo"
            className="h-16 w-auto"
          />
          Webbraze
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-2">
          {menuItems.map(({ section, label }) => (
            <NavLink key={section} section={section}>
              {label}
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="md:hidden text-white p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </motion.button>
      </div>
    </div>

    {/* Mobile Navigation */}
    <motion.div
      initial={false}
      animate={{
        height: isMenuOpen ? 'auto' : 0,
        opacity: isMenuOpen ? 1 : 0
      }}
      transition={{ duration: 0.3 }}
      className="md:hidden overflow-hidden bg-black/90 backdrop-blur-lg"
    >
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ 
          y: isMenuOpen ? 0 : -20, 
          opacity: isMenuOpen ? 1 : 0 
        }}
        transition={{ delay: 0.1 }}
        className="flex flex-col py-4"
      >
        {menuItems.map(({ section, label }) => (
          <NavLink
            key={section}
            section={section}
            onClick={handleMobileNavClick}
          >
            {label}
          </NavLink>
        ))}
      </motion.div>
    </motion.div>
  </motion.nav>
  );
};

const FloatingElement = ({ delay }) => {
  return (
    <motion.div
      animate={{
        y: [0, -30, 0], // Aumentando a amplitude do movimento
      }}
      transition={{
        duration: 5, // Aumentando a duração para movimento mais suave
        delay: delay,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut" // Adicionando easing para movimento mais natural
      }}
      className="absolute w-16 h-16 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full backdrop-blur-xl"
    />
  );
};

const StatsCard = ({ icon: Icon, value, label }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="flex flex-col items-center p-6 bg-white/5 rounded-2xl backdrop-blur-sm"
  >
    <Icon size={32} className="text-blue-400 mb-4" />
    <span className="text-4xl font-bold text-white mb-2">{value}</span>
    <span className="text-gray-300">{label}</span>
  </motion.div>
);

const ProcessStep = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.02 }}
    transition={{ delay }}
    className="flex flex-col items-center p-8 bg-gradient-to-br from-white/5 to-white/10 rounded-2xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all"
  >
    <motion.div 
      whileHover={{ rotate: 360 }}
      transition={{ duration: 0.5 }}
      className="p-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mb-6"
    >
      <Icon size={32} className="text-white" />
    </motion.div>
    <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
    <p className="text-gray-300 text-center leading-relaxed">{description}</p>
  </motion.div>
);

const PriceCard = ({ title, price, features, highlight }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.03, y: -10 }}
    className={`p-8 rounded-2xl ${
      highlight 
        ? 'bg-gradient-to-br from-blue-600/90 to-purple-600/90 border-2 border-white/20' 
        : 'bg-white/5'
    } backdrop-blur-xl relative overflow-hidden`}
  >
    {highlight && (
      <div className="absolute top-4 right-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <Star className="text-yellow-400 w-8 h-8" />
        </motion.div>
      </div>
    )}
    <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
    <div className="mb-8">
      <span className="text-5xl font-bold text-white">R$ {price}</span>
      <span className="text-lg text-gray-300">/mês</span>
    </div>
    <ul className="space-y-4 mb-8">
      {features.map((feature, index) => (
        <motion.li 
          key={index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center text-gray-300"
        >
          <Check size={20} className="mr-3 text-green-400 flex-shrink-0" />
          <span>{feature}</span>
        </motion.li>
      ))}
    </ul>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`w-full py-4 px-6 rounded-xl ${
        highlight 
          ? 'bg-white text-purple-600 hover:bg-gray-100' 
          : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90'
      } font-bold flex items-center justify-center gap-2 transition-all`}
    >
      Começar agora
      <ArrowRight size={20} />
    </motion.button>
  </motion.div>
);

const PortfolioCard = ({ image, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ y: -10 }}
    transition={{ delay }}
    className="group relative overflow-hidden rounded-2xl"
  >
    <img
      src={image}
      alt={title}
      className="w-full aspect-video object-cover transform group-hover:scale-110 transition-transform duration-500"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h4 className="text-xl font-bold text-white mb-2">{title}</h4>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  </motion.div>
);

const FAQ = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all"
    >
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full p-6 text-left text-white bg-white/5 hover:bg-white/10 transition-all"
      >
        <span className="text-lg font-medium">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="text-blue-400" />
        </motion.div>
      </motion.button>
      <motion.div
        initial={false}
        animate={{ 
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0
        }}
        className="overflow-hidden bg-white/5"
      >
        <p className="p-6 text-gray-300 leading-relaxed">{answer}</p>
      </motion.div>
    </motion.div>
  );
};

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#090412] font-['Space_Grotesk']">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl" />
      </div>
      <Navigation />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 px-4 overflow-hidden" id='hero'>
        {/* Floating Elements com posições ajustadas */}
        <div className="absolute top-1/4 left-1/4">
          <FloatingElement delay={0} />
        </div>
        <div className="absolute top-1/2 right-1/3">
          <FloatingElement delay={1.5} />
        </div>
        <div className="absolute bottom-1/4 left-1/3">
          <FloatingElement delay={3} />
        </div>
        
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm font-medium text-blue-400 mb-4"
            >
              WEBSITES PROFISSIONAIS
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            >
              Transforme sua presença digital
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                {" "}com estilo
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-300 mb-8 leading-relaxed"
            >
              Criamos landing pages modernas e responsivas que impressionam seus clientes e convertem visitantes em resultados.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex gap-4"
            >
              <motion.a
                href="https://wa.me/5515997155627?text=Olá! Gostaria de começar meu projeto."
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2"
              >
                Comece seu projeto
                <ArrowRight size={20} />
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const portfolioSection = document.querySelector('#portfolio');
                  if (portfolioSection) {
                    portfolioSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-white/10 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all"
              >
                Ver portfólio
              </motion.button>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="relative w-full hidden md:block" // Adicionado hidden md:block aqui
          >
            {/* Elementos geométricos aumentados */}
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute w-32 h-32 border-4 border-white/10 rounded-full -top-16 -left-16 z-20"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute w-24 h-24 border-4 border-white/10 rotate-45 top-1/2 -right-12 z-20"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
              className="absolute w-28 h-28 border-4 border-white/10 rounded-full -bottom-12 left-1/4 z-20"
            />

            {/* Foguete com movimento mais suave */}
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: [-15, 15, -15] }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-20 right-20 z-30 text-7xl transform -rotate-45"
            >
              🚀
            </motion.div>

            {/* Imagem principal aumentada */}
            <div className="relative z-10 w-full">
              <img
                src={ban}
                alt="Dashboard Preview"
                className="w-full rounded-3xl shadow-2xl transform scale-110 md:scale-125 hover:scale-115 md:hover:scale-130 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatsCard icon={Globe} value="200+" label="Projetos Entregues" />
          <StatsCard icon={Users} value="150+" label="Clientes Satisfeitos" />
          <StatsCard icon={Coffee} value="5k+" label="Xícaras de Café" />
          <StatsCard icon={Star} value="98%" label="Taxa de Satisfação" />
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 relative overflow-hidden" id='process'>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/20 to-transparent" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Como Trabalhamos
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-xl text-gray-300 max-w-2xl mx-auto"
            >
              Um processo transparente e eficiente para transformar sua visão em realidade
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            <ProcessStep
              icon={MessageSquare}
              title="1. Contato"
              description="Conversamos sobre suas necessidades e objetivos para entender perfeitamente seu projeto"
              delay={0.1}
            />
            <ProcessStep
              icon={PenTool}
              title="2. Briefing"
              description="Definimos detalhadamente o escopo, funcionalidades e requisitos técnicos"
              delay={0.2}
            />
            <ProcessStep
              icon={MonitorPlay}
              title="3. Wireframe"
              description="Criamos protótipos interativos para visualizar a experiência do usuário"
              delay={0.3}
            />
            <ProcessStep
              icon={Code}
              title="4. Desenvolvimento"
              description="Implementamos seu projeto com as melhores tecnologias do mercado"
              delay={0.4}
            />
            <ProcessStep
              icon={Workflow}
              title="5. Entrega"
              description="Realizamos testes completos e entregamos seu projeto otimizado"
              delay={0.5}
            />
          </div>
        </div>
      </section>

    {/* Portfolio Section */}
    <section className="py-12 md:py-20 px-4" id="portfolio">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6"
            >
              Nosso Portfólio
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-4"
            >
              Conheça alguns dos projetos incríveis que já desenvolvemos
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            <a 
              href="https://metodoato.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="transition-transform hover:scale-105 focus:scale-105 focus:outline-none"
            >
              <PortfolioCard
                image={cris}
                title="Landing Page para infoprodutores "
                description="Landing Page avanaçada para infoprodutores"
                delay={0.1}
              />
            </a>
            <a 
              href="https://bitcoinebook.netlify.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="transition-transform hover:scale-105 focus:scale-105 focus:outline-none"
            >
              <PortfolioCard
                image={por3}
                title="Ebook Criptomoedas"
                description="Guia completo sobre investimentos em criptomoedas"
                delay={0.2}
              />
            </a>
            <a 
              href="https://ebookhabitos.netlify.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="transition-transform hover:scale-105 focus:scale-105 focus:outline-none"
            >
              <PortfolioCard
                image={por2}
                title="Ebook Hábitos Saudáveis"
                description="Transforme sua vida com novos hábitos"
                delay={0.3}
              />
            </a>
            <a 
              href="https://ebookemagrecer.netlify.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="transition-transform hover:scale-105 focus:scale-105 focus:outline-none"
            >
              <PortfolioCard
                image={por1}
                title="Ebook Emagrecimento"
                description="Guia prático para uma vida mais saudável"
                delay={0.4}
              />
            </a>
          </div>
        </div>
      </section>

  {/* Pricing Section */}
  <section className="py-20 px-4 relative overflow-hidden" id="contato">
  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-transparent" />
  <div className="max-w-7xl mx-auto relative z-10">
    <div className="text-center mb-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold text-white mb-6"
      >
        Fale Conosco
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-xl text-gray-300 max-w-2xl mx-auto"
      >
        Comece sua presença digital hoje mesmo com uma solução personalizada
      </motion.p>
    </div>
    
    <div className="max-w-lg mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.03, y: -10 }}
        className="p-8 rounded-2xl bg-gradient-to-br from-blue-600/90 to-purple-600/90 border-2 border-white/20 backdrop-blur-xl relative overflow-hidden"
      >
        <div className="absolute top-4 right-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <Star className="text-yellow-400 w-8 h-8" />
          </motion.div>
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-4">Landing Page Profissional</h3>
        <div className="mb-8">
          <h4 className="text-3xl font-bold text-white">Solicite um Orçamento</h4>
          <p className="text-gray-300 mt-2">Planos personalizados e facilidade de pagamento</p>
        </div>
        
        <ul className="space-y-4 mb-8">
          {[
            "Design responsivo moderno",
            "Otimização para SEO",
            "Animações e efeitos interativos",
            "Formulário de contato",
            "Suporte por 12 meses",
            "Opções de parcelamento"
          ].map((feature, index) => (
            <motion.li
               key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center text-gray-300"
            >
              <Check size={20} className="mr-3 text-green-400 flex-shrink-0" />
              <span>{feature}</span>
            </motion.li>
          ))}
        </ul>
        
        <motion.a
          href={`https://wa.me/5515997155627?text=${encodeURIComponent("Olá! Gostaria de saber mais sobre a Landing Page Profissional.")}`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-4 px-6 rounded-xl bg-white text-purple-600 hover:bg-gray-100 font-bold flex items-center justify-center gap-2 transition-all"
        >
         Entrar em Contato
          <ArrowRight size={20} />
        </motion.a>
      </motion.div>
    </div>
  </div>
</section>

      {/* FAQ Section */}
      <section className="py-20 px-4" id="faq">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Dúvidas Frequentes
            </motion.h2>
          </div>
          
          <div className="space-y-4">
            <FAQ
              question="Quanto tempo leva para desenvolver um site?"
              answer=" O prazo de desenvolvimento é de 2 a 3 dias, garantindo um design profissional e otimizado para conversões."
            />
            <FAQ
              question="Vocês oferecem suporte após a entrega?"
              answer="Sim, oferecemos suporte técnico por 12 meses após a entrega do projeto, garantindo que tudo funcione perfeitamente. Também disponibilizamos pacotes de suporte estendido para necessidades específicas."
            />
            <FAQ
              question="O site será otimizado para dispositivos móveis?"
              answer="Sim, todos os nossos sites são desenvolvidos com design responsivo, garantindo uma experiência perfeita em qualquer dispositivo - smartphones, tablets ou desktops."
            />
            <FAQ
              question="Como funciona o processo de pagamento?"
              answer="Você pode pagar via PIX e garantir um desconto de 5%, ficando por R$ 855,00 à vista. Ou, se preferir, pode parcelar em 12x de R$ 75,00 no cartão"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* Footer */}
      <footer className="py-12 px-4 bg-black/40">
  <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-3xl font-bold text-white flex items-center gap-2 mb-4"
      >
        <img 
          src={logo} 
          alt="WebStudio Logo" 
          className="h-16 w-auto"
        />
        WebStudio
      </motion.div>
      <p className="text-gray-400 max-w-md">
        Transformando ideias em experiências digitais memoráveis desde 2025.
      </p>
    </div>
    <div className="flex flex-col md:items-end">
      <div className="flex gap-4 mb-4">
      <motion.a
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  href="https://wa.me/5515997155627?text=Olá! Gostaria de saber mais sobre seus serviços."
  target="_blank"
  rel="noopener noreferrer"
  className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center text-white hover:bg-[#128C7E] transition-all"
>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 24 24"
    fill="white"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
</motion.a>
        <motion.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          href="https://www.instagram.com/webbrazee/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all"
        >
          <Instagram size={20} />
        </motion.a>
      </div>
      <p className="text-gray-400">© 2025 WebStudio. Todos os direitos reservados.</p>
    </div>
  </div>
</footer>
    </div>
  );
};

export default LandingPage;