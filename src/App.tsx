import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MenuPage from './pages/MenuPage';
import Header from './components/Header';
import './App.css';
import SelectedRecipe from "./pages/SelectedRecipePage";

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <Suspense fallback={<p>Loading...</p>}>
                    <Routes>
                        <Route path="/" element={<MenuPage />} />
                        <Route path="/recipe/:id" element={<SelectedRecipe />} />
                    </Routes>
                </Suspense>
            </div>
        </Router>
    );
}

export default App;
