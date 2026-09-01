import { prisma } from "@/lib/prisma";
import PropertyCard from "@/components/PropertyCard";
import Chatbot from "@/components/Chatbot";

export default async function Home(){
 const [site,properties]=await Promise.all([prisma.siteSetting.findUnique({where:{id:"main"}}),prisma.property.findMany({where:{status:"ACTIVE",featured:true},take:6,orderBy:{createdAt:"desc"}})]);
 return <>
 <main>
  <section className="hero"><div className="container hero-grid"><div><div className="eyebrow">PROPERTY CONSULTATION</div><h1>{site?.heroTitle||"Find your next property"}</h1><p>{site?.heroText}</p><div style={{display:"flex",gap:10,flexWrap:"wrap"}}><a className="btn btn-primary" href="/properties">Explore Properties</a><a className="btn btn-ghost" href="/calculator">Calculate Loan</a></div></div>
  <div className="hero-card" style={{backgroundImage:"url(https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=80)"}}><div className="hero-card-inner"><b>Need help choosing?</b><div className="muted">Chat with our AI property consultant.</div></div></div></div></section>
  <section className="section"><div className="container"><div className="section-head"><div><div className="eyebrow">FEATURED</div><h2>Featured Properties</h2></div><a className="btn btn-ghost" href="/properties">View all</a></div><div className="grid">{properties.map(p=><PropertyCard key={p.id} p={p}/>)}</div></div></section>
  <section className="section" id="about" style={{background:"#f7f8fa"}}><div className="container split"><div><div className="eyebrow">ABOUT</div><h2>Property advice, without the pressure.</h2></div><div><p className="muted" style={{lineHeight:1.8}}>{site?.about||"Update your company story from Admin."}</p><a className="btn btn-primary" href="#contact">Talk to an agent</a></div></div></section>
  <section className="section" id="contact"><div className="container"><div className="panel"><h2>Ready to find yours?</h2><p className="muted">Use the AI consultant or contact the agent directly.</p><a className="btn btn-primary" href={`https://wa.me/${site?.whatsapp||process.env.NEXT_PUBLIC_WHATSAPP||""}`}>WhatsApp Agent</a></div></div></section>
 </main><Chatbot/><footer className="footer"><div className="container">© {new Date().getFullYear()} {site?.siteName||"Your Property"}. All rights reserved.</div></footer></>
}