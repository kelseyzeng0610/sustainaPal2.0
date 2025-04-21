import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./components/ui/theme-provider"
import { Toaster } from "./components/ui/toaster"
import { AuthProvider } from "./contexts/AuthContext"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { Layout } from "./components/Layout"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { Dashboard } from "./pages/Dashboard"
import { CostForecast } from "./pages/CostForecast"
import { Insights } from "./pages/Insights"
import { Community } from "./pages/Community"
import { Savings } from "./pages/Savings"
import { Profile } from "./pages/Profile"




function App() {
  return (
    <AuthProvider>
        <ThemeProvider defaultTheme="light" storageKey="ui-theme">
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/*" element={
                <ProtectedRoute>
                  <Layout>
                    <Routes>
                      <Route index element={<Dashboard />} />
                      <Route path="forecast" element={<CostForecast />} />
                      <Route path="insights" element={<Insights />} />
                      <Route path="community" element={<Community />} />
                      <Route path="savings" element={<Savings />} />
                      <Route path="profile" element={<Profile />} />
                      
                     
                
                      
                   
                    </Routes>
                  </Layout>
                </ProtectedRoute>
              } />
            </Routes>
          </Router>
          <Toaster />
        </ThemeProvider>
    </AuthProvider>
  )
}

export default App