import { useState, useEffect } from 'react';
import { DEFAULT_SERVICES } from '../config/roles';

export interface Service {
  path: string;
  name: string;
  icon: string;
  status: 'ENABLED' | 'COMING_SOON';
  isClickable: boolean;
}

export const useRoleBasedServices = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const allServices = DEFAULT_SERVICES;

    const visibleServices = allServices.map(service => ({
      ...service,
      isClickable: service.status === 'ENABLED'
    }));

    setServices(visibleServices);
  }, []);

  return services;
};
