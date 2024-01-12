import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

export const backlog = [...Array(10)].map((_, index) => {
  const startDate = new Date(faker.date.past());
  const endDate = new Date(faker.date.future());
   return {
  key: faker.string.uuid(), 
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
    task: faker.lorem.sentence(),
    status: sample(['IN PROGRESS', 'TO DO', 'TO BE TESTED']),
    startDate: startDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
    endDate: endDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
    priority: sample(['High', 'Medium', 'Low']),
    assigned: faker.name.firstName(),
 } });

  
  
