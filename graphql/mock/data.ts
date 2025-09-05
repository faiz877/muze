export interface BasePost {
  author: string
  username: string
  content: string
  imageUrl?: string | null
  avatarUrl?: string | null
  isReply?: boolean
  boostedBy?: string | null
}

export const BASE_POSTS: BasePost[] = [
  { author: "Elon Musk", username: "elonmusk", content: "Pushing connectivity to the edges of the planet matters. Universal access to knowledge and markets changes lives, and that's the whole point of building at-scale infrastructure.", imageUrl: null, avatarUrl: "/elon2.avif" },
  { author: "Barack Obama", username: "barackobama", content: "Grateful for the people who serve others quietly every day. Leadership is about lifting folks up and reminding us what we can accomplish together.", imageUrl: null, avatarUrl: "/obama.jpg", boostedBy: "michelleobama" },
  { author: "Michelle Obama", username: "michelleobama", content: "When they go low, we go high. Small acts of kindness and courage add up—and they’re the foundation of strong communities.", imageUrl: "/michelle-post.png", avatarUrl: "/michelle.jpg" },
  { author: "Sundar Pichai", username: "sundarpichai", content: "Excited about the momentum in AI helping people be more productive and creative. Responsible innovation with strong guardrails remains essential as we scale these tools.", imageUrl: "/ai-post.webp", avatarUrl: "/sundar.webp" },
  { author: "Satya Nadella", username: "satyanadella", content: "Empathy unlocks innovation. When we truly understand our customers and teammates, we build software that empowers every person and every organization to achieve more.", imageUrl: null, avatarUrl: "/brian.webp" },
  { author: "Tim Cook", username: "tim_cook", content: "Great products reflect our values—privacy, accessibility, and sustainability. Proud of the teams who obsess over details that make a difference in people’s lives.", imageUrl: null, avatarUrl: "/naval.webp" },
  { author: "Ginni Rometty", username: "ginnirometty", content: "Careers are a journey of continuous learning. Stretch assignments can feel uncomfortable, but that’s where growth lives and confidence is built.", imageUrl: null, avatarUrl: "/gini.jpeg" },
  { author: "Brian Chesky", username: "bchesky", content: "Design is not just how it looks—it’s how it works and how it makes you feel. The goal is to create magical, trustworthy experiences at every step.", imageUrl: null, avatarUrl: "/steve.jpeg" },
  { author: "Patrick Collison", username: "patrickc", content: "Speed compounds. Teams that ship quickly learn faster, and those learnings translate into better products and happier customers.", imageUrl: null, avatarUrl: "/tim.avif" },
  { author: "Anne Wojcicki", username: "annewoj23", content: "Health literacy empowers people to make informed decisions for themselves and their families. Data transparency and education are key to better outcomes.", imageUrl: null, avatarUrl: "/paul.jpeg" },
  { author: "Naval Ravikant", username: "naval", content: "Play long-term games with long-term people. Compounding relationships and knowledge are the real leverage in a world that changes quickly.", imageUrl: null, avatarUrl: "/profile2.jpg" },
  { author: "Paul Graham", username: "paulg", content: "Make something people want. Talk to users, iterate relentlessly, and don’t be afraid to niche down until the product is truly loved.", imageUrl: null, avatarUrl: "/profile2.jpg" },
  { author: "Katherine Johnson", username: "katherinej", content: "Curiosity and persistence move science forward. Every problem is solvable when you break it down and keep asking the right questions.", imageUrl: null, avatarUrl: "/profile2.jpg" },
  { author: "Ada Lovelace", username: "ada", content: "Computation is a canvas for imagination. When we combine math and creativity, we invent tools that amplify the human mind.", imageUrl: null, avatarUrl: "/profile2.jpg" },
  { author: "Grace Hopper", username: "gracehopper", content: "The most dangerous phrase is ‘We’ve always done it this way.’ Challenge assumptions, measure results, and iterate toward better systems.", imageUrl: null, avatarUrl: "/profile2.jpg"},
  { author: "Linus Torvalds", username: "linus__", content: "Talk is cheap. Show me the code. Real progress is made when ideas survive contact with reality and serve real users.", imageUrl: null, avatarUrl: "/profile2.jpg" },
  { author: "Guido van Rossum", username: "gvanrossum", content: "Code should be readable by humans first. Clear naming and straightforward structure make software friendlier, safer, and more maintainable.", imageUrl: null, avatarUrl: "/profile2.jpg" },
  { author: "Sheryl Sandberg", username: "sherylsandberg", content: "Done is better than perfect. Momentum builds confidence, and small wins create space for bigger leaps later on.", imageUrl: null, avatarUrl: "/profile2.jpg" },
  { author: "Andrew Ng", username: "andrewyng", content: "AI is the new electricity. The opportunity is to bring equitable access to education and tools so more people can participate in the future of work.", imageUrl: null, avatarUrl: "/profile2.jpg" },
  { author: "Jeff Bezos", username: "jeffbezos", content: "It’s still Day 1. Customer obsession and willingness to experiment keep organizations young, inventive, and resilient.", imageUrl: null, avatarUrl: "/profile2.jpg" },
  { author: "Steve Jobs", username: "stevejobs", content: "Stay hungry, stay foolish. The intersection of technology and the liberal arts is where truly delightful experiences are born.", imageUrl: null, avatarUrl: "/profile2.jpg" },
];
