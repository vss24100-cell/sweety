import { useEffect } from "react";
import confetti from "canvas-confetti";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Section } from "@/components/Section";
import { PhotoFrame } from "@/components/PhotoFrame";
import { WishForm } from "@/components/WishForm";
import { WishesList } from "@/components/WishesList";
import { Sparkles, Trophy, Music, GraduationCap, Heart, Star } from "lucide-react";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  useEffect(() => {
    // Fire confetti on load
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff69b4', '#ffd700', '#ff1493']
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff69b4', '#ffd700', '#ff1493']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navigation />

      {/* HERO SECTION */}
      <header className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-pink-50/50 to-transparent -z-10" />
        
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="order-2 md:order-1 text-center md:text-left z-10"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="inline-block px-4 py-1 mb-4 rounded-full bg-secondary/20 text-yellow-700 font-semibold text-sm border border-secondary/30"
            >
              🎉 Celebrating 17 Years of Excellence
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-display font-bold leading-tight mb-6">
              Sri <br/>
              <span className="text-primary relative">
                Manasvini
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-secondary" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                </svg>
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
              To a graceful dancer, a fierce athlete, and a brilliant mind. May your 17th year be as extraordinary as you are.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button 
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 rounded-full bg-primary text-white font-bold text-lg shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
              >
                Explore Journey <Star className="fill-white w-5 h-5" />
              </button>
            </div>
          </motion.div>

          <div className="order-1 md:order-2 relative flex justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 blur-3xl rounded-full scale-75 animate-pulse" />
            <PhotoFrame 
              src="/images/white_dress.jpg" 
              alt="Birthday Girl" 
              className="w-[280px] md:w-[380px] z-10"
              rotate={-3}
              caption="Sweet Seventeen"
            />
            <motion.div 
              style={{ y }}
              className="absolute -bottom-10 -right-4 md:right-10 z-20 w-48 hidden md:block"
            >
              <img 
                src="/images/black_dress.jpg" 
                alt="Secondary" 
                className="rounded-lg shadow-xl border-4 border-white rotate-6"
              />
            </motion.div>
          </div>
        </div>
      </header>

      {/* ABOUT SECTION */}
      <Section id="about" className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -inset-4 border-2 border-primary/20 rounded-full animate-[spin_10s_linear_infinite]" />
            <div className="aspect-square rounded-full overflow-hidden border-8 border-white shadow-2xl relative z-10">
              <img 
                src="/images/saree_mirror.jpg" 
                alt="Traditional" 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
            </div>
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl mb-6">Meet the <span className="italic text-primary">Star</span></h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              She began her journey in California and now shines bright in North Carolina. 
              Trained under Smt. Sneha Vivek and later Smt. Karpagavalli Sai Shankar, she has grown into a graceful and disciplined performer.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Beyond her artistic grace, she possesses a sharp intellect and an athletic spirit that defies limits.
            </p>
            
            <div className="grid grid-cols-3 gap-4 mt-8">
              {[
                { label: "Dancer", icon: Sparkles },
                { label: "Athlete", icon: Trophy },
                { label: "Genius", icon: GraduationCap },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                  <item.icon className="w-8 h-8 text-secondary" />
                  <span className="font-semibold">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* DANCER SECTION */}
      <Section id="dancer" className="bg-white/50 backdrop-blur-sm rounded-[3rem] my-10 border border-white">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-widest uppercase text-sm">Grace in Motion</span>
          <h2 className="text-4xl md:text-6xl mt-2">The <span className="font-script text-6xl md:text-7xl text-primary">Dancer</span></h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-primary">
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                <Music className="text-primary" /> Bharatanatyam
              </h3>
              <p className="text-gray-600">Learning since age 2. Holder of a 4-year advanced diploma from Sri Padmavathi Mahila University (SPMVV), Tirupati.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-secondary">
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                <Star className="text-secondary" /> Bollywood
              </h3>
              <p className="text-gray-600">5 years of energetic Bollywood dance training, adding versatility to her rhythm.</p>
            </div>
          </div>
          
          <div className="lg:col-span-7 order-1 lg:order-2 flex justify-center">
            <PhotoFrame 
              src="/images/dance_classical.jpg" 
              alt="Classical Dance" 
              className="w-full max-w-md"
              caption="Devotion & Discipline"
            />
          </div>
        </div>
      </Section>

      {/* ATHLETE SECTION */}
      <Section id="athlete">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="grid grid-cols-2 gap-4">
            <img src="/images/hero_selfie.jpg" alt="Athlete" className="rounded-2xl shadow-lg mt-12" />
            <img src="/images/blue_dress_mirror.jpg" alt="Style" className="rounded-2xl shadow-lg" />
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl mb-6">The Unstoppable <br/><span className="text-secondary">Athlete</span></h2>
            <p className="text-lg text-gray-600 mb-8">
              Her determination knows no bounds. From the swimming pool to the skating rink, she dominates every arena.
            </p>
            
            <ul className="space-y-4">
              {[
                "13 Years in Swimming & Roller Skating",
                "8-Time National Skating Championship Participant",
                "4th Place National Winner (2018)",
                "Consistent Regional Champion",
                "Aiming for Olympic Swimming Cut"
              ].map((item, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="font-medium text-lg">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* GENIUS SECTION */}
      <Section id="genius" className="bg-gray-900 text-white rounded-[3rem] my-10 py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-20 bg-primary/20 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 left-0 p-20 bg-secondary/20 blur-[100px] rounded-full" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <GraduationCap className="w-16 h-16 mx-auto mb-6 text-secondary" />
          <h2 className="text-4xl md:text-6xl mb-8 font-display">Beauty with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Brains</span></h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mt-12">
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:bg-white/20 transition-colors">
              <h3 className="text-2xl font-bold mb-4 text-secondary">Mathematics Prodigy</h3>
              <p className="text-gray-300">
                Competes in Math Kangaroo since 3rd grade. consistently securing Top 20 State Ranks and Top 50 National Ranks.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:bg-white/20 transition-colors">
              <h3 className="text-2xl font-bold mb-4 text-primary">Future Leader</h3>
              <p className="text-gray-300">
                Invited to join the National Academy of Future Physicians and Medical Scientists. A bright future awaits!
              </p>
            </div>
          </div>
          
          <div className="mt-12 flex justify-center gap-4 flex-wrap">
            {["Chess (5 Years)", "Coding (3 Years)", "Robotics", "Straight A's"].map((tag) => (
              <span key={tag} className="px-6 py-2 rounded-full border border-white/20 text-sm font-medium tracking-wide">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* FAMILY & FUN */}
      <Section className="text-center">
        <h2 className="text-4xl md:text-5xl mb-12">Moments of <span className="font-script text-primary text-6xl">Joy</span></h2>
        
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          <PhotoFrame src="/images/brother_hearts.jpg" alt="Brother" caption="Best Big Sister" />
          <PhotoFrame src="/images/with_dog.jpg" alt="Dog" caption="Puppy Love" />
          <PhotoFrame src="/images/childhood_strip.jpg" alt="Childhood" />
          <PhotoFrame src="/images/brother_smile.jpg" alt="Smile" />
          <div className="bg-pink-50 p-8 rounded-2xl flex flex-col items-center justify-center h-full min-h-[300px] break-inside-avoid">
            <p className="text-2xl font-display font-bold text-primary mb-4">Fun Facts</p>
            <ul className="text-left space-y-2 text-gray-700">
              <li>😴 Loves her sleep</li>
              <li>📺 TV Series Binge-watcher</li>
              <li>📚 Avid Reader</li>
              <li>😈 Teases her brother (lovingly)</li>
            </ul>
          </div>
          <PhotoFrame src="/images/childhood_bw.jpg" alt="Growing Up" />
        </div>
      </Section>

      <footer className="py-8 text-center text-muted-foreground bg-white border-t border-gray-100">
        <p className="font-script text-2xl tracking-wide">Sri Manasvini</p>
        <p className="text-sm mt-2">Celebrating 17 Beautiful Years</p>
      </footer>
    </div>
  );
}
