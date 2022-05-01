import React, { useEffect } from 'react';
// import api from '@/services/projects';
import storage from '@/storage';

export function Projects() {
  const fetchData = async () => {
    const response = await storage.getAllIssue();

    console.log(response);
  };

  useEffect(() => {
    fetchData();
    
  }, []);
  
  return (
    <div>
      projects
    </div>
  );
};

export default Projects;
