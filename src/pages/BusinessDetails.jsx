// import React, { useEffect, useState, useRef } from "react";
// import { MapPin, Clock, Phone, Mail, Facebook, Instagram, Linkedin, Twitter, ChevronDown, Star } from "lucide-react";
// import { useNavigate,Link } from "react-router-dom";



// /* --- UTILITY COMPONENT FOR SCROLL ANIMATIONS --- */
// const FadeIn = ({ children, delay = 0, className = "" }) => {
//   const [isVisible, setIsVisible] = useState(false);
//   const domRef = useRef();

//   useEffect(() => {
//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//           observer.unobserve(entry.target);
//         }
//       });
//     });
//     if (domRef.current) observer.observe(domRef.current);
//     return () => observer.disconnect();
//   }, []);

//   return (
//     <div
//       ref={domRef}
//       className={`transition-all duration-1000 transform ${
//         isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
//       } ${className}`}
//       style={{ transitionDelay: `${delay}ms` }}
//     >
//       {children}
//     </div>
//   );
// };

// export default function BusinessDetails() {
//   // Stats Logic
//   const [counted, setCounted] = useState([0, 0, 0, 0]);
//   const statsRef = useRef(null);
//   const statsStarted = useRef(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (statsRef.current && !statsStarted.current) {
//         const top = statsRef.current.getBoundingClientRect().top;
//         if (top < window.innerHeight) {
//           statsStarted.current = true;
//           const statsTarget = [1200, 8, 65, 15]; // Added a 4th stat
//           statsTarget.forEach((value, idx) => {
//             let start = 0;
//             const duration = 2000;
//             const increment = Math.ceil(value / (duration / 20));
//             const interval = setInterval(() => {
//               start += increment;
//               if (start >= value) {
//                 start = value;
//                 clearInterval(interval);
//               }
//               setCounted((prev) => {
//                 const newArr = [...prev];
//                 newArr[idx] = start;
//                 return newArr;
//               });
//             }, 20);
//           });
//         }
//       }
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // --- DATA ---
//   const timeline = [
//     { year: "2024", title: "Humble Beginnings", desc: "Started as a small pop-up stall in the local farmers market." },
//     { year: "2025", title: "First Store", desc: "Opened our first flagship store downtown amidst challenging times." },
//     { year: "2026", title: "Expansion", desc: "we will Launch 3 new locations and introduce our organic soda line." },
//     { year: "2027", title: "Going National", desc: "will be Started shipping our bottled products nationwide." },
//   ];

//   const products = [
//     { name: "Vanilla & straw berry Shake", price: "Rs650", desc: "Made with organic Madagascar vanilla strawberry bean.", img: "https://i.pinimg.com/474x/d4/84/20/d4842038272fca18482f8d8805a88b99.jpg" },
//     { name: "Berry Blast thick shake", price: "Rs900", desc: "Sparkling soda infused with real strawberries and raspberries.", img: "https://thumbs.dreamstime.com/z/captivating-nighttime-fruit-milkshake-visual-symphony-sweetness-shadows-pristine-white-background-exquisite-image-367359848.jpg" },
//     { name: "Midnight Mint", price: "Rs700", desc: "Dark chocolate milkshake with a hint of fresh mint.", img: "https://www.shutterstock.com/image-photo/chocolate-milkshake-ice-cream-whipped-260nw-667618195.jpg" },
//   ];

//   const teamMembers = [
//     { name: "Hariprasath", role: "Founder & CEO", image: "https://flexible-salmon-ssqjqycrkl-8lk19sxu4z.edgeone.dev/hari%20img.png" },
//     { name: "Vijitha", role: "Head of Production", image: "https://intermediate-chocolate-4obpfdxdn9-6w8ivfnjxd.edgeone.dev/WhatsApp%20Image%202025-11-13%20at%2010.03.58%20PM.jpeg" },
//     { name: "Clara Lee", role: "Marketing Manager", image: "https://randomuser.me/api/portraits/women/65.jpg" },
//   ];

//   const stats = [
//     { title: "Happy Customers", value: 1200 },
//     { title: "Years Served", value: 8 },
//     { title: "Team Members", value: 65 },
//     { title: "Awards Won", value: 15 },
//   ];

//   return (
//     <div className="font-sans text-gray-800">
//       {/* BACKGROUNDS */}
//       <div className="fixed inset-0 opacity-[0.04] pointer-events-none z-[0]" style={{ backgroundImage: `url("https://lh5.googleusercontent.com/proxy/-Ql87aj4ncu7ftHATMlvlMCQGCQyZr2ImdORINowHys02yqFOUnrionntO31Eu5NLnyorcYSftKmRenFEBiNZ4ym7SWlDn38ls0hEK8zLf-wksgFn8o")` }}></div>
     
     

      
//       {/* --- HERO SECTION --- */}
//       <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
//         <div className="absolute inset-0 z-0">
//           <img 
//             src="https://t4.ftcdn.net/jpg/17/66/75/07/360_F_1766750758_AAIT1tAz7ntBvAsmsqTgeQVSxQkjqKRg.jpg"
//             alt="Hero Background" 
//             className="w-full h-full object-cover filter rounded-[1rem] brightness-50"
//           />
//         </div>
//         <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
//           <FadeIn>
//             <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">Milk & Soda</h1>
//             <p className="text-xl md:text-2xl mb-8 font-light text-gray-200">
//               Crafting moments of joy, one sip at a time.
//             </p>
//             <Link to="/products">
//             <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition duration-300 shadow-lg transform hover:scale-105">
//               View Our Menu
//             </button>
//             </Link>
//           </FadeIn>
//         </div>
//         <div className="absolute bottom-10 w-full flex justify-center animate-bounce text-white">
//           <ChevronDown size={32} />
//         </div>
//       </div>

//       {/* --- MAIN CONTAINER --- */}
//       <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col gap-24">

//         {/* --- MISSION & VISION --- */}
//         <div className="grid md:grid-cols-2 gap-12 items-center">
//           <FadeIn>
//             <img
//               src="https://images.unsplash.com/photo-1586917049334-0f99406d8a6e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWlsayUyMHNoYWtlfGVufDB8fDB8fHww"
//               alt="Pouring Milk"
//               className="rounded-xl shadow-2xl rotate-2 hover:rotate-0 transition duration-500"
//             />
//           </FadeIn>
//           <div className="space-y-8">
//             <FadeIn delay={200}>
//               <h2 className="text-4xl font-bold text-blue-900">Our Mission</h2>
//               <p className="mt-4 text-lg text-gray-600 leading-relaxed">
//                 To provide fresh, organic, and locally sourced milk-based beverages and artisanal sodas that not only taste amazing but bring our community together.
//               </p>
//             </FadeIn>
//             <FadeIn delay={400}>
//               <h2 className="text-4xl font-bold text-blue-900">Our Vision</h2>
//               <p className="mt-4 text-lg text-gray-600 leading-relaxed">
//                 To define the future of casual refreshments by blending traditional recipes with modern flavors, creating smiles in every city we touch.
//               </p>
//             </FadeIn>
//           </div>
//         </div>

