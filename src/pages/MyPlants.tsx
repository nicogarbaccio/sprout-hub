
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import MyPlantsCollection from '@/components/MyPlantsCollection';
import { useAuth } from '@/contexts/AuthContext';

const MyPlants = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white font-poppins flex items-center justify-center">
        <div className="text-plant-text">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white font-poppins">
      <Navigation />
      <div className="pt-16">
        <MyPlantsCollection />
      </div>
    </div>
  );
};

export default MyPlants;
