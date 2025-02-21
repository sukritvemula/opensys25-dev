import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import CountdownTimer from '../components/CountdownTimer';
import EventCard from '../components/EventCard';
import { 
  MessageCircle, 
  Github, 
  Instagram, 
  Linkedin 
} from 'lucide-react';

const Index = () => {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  
  // Refs for scroll functionality
  const aboutRef = useRef<HTMLElement>(null);
  const eventsRef = useRef<HTMLElement>(null);
  const faqRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const scrollToSection = (sectionRef: React.RefObject<HTMLElement>) => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const interBubble = document.querySelector<HTMLDivElement>('.interactive');
    if (!interBubble) return;

    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    function move() {
      curX += (tgX - curX) / 20;
      curY += (tgY - curY) / 20;
      interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
      requestAnimationFrame(move);
    }

    const handleMouseMove = (event: MouseEvent) => {
      tgX = event.clientX;
      tgY = event.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    move();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const eventData = [
    {
      title: "MazerLift",
      level: "Intermediate",
      duration: "4 Hours",
      description: "A two-stage challenge testing your Git & GitHub skills! Demonstrate version control mastery through practical scenarios and team collaboration.",
      date: "4th March 2025",
      venue: "Main Conference Hall",
      team: "Team of 2-3 Members",
      prizes: "Exciting cash prizes!",
      registrationLink: "https://google.com"
    },
    {
      title: "Decipher Challenge",
      level: "Beginner Friendly",
      duration: "3 Hours",
      description: "Race against time in this thrilling scavenger hunt! Decrypt mysterious messages, solve coding puzzles, and uncover hidden patterns.",
      date: "5th March 2025",
      venue: "Auditorium B",
      team: "Solo or Team of 2",
      prizes: "Exciting cash prizes!",
      registrationLink: "https://youtube.com"
    },
    {
      title: "Code Odyssey",
      level: "Advanced",
      duration: "48-Hour Marathon",
      description: "An intensive coding marathon featuring increasingly complex challenges across multiple domains including AI, Web Development, and Algorithms.",
      date: "4th-5th March 2025",
      venue: "Workshop Rooms 1-3",
      team: "Individual Participation",
      prizes: "Exciting cash prizes!",
      registrationLink: "https://github.com"
    }
  ];

  const faqData = [
    {
      question: 'What is OpenSys?',
      answer: 'OpenSys is CBIT\'s premier open source technology symposium bringing together students, developers, and tech enthusiasts for learning, networking, and innovation.',
    },
    {
      question: 'When and where will OpenSys take place?',
      answer: 'The events will take place on February 26-27, 2025, at various venues within Chaitanya Bharathi Institute of Technology.',
    },
    {
      question: 'Is this event open for beginners?',
      answer: 'Whether you\'re a beginner, professional, or simply someone who is passionate about open-source software, there\'s something for everyone at OpenSys.',
    },
    {
      question: 'Is there a cost to attend OpenSys?',
      answer: 'No, the events are absolutely free and open to everyone.',
    },
  ];

  const socialLinks = [
    {
      name: 'Discord',
      icon: MessageCircle,
      href: 'https://discord.com/invite/BCBvtyPsEt',
      hoverClass: 'hover:bg-[#333]/20 hover:text-white hover:shadow-white/20'
    },
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com/cbitosc',
      hoverClass: 'hover:bg-[#333]/20 hover:text-white hover:shadow-white/20'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      href: 'https://www.instagram.com/cbitosc/',
      hoverClass: 'hover:bg-[#333]/20 hover:text-white hover:shadow-white/20'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://www.linkedin.com/company/cbitosc',
      hoverClass: 'hover:bg-[#333]/20 hover:text-white hover:shadow-white/20'
    }
  ];

  return (
    <div className="min-h-screen relative">
      <div className="mesh-gradient">
        <svg xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
        <div className="gradients-container">
          <div className="g1"></div>
          <div className="g2"></div>
          <div className="g3"></div>
          <div className="g4"></div>
          <div className="interactive"></div>
        </div>
      </div>
      
      <div className="relative z-10">
        <Navbar onNavigate={{
          about: () => scrollToSection(aboutRef),
          events: () => scrollToSection(eventsRef),
          faq: () => scrollToSection(faqRef),
          contact: () => scrollToSection(contactRef),
        }} />
        
        <header className="text-center py-20">
          <div className="space-y-2">
            <h1 className="text-7xl md:text-8xl font-bold text-white font-clash tracking-tight">OpenSys</h1>
            <p className="text-lg text-gray-300 font-sora">The Open-Source Symposium</p>
          </div>
          <div className="mt-8">
            <CountdownTimer/>
          </div>
        </header>

        <section ref={aboutRef} className="container mx-auto py-20 px-4">
          <h2 className="text-3xl font-bold text-white mb-8 text-center font-clash">About the Event</h2>
          <div className="text-gray-300 text-center max-w-3xl mx-auto leading-relaxed font-sora space-y-6">
            <p>
              OpenSys is an amalgamation of multiple events that are designed to give you the best competitive experience all while being fun and enjoyable.
            </p>
            <p>
              Since we are the <span className="bg-purple-500/20 text-purple-200 px-2 rounded-md">open source community</span> of CBIT, all the events will be <span className="bg-purple-500/20 text-purple-200 px-2 rounded-md">completely free</span> for everyone to participate and you also stand a chance to win <span className="bg-purple-500/20 text-purple-200 px-2 rounded-md">exciting cash prizes</span>. See you there!
            </p>
          </div>
        </section>

        <section ref={eventsRef} className="container mx-auto py-20 px-4">
          <h2 className="text-3xl font-bold text-white mb-12 text-center font-clash">Our Events</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {eventData.map((event, index) => (
              <EventCard key={index} {...event} />
            ))}
          </div>
        </section>

        <section ref={faqRef} className="container mx-auto py-20 px-4">
          <h2 className="text-3xl font-bold text-white mb-12 text-center font-clash">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="glass-card rounded-lg overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left text-white font-medium flex justify-between items-center"
                  onClick={() => setActiveAccordion(activeAccordion === index ? null : index)}
                >
                  {faq.question}
                  <span className={`transform transition-transform duration-200 ${
                    activeAccordion === index ? 'rotate-180' : ''
                  }`}>▼</span>
                </button>
                {activeAccordion === index && (
                  <div className="px-6 py-4 text-gray-300">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section ref={contactRef} className="container mx-auto py-20 px-4">
          <h2 className="text-3xl font-bold text-white mb-12 text-center font-clash">Get in Touch</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="glass-card p-6 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-4">Contact Us</h3>
              <div className="space-y-2">
                <p className="text-gray-300">Email: cosc@cbit.ac.in</p>
                <p className="text-gray-300">Muzaffar: +91 95425 90164</p>
                <p className="text-gray-300">Imaduddin: +91 90528 12005</p>
              </div>
            </div>
            <div className="glass-card p-6 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-4">Follow Us</h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className={`glass-card px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300 hover:shadow-lg text-white ${social.hoverClass}`}
                  >
                    <social.icon className="w-4 h-4" />
                    <span className="text-sm font-sora">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="py-8 px-4 text-center">
          <p className="text-gray-400">COPYRIGHT © 2025 COSC. ALL RIGHTS RESERVED.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