//         {/* --- CORE VALUES --- */}
//         <div className="bg-blue-50 p-12 rounded-3xl">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold text-blue-900">Our Core Values</h2>
//           </div>
//           <div className="grid md:grid-cols-3 gap-8">
//             {[
//               { title: "Sustainability", desc: "Eco-friendly packaging and sourcing.", icon: "🌱" },
//               { title: "Quality", desc: "Zero preservatives, 100% flavor.", icon: "✨" },
//               { title: "Community", desc: "We give back 5% of profits to local charities.", icon: "🤝" },
//             ].map((val, idx) => (
//               <FadeIn key={idx} delay={idx * 200} className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow text-center">
//                 <div className="text-5xl mb-4">{val.icon}</div>
//                 <h3 className="text-xl font-bold mb-2">{val.title}</h3>
//                 <p className="text-gray-600">{val.desc}</p>
//               </FadeIn>
//             ))}
//           </div>
//         </div>

//         {/* --- HISTORY TIMELINE --- */}
//         <div>
//           <h2 className="text-4xl font-bold text-center mb-12 text-blue-900">Our Journey</h2>
//           <div className="relative border-l-4 border-blue-200 ml-6 md:ml-1/2 space-y-12">
//             {timeline.map((item, index) => (
//               <FadeIn key={index} className="relative pl-8 md:pl-12">
//                 <div className="absolute -left-[1.35rem] top-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold border-4 border-white shadow">
//                   {index + 1}
//                 </div>
//                 <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
//                   <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">{item.year}</span>
//                   <h3 className="text-xl font-bold mt-1 mb-2">{item.title}</h3>
//                   <p className="text-gray-600">{item.desc}</p>
//                 </div>
//               </FadeIn>
//             ))}
//           </div>
//         </div>

//         {/* --- FEATURED MENU --- */}
//         <div>
//           <h2 className="text-4xl font-bold text-center mb-4 text-blue-900">Customer Favorites</h2>
//           <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Only In Our Local Store Only</p>
//           <div className="grid md:grid-cols-3 gap-8">
//             {products.map((prod, idx) => (
//               <FadeIn key={idx} delay={idx * 100} className="group">
//                 <div className="overflow-hidden rounded-t-xl">
//                   <img 
//                     src={prod.img} 
//                     alt={prod.name} 
//                     className="w-full h-48 object-cover transform group-hover:scale-110 transition duration-500"
//                   />
//                 </div>
//                 <div className="bg-white border border-t-0 border-gray-200 p-6 rounded-b-xl shadow-sm group-hover:shadow-md transition">
//                   <div className="flex justify-between items-center mb-2">
//                     <h3 className="font-bold text-lg">{prod.name}</h3>
//                     <span className="text-blue-600 font-bold">{prod.price}</span>
//                   </div>
//                   <p className="text-gray-600 text-sm">{prod.desc}</p>
//                 </div>
//               </FadeIn>
//             ))}
//           </div>
//         </div>

//         {/* --- STATS SECTION --- */}
//         <div ref={statsRef} className="bg-blue-900 text-white rounded-3xl p-12">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-blue-700">
//             {stats.map((s, idx) => (
//               <div key={idx} className="p-2">
//                 <p className="text-4xl md:text-5xl font-bold mb-2">{counted[idx]}+</p>
//                 <p className="text-blue-200 text-sm uppercase tracking-wide">{s.title}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* --- MEET THE TEAM --- */}
//         <div>
//           <h2 className="text-4xl font-bold text-center mb-12 text-blue-900">The Minds Behind the Shakes</h2>
//           <div className="grid md:grid-cols-3 gap-8">
//             {teamMembers.map((member, index) => (
//               <FadeIn key={index} delay={index * 150} className="bg-white rounded-xl shadow-lg overflow-hidden text-center group">
//                  <div className="relative w-full aspect-square overflow-hidden rounded-xl">
//         <img
//           src={member.image}
//           alt={member.name}
//           className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
//         />
//                   <div className="absolute inset-0 bg-blue-900 bg-opacity-0 group-hover:bg-opacity-20 transition duration-300 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100">
//                     <button className="bg-white p-2 rounded-full text-blue-600 hover:bg-blue-600 hover:text-white transition"><Linkedin size={20}/></button>
//                     <button className="bg-white p-2 rounded-full text-blue-400 hover:bg-blue-400 hover:text-white transition"><Twitter size={20}/></button>
//                   </div>
//                 </div>
//                 <div className="p-6">
//                   <h3 className="font-bold text-xl text-gray-800">{member.name}</h3>
//                   <p className="text-blue-600 font-medium">{member.role}</p>
//                 </div>
//               </FadeIn>
//             ))}
//           </div>
//         </div>
// {/* --- TESTIMONIALS --- */}
// <div className="bg-gray-50 p-12 rounded-3xl -mx-6 md:mx-0">
//   <h2 className="text-4xl font-bold text-center mb-12 text-blue-900">
//     What They Say
//   </h2>

//   <div className="grid md:grid-cols-3 gap-6">
//     {[
//       {
//         name: "Vijitha",
//         role: "Regular Customer",
//         comment:
//           "Absolutely love the freshness and taste. The shakes are always consistent and incredibly flavorful!",
//         image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
//       },
//       {
//         name: "Nirmal Silva",
//         role: "Daily Visitor",
//         comment:
//           "Great service, cozy atmosphere, and the drinks are top-tier. I recommend Milk Soda to everyone!",
//         image: "https://st.depositphotos.com/1000824/1878/i/450/depositphotos_18783257-stock-photo-closeup-portrait-of-a-happy.jpg",
//       },
//       {
//         name: "Anjali Fernando",
//         role: "Health Enthusiast",
//         comment:
//           "Natural ingredients, great blends, and perfect sweetness. This is my go-to place after workouts!",
//         image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
//       },
//     ].map((user, i) => (
//       <FadeIn key={i} delay={i * 100} className="bg-white p-8 rounded-xl shadow-sm">
//         {/* Stars */}
//         <div className="flex text-yellow-400 mb-4">
//           {[...Array(5)].map((_, s) => (
//             <Star key={s} size={16} fill="currentColor" />
//           ))}
//         </div>

//         {/* Comment */}
//         <p className="text-gray-600 italic mb-6">"{user.comment}"</p>

//         {/* User Profile */}
//         <div className="flex items-center gap-4">
//           <img
//             src={user.image}
//             alt={user.name}
//             className="w-10 h-10 object-cover rounded-full bg-gray-200"
//           />
//           <div>
//             <p className="font-bold text-sm">{user.name}</p>
//             <p className="text-xs text-gray-500">{user.role}</p>
//           </div>
//         </div>
//       </FadeIn>
//     ))}
//   </div>
// </div>


