import { useState, useEffect } from "react";
import { Calendar, Users, MapPin, Mail, Phone, Trophy, Github, Instagram, MessageSquare, Sparkles, Clock, CheckCircle2, XCircle, HelpCircle, Rocket, Book, Code, Target, Computer, Laptop2, GraduationCap, Facebook, Twitter, Linkedin, Menu, X } from "lucide-react";
import Logo from "./Logo";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedGlobe from './AnimatedGlobe'

const EventRegistration = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [registrationType, setRegistrationType] = useState<'opens' | 'closes'>('opens');

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const openingDate = new Date('2025-02-26T00:00:00');
    const closingDate = new Date('2025-02-27T23:59:59');

    const calculateTimeLeft = () => {
      const now = new Date();
      let targetDate = registrationType === 'opens' ? openingDate : closingDate;
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else if (registrationType === 'opens') {
        setRegistrationType('closes');
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [registrationType]);

  const getEventStatusStyle = (status: 'open' | 'closed' | 'coming-soon') => {
    switch (status) {
      case 'open':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'closed':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'coming-soon':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
    }
  };

  const socialLinks = [
    {
      name: "Discord",
      icon: MessageSquare,
      url: "https://discord.com/invite/BCBvtyPsEt",
      color: "hover:bg-[#5865F2] hover:text-purple-100"
    },
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/cbitosc",
      color: "hover:bg-[#333333] hover:text-pink-100"
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://www.instagram.com/cbitosc/",
      color: "hover:bg-[#E4405F] hover:text-purple-50"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/company/cbitosc",
      color: "hover:bg-[#0A66C2] hover:text-purple-100"
    }
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  
    // Animate sections individually
    document.querySelectorAll("section").forEach(section => {
      gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
      });
  
      // Animate elements inside each section
      const elements = section.querySelectorAll(".animate-fade-up");
      gsap.from(elements, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        },
      });
    });
  
    // Hero section animation
    gsap.from(".hero-content", {
      opacity: 0,
      y: 100,
      duration: 1.5,
      ease: "power4.out",
    });
  
    // Social links stagger animation
    gsap.from(".social-link", {
      opacity: 0,
      x: -20,
      duration: 0.5,
      stagger: 0.1,
      scrollTrigger: {
        trigger: ".social-links",
        start: "top 80%",
      },
    });
  
    // Event card hover animations
    document.querySelectorAll('[id^="event-card-"]').forEach(card => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, { scale: 1.02, y: -5, duration: 0.3, ease: "power2.out" });
      });
  
      card.addEventListener("mouseleave", () => {
        gsap.to(card, { scale: 1, y: 0, duration: 0.3, ease: "power2.out" });
      });
    });
  
    // FAQ animations
    document.querySelectorAll("details").forEach(item => {
      item.addEventListener("toggle", () => {
        const content = item.querySelector("div");
        if (item.open) {
          gsap.from(content, { height: 0, opacity: 0, duration: 0.3, ease: "power2.out" });
        }
      });
    });
  
    // Floating logo effect
    gsap.to(".logo", {
      y: -10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  
    // Clean up on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  

  return (
    <div className="min-h-screen font-sora relative overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-[#FF0096] to-[#8A2BE2]" />
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjEuNSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIi8+PC9zdmc+')] opacity-20" />

      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-3xl">
        <div className="px-2 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
          <div className="flex items-center justify-between gap-2 md:gap-8 px-[4px] mx-[8px] my-[5px]">
            <Logo />
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-1">
              {["Home", "About", "Events", "FAQ", "Contact"].map(item => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  className="px-4 py-2 text-sm text-purple-100 hover:text-white transition-colors rounded-full hover:bg-white/10"
                >
                  {item}
                </a>
              ))}
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-purple-100 hover:text-white"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 mt-2 py-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
              {["Home", "About", "Events", "FAQ", "Contact"].map(item => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  className="block px-4 py-2 text-sm text-purple-100 hover:text-white hover:bg-white/10"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>

      <section id="home" className="min-h-screen flex items-center justify-center mt-7 pt-20 pb-32 relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-2000" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left side - Text content */}
            <div className="text-center md:text-left order-1">
              <div className="inline-block px-6 py-2 rounded-full bg-white/10 text-white font-medium text-sm mb-8 animate-fade-up">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#E5DEFF]" />
                  <span className="text-sm font-semibold">
                    Registration {registrationType === 'opens' ? 'opens' : 'closes'} in: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
                  </span>
                </div>
              </div>

              <div className="max-w-4xl mx-auto md:mx-0">
                <div className="inline-block mb-4">
                  <Sparkles className="w-8 h-8 text-[#E5DEFF] animate-pulse" />
                </div>
                <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white to-[#E5DEFF] bg-clip-text text-transparent animate-fade-up">
                  OpenSys
                  
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-white/0 via-white/50 to-white/0 mx-auto mb-8" />
                  <p
  className="text-2xl md:text-3xl font-bold mb-8 animate-fade-up text-transparent bg-clip-text bg-gradient-to-r from-pink-700 via-purple-300 to-red-500 animate-gradient"
  style={{
                      animationDelay: "0.2s",
                    }}
                  >
                    Where Technology Meets Innovation
                  </p>

                  <style>
                  {`
                  @keyframes gradientShift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                  }

                  .animate-gradient {
                    background-size: 200% 200%;
                    animation: gradientShift 4s ease-in-out infinite;
                  }
                  `}
                  </style>


                <p className="text-lg mb-12 text-white/80 animate-fade-up max-w-2xl mx-auto" style={{
                animationDelay: "0.3s"
              }}>
                  Join us for an extraordinary journey into the future of technology. Connect with industry leaders, innovators, and fellow tech enthusiasts.
                </p>
                

              </div>
            </div>

            {/* Right side - Globe/Rocket - Show on both mobile and desktop */}
            <div className="block order-2 h-[600px]">
              <iframe 
                src='https://my.spline.design/rocket-d2327780366df2abab1d145b9e45954c/' 
                frameBorder='0' 
                width='100%' 
                height='100%'
                style={{ minHeight: '600px' }}
              />
            </div>
          </div>
        </div>
      </section>
      <div className="section-divider" />
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="px-4 py-1.5 rounded-full bg-white/10 text-white font-medium text-sm mb-6 inline-block backdrop-blur-md">
              Who We Are
            </span>
            <p className="text-white font-medium text-sm mb-6 backdrop-blur-md">
              Learn more about CBIT Open Source Community and our mission to foster innovation in technology.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Our Mission",
                icon: Target,
                description: "Empowering students to explore and innovate in the world of open source technology through hands-on experiences and collaborative learning."
              },
              {
                title: "Who We Are",
                icon: Users,
                description: "CBIT Open Source Community (COSC) is a student-driven tech community passionate about fostering innovation and knowledge sharing in open source development."
              },
              {
                title: "What We Do",
                icon: Code,
                description: "We organize exciting tech events, workshops, and hackathons that help students learn, create, and grow together in the open source ecosystem."
              }
            ].map((item, index) => (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-2xl animate-fade-up opacity-0"
                style={{ animationDelay: `${0.2 * index}s` }}
              >
                <div className="absolute inset-0 bg-[#8471C9]/20 backdrop-blur-md border border-white/10 transition-all duration-300" />
                <div className="relative p-8">
                  <item.icon className="w-8 h-8 text-[#E5DEFF] mb-4" />
                  <h3 className="text-xl font-semibold mb-4 text-white">{item.title}</h3>
                  <p className="text-purple-100/90">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="section-divider" />
      <section id="events" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="px-4 py-1.5 rounded-full bg-white/10 text-white font-medium text-sm mb-6 inline-block backdrop-blur-md">
              Our Events
            </span>
            <p className="text-white font-medium text-sm mb-6 backdrop-blur-md">
              Discover our exciting lineup of tech challenges, workshops, and competitions.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Git Cryptex",
                icon: Code,
                date: "26th February 2025 | 10:00 AM IST",
                location: "Main Conference Hall",
                team: "Team of 2-3 Members",
                duration: "4 Hours",
                description: "A two-stage challenge testing your Git & GitHub skills! Demonstrate version control mastery through practical scenarios and team collaboration.",
                status: 'open' as const,
                level: 'Intermediate',
                prize: "Exciting cash prizes!"
              },
              {
                title: "Decipher Challenge",
                icon: Laptop2,
                date: "27th February 2025 | 2:00 PM IST",
                location: "Auditorium B",
                team: "Solo or Team of 2",
                duration: "3 Hours",
                description: "Race against time in this thrilling scavenger hunt! Decrypt mysterious messages, solve coding puzzles, and uncover hidden patterns.",
                status: 'open' as const,
                level: "Beginner Friendly",
                prize: "Exciting cash prizes!"
              },
              {
                title: "Code Odyssey",
                icon: Rocket,
                date: "26th-27th February 2025",
                location: "Workshop Rooms 1-3",
                team: "Individual Participation",
                duration: "48-Hour Marathon",
                description: "An intensive coding marathon featuring increasingly complex challenges across multiple domains including AI, Web Development, and Algorithms.",
                status: 'open' as const,
                level: 'Advanced',
                prize: "Exciting cash prizes!"
              }
            ].map((event, index) => (
              <div
                key={event.title}
                id={`event-card-${index}`}
                className="group relative overflow-hidden rounded-2xl animate-fade-up opacity-0 bg-gradient-to-b from-[#8471C9]/20 to-[#8471C9]/10 backdrop-blur-md border border-white/10"
                style={{ animationDelay: `${0.2 * index}s` }}
              >
                <div className="relative p-6 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <event.icon className="w-8 h-8 text-[#E5DEFF]" />
                    <div className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400 border border-green-500/30">
                      Registration Open
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-2 text-white">{event.title}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm font-semibold text-[#E5DEFF]">{event.level}</span>
                    <span className="text-white/50">•</span>
                    <span className="text-sm text-white/70">{event.duration}</span>
                  </div>

                  <p className="text-white/80 mb-4 flex-grow">{event.description}</p>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-white/70">
                      <Calendar className="w-4 h-4 flex-shrink-0" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/70">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/70">
                      <Users className="w-4 h-4 flex-shrink-0" />
                      <span>{event.team}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/70">
                      <Trophy className="w-4 h-4 flex-shrink-0" />
                      <span className="font-medium text-[#E5DEFF]">{event.prize}</span>
                    </div>
                  </div>
                  
                  <div className="mt-auto">
                    <button 
                      className="w-full py-2.5 rounded-full bg-[#E5DEFF] text-[#7E69AB] hover:bg-white hover:scale-[1.02] transition-all duration-300 font-medium"
                    >
                      Register Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="section-divider" />
      <section id="faq" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="px-4 py-1.5 rounded-full bg-white/10 text-white font-medium text-sm mb-6 inline-block backdrop-blur-md">
              Questions & Answers
            </span>
            <p className="text-white font-medium text-sm mb-6 backdrop-blur-md">
              Find answers to common questions about OpenSys 2025 and how to participate.
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "What is OpenSys?",
                a: "OpenSys is CBIT's premier open source technology symposium bringing together students, developers, and tech enthusiasts for learning, networking, and innovation."
              },
              {
                q: "When and where is it happening?",
                a: "The events will take place on February 26-27, 2025, at various venues within Chaitanya Bharathi Institute of Technology."
              },
              {
                q: "How can I register for the events?",
                a: "You can register for individual events using the 'Register Now' buttons on each event card. Make sure to complete the registration before the deadline."
              },
              {
                q: "Do I need any prior experience?",
                a: "While basic programming knowledge is helpful, many events are designed for beginners. Each event description includes specific prerequisites."
              },
              {
                q: "Are there any prizes?",
                a: "Yes! Each event has exciting prizes for winners, including cash prizes and participation certificates!"
              },
              {
                q: "Can I participate in multiple events?",
                a: "Yes, you can participate in multiple events as long as their schedules don't overlap. Check the detailed schedule to plan accordingly."
              }
            ].map((faq, index) => (
              <details 
                key={index}
                className="group relative overflow-hidden rounded-xl"
              >
                <summary className="relative bg-[#8471C9]/20 backdrop-blur-md border border-white/10 p-6 cursor-pointer list-none">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-purple-100 pr-6">{faq.q}</h3>
                    <span className="absolute right-6 transition-transform duration-300 group-open:rotate-180">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </div>
                </summary>
                <div className="bg-[#8471C9]/10 backdrop-blur-md border-t-0 border border-white/10 p-6 text-purple-100/90">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
      <div className="section-divider" />
      <section id="contact" className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="px-4 py-1.5 rounded-full bg-white/10 text-white font-medium text-sm mb-6 inline-block backdrop-blur-md">
              Get in Touch
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Contact Us
            </h2>
            <p className="text-white/80">
              Have questions? We're here to help you with any queries about OpenSys 2025.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-8">
                <div className="group relative overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 bg-[#8471C9]/20 backdrop-blur-md border border-white/10 transition-all duration-300" />
                  <div className="relative p-8 space-y-6">
                    <div className="flex items-start gap-4">
                      <Mail className="w-6 h-6 text-[#E5DEFF] shrink-0" />
                      <div>
                        <h3 className="font-bold text-white mb-1">Email</h3>
                        <a 
                          href="mailto:cosc@cbit.ac.in" 
                          className="text-purple-100/90 hover:text-pink-200 transition-colors"
                        >
                          cosc@cbit.ac.in
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Phone className="w-6 h-6 text-[#E5DEFF] shrink-0" />
                      <div>
                        <h3 className="font-bold text-white mb-1">Contact</h3>
                        <div className="space-y-1">
                          <a href="tel:+919542590164" className="block text-white/80 hover:text-[#E5DEFF] transition-colors">
                            Muzaffar: +91 95425 90164
                          </a>
                          <a href="tel:+919052812005" className="block text-white/80 hover:text-[#E5DEFF] transition-colors">
                            Imaduddin: +91 90528 12005
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <MapPin className="w-6 h-6 text-[#E5DEFF] shrink-0" />
                      <div>
                        <h3 className="font-bold text-white mb-1">Location</h3>
                        <a 
                          href="https://maps.google.com/?q=CBIT+Hyderabad" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-white/80 hover:text-[#E5DEFF] transition-colors"
                        >
                          Chaitanya Bharathi Institute of Technology<br />
                          Gandipet, Hyderabad - 500075
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl">
                <div className="absolute inset-0 bg-[#8471C9]/20 backdrop-blur-md border border-white/10 transition-all duration-300" />
                <div className="relative p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Connect With Us</h3>
                  <div className="social-links grid grid-cols-2 gap-4 mb-8">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 
                                  bg-white/10 hover:bg-white/20 text-white transition-all duration-300
                                  ${social.color}`}
                      >
                        <social.icon className="w-5 h-5" />
                        <span>{social.name}</span>
                      </a>
                    ))}
                  </div>
                  <p className="text-white/80">
                    Follow us for the latest updates and announcements about OpenSys 2025!
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-white mb-4">Related Links</h3>
                <div className="flex flex-wrap justify-center gap-4">
                  <a
                    href="https://cbit.ac.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-100/80 hover:text-pink-200 transition-colors"
                  >
                    CBIT
                  </a>
                  <a
                    href="https://cbitosc.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-[#E5DEFF] transition-colors"
                  >
                    COSC Official Website
                  </a>
                  <a
                    href="https://cbit-hacktoberfest24.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-[#E5DEFF] transition-colors"
                  >
                    HacktoberFest'24
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="section-divider" />
      <footer className="py-12 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center">
            <Logo />
            <p className="mt-6 text-purple-100/60 text-sm">
              COPYRIGHT © 2025 COSC. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EventRegistration;
