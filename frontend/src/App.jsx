import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import FormulairePelerin from './components/FormulairePelerin';

const FormulairePage = () => {
  const navigate = useNavigate();
  
  const handleRetour = () => {
    console.log('Retour appelé');
    navigate('/');
  };

  return (
    <FormulairePelerin 
      packType="hajj"
      onRetour={handleRetour}
    />
  );
};

const TestPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="test-page">
      <h1>Page de Test</h1>
      <div className="test-buttons">
        <button onClick={() => navigate('/formulaire')}>Aller au Formulaire</button>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<FormulairePage />} />
      <Route path="/formulaire" element={<FormulairePage />} />
      <Route path="/test" element={<TestPage />} />
    </Routes>
  );
};

export default App; 