//         {/* --- INFO & LOCATION --- */}
//         <div className="grid md:grid-cols-2 gap-8">
//             {/* Map / Image Placeholder */}
//             <FadeIn className="h-full min-h-[400px] bg-gray-200 rounded-2xl overflow-hidden relative">
//                 <img 
//                     src="https://i0.wp.com/amazinglanka.com/wp/wp-content/uploads/2023/10/devalagodella.jpg?resize=768%2C432&ssl=1"
//                     alt="Shop Interior"
//                     className="w-full h-full object-cover"
//                 />
//                 <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
//                     <p className="text-white font-bold text-xl border-2 border-white px-6 py-2">View on Google Maps</p>
//                 </div>
//             </FadeIn>

//             {/* Contact Details */}
//             <FadeIn className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col justify-center">
//                 <h3 className="text-2xl font-bold mb-6 text-blue-900">Visit Us Today</h3>
                
//                 <div className="space-y-6">
//                     <div className="flex items-start gap-4">
//                         <div className="bg-blue-100 p-3 rounded-lg text-blue-600"><MapPin size={24} /></div>
//                         <div>
//                             <p className="font-bold">Headquarters</p>
//                             <p className="text-gray-600">455 Thirunagar south,Kilinochchi,<br/>Srilanka</p>
//                         </div>
//                     </div>

//                     <div className="flex items-start gap-4">
//                         <div className="bg-green-100 p-3 rounded-lg text-green-600"><Clock size={24} /></div>
//                         <div>
//                             <p className="font-bold">Opening Hours</p>
//                             <p className="text-gray-600">Mon - Fri: 8am - 8pm</p>
//                             <p className="text-gray-600">Sat - Sun: 10am - 10pm</p>
//                         </div>
//                     </div>

//                     <div className="flex items-start gap-4">
//                         <div className="bg-orange-100 p-3 rounded-lg text-orange-600"><Phone size={24} /></div>
//                         <div>
//                             <p className="font-bold">Contact</p>
//                             <p className="text-gray-600">+94 742198128</p>
//                             <p className="text-gray-600">Hariprasathh564@examples.com</p>
//                         </div>
//                     </div>
//                 </div>
//             </FadeIn>
//         </div>






//       </div>

//       {/* --- FOOTER --- */}
//       <footer className="bg-gray-900 text-gray-400 py-12 text-center">
//         <p className="mb-4">&copy; 2024 Milk & Soda Inc. All rights reserved.</p>
//         <div className="flex justify-center gap-6 text-sm">
//             <a href="#" className="hover:text-white transition">Privacy Policy</a>
//             <a href="#" className="hover:text-white transition">Terms of Service</a>
//             <a href="#" className="hover:text-white transition">Careers</a>
//         </div>
//       </footer>

//     </div>
//   );
// }






// import React, { useEffect, useState, useRef } from "react";
// import { MapPin, Clock, Phone, Mail, Facebook, Instagram, Linkedin, Twitter, ChevronDown, Star } from "lucide-react";
// import { useNavigate, Link } from "react-router-dom";

// /* --- UTILITY COMPONENT FOR SCROLL ANIMATIONS --- */
// const FadeIn = ({ children, delay = 0, className = "" }) => {
//   const [isVisible, setIsVisible] = useState(false);
//   const domRef = useRef();

//   useEffect(() => {
//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//           observer.unobserve(entry.target);
//         }
//       });
//     });
//     if (domRef.current) observer.observe(domRef.current);
//     return () => observer.disconnect();
//   }, []);

//   return (
//     <div
//       ref={domRef}
//       className={`transition-all duration-1000 transform ${
//         isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
//       } ${className}`}
//       style={{ transitionDelay: `${delay}ms` }}
//     >
//       {children}
//     </div>
//   );
// };

// /* --- CONTACT FORM COMPONENT --- */
// const NeonContactForm = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     message: "",
//   });

//   const [response, setResponse] = useState(""); // To show user feedback

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Simulate sending message (replace with real API call)
//     setTimeout(() => {
//       setResponse(
//         `Thanks ${formData.firstName}! Your message has been sent successfully 🥛✨`
//       );

//       // Optional: clear form
//       setFormData({ firstName: "", lastName: "", email: "", message: "" });
//     }, 1000);
//   };

//   return (
//     <div className="bg-black/0 p-8 md:p-16 rounded-3xl text-white relative">
//       <form className="space-y-4" onSubmit={handleSubmit}>
//         <div className="grid grid-cols-2 gap-4">
//           <input
//             type="text"
//             name="firstName"
//             placeholder="First Name"
//             value={formData.firstName}
//             onChange={handleChange}
//             className="bg-black/50 border-none rounded-xl p-3 placeholder-cyan-200 w-full focus:ring-2 focus:ring-cyan-400 outline-none transition"
//           />
//           <input
//             type="text"
//             name="lastName"
//             placeholder="Last Name"
//             value={formData.lastName}
//             onChange={handleChange}
//             className="bg-black/50 border-none rounded-xl p-3 placeholder-cyan-200 w-full focus:ring-2 focus:ring-cyan-400 outline-none transition"
//           />
//         </div>
//         <input
//           type="email"
//           name="email"
//           placeholder="Email Address"
//           value={formData.email}
//           onChange={handleChange}
//           className="bg-black/50 border-none rounded-xl p-3 placeholder-cyan-200 w-full focus:ring-2 focus:ring-cyan-400 outline-none transition"
//         />
//         <textarea
//           rows="4"
//           name="message"
//           placeholder="Your Message"
//           value={formData.message}
//           onChange={handleChange}
//           className="bg-black/50 border-none rounded-xl p-3 placeholder-cyan-200 w-full focus:ring-2 focus:ring-cyan-400 outline-none transition"
//         ></textarea>

//         <button className="w-full md:w-auto bg-cyan-400 text-black font-bold py-3 px-8 rounded-full hover:scale-105 hover:shadow-[0_0_30px_#00eaff] transition-all">
//           Send Message
//         </button>
//       </form>

//       {response && (
//         <p className="mt-4 text-green-400 font-semibold">{response}</p>
//       )}
//     </div>
//   );
// };

// /* --- MAIN COMPONENT --- */
// export default function BusinessDetails() {
//   // Stats Logic
//   const [counted, setCounted] = useState([0, 0, 0, 0]);
//   const statsRef = useRef(null);
//   const statsStarted = useRef(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (statsRef.current && !statsStarted.current) {
//         const top = statsRef.current.getBoundingClientRect().top;
//         if (top < window.innerHeight) {
//           statsStarted.current = true;
//           const statsTarget = [1200, 8, 65, 15];
//           statsTarget.forEach((value, idx) => {
//             let start = 0;
//             const duration = 2000;
//             const increment = Math.ceil(value / (duration / 20));
//             const interval = setInterval(() => {
//               start += increment;
//               if (start >= value) {
//                 start = value;
//                 clearInterval(interval);
//               }
//               setCounted((prev) => {
//                 const newArr = [...prev];
//                 newArr[idx] = start;
//                 return newArr;
//               });
//             }, 20);
//           });
//         }
//       }
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // --- DATA ---
//   const timeline = [
//     { year: "2024", title: "Humble Beginnings", desc: "Started as a small pop-up stall in the local farmers market." },
//     { year: "2025", title: "First Store", desc: "Opened our first flagship store downtown amidst challenging times." },
//     { year: "2026", title: "Expansion", desc: "we will Launch 3 new locations and introduce our organic soda line." },
//     { year: "2027", title: "Going National", desc: "will be Started shipping our bottled products nationwide." },
//   ];

