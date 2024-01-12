import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

export const projects = [...Array(20)].map((_, index) => ({
  id: faker.string.uuid(),
  name: faker.company.name(),
  objectif: faker.company.name(),
  status: sample(['finished', 'in progress']),
  type: sample([
    'Leader',
    'Hr Manager',
    'UI Designer',
    'UX Designer',
    'UI/UX Designer',
    'Project Manager',
    'Backend Developer',
    'Full Stack Designer',
    'Front End Developer',
    'Full Stack Developer',
  ]),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  lead: faker.person.fullName(),
}));
