import { motion, useScroll, useSpring } from "framer-motion";
import { FaAngular, FaReact, FaNodeJs, FaPython, FaGithub, FaLinkedin, FaExternalLinkAlt, FaChevronDown } from "react-icons/fa";
import { SiTypescript, SiJavascript, SiTailwindcss, SiSupabase, SiPostgresql } from "react-icons/si";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { projects as staticProjects } from "./data/projects";
import type { Project } from "./data/projects";
import { fetchGitHubRepos } from "./services/github";

const fadeInUp: any = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 }
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1
    }
  },
  viewport: { once: true }
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [displayProjects, setDisplayProjects] = useState<Project[]>(staticProjects);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadGitHubProjects() {
      const githubProjects = await fetchGitHubRepos();
      if (githubProjects.length > 0) {
        // Combinamos os estáticos (que têm descrições melhores) com os do GitHub
        // Evitamos duplicatas por título
        const combined = [...staticProjects];
        githubProjects.forEach(ghProject => {
          if (!combined.some(p => p.title.toLowerCase() === ghProject.title.toLowerCase())) {
            combined.push(ghProject);
          }
        });
        setDisplayProjects(combined);
      }
      setIsLoading(false);
    }
    loadGitHubProjects();
  }, []);

  return (
    <div className="bg-[#020617] text-slate-200 min-h-screen font-sans selection:bg-blue-500/30 overflow-x-hidden">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-400 z-50 origin-[0%]"
        style={{ scaleX }}
      />

      {/* BACKGROUND DECORATION */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-cyan-500/10 blur-[100px]" />
        <div className="absolute top-[40%] right-[10%] w-[30%] h-[30%] rounded-full bg-indigo-600/5 blur-[120px]" />
      </div>

      {/* HERO */}
      <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-6 overflow-hidden z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px]"
        />
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 flex flex-col items-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8 relative w-40 h-40 md:w-52 md:h-52 rounded-full p-1 bg-gradient-to-tr from-blue-600 to-cyan-400 shadow-2xl shadow-blue-500/20"
          >
            <div className="w-full h-full bg-[#020617] rounded-full overflow-hidden border-4 border-[#020617]">
               <img src="/profile.png" alt="Jean Lima" className="w-full h-full object-cover" />
            </div>
          </motion.div>

          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs md:text-sm font-medium mb-8 inline-block backdrop-blur-sm tracking-wider uppercase"
          >
            Disponível para novos projetos
          </motion.span>
          <h1 className="text-6xl md:text-9xl font-bold tracking-tighter leading-none bg-gradient-to-b from-white via-white to-slate-500 bg-clip-text text-transparent mb-4">
            Jean Lima
          </h1>
          <h2 className="text-2xl md:text-4xl font-light mt-4 tracking-[0.2em] text-cyan-400 uppercase">
            Full Stack Developer
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-10 text-lg md:text-xl text-slate-400 max-w-2xl z-10 font-light leading-relaxed px-4"
        >
          Construindo o futuro da web através de arquiteturas escaláveis e 
          <span className="text-slate-100 font-medium"> interfaces de alto impacto</span>.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-14 flex flex-col sm:flex-row gap-6 z-10"
        >
          <motion.a
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(37,99,235,0.4)" }}
            whileTap={{ scale: 0.95 }}
            href="#projetos"
            className="px-10 py-4 rounded-full bg-blue-600 text-white font-bold transition-all flex items-center gap-2 group"
          >
            Ver Projetos
            <FaChevronDown className="group-hover:translate-y-1 transition-transform" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.4)" }}
            whileTap={{ scale: 0.95 }}
            href="https://github.com/DevJeanSz"
            target="_blank"
            className="px-10 py-4 rounded-full bg-slate-900/50 border border-slate-800 text-slate-200 font-bold transition-all backdrop-blur-md flex items-center gap-2"
          >
            <FaGithub size={20} />
            GitHub
          </motion.a>
        </motion.div>

        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-slate-500 hidden md:block"
        >
          <div className="w-6 h-12 border border-slate-800 rounded-full flex justify-center p-2">
            <motion.div 
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1.5 h-1.5 bg-blue-500 rounded-full" 
            />
          </div>
        </motion.div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-40 px-6 relative z-10">
        <motion.div {...fadeInUp} className="text-center mb-24">
          <h2 className="text-5xl font-bold mb-6 tracking-tight">Especialidades</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-cyan-400 mx-auto rounded-full" />
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8"
        >
          <Skill icon={<FaAngular className="text-[#dd0031]" />} name="Angular" />
          <Skill icon={<FaReact className="text-[#61dafb]" />} name="React" />
          <Skill icon={<SiTypescript className="text-[#3178c6]" />} name="TypeScript" />
          <Skill icon={<FaNodeJs className="text-[#339933]" />} name="Node.js" />
          <Skill icon={<FaPython className="text-[#3776ab]" />} name="Python" />
          <Skill icon={<SiTailwindcss className="text-[#06b6d4]" />} name="Tailwind" />
          <Skill icon={<SiSupabase className="text-[#3ecf8e]" />} name="Supabase" />
          <Skill icon={<SiJavascript className="text-[#f7df1e]" />} name="JavaScript" />
          <Skill icon={<SiPostgresql className="text-[#336791]" />} name="SQL" />
          <Skill icon={<FaNodeJs className="text-white" />} name="APIs REST" />
        </motion.div>
      </section>

      {/* PROJECTS */}
      <section id="projetos" className="py-40 px-6 relative z-10 bg-slate-900/10 backdrop-blur-[2px]">
        <motion.div {...fadeInUp} className="text-center mb-24">
          <h2 className="text-5xl font-bold mb-6 tracking-tight">Projetos & Inovações</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-cyan-400 mx-auto rounded-full" />
        </motion.div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
          {displayProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
              whileHover={{ y: -12 }}
              className="glass-card group p-10 rounded-[2.5rem] transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl group-hover:bg-blue-500/20 transition-colors pointer-events-none" />
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-start mb-10">
                  <div className="p-4 bg-slate-800 group-hover:bg-blue-600 rounded-2xl text-blue-400 group-hover:text-white transition-all duration-500 shadow-xl">
                    <FaGithub size={28} />
                  </div>
                  {project.link && (
                    <motion.a
                      href={project.link}
                      target="_blank"
                      whileHover={{ scale: 1.1, rotate: 45 }}
                      className="p-3 text-slate-500 hover:text-white transition-colors"
                    >
                       <FaExternalLinkAlt size={22} />
                    </motion.a>
                  )}
                </div>

                <h3 className="text-3xl font-bold mb-5 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-500 capitalize">
                  {project.title}
                </h3>
                
                <div className="flex-grow">
                  <ExpandableText text={project.description} />
                </div>

                <div className="flex flex-wrap gap-3 mt-auto">
                  {project.tech.map((t, i) => (
                    <span key={i} className="px-5 py-2 text-xs font-bold rounded-full bg-slate-900/80 text-blue-400 border border-blue-500/10 backdrop-blur-md uppercase tracking-widest">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {isLoading && (
          <div className="flex justify-center mt-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-10 h-10 border-4 border-blue-500/30 border-t-blue-500 rounded-full"
            />
          </div>
        )}
      </section>

      {/* EXPERIENCE / CTA */}
      <section className="py-40 px-6 relative z-10 overflow-hidden">
        <div className="max-w-4xl mx-auto glass-card p-16 rounded-[3rem] text-center relative">
          <motion.div {...fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 italic tracking-tight">"Construindo soluções que<br/>escalam com o seu negócio."</h2>
            <div className="text-slate-400 text-xl font-light mb-12 leading-relaxed max-w-2xl mx-auto">
              Com mais de 3 anos de experiência, foco em entregar código limpo, 
              perfomance excepcional e arquiteturas modulares que permitem crescimento contínuo.
            </div>
            <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:jeanlimadev@outlook.com"
                className="inline-block px-12 py-5 rounded-full bg-white text-black font-black uppercase tracking-widest hover:bg-cyan-400 transition-colors shadow-2xl shadow-cyan-500/20"
            >
                Vamos Conversar?
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-24 border-t border-slate-900/50 z-10 relative">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col items-center md:items-start gap-4">
            <h2 className="text-2xl font-bold tracking-tighter italic">JEAN<span className="text-blue-500">LIMA</span></h2>
            <p className="text-slate-500 text-sm font-light">© {new Date().getFullYear()} - Desenvolvido por Jean Lima DEV.</p>
          </div>
          
          <div className="flex gap-6">
            <SocialLink href="https://www.linkedin.com/in/jean-lima-636937244/" icon={<FaLinkedin size={22} />} />
            <SocialLink href="https://github.com/DevJeanSz" icon={<FaGithub size={22} />} />
          </div>
        </div>
      </footer>
    </div>
  );
}

function Skill({ icon, name }: { icon: ReactNode; name: string }) {
  return (
    <motion.div
      variants={{
        initial: { opacity: 0, scale: 0.8 },
        whileInView: { opacity: 1, scale: 1 }
      }}
      whileHover={{ 
        y: -5,
        backgroundColor: "rgba(30, 41, 59, 0.4)",
        borderColor: "rgba(59, 130, 246, 0.3)"
      }}
      className="flex flex-col items-center gap-5 p-10 glass-card rounded-3xl transition-all duration-300 border-transparent group cursor-default"
    >
      <div className="text-5xl group-hover:scale-110 transition-transform duration-500 filter drop-shadow-lg">
        {icon}
      </div>
      <span className="font-bold text-[10px] tracking-[0.3em] uppercase text-slate-500 group-hover:text-blue-400 transition-colors">{name}</span>
    </motion.div>
  );
}

function SocialLink({ href, icon }: { href: string; icon: ReactNode }) {
    return (
        <a 
            href={href} 
            className="w-14 h-14 rounded-full bg-slate-900/50 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 transition-all border border-slate-800"
        >
            {icon}
        </a>
    )
}

function ExpandableText({ text }: { text: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 150;

  if (text.length <= maxLength) {
    return <p className="text-slate-400 mb-10 text-lg font-light leading-relaxed whitespace-pre-line">{text}</p>;
  }

  return (
    <div className="mb-10">
      <p className="text-slate-400 text-lg font-light leading-relaxed whitespace-pre-line">
        {isExpanded ? text : `${text.substring(0, maxLength)}...`}
      </p>
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-blue-400 hover:text-blue-300 text-sm font-medium mt-2 focus:outline-none transition-colors hover:underline"
      >
        {isExpanded ? "Ver menos" : "Ver mais"}
      </button>
    </div>
  );
}