//   const products = [
//     { name: "Vanilla & straw berry Shake", price: "Rs650", desc: "Made with organic Madagascar vanilla strawberry bean.", img: "https://i.pinimg.com/474x/d4/84/20/d4842038272fca18482f8d8805a88b99.jpg" },
//     { name: "Berry Blast thick shake", price: "Rs900", desc: "Sparkling soda infused with real strawberries and raspberries.", img: "https://thumbs.dreamstime.com/z/captivating-nighttime-fruit-milkshake-visual-symphony-sweetness-shadows-pristine-white-background-exquisite-image-367359848.jpg" },
//     { name: "Midnight Mint", price: "Rs700", desc: "Dark chocolate milkshake with a hint of fresh mint.", img: "https://www.shutterstock.com/image-photo/chocolate-milkshake-ice-cream-whipped-260nw-667618195.jpg" },
//   ];

//   const teamMembers = [
//     { name: "Hariprasath", role: "Founder & CEO", image: "https://flexible-salmon-ssqjqycrkl-8lk19sxu4z.edgeone.dev/hari%20img.png" },
//     { name: "Vijitha", role: "Head of Production", image: "https://intermediate-chocolate-4obpfdxdn9-6w8ivfnjxd.edgeone.dev/WhatsApp%20Image%202025-11-13%20at%2010.03.58%20PM.jpeg" },
//     { name: "Clara Lee", role: "Marketing Manager", image: "https://randomuser.me/api/portraits/women/65.jpg" },
//   ];

//   const stats = [
//     { title: "Happy Customers", value: 1200 },
//     { title: "Years Served", value: 8 },
//     { title: "Team Members", value: 65 },
//     { title: "Awards Won", value: 15 },
//   ];

//   const navigate = useNavigate();

//   return (
//     <div className="font-sans text-gray-800">
//       {/* BACKGROUNDS */}
//       <div className="fixed inset-0 opacity-[0.04] pointer-events-none z-[0]" style={{ backgroundImage: `url("https://lh5.googleusercontent.com/proxy/-Ql87aj4ncu7ftHATMlvlMCQGCQyZr2ImdORINowHys02yqFOUnrionntO31Eu5NLnyorcYSftKmRenFEBiNZ4ym7SWlDn38ls0hEK8zLf-wksgFn8o")` }}></div>

//       {/* --- HERO SECTION --- */}
//       <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
//         <div className="absolute inset-0 z-0">
//           <img 
//             src="https://t4.ftcdn.net/jpg/17/66/75/07/360_F_1766750758_AAIT1tAz7ntBvAsmsqTgeQVSxQkjqKRg.jpg"
//             alt="Hero Background" 
//             className="w-full h-full object-cover filter rounded-[1rem] brightness-50"
//           />
//         </div>
//         <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
//           <FadeIn>
//             <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">Milk & Soda</h1>
//             <p className="text-xl md:text-2xl mb-8 font-light text-gray-200">
//               Crafting moments of joy, one sip at a time.
//             </p>
//             <button
//               onClick={() => navigate("/products")}
//               className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition duration-300 shadow-lg transform hover:scale-105"
//             >
//               View Our Menu
//             </button>
//           </FadeIn>
//         </div>
//         <div className="absolute bottom-10 w-full flex justify-center animate-bounce text-white">
//           <ChevronDown size={32} />
//         </div>
//       </div>

//       {/* --- MAIN CONTAINER --- */}
//       <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col gap-24">
//         {/* --- MISSION & VISION --- */}
//         <div className="grid md:grid-cols-2 gap-12 items-center">
//           <FadeIn>
//             <img
//               src="https://images.unsplash.com/photo-1586917049334-0f99406d8a6e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWlsayUyMHNoYWtlfGVufDB8fDB8fHww"
//               alt="Pouring Milk"
//               className="rounded-xl shadow-2xl rotate-2 hover:rotate-0 transition duration-500"
//             />
//           </FadeIn>
//           <div className="space-y-8">
//             <FadeIn delay={200}>
//               <h2 className="text-4xl font-bold text-blue-900">Our Mission</h2>
//               <p className="mt-4 text-lg text-gray-600 leading-relaxed">
//                 To provide fresh, organic, and locally sourced milk-based beverages and artisanal sodas that not only taste amazing but bring our community together.
//               </p>
//             </FadeIn>
//             <FadeIn delay={400}>
//               <h2 className="text-4xl font-bold text-blue-900">Our Vision</h2>
//               <p className="mt-4 text-lg text-gray-600 leading-relaxed">
//                 To define the future of casual refreshments by blending traditional recipes with modern flavors, creating smiles in every city we touch.
//               </p>
//             </FadeIn>
//           </div>
//         </div>

//         {/* --- CORE VALUES --- */}
//         <div className="bg-blue-50 p-12 rounded-3xl">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold text-blue-900">Our Core Values</h2>
//           </div>
//           <div className="grid md:grid-cols-3 gap-8">
//             {[
//               { title: "Sustainability", desc: "Eco-friendly packaging and sourcing.", icon: "🌱" },
//               { title: "Quality", desc: "Zero preservatives, 100% flavor.", icon: "✨" },
//               { title: "Community", desc: "We give back 5% of profits to local charities.", icon: "🤝" },
//             ].map((val, idx) => (
//               <FadeIn key={idx} delay={idx * 200} className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow text-center">
//                 <div className="text-5xl mb-4">{val.icon}</div>
//                 <h3 className="text-xl font-bold mb-2">{val.title}</h3>
//                 <p className="text-gray-600">{val.desc}</p>
//               </FadeIn>
//             ))}
//           </div>
//         </div>

//         {/* --- HISTORY TIMELINE --- */}
//         <div>
//           <h2 className="text-4xl font-bold text-center mb-12 text-blue-900">Our Journey</h2>
//           <div className="relative border-l-4 border-blue-200 ml-6 md:ml-1/2 space-y-12">
//             {timeline.map((item, index) => (
//               <FadeIn key={index} className="relative pl-8 md:pl-12">
//                 <div className="absolute -left-[1.35rem] top-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold border-4 border-white shadow">
//                   {index + 1}
//                 </div>
//                 <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
//                   <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">{item.year}</span>
//                   <h3 className="text-xl font-bold mt-1 mb-2">{item.title}</h3>
//                   <p className="text-gray-600">{item.desc}</p>
//                 </div>
//               </FadeIn>
//             ))}
//           </div>
//         </div>

