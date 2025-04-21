import { Home, LineChart, Lightbulb, Users, PiggyBank, UserCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Link, useLocation } from "react-router-dom"

const navItems = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Cost Forecast", href: "/forecast", icon: LineChart },
  { name: "Insights", href: "/insights", icon: Lightbulb },
  { name: "Community", href: "/community", icon: Users },
  { name: "Savings", href: "/savings", icon: PiggyBank },
  { name: "Profile", href: "/profile", icon: Lightbulb },
]

export function Sidebar() {
  const location = useLocation()

  return (
    <aside className="hidden md:flex w-64 flex-col border-r bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col gap-2 p-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200 hover:bg-muted",
                isActive ? "bg-primary/10 text-primary" : "text-muted-foreground"
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-muted-foreground")} />
              <span className="font-medium">{item.name}</span>
              {isActive && (
                <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
              )}
            </Link>
          )
        })}
      </div>
    </aside>
  )
}