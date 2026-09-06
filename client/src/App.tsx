import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import GanapatiSpecial from "./pages/GanapatiSpecial";
import OrderDashboard from "./pages/OrderDashboard";
import ProductionTimetable from "./pages/ProductionTimetable";
import EnquiryDashboard from "./pages/EnquiryDashboard";
import DashboardAuth from "./pages/DashboardAuth";

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: "auto" }); }, [location]);
  return null;
}

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/ganapati-modak-special"} component={GanapatiSpecial} />
      <Route path={"/product/:slug"} component={ProductPage} />
      <Route path={"/dashboard"}>{() => <DashboardAuth><OrderDashboard /></DashboardAuth>}</Route>
      <Route path={"/dashboard/production"}>{() => <DashboardAuth><ProductionTimetable /></DashboardAuth>}</Route>
      <Route path={"/dashboard/enquiries"}>{() => <DashboardAuth><EnquiryDashboard /></DashboardAuth>}</Route>
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster /><ScrollToTop /><Router /></TooltipProvider></ThemeProvider></ErrorBoundary>;
}

export default App;