//         {/* --- FEATURED MENU --- */}
//         <div>
//           <h2 className="text-4xl font-bold text-center mb-4 text-blue-900">Customer Favorites</h2>
//           <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Only In Our Local Store Only</p>
//           <div className="grid md:grid-cols-3 gap-8">
//             {products.map((prod, idx) => (
//               <FadeIn key={idx} delay={idx * 100} className="group">
//                 <div className="overflow-hidden rounded-t-xl">
//                   <img 
//                     src={prod.img} 
//                     alt={prod.name} 
//                     className="w-full h-48 object-cover transform group-hover:scale-110 transition duration-500"
//                   />
//                 </div>
//                 <div className="bg-white border border-t-0 border-gray-200 p-6 rounded-b-xl shadow-sm group-hover:shadow-md transition">
//                   <div className="flex justify-between items-center mb-2">
//                     <h3 className="font-bold text-lg">{prod.name}</h3>
//                     <span className="text-blue-600 font-bold">{prod.price}</span>
//                   </div>
//                   <p className="text-gray-600 text-sm">{prod.desc}</p>
//                 </div>
//               </FadeIn>
//             ))}
//           </div>
//         </div>

//         {/* --- STATS SECTION --- */}
//         <div ref={statsRef} className="bg-blue-900 text-white rounded-3xl p-12">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-blue-700">
//             {stats.map((s, idx) => (
//               <div key={idx} className="p-2">
//                 <p className="text-4xl md:text-5xl font-bold mb-2">{counted[idx]}+</p>
//                 <p className="text-blue-200 text-sm uppercase tracking-wide">{s.title}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* --- MEET THE TEAM --- */}
//         <div>
//           <h2 className="text-4xl font-bold text-center mb-12 text-blue-900">The Minds Behind the Shakes</h2>
//           <div className="grid md:grid-cols-3 gap-8">
//             {teamMembers.map((member, index) => (
//               <FadeIn key={index} delay={index * 150} className="bg-white rounded-xl shadow-lg overflow-hidden text-center group">
//                  <div className="relative w-full aspect-square overflow-hidden rounded-xl">
//         <img
//           src={member.image}
//           alt={member.name}
//           className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
//         />
//                   <div className="absolute inset-0 bg-blue-900 bg-opacity-0 group-hover:bg-opacity-20 transition duration-300 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100">
//                     <button className="bg-white p-2 rounded-full text-blue-600 hover:bg-blue-600 hover:text-white transition"><Linkedin size={20}/></button>
//                     <button className="bg-white p-2 rounded-full text-blue-400 hover:bg-blue-400 hover:text-white transition"><Twitter size={20}/></button>
//                   </div>
//                 </div>
//                 <div className="p-6">
//                   <h3 className="font-bold text-xl text-gray-800">{member.name}</h3>
//                   <p className="text-blue-600 font-medium">{member.role}</p>
//                 </div>
//               </FadeIn>
//             ))}
//           </div>
//         </div>

//         {/* --- TESTIMONIALS --- */}
//         <div className="bg-gray-50 p-12 rounded-3xl">
//           <h2 className="text-4xl font-bold text-center mb-12 text-blue-900">What They Say</h2>
//           <div className="grid md:grid-cols-3 gap-6">
//             {[1,2,3].map((_, i) => (
//               <FadeIn key={i} delay={i*200} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
//                 <div className="flex items-center mb-4 gap-4">
//                   <Star size={20} className="text-yellow-400"/>
//                   <Star size={20} className="text-yellow-400"/>
//                   <Star size={20} className="text-yellow-400"/>
//                   <Star size={20} className="text-yellow-400"/>
//                   <Star size={20} className="text-yellow-400"/>
//                 </div>
//                 <p className="text-gray-600 text-sm">
//                   "Best shakes ever! The flavors are amazing and the staff is super friendly."
//                 </p>
//               </FadeIn>
//             ))}
//           </div>
//         </div>

//         {/* --- CONTACT FORM SECTION --- */}
//         <div className="mt-24">
//           <h2 className="text-4xl font-bold text-center mb-12 text-blue-900">Get In Touch</h2>
//           <NeonContactForm />
//         </div>
//       </div>



//     <footer className="relative w-full  text-gray-800 overflow-hidden py-20 border-t border-gray-100">
      
//       {/* --- 1. CSS ANIMATIONS --- */}
//       <style>{`
//         @keyframes float1 {
//           0% { transform: translate(0px, 0px) rotate(0deg); }
//           33% { transform: translate(40px, -40px) rotate(10deg); }
//           66% { transform: translate(-20px, 20px) rotate(-5deg); }
//           100% { transform: translate(0px, 0px) rotate(0deg); }
//         }
//         @keyframes float2 {
//           0% { transform: translate(0px, 0px) rotate(0deg); }
//           50% { transform: translate(-30px, 50px) rotate(-15deg); }
//           100% { transform: translate(0px, 0px) rotate(0deg); }
//         }
//         @keyframes float3 {
//           0% { transform: translate(0px, 0px) scale(1); }
//           50% { transform: translate(20px, -20px) scale(1.1); }
//           100% { transform: translate(0px, 0px) scale(1); }
//         }
//         .animate-float-1 { animation: float1 12s ease-in-out infinite; }
//         .animate-float-2 { animation: float2 15s ease-in-out infinite; }
//         .animate-float-3 { animation: float3 10s ease-in-out infinite; }
//       `}</style>

//       {/* --- 2. THE SWIMMING ICONS (Translucent & Blurry) --- */}
//       <div className="absolute inset-0 pointer-events-none z-0">
        
//         {/* Icon 1: Big Milk Carton (Top Left) */}
//         <div className="absolute -top-10 -left-10 text-blue-400 opacity-10 blur-sm animate-float-1">
//           <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor">
//             <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3h5v2h-5V6zm0 4h5v2h-5v-2zM7 6h3v6H7V6zm0 8h10v2H7v-2z"/>
//           </svg>
//         </div>

//         {/* Icon 2: Soda Bottle (Bottom Right) */}
//         <div className="absolute bottom-0 right-0 text-pink-400 opacity-10 blur-sm animate-float-2">
//           <svg width="250" height="250" viewBox="0 0 24 24" fill="currentColor">
//              <path d="M16 5v2h-1v12c0 1.1-.9 2-2 2H9c-1.1 0-2-.9-2-2V7H6V5h10zm-7 4v2h4V9H9z"/>
//           </svg>
//         </div>

//         {/* Icon 3: Soda Cup with Straw (Top Right) */}
//         <div className="absolute top-10 right-[20%] text-purple-400 opacity-10 blur-[2px] animate-float-3">
//            <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor">
//              <path d="M17 8l-1.41-1.41-1.59 1.59V2H12v7H7v12h10V8zm-3 9h-4v-2h4v2zm0-4h-4v-2h4v2z"/>
//            </svg>
//         </div>

