import Home from "./views/home";
import PageNotFound from "./views/pageNotFound";
import { BrowserRouter, Routes, Route } from 'react-router-dom'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" exact element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}