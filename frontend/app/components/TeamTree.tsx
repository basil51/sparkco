import { Users, Code, Palette, Briefcase, ChevronDown } from 'lucide-react'
import { useState } from 'react'

interface TeamMember {
  name: string
  role: string
  description: string
  skills: string[]
}

interface Department {
  name: string
  icon: any
  description: string
  members: TeamMember[]
  color: string
}

export default function TeamTree() {
  const [expandedDept, setExpandedDept] = useState<string | null>(null)

  const departments: Department[] = [
    {
      name: "Development Team",
      icon: Code,
      description: "Full-Stack & Specialized Developers",
      color: "from-blue-500 to-cyan-500",
      members: [
        {
          name: "Senior Developers",
          role: "Full-Stack Engineers",
          description: "React, Node.js, Python, DevOps",
          skills: ["React", "Node.js", "Python", "AWS", "Docker"]
        },
        {
          name: "Mobile Developers",
          role: "iOS & Android Specialists",
          description: "React Native, Flutter, Native Apps",
          skills: ["React Native", "Flutter", "Swift", "Kotlin"]
        },
        {
          name: "Backend Developers",
          role: "API & Database Engineers",
          description: "Microservices, APIs, Database Design",
          skills: ["NestJS", "PostgreSQL", "Redis", "GraphQL"]
        }
      ]
    },
    {
      name: "Design Team",
      icon: Palette,
      description: "UI/UX & Creative Specialists",
      color: "from-purple-500 to-pink-500",
      members: [
        {
          name: "UI/UX Designers",
          role: "User Experience Specialists",
          description: "User research, wireframes, prototypes",
          skills: ["Figma", "Adobe XD", "User Research", "Prototyping"]
        },
        {
          name: "Visual Designers",
          role: "Brand & Visual Identity",
          description: "Branding, graphics, illustrations",
          skills: ["Adobe Creative Suite", "Illustration", "Branding"]
        },
        {
          name: "Frontend Developers",
          role: "CSS & Animation Experts",
          description: "Responsive design, animations, accessibility",
          skills: ["CSS3", "Tailwind", "Framer Motion", "Accessibility"]
        }
      ]
    },
    {
      name: "Project Management",
      icon: Briefcase,
      description: "Agile & Delivery Experts",
      color: "from-emerald-500 to-teal-500",
      members: [
        {
          name: "Project Managers",
          role: "Agile & Scrum Masters",
          description: "Project planning, team coordination",
          skills: ["Scrum", "Agile", "Jira", "Team Leadership"]
        },
        {
          name: "Business Analysts",
          role: "Requirements & Strategy",
          description: "Requirements gathering, business analysis",
          skills: ["Requirements Analysis", "Stakeholder Management", "Documentation"]
        },
        {
          name: "QA Engineers",
          role: "Quality Assurance",
          description: "Testing, automation, quality control",
          skills: ["Manual Testing", "Automation", "Cypress", "Jest"]
        }
      ]
    }
  ]

  return (
    <div className="space-y-8">
      {/* CEO/Founder - Basel */}
        <div className="text-center">
        <div className="inline-block">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 border-4 border-white/20 shadow-2xl">
            <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 border-4 border-white/30">
              <img
                src="/images/team/basel.jpg"
                alt="Basel - CEO & Lead Developer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to placeholder if image fails to load
                  e.currentTarget.style.display = 'none'
                  e.currentTarget.nextElementSibling.style.display = 'flex'
                }}
              />
              <div className="w-full h-full bg-white/20 rounded-full flex items-center justify-center hidden">
                <Users className="w-10 h-10 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Basel</h3>
            <p className="text-white/90 font-semibold mb-2">CEO & Lead Developer</p>
            <p className="text-white/70 text-sm">Founder & Technical Architect</p>
          </div>
        </div>
        
        {/* Connection Lines */}
        <div className="flex justify-center mt-6 mb-8">
          <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent"></div>
        </div>
        <div className="flex justify-center mb-8">
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
        </div>
      </div>

      {/* Departments */}
      <div className="grid md:grid-cols-3 gap-8">
        {departments.map((dept, index) => (
          <div key={index} className="text-center">
            {/* Department Header */}
            <div 
              className={`bg-gradient-to-r ${dept.color} rounded-xl p-6 border border-white/20 cursor-pointer hover:scale-105 transition-all duration-300`}
              onClick={() => setExpandedDept(expandedDept === dept.name ? null : dept.name)}
            >
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <dept.icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-bold text-white mb-1">{dept.name}</h4>
              <p className="text-white/80 text-sm mb-3">{dept.description}</p>
              <div className="flex items-center justify-center">
                <ChevronDown 
                  className={`w-5 h-5 text-white transition-transform duration-300 ${
                    expandedDept === dept.name ? 'rotate-180' : ''
                  }`} 
                />
              </div>
            </div>

            {/* Department Members */}
            {expandedDept === dept.name && (
              <div className="mt-4 space-y-3 animate-in slide-in-from-top-2 duration-300">
                {dept.members.map((member, memberIndex) => (
                  <div 
                    key={memberIndex}
                    className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/20 hover:bg-white/20 transition-all duration-300"
                  >
                    <h5 className="text-white font-semibold mb-1">{member.name}</h5>
                    <p className="text-white/80 text-sm mb-2">{member.role}</p>
                    <p className="text-white/60 text-xs mb-3">{member.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {member.skills.map((skill, skillIndex) => (
                        <span 
                          key={skillIndex}
                          className="bg-white/10 text-white/80 px-2 py-1 rounded text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Connection Lines to Departments */}
      <div className="flex justify-center mt-8">
        <div className="grid grid-cols-3 gap-8 w-full max-w-4xl">
          {departments.map((_, index) => (
            <div key={index} className="flex justify-center">
              <div className="w-px h-6 bg-gradient-to-b from-white/40 to-transparent"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