//         {/* Icon 4: Cookie/Bubble (Bottom Left) */}
//         <div className="absolute bottom-10 left-[20%] text-yellow-400 opacity-20 blur-sm animate-float-1">
//            <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor">
//              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
//            </svg>
//         </div>
//       </div>

//       {/* --- 3. FOOTER CONTENT (Clean & Attractive Font) --- */}
//       <div className="relative z-10 container mx-auto px-6 text-center">
        
//         {/* Brand Logo */}
//         <h2 className="text-4xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-pink-500 hover:scale-105 transition-transform duration-300 cursor-default">
//           MILK & SODA.
//         </h2>

//         {/* Links */}
//         <div className="flex flex-wrap justify-center gap-8 mb-10 font-bold text-gray-500">
//           <a href="/products" className="hover:text-blue-600 hover:-translate-y-1 transition-all duration-200">SHOP</a>
//           <a href="/products" className="hover:text-pink-600 hover:-translate-y-1 transition-all duration-200">FLAVORS</a>
//           <a href="/about" className="hover:text-purple-600 hover:-translate-y-1 transition-all duration-200">OUR STORY</a>
//           <a href="/about" className="hover:text-blue-600 hover:-translate-y-1 transition-all duration-200">CONTACT</a>
//         </div>

//         {/* Social Icons (Circle Style) */}
//         <div className="flex justify-center gap-4 mb-10">
//           <a href="#" className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors">
//             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
//           </a>
//           <a href="#" className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-pink-500 hover:text-white transition-colors">
//              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
//           </a>
//         </div>

//         {/* Copyright */}
//         <p className="text-xs text-gray-400">&copy; 2024 Milk & Soda Inc. All rights reserved.</p>
//       </div>
//     </footer>
//   );





//     </div>
//   );
// }





import React, { useEffect, useState, useRef } from "react";
import { MapPin, Clock, Phone, Mail, Facebook, Instagram, Linkedin, Twitter, ChevronDown, Star } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

