import Link from "next/link"
import { Logo } from "@/components/ui/logo"
import { Twitter, Github, DiscIcon as Discord, BookOpen } from "lucide-react"

const footerLinks = [
  { title: "Product", items: ["AI Agents", "Dashboard", "Pricing", "Security"] },
  { title: "Company", items: ["About", "Blog", "Careers", "Press"] },
  { title: "Resources", items: ["Documentation", "Help Center", "API", "Status"] },
  { title: "Legal", items: ["Privacy Policy", "Terms of Service", "Cookie Policy"] },
]

const socialLinks = [
  { name: "Twitter", href: "https://twitter.com/bark_protocol", icon: Twitter },
  { name: "GitHub", href: "https://github.com/barkprotocol", icon: Github },
  { name: "Discord", href: "https://discord.gg/barkprotocol", icon: Discord },
  { name: "Documentation", href: "https://docs.barkprotocol.com", icon: BookOpen },
]

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <Logo isScrolled={false} />
            <p className="mt-4 text-sm text-muted-foreground">
              Empowering your financial journey with BARK Protocol, the groundbreaking fusion of Solana blockchain and
              AI technologies.
            </p>
            <div className="mt-6 flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                >
                  <link.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-3">{section.title}</h3>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} BARK Protocol. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

