import ContinentsView from "./views/continentsView";
import CountriesView from "./views/countriesView";
import PageNotFound from "./views/pageNotFound";
import { BrowserRouter, Routes, Route } from 'react-router-dom'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ContinentsView />} />
        <Route path="/countries" element={<CountriesView />} />
        <Route path="*" exact element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}