/* --- UTILITY COMPONENT FOR SCROLL ANIMATIONS --- */
const FadeIn = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    });
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/* --- NEW: FIZZY GLASS CONTACT FORM --- */
const GlassContactForm = () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', message: '' });
  const [response, setResponse] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate sending (1 second delay)
    setTimeout(() => {
        setResponse("Thanks for the message! We'll get back to you shortly.");
        setFormData({ firstName: '', lastName: '', email: '', message: '' });

        // --- UPDATE: Hide the message after 4 seconds ---
        setTimeout(() => {
          setResponse('');
        }, 4000);
        
    }, 1000);
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-10 font-sans">
      
      {/* --- STYLES & ANIMATIONS FOR FORM --- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@300;500;700&display=swap');
        
        .font-bubbly { font-family: 'Fredoka', sans-serif; }
        
        @keyframes floatBubble {
          0% { transform: translateY(100%) scale(0); opacity: 0; }
          50% { opacity: 0.6; }
          100% { transform: translateY(-20px) scale(1.5); opacity: 0; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .bubble {
          position: absolute;
          background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%);
          border-radius: 50%;
          animation: floatBubble 4s infinite linear;
        }
      `}</style>

      {/* --- CONTAINER --- */}
      <div className="relative group rounded-[3rem] p-[3px] bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 shadow-[0_0_50px_rgba(236,72,153,0.4)] hover:shadow-[0_0_80px_rgba(6,182,212,0.6)] transition-shadow duration-500">
        
        {/* Background for the form */}
        <div className="bg-[#1a1a2e] relative rounded-[calc(3rem-3px)] overflow-hidden p-8 md:p-12">
          
          {/* Floating Bubbles Background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="bubble w-6 h-6 left-[10%]" style={{ animationDelay: '0s', animationDuration: '6s' }}></div>
            <div className="bubble w-4 h-4 left-[30%]" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
            <div className="bubble w-8 h-8 left-[70%]" style={{ animationDelay: '2s', animationDuration: '7s' }}></div>
            <div className="bubble w-3 h-3 left-[90%]" style={{ animationDelay: '0.5s', animationDuration: '5s' }}></div>
          </div>

          {/* --- HEADER --- */}
          <div className="relative z-10 mb-8 text-center">
            <h3 className="font-bubbly text-4xl text-white mb-2 tracking-wide">
              Spill the Tea <span className="text-pink-500">.</span><span className="text-cyan-400">.</span>
            </h3>
            <p className="text-gray-400 font-bubbly text-lg font-light">
              Got a flavor idea? Or just want to say hi?
            </p>
          </div>

          {/* --- FORM --- */}
          <form className="relative z-10 space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div className="group/input">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full bg-white/5 border-2 border-white/10 rounded-2xl p-4 text-white placeholder-white/30 
                           focus:outline-none focus:bg-white/10 focus:border-pink-400 focus:shadow-[0_0_15px_rgba(236,72,153,0.5)] 
                           transition-all duration-300 font-bubbly"
                />
              </div>
              {/* Last Name */}
              <div className="group/input">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full bg-white/5 border-2 border-white/10 rounded-2xl p-4 text-white placeholder-white/30 
                           focus:outline-none focus:bg-white/10 focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.5)] 
                           transition-all duration-300 font-bubbly"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-white/5 border-2 border-white/10 rounded-2xl p-4 text-white placeholder-white/30 
                         focus:outline-none focus:bg-white/10 focus:border-purple-400 focus:shadow-[0_0_15px_rgba(192,132,252,0.5)] 
                         transition-all duration-300 font-bubbly"
              />
            </div>

            {/* Message */}
            <div>
              <textarea
                rows="4"
                name="message"
                placeholder="What's on your mind?"
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-white/5 border-2 border-white/10 rounded-2xl p-4 text-white placeholder-white/30 
                         focus:outline-none focus:bg-white/10 focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(250,204,21,0.5)] 
                         transition-all duration-300 font-bubbly resize-none"
              ></textarea>
            </div>

            {/* Button */}
            <div className="pt-2 text-center md:text-left">
              <button className="w-full md:w-auto relative overflow-hidden group bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white font-bubbly font-bold text-xl py-4 px-10 rounded-full transition-all transform hover:scale-[1.02] hover:rotate-1 shadow-lg">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite] block"></span>
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Send It 🚀
                </span>
              </button>
            </div>
          </form>

          {/* SUCCESS MESSAGE - Only shows if response is not empty */}
          {response && (
            <div className="mt-6 p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-300 font-bubbly text-center animate-pulse transition-all duration-500">
              {response}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

/* --- NEW: SWIMMING ICONS FOOTER --- */
const MilkSodaFooter = () => {
    return (
      <footer className="relative w-full bg-white text-gray-800 overflow-hidden py-20 border-t border-gray-100">
        
        {/* --- CSS ANIMATIONS FOR FOOTER --- */}
        <style>{`
          @keyframes float1 {
            0% { transform: translate(0px, 0px) rotate(0deg); }
            33% { transform: translate(40px, -40px) rotate(10deg); }
            66% { transform: translate(-20px, 20px) rotate(-5deg); }
            100% { transform: translate(0px, 0px) rotate(0deg); }
          }
          @keyframes float2 {
            0% { transform: translate(0px, 0px) rotate(0deg); }
            50% { transform: translate(-30px, 50px) rotate(-15deg); }
            100% { transform: translate(0px, 0px) rotate(0deg); }
          }
          @keyframes float3 {
            0% { transform: translate(0px, 0px) scale(1); }
            50% { transform: translate(20px, -20px) scale(1.1); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          .animate-float-1 { animation: float1 12s ease-in-out infinite; }
          .animate-float-2 { animation: float2 15s ease-in-out infinite; }
          .animate-float-3 { animation: float3 10s ease-in-out infinite; }
        `}</style>
  
        {/* --- THE SWIMMING ICONS (Translucent & Blurry) --- */}
        <div className="absolute inset-0 pointer-events-none z-0">
          
          {/* Icon 1: Big Milk Carton (Top Left) */}
          <div className="absolute -top-10 -left-10 text-blue-400 opacity-10 blur-sm animate-float-1">
            <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3h5v2h-5V6zm0 4h5v2h-5v-2zM7 6h3v6H7V6zm0 8h10v2H7v-2z"/>
            </svg>
          </div>
  
          {/* Icon 2: Soda Bottle (Bottom Right) */}
          <div className="absolute bottom-0 right-0 text-pink-400 opacity-10 blur-sm animate-float-2">
            <svg width="250" height="250" viewBox="0 0 24 24" fill="currentColor">
               <path d="M16 5v2h-1v12c0 1.1-.9 2-2 2H9c-1.1 0-2-.9-2-2V7H6V5h10zm-7 4v2h4V9H9z"/>
            </svg>
          </div>
  
          {/* Icon 3: Soda Cup with Straw (Top Right) */}
          <div className="absolute top-10 right-[20%] text-purple-400 opacity-10 blur-[2px] animate-float-3">
             <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor">
               <path d="M17 8l-1.41-1.41-1.59 1.59V2H12v7H7v12h10V8zm-3 9h-4v-2h4v2zm0-4h-4v-2h4v2z"/>
             </svg>
          </div>
  
          {/* Icon 4: Cookie/Bubble (Bottom Left) */}
          <div className="absolute bottom-10 left-[20%] text-yellow-400 opacity-20 blur-sm animate-float-1">
             <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor">
               <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
             </svg>
          </div>
        </div>
  
        {/* --- FOOTER CONTENT --- */}
        <div className="relative z-10 container mx-auto px-6 text-center">
          
          {/* Brand Logo */}
          <h2 className="text-4xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-pink-500 hover:scale-105 transition-transform duration-300 cursor-default">
            MILK & SODA.
          </h2>
  
          {/* Links */}
          <div className="flex flex-wrap justify-center gap-8 mb-10 font-bold text-gray-500">
            <a href="/products" className="hover:text-blue-600 hover:-translate-y-1 transition-all duration-200">SHOP</a>
            <a href="/products" className="hover:text-pink-600 hover:-translate-y-1 transition-all duration-200">FLAVORS</a>
            <a href="/about" className="hover:text-purple-600 hover:-translate-y-1 transition-all duration-200">OUR STORY</a>
            <a href="/about" className="hover:text-blue-600 hover:-translate-y-1 transition-all duration-200">CONTACT</a>
          </div>
  
          {/* Social Icons */}
          <div className="flex justify-center gap-4 mb-10">
            <a href="#" className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-pink-500 hover:text-white transition-colors">
               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
          </div>
  
          {/* Copyright */}
          <p className="text-xs text-gray-400">&copy; 2024 Milk & Soda Inc. All rights reserved.</p>
        </div>
      </footer>
    );
};

/* --- MAIN COMPONENT --- */
export default function BusinessDetails() {
  // Stats Logic
  const [counted, setCounted] = useState([0, 0, 0, 0]);
  const statsRef = useRef(null);
  const statsStarted = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (statsRef.current && !statsStarted.current) {
        const top = statsRef.current.getBoundingClientRect().top;
        if (top < window.innerHeight) {
          statsStarted.current = true;
          const statsTarget = [1200, 8, 65, 15];
          statsTarget.forEach((value, idx) => {
            let start = 0;
            const duration = 2000;
            const increment = Math.ceil(value / (duration / 20));
            const interval = setInterval(() => {
              start += increment;
              if (start >= value) {
                start = value;
                clearInterval(interval);
              }
              setCounted((prev) => {
                const newArr = [...prev];
                newArr[idx] = start;
                return newArr;
              });
            }, 20);
          });
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- DATA ---
  const timeline = [
    { year: "2024", title: "Humble Beginnings", desc: "Started as a small pop-up stall in the local farmers market." },
    { year: "2025", title: "First Store", desc: "Opened our first flagship store downtown amidst challenging times." },
    { year: "2026", title: "Expansion", desc: "we will Launch 3 new locations and introduce our organic soda line." },
    { year: "2027", title: "Going National", desc: "will be Started shipping our bottled products nationwide." },
  ];

  const products = [
    { name: "Vanilla & straw berry Shake", price: "Rs650", desc: "Made with organic Madagascar vanilla strawberry bean.", img: "https://i.pinimg.com/474x/d4/84/20/d4842038272fca18482f8d8805a88b99.jpg" },
    { name: "Berry Blast thick shake", price: "Rs900", desc: "Sparkling soda infused with real strawberries and raspberries.", img: "https://thumbs.dreamstime.com/z/captivating-nighttime-fruit-milkshake-visual-symphony-sweetness-shadows-pristine-white-background-exquisite-image-367359848.jpg" },
    { name: "Midnight Mint", price: "Rs700", desc: "Dark chocolate milkshake with a hint of fresh mint.", img: "https://www.shutterstock.com/image-photo/chocolate-milkshake-ice-cream-whipped-260nw-667618195.jpg" },
  ];

  const teamMembers = [
    { name: "Hariprasath", role: "Founder & CEO", image: "https://flexible-salmon-ssqjqycrkl-8lk19sxu4z.edgeone.dev/hari%20img.png" },
    { name: "Vijitha", role: "Head of Production", image: "https://intermediate-chocolate-4obpfdxdn9-6w8ivfnjxd.edgeone.dev/WhatsApp%20Image%202025-11-13%20at%2010.03.58%20PM.jpeg" },
    { name: "Clara Lee", role: "Marketing Manager", image: "https://randomuser.me/api/portraits/women/65.jpg" },
  ];

  const stats = [
    { title: "Happy Customers", value: 1200 },
    { title: "Years Served", value: 8 },
    { title: "Team Members", value: 65 },
    { title: "Awards Won", value: 15 },
  ];

  const navigate = useNavigate();

  return (
    <div className="font-sans text-gray-800">
      {/* BACKGROUNDS */}
      <div className="fixed inset-0 opacity-[0.04] pointer-events-none z-[0]" style={{ backgroundImage: `url("https://lh5.googleusercontent.com/proxy/-Ql87aj4ncu7ftHATMlvlMCQGCQyZr2ImdORINowHys02yqFOUnrionntO31Eu5NLnyorcYSftKmRenFEBiNZ4ym7SWlDn38ls0hEK8zLf-wksgFn8o")` }}></div>

      {/* --- HERO SECTION --- */}
      <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://img.freepik.com/premium-photo/fresh-cocktails-with-fruits-tropical-juice-drinks-generative-ai_863013-13238.jpg"
            alt="Hero Background" 
            className="w-full h-full object-cover filter rounded-[1rem] brightness-50"
          />
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <FadeIn>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">Milk & Soda</h1>
            <p className="text-xl md:text-2xl mb-8 font-light text-gray-200">
              Crafting moments of joy, one sip at a time.
            </p>
            <button
              onClick={() => navigate("/products")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition duration-300 shadow-lg transform hover:scale-105"
            >
              View Our Menu
            </button>
          </FadeIn>
        </div>
        <div className="absolute bottom-10 w-full flex justify-center animate-bounce text-white">
          <ChevronDown size={32} />
        </div>
      </div>

      {/* --- MAIN CONTAINER --- */}
      <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col gap-24 relative z-10">
        {/* --- MISSION & VISION --- */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <img
              src="https://images.unsplash.com/photo-1586917049334-0f99406d8a6e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWlsayUyMHNoYWtlfGVufDB8fDB8fHww"
              alt="Pouring Milk"
              className="rounded-xl shadow-2xl rotate-2 hover:rotate-0 transition duration-500"
            />
          </FadeIn>
          <div className="space-y-8">
            <FadeIn delay={200}>
              <h2 className="text-4xl font-bold text-blue-900">Our Mission</h2>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                To provide fresh, organic, and locally sourced milk-based beverages and artisanal sodas that not only taste amazing but bring our community together.
              </p>
            </FadeIn>
            <FadeIn delay={400}>
              <h2 className="text-4xl font-bold text-blue-900">Our Vision</h2>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                To define the future of casual refreshments by blending traditional recipes with modern flavors, creating smiles in every city we touch.
              </p>
            </FadeIn>
          </div>
        </div>

        {/* --- CORE VALUES --- */}
        <div className="bg-blue-50 p-12 rounded-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900">Our Core Values</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Sustainability", desc: "Eco-friendly packaging and sourcing.", icon: "🌱" },
              { title: "Quality", desc: "Zero preservatives, 100% flavor.", icon: "✨" },
              { title: "Community", desc: "We give back 5% of profits to local charities.", icon: "🤝" },
            ].map((val, idx) => (
              <FadeIn key={idx} delay={idx * 200} className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow text-center">
                <div className="text-5xl mb-4">{val.icon}</div>
                <h3 className="text-xl font-bold mb-2">{val.title}</h3>
                <p className="text-gray-600">{val.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* --- HISTORY TIMELINE --- */}
        <div>
          <h2 className="text-4xl font-bold text-center mb-12 text-blue-900">Our Journey</h2>
          <div className="relative border-l-4 border-blue-200 ml-6 md:ml-1/2 space-y-12">
            {timeline.map((item, index) => (
              <FadeIn key={index} className="relative pl-8 md:pl-12">
                <div className="absolute -left-[1.35rem] top-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold border-4 border-white shadow">
                  {index + 1}
                </div>
                <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
                  <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">{item.year}</span>
                  <h3 className="text-xl font-bold mt-1 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* --- FEATURED MENU --- */}
        <div>
          <h2 className="text-4xl font-bold text-center mb-4 text-blue-900">Customer Favorites</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Only In Our Local Store Only</p>
          <div className="grid md:grid-cols-3 gap-8">
            {products.map((prod, idx) => (
              <FadeIn key={idx} delay={idx * 100} className="group">
                <div className="overflow-hidden rounded-t-xl">
                  <img 
                    src={prod.img} 
                    alt={prod.name} 
                    className="w-full h-48 object-cover transform group-hover:scale-110 transition duration-500"
                  />
                </div>
                <div className="bg-white border border-t-0 border-gray-200 p-6 rounded-b-xl shadow-sm group-hover:shadow-md transition">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-lg">{prod.name}</h3>
                    <span className="text-blue-600 font-bold">{prod.price}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{prod.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* --- STATS SECTION --- */}
        <div ref={statsRef} className="bg-blue-900 text-white rounded-3xl p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-blue-700">
            {stats.map((s, idx) => (
              <div key={idx} className="p-2">
                <p className="text-4xl md:text-5xl font-bold mb-2">{counted[idx]}+</p>
                <p className="text-blue-200 text-sm uppercase tracking-wide">{s.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* --- MEET THE TEAM --- */}
        <div>
          <h2 className="text-4xl font-bold text-center mb-12 text-blue-900">The Minds Behind the Shakes</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <FadeIn key={index} delay={index * 150} className="bg-white rounded-xl shadow-lg overflow-hidden text-center group">
                 <div className="relative w-full aspect-square overflow-hidden rounded-xl">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
                  <div className="absolute inset-0 bg-blue-900 bg-opacity-0 group-hover:bg-opacity-20 transition duration-300 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100">
                    <button className="bg-white p-2 rounded-full text-blue-600 hover:bg-blue-600 hover:text-white transition"><Linkedin size={20}/></button>
                    <button className="bg-white p-2 rounded-full text-blue-400 hover:bg-blue-400 hover:text-white transition"><Twitter size={20}/></button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl text-gray-800">{member.name}</h3>
                  <p className="text-blue-600 font-medium">{member.role}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* --- TESTIMONIALS --- */}
        <div className="bg-gray-50 p-12 rounded-3xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-blue-900">What They Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[1,2,3].map((_, i) => (
              <FadeIn key={i} delay={i*200} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
                <div className="flex items-center mb-4 gap-4">
                  <Star size={20} className="text-yellow-400"/>
                  <Star size={20} className="text-yellow-400"/>
                  <Star size={20} className="text-yellow-400"/>
                  <Star size={20} className="text-yellow-400"/>
                  <Star size={20} className="text-yellow-400"/>
                </div>
                <p className="text-gray-600 text-sm">
                  "Best shakes ever! The flavors are amazing and the staff is super friendly."
                </p>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* --- CONTACT FORM SECTION (UPDATED) --- */}
        <div className="mt-24">
          <h2 className="text-4xl font-bold text-center mb-12 text-blue-900">Get In Touch</h2>
          <GlassContactForm />
        </div>
      </div>

      {/* --- NEW FOOTER --- */}
      <MilkSodaFooter />

    </div>
  